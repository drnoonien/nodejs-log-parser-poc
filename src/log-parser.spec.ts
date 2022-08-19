import { MockedLineReader } from './line-reader'
import { LogParser, ParserError, ParserErrors } from './log-parser'

describe(LogParser.name, () => {

    it(`expects the first event to be COMBAT_LOG_VERSION`, async () => {
        const parser = new LogParser(new MockedLineReader(
            [
                `Incorrect first line, expected the next line to be the first one`,
                '7/13 19:45:07.057  COMBAT_LOG_VERSION,19,ADVANCED_LOG_ENABLED,1,BUILD_VERSION,9.2.5,PROJECT_ID,1',
            ]
        ))

        try {
            expect.assertions(1)
            await parser.parseFile('')
        } catch (error: unknown) {
            if (error instanceof ParserError) {
                expect(error.message).toBe(ParserErrors.INVALID_START_OF_FILE.message)
            }
        }
    })

    it('throws if it finds unexpected arg counts', async () => {
        const parser = new LogParser(new MockedLineReader(
            [
                '7/13 19:45:07.057  COMBAT_LOG_VERSION,19,ADVANCED_LOG_ENABLED,1,BUILD_VERSION,9.2.5,PROJECT_ID,1',
                '7/13 19:45:07.057  MAP_CHANGE,2051',
                '7/13 19:45:07.057  ZONE_CHANGE,2481,"Sepulcher of the First Ones",16',
            ]
        ))

        try {
            expect.assertions(1)
            await parser.parseFile('')
        } catch (error: unknown) {
            if (error instanceof ParserError) {
                expect(error.message).toBe(ParserErrors.INVALID_ARG_COUNT.message([8], 3))
            }
        }
    })

})