import { assertDefined } from './assert-utils'
import { EventLine, EventMapper, EVENTS } from './event-mapper'
import { eventMapperContext } from './event-mapper-context'
import { AsyncLineReader, FileLineReader, NReadLinesReader, SyncLineReader } from './line-reader'
import { HH_MM_SS_SSStoMilli } from './time-utils'

const VALID_COMBAT_LOG_VERSION = 19

export const ParserErrors = {
    INVALID_START_OF_FILE: {
        code: 'INVALID_START_OF_FILE',
        message: 'The first line in the combatlog is invalid, this log cannot be parsed'
    },
    INVALID_ARG_COUNT: {
        code: 'INVALID_ARG_COUNT',
        message: (expected: number[], actual: number) => `Found ${actual} args, expected ${expected}, this log cannot be parsed`
    },
    INVALID_ARG_VALUE: {
        code: 'INVALID_ARG_VALUE',
        message: (value: string, arg: string) => `Expected arg to be exactly ${value}, got ${arg}, this log cannot be parsed`
    },
    INVALID_ARG_TYPE_NOT_NIL: {
        code: 'INVALID_ARG_TYPE_NOT_NIL',
        message: (index: number, arg: string) => `Expected nil or 0 arg on index ${index}, got ${arg}, this log cannot be parsed`
    },
}

export class ParserError extends Error {

    code: string
    logLine: string
    lineArgs: LineArgs | null
    timestamp: string

    constructor(params: {
        code: string,
        logLine: string,
        message: string,
    }) {
        super(params.message)

        this.code = params.code
        this.logLine = params.logLine

        this.lineArgs = eventMapperContext.getLineArgs()
        this.timestamp = eventMapperContext.getTimestamp()
    }

}

export type LineArgs = {
    dateTime: string
    event: string
    args: string[]

    /**
     * Positive number when inside an encounter, -1 otherwise
     */
    encounterTimeMs: number
}

export class LogParser {

    private syncReader: SyncLineReader
    private reader: AsyncLineReader
    private currentEncounterStartMs: number | null = null

    constructor(reader?: AsyncLineReader) {
        if (reader) {
            this.reader = reader
        } else {
            this.reader = new FileLineReader()
        }

        this.syncReader = new NReadLinesReader()
    }

    public streamSync(filePath: string, forEach: (event: EventLine, reader: any) => void) {

        this.syncReader.read(filePath, (line, lineNumber, reader) => {
            const eventMapper = new EventMapper()

            if (lineNumber == 0) {
                this.assertValidCombatLogVersion(line, VALID_COMBAT_LOG_VERSION)
            }

            const lineParts = this.splitLine(line)
            const maybeEvent = eventMapper.filteredMap(lineParts)

            if (maybeEvent) {
                forEach(maybeEvent, reader)
            }
        })

    }

    public streamEvents(filePath: string, forEach: (event: EventLine) => void): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const eventMapper = new EventMapper()

            this.reader.on('line', (line: string, currLineIndex: number) => {
                if (currLineIndex == 0) {
                    this.assertValidCombatLogVersion(line, VALID_COMBAT_LOG_VERSION)
                }

                const lineParts = this.splitLine(line)
                const event = eventMapper.map(lineParts)

                forEach(event)
            })

            this.reader.on('close', () => {
                resolve()
            })

            this.reader.on('error', (error: unknown) => {
                reject(error)
            })

            this.reader.read(filePath)
        })
    }

    public parseFile(filePath: string): Promise<EventLine[]> {
        const result = new Promise<EventLine[]>((resolve, reject) => {
            const output: any[] = []
            const eventMapper = new EventMapper()

            this.reader.on('line', (line: string, currLineIndex: number) => {
                if (currLineIndex == 0) {
                    this.assertValidCombatLogVersion(line, VALID_COMBAT_LOG_VERSION)
                }

                const lineParts = this.splitLine(line)
                const event = eventMapper.map(lineParts)

                output.push(event)
            })

            this.reader.on('close', () => {
                resolve(output)
            })

            this.reader.on('error', (error: unknown) => {
                reject(error)
            })

            this.reader.read(filePath)
        })

        return result
    }

    private assertValidCombatLogVersion(line: string, version: number) {
        if (!line.includes(`COMBAT_LOG_VERSION,${version}`)) {
            throw new ParserError({
                code: ParserErrors.INVALID_START_OF_FILE.code,
                message: ParserErrors.INVALID_START_OF_FILE.message,
                logLine: line,
            })
        }
    }

    protected splitLine(line: string): LineArgs {

        // Don't try a naive "split("  ")", there's other double
        // white-spaces randomly in the log rows
        const dateTime = line.substring(0, line.indexOf("  "))
        const rawArgs = line.substring(line.indexOf("  ") + 2)

        const parsedArgs = []
        let word = ""
        let inQuotes = false
        let inParentheses = false
        let blockParenthesesDepth = 0

        for (let index = 0; index < rawArgs.length; index++) {
            const char = rawArgs[index]

            if (char == "\"") {
                inQuotes = !inQuotes
            }

            if (char == "(") {
                inParentheses = true
            }
            if (char == ")") {
                inParentheses = false
            }

            if (char == "[") {
                blockParenthesesDepth += 1
            }
            if (char == "]") {
                blockParenthesesDepth -= 1
            }

            if (char == "," && !inQuotes && !inParentheses && blockParenthesesDepth == 0) {
                parsedArgs.push(word)
                word = ""
            } else {
                word += char
            }

            // Push last word
            if (index === rawArgs.length - 1) {
                parsedArgs.push(word)
                word = ""
            }
        }

        const [event, ...args] = parsedArgs

        const [_, time] = dateTime.split(" ")
        const currentMs = HH_MM_SS_SSStoMilli(time)

        let encounterTimeMs = -1

        if (event == EVENTS.ENCOUNTER_START) {

            encounterTimeMs = 0
            this.currentEncounterStartMs = currentMs

        } else if (event == EVENTS.ENCOUNTER_END) {

            assertDefined(this.currentEncounterStartMs)
            encounterTimeMs = currentMs - this.currentEncounterStartMs
            this.currentEncounterStartMs = null

        } else if (this.currentEncounterStartMs != null) {

            assertDefined(this.currentEncounterStartMs)
            encounterTimeMs = currentMs - this.currentEncounterStartMs

        }

        return {
            dateTime,
            event,
            encounterTimeMs,
            args
        }
    }

}


