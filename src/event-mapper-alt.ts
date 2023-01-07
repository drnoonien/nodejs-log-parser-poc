import { LineArgs, ParserError, ParserErrors } from './log-parser'

// Extract types dynamically from the extractor functions, see below.
type MAPPED_EVENT =
    ReturnType<typeof ENCHANT_APPLIED> |
    ReturnType<typeof WORLD_MARKER_PLACED>

// ---------------------------------------------------------------------------------------

class EventMapperAlt {

    public map(lineArgs: LineArgs): MAPPED_EVENT | null {

        let event = lineArgs.event
        let data: any

        const args = [
            lineArgs.dateTime,
            lineArgs.event,
            ...lineArgs.args
        ]

        // Can be cleaned up further with pre-defined mappings, but
        // this is just boilerplate.

        if (event == "ENCHANT_APPLIED") {
            return ENCHANT_APPLIED(args, lineArgs.encounterTimeMs)
        }

        if (event == "WORLD_MARKER_PLACED") {
            return WORLD_MARKER_PLACED(args, lineArgs.encounterTimeMs)
        }

        return null
    }

}

// ---------------------------------------------------------------------------------------

/*
    The idea would be to define mapper functions like these for every
    event. This should create an extremely modular architecture where
    we can both inspect exactly how each event is extracted, swap the
    extractors, and be as clever as we want about re-using
    sub-extractors in here.
*/

function ENCHANT_APPLIED(args: string[], extra: any) {
    assertArgLen(args, 13)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "ENCHANT_APPLIED" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        sourceGuid: args[2],
        sourceName: args[3],
        sourceFlags: args[4],
        sourceRaidFlags: args[5],
        destGuid: args[6],
        destName: args[7],
        destFlags: args[8],
        destRaidFlags: args[9],

        // Suffix
        spellName: args[10],
        itemId: args[11],
        itemName: args[12],
    }
}

function WORLD_MARKER_PLACED(args: string[], extra: any) {
    assertArgLen(args, 6)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later.
        event: "WORLD_MARKER_PLACED" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        instanceId: args[2],
        marker: args[3],
        x: args[4],
        y: args[5],
    }
}

// ---------------------------------------------------------------------------------------

/*

    Here's the usage from the client-side.

*/

const mappedEvent = new EventMapperAlt().map({} as any)

// Here we can finally use discrimination to get a hold of the correct
// args.
if (mappedEvent && mappedEvent.event == "ENCHANT_APPLIED") {
    mappedEvent.itemId
}

// Here we can finally use discrimination to get a hold of the correct
// args.
if (mappedEvent && mappedEvent.event == "WORLD_MARKER_PLACED") {
    mappedEvent.instanceId
}

// ---------------------------------------------------------------------------------------

function assertArgLen(args: any[], ...lengths: number[]) {
    if (!lengths.includes(args.length)) {
        throw new ParserError({
            code: ParserErrors.INVALID_ARG_COUNT.code,
            message: ParserErrors.INVALID_ARG_COUNT.message(lengths, args.length),
            logLine: args.join(',')
        })
    }
}
