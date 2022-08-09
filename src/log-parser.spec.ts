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

    it('throws if it finds unexpected non-nil value', async () => {
        const parser = new LogParser(new MockedLineReader(
            [
                '7/13 19:45:07.057  COMBAT_LOG_VERSION,19,ADVANCED_LOG_ENABLED,1,BUILD_VERSION,9.2.5,PROJECT_ID,1',
                '7/27 19:33:17.128  EMOTE,Creature-0-3113-2481-7173-181954-00006171A8,"Anduin Wrynn",0000000000000000,not-nil,|TInterface\ICONS\Ability_Priest_FocusedWill.blp:20|t Anduin begins casting |cFFFF0000|Hspell:361989|h[Blasphemy]|h|r!',
            ]
        ))

        try {
            expect.assertions(1)
            await parser.parseFile('')
        } catch (error: unknown) {
            if (error instanceof ParserError) {
                expect(error.message).toBe(ParserErrors.INVALID_ARG_TYPE_NOT_NIL.message(5, 'not-nil'))
            }
        }
    })

    it('throws if it finds unexpected arg value', async () => {
        const parser = new LogParser(new MockedLineReader(
            [
                '7/13 19:45:07.057  COMBAT_LOG_VERSION,19,ADVANCED_LOG_ENABLED,1,BUILD_VERSION,9.2.5,PROJECT_ID,1',
                '7/27 19:33:17.128  EMOTE,Creature-0-3113-2481-7173-181954-00006171A8,"Anduin Wrynn",some-other-value,nil,|TInterface\ICONS\Ability_Priest_FocusedWill.blp:20|t Anduin begins casting |cFFFF0000|Hspell:361989|h[Blasphemy]|h|r!',
            ]
        ))

        try {
            expect.assertions(1)
            await parser.parseFile('')
        } catch (error: unknown) {
            if (error instanceof ParserError) {
                expect(error.message).toBe(ParserErrors.INVALID_ARG_VALUE.message('0000000000000000', 'some-other-value'))
            }
        }
    })

})