import fs from 'fs'
import path from 'path'
import { LineArgs, LogParser } from './log-parser'

/*

    Custom runner, takes a folder of logs as its 1st and only input
    arg.

    This runner parses all the given logs and looks for unique event
    rows. Including nil variations.

    Outputs the results in ./parsed/sniffer.json

*/

const rootFolder = process.argv[2]

async function main() {

    type CollectorLine = {
        argCount: number
        nilArgIndices: number[]
        mergedArgs: string
    }

    const collector: {
        [event: string]: CollectorLine[]
    } = {}

    fs.readdirSync(rootFolder).forEach(file => {

        const filePath = path.resolve(rootFolder, file)
        console.log(`Processing ${filePath}...`)

        const logParser = new LogParser<LineArgs>({
            mapper: (line) => {
                return line
            }
        })

        logParser.streamSync(filePath, (lineArgs, _reader) => {

            const allArgs = [
                lineArgs.dateTime,
                lineArgs.event,
                ...lineArgs.args,
            ]

            const argCount = allArgs.length

            const nilArgIndices = allArgs.flatMap((item, index) => {
                if (item == "-1" || item == "nil") {
                    return index
                }

                return []
            })

            const eventMatch = collector[lineArgs.event]

            if (eventMatch == null) {

                collector[lineArgs.event] = []
                collector[lineArgs.event].push({
                    argCount,
                    nilArgIndices,
                    mergedArgs: allArgs.join(",")
                })

            } else if (eventMatch) {

                const argCountMatches = eventMatch.filter(item => item.argCount == argCount)

                if (argCountMatches.length <= 0) {
                    // Nothing with the same arg count, we can just add
                    eventMatch.push({
                        argCount,
                        nilArgIndices,
                        mergedArgs: allArgs.join(",")
                    })
                } else {

                    const nilArgsToCheck = new Set(argCountMatches
                        .flatMap(item => item.nilArgIndices))

                    // Only skip if every one of our nil-args have been
                    // seen before, otherwise grab this entry too
                    const skip = nilArgIndices.every(item => nilArgsToCheck.has(item))

                    if (!skip) {
                        eventMatch.push({
                            argCount,
                            nilArgIndices,
                            mergedArgs: allArgs.join(",")
                        })
                    }
                }
            }

        })

        console.log(`Done with ${filePath}`)

    })

    const writeCollector = Object
        .entries(collector)
        .sort((a, b) => {
            return a[0].localeCompare(b[0])
        })

    fs.writeFileSync(getOutPath('sniffer.json'), JSON.stringify(writeCollector, null, '  '))
}

main().catch(err => { console.error(err) })

function getOutPath(fileName: string) {
    const outPath = path.resolve(__dirname, `../parsed/`)

    if (!fs.existsSync(outPath)) {
        fs.mkdirSync(outPath)
    }

    const fullOutPath = path.resolve(outPath, fileName)

    return fullOutPath
}