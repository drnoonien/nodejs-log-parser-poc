import { LineArgs, ParserError, ParserErrors } from './log-parser'

export type COMBAT_LOG_VERSION = ReturnType<typeof COMBAT_LOG_VERSION>
export type COMBATANT_INFO = ReturnType<typeof COMBATANT_INFO>
export type DAMAGE_SPLIT = ReturnType<typeof DAMAGE_SPLIT>
export type DAMAGE_SHIELD = ReturnType<typeof DAMAGE_SHIELD>
export type DAMAGE_SHIELD_MISSED = ReturnType<typeof DAMAGE_SHIELD_MISSED>
export type EMOTE = ReturnType<typeof EMOTE>
export type ENCOUNTER_END = ReturnType<typeof ENCOUNTER_END>
export type ENCOUNTER_START = ReturnType<typeof ENCOUNTER_START>
export type ENVIRONMENTAL_DAMAGE = ReturnType<typeof ENVIRONMENTAL_DAMAGE>
export type ENCHANT_APPLIED = ReturnType<typeof ENCHANT_APPLIED>
export type ENCHANT_REMOVED = ReturnType<typeof ENCHANT_REMOVED>
export type MAP_CHANGE = ReturnType<typeof MAP_CHANGE>
export type PARTY_KILL = ReturnType<typeof PARTY_KILL>
export type RANGE_DAMAGE = ReturnType<typeof RANGE_DAMAGE>
export type RANGE_MISSED = ReturnType<typeof RANGE_MISSED>
export type SPELL_ABSORBED = ReturnType<typeof SPELL_ABSORBED>
export type SPELL_AURA_APPLIED_DOSE = ReturnType<typeof SPELL_AURA_APPLIED_DOSE>
export type SPELL_AURA_APPLIED = ReturnType<typeof SPELL_AURA_APPLIED>
export type SPELL_AURA_BROKEN_SPELL = ReturnType<typeof SPELL_AURA_BROKEN_SPELL>
export type SPELL_AURA_BROKEN = ReturnType<typeof SPELL_AURA_BROKEN>
export type SPELL_AURA_REFRESH = ReturnType<typeof SPELL_AURA_REFRESH>
export type SPELL_AURA_REMOVED_DOSE = ReturnType<typeof SPELL_AURA_REMOVED_DOSE>
export type SPELL_AURA_REMOVED = ReturnType<typeof SPELL_AURA_REMOVED>
export type SPELL_CREATE = ReturnType<typeof SPELL_CREATE>
export type SPELL_CAST_FAILED = ReturnType<typeof SPELL_CAST_FAILED>
export type SPELL_CAST_START = ReturnType<typeof SPELL_CAST_START>
export type SPELL_CAST_SUCCESS = ReturnType<typeof SPELL_CAST_SUCCESS>
export type SPELL_DAMAGE = ReturnType<typeof SPELL_DAMAGE>
export type SPELL_DRAIN = ReturnType<typeof SPELL_DRAIN>
export type SPELL_LEECH = ReturnType<typeof SPELL_LEECH>
export type SPELL_DISPEL = ReturnType<typeof SPELL_DISPEL>
export type SPELL_ENERGIZE = ReturnType<typeof SPELL_ENERGIZE>
export type SPELL_EXTRA_ATTACKS = ReturnType<typeof SPELL_EXTRA_ATTACKS>
export type SPELL_HEAL_ABSORBED = ReturnType<typeof SPELL_HEAL_ABSORBED>
export type SPELL_HEAL = ReturnType<typeof SPELL_HEAL>
export type SPELL_INSTAKILL = ReturnType<typeof SPELL_INSTAKILL>
export type SPELL_INTERRUPT = ReturnType<typeof SPELL_INTERRUPT>
export type SPELL_MISSED = ReturnType<typeof SPELL_MISSED>
export type SPELL_PERIODIC_DAMAGE = ReturnType<typeof SPELL_PERIODIC_DAMAGE>
export type SPELL_PERIODIC_ENERGIZE = ReturnType<typeof SPELL_PERIODIC_ENERGIZE>
export type SPELL_PERIODIC_HEAL = ReturnType<typeof SPELL_PERIODIC_HEAL>
export type SPELL_PERIODIC_MISSED = ReturnType<typeof SPELL_PERIODIC_MISSED>
export type SPELL_RESURRECT = ReturnType<typeof SPELL_RESURRECT>
export type SPELL_SUMMON = ReturnType<typeof SPELL_SUMMON>
export type SPELL_STOLEN = ReturnType<typeof SPELL_STOLEN>
export type SWING_DAMAGE_LANDED = ReturnType<typeof SWING_DAMAGE_LANDED>
export type SWING_DAMAGE = ReturnType<typeof SWING_DAMAGE>
export type SWING_MISSED = ReturnType<typeof SWING_MISSED>
export type UNIT_DESTROYED = ReturnType<typeof UNIT_DESTROYED>
export type UNIT_DIED = ReturnType<typeof UNIT_DIED>
export type WORLD_MARKER_PLACED = ReturnType<typeof WORLD_MARKER_PLACED>
export type WORLD_MARKER_REMOVED = ReturnType<typeof WORLD_MARKER_REMOVED>
export type ZONE_CHANGE = ReturnType<typeof ZONE_CHANGE>
export type SPELL_EMPOWER_START = ReturnType<typeof SPELL_EMPOWER_START>
export type SPELL_EMPOWER_END = ReturnType<typeof SPELL_EMPOWER_END>
export type SPELL_EMPOWER_INTERRUPT = ReturnType<typeof SPELL_EMPOWER_INTERRUPT>

export type MAPPED_EVENT =
    COMBAT_LOG_VERSION |
    COMBATANT_INFO |
    DAMAGE_SPLIT |
    DAMAGE_SHIELD |
    DAMAGE_SHIELD_MISSED |
    EMOTE |
    ENCOUNTER_END |
    ENCOUNTER_START |
    ENVIRONMENTAL_DAMAGE |
    ENCHANT_APPLIED |
    ENCHANT_REMOVED |
    MAP_CHANGE |
    PARTY_KILL |
    RANGE_DAMAGE |
    RANGE_MISSED |
    SPELL_ABSORBED |
    SPELL_AURA_APPLIED_DOSE |
    SPELL_AURA_APPLIED |
    SPELL_AURA_BROKEN_SPELL |
    SPELL_AURA_BROKEN |
    SPELL_AURA_REFRESH |
    SPELL_AURA_REMOVED_DOSE |
    SPELL_AURA_REMOVED |
    SPELL_CREATE |
    SPELL_CAST_FAILED |
    SPELL_CAST_START |
    SPELL_CAST_SUCCESS |
    SPELL_DAMAGE |
    SPELL_DRAIN |
    SPELL_LEECH |
    SPELL_DISPEL |
    SPELL_ENERGIZE |
    SPELL_EXTRA_ATTACKS |
    SPELL_HEAL_ABSORBED |
    SPELL_HEAL |
    SPELL_INSTAKILL |
    SPELL_INTERRUPT |
    SPELL_MISSED |
    SPELL_PERIODIC_DAMAGE |
    SPELL_PERIODIC_ENERGIZE |
    SPELL_PERIODIC_HEAL |
    SPELL_PERIODIC_MISSED |
    SPELL_RESURRECT |
    SPELL_SUMMON |
    SPELL_STOLEN |
    SWING_DAMAGE_LANDED |
    SWING_DAMAGE |
    SWING_MISSED |
    UNIT_DESTROYED |
    UNIT_DIED |
    WORLD_MARKER_PLACED |
    WORLD_MARKER_REMOVED |
    ZONE_CHANGE |
    SPELL_EMPOWER_START |
    SPELL_EMPOWER_END |
    SPELL_EMPOWER_INTERRUPT


// ---------------------------------------------------------------------------------------

export class EventMapper {

    public map(lineArgs: LineArgs): MAPPED_EVENT | undefined {

        let event = lineArgs.event

        const args = [
            lineArgs.dateTime,
            lineArgs.event,
            ...lineArgs.args
        ]

        // Can be cleaned up further with pre-defined mappings, but
        // this is just boilerplate.

        if (event == "COMBAT_LOG_VERSION") { return COMBAT_LOG_VERSION(args, lineArgs.encounterTimeMs) }
        if (event == "COMBATANT_INFO") { return COMBATANT_INFO(args, lineArgs.encounterTimeMs) }
        if (event == "DAMAGE_SPLIT") { return DAMAGE_SPLIT(args, lineArgs.encounterTimeMs) }
        if (event == "DAMAGE_SHIELD") { return DAMAGE_SHIELD(args, lineArgs.encounterTimeMs) }
        if (event == "DAMAGE_SHIELD_MISSED") { return DAMAGE_SHIELD_MISSED(args, lineArgs.encounterTimeMs) }
        if (event == "EMOTE") { return EMOTE(args, lineArgs.encounterTimeMs) }
        if (event == "ENCOUNTER_END") { return ENCOUNTER_END(args, lineArgs.encounterTimeMs) }
        if (event == "ENCOUNTER_START") { return ENCOUNTER_START(args, lineArgs.encounterTimeMs) }
        if (event == "ENVIRONMENTAL_DAMAGE") { return ENVIRONMENTAL_DAMAGE(args, lineArgs.encounterTimeMs) }
        if (event == "ENCHANT_APPLIED") { return ENCHANT_APPLIED(args, lineArgs.encounterTimeMs) }
        if (event == "ENCHANT_REMOVED") { return ENCHANT_REMOVED(args, lineArgs.encounterTimeMs) }
        if (event == "MAP_CHANGE") { return MAP_CHANGE(args, lineArgs.encounterTimeMs) }
        if (event == "PARTY_KILL") { return PARTY_KILL(args, lineArgs.encounterTimeMs) }
        if (event == "RANGE_DAMAGE") { return RANGE_DAMAGE(args, lineArgs.encounterTimeMs) }
        if (event == "RANGE_MISSED") { return RANGE_MISSED(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_ABSORBED") { return SPELL_ABSORBED(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_AURA_APPLIED_DOSE") { return SPELL_AURA_APPLIED_DOSE(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_AURA_APPLIED") { return SPELL_AURA_APPLIED(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_AURA_BROKEN_SPELL") { return SPELL_AURA_BROKEN_SPELL(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_AURA_BROKEN") { return SPELL_AURA_BROKEN(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_AURA_REFRESH") { return SPELL_AURA_REFRESH(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_AURA_REMOVED_DOSE") { return SPELL_AURA_REMOVED_DOSE(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_AURA_REMOVED") { return SPELL_AURA_REMOVED(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_CREATE") { return SPELL_CREATE(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_CAST_FAILED") { return SPELL_CAST_FAILED(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_CAST_START") { return SPELL_CAST_START(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_CAST_SUCCESS") { return SPELL_CAST_SUCCESS(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_DAMAGE") { return SPELL_DAMAGE(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_DRAIN") { return SPELL_DRAIN(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_LEECH") { return SPELL_LEECH(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_DISPEL") { return SPELL_DISPEL(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_ENERGIZE") { return SPELL_ENERGIZE(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_EXTRA_ATTACKS") { return SPELL_EXTRA_ATTACKS(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_HEAL_ABSORBED") { return SPELL_HEAL_ABSORBED(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_HEAL") { return SPELL_HEAL(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_INSTAKILL") { return SPELL_INSTAKILL(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_INTERRUPT") { return SPELL_INTERRUPT(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_MISSED") { return SPELL_MISSED(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_PERIODIC_DAMAGE") { return SPELL_PERIODIC_DAMAGE(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_PERIODIC_ENERGIZE") { return SPELL_PERIODIC_ENERGIZE(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_PERIODIC_HEAL") { return SPELL_PERIODIC_HEAL(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_PERIODIC_MISSED") { return SPELL_PERIODIC_MISSED(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_RESURRECT") { return SPELL_RESURRECT(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_SUMMON") { return SPELL_SUMMON(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_STOLEN") { return SPELL_STOLEN(args, lineArgs.encounterTimeMs) }
        if (event == "SWING_DAMAGE_LANDED") { return SWING_DAMAGE_LANDED(args, lineArgs.encounterTimeMs) }
        if (event == "SWING_DAMAGE") { return SWING_DAMAGE(args, lineArgs.encounterTimeMs) }
        if (event == "SWING_MISSED") { return SWING_MISSED(args, lineArgs.encounterTimeMs) }
        if (event == "UNIT_DESTROYED") { return UNIT_DESTROYED(args, lineArgs.encounterTimeMs) }
        if (event == "UNIT_DIED") { return UNIT_DIED(args, lineArgs.encounterTimeMs) }
        if (event == "WORLD_MARKER_PLACED") { return WORLD_MARKER_PLACED(args, lineArgs.encounterTimeMs) }
        if (event == "WORLD_MARKER_REMOVED") { return WORLD_MARKER_REMOVED(args, lineArgs.encounterTimeMs) }
        if (event == "ZONE_CHANGE") { return ZONE_CHANGE(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_EMPOWER_START") { return SPELL_EMPOWER_START(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_EMPOWER_END") { return SPELL_EMPOWER_END(args, lineArgs.encounterTimeMs) }
        if (event == "SPELL_EMPOWER_INTERRUPT") { return SPELL_EMPOWER_INTERRUPT(args, lineArgs.encounterTimeMs) }

        // TODO: Should this be allowed or do we blow up? When is this
        // allowed?
        return undefined
    }

}

function assertArgLen(args: any[], ...lengths: number[]) {
    if (!lengths.includes(args.length)) {
        throw new ParserError({
            code: ParserErrors.INVALID_ARG_COUNT.code,
            message: ParserErrors.INVALID_ARG_COUNT.message(lengths, args.length),
            logLine: args.join(',')
        })
    }
}

function assertAlwaysNilOrZero(args: any[], index: number) {
    const arg = args[index]

    if (arg != "nil" && arg != "0") {
        throw new ParserError({
            code: ParserErrors.INVALID_ARG_TYPE_NOT_NIL.code,
            message: ParserErrors.INVALID_ARG_TYPE_NOT_NIL.message(index, arg),
            logLine: args.join(',')
        })
    }

    return arg
}


function extractBaseUnitProperties(args: string[], index: number) {
    return {
        sourceGuid: args[index],
        sourceName: args[index + 1],
        sourceFlags: args[index + 2],
        sourceRaidFlags: args[index + 3],
        destGuid: args[index + 4],
        destName: args[index + 5],
        destFlags: args[index + 6],
        destRaidFlags: args[index + 7],
    }
}

function extractAdvancedUnitProperties(args: string[], index: number) {
    return {
        infoGuid: args[index],
        ownerGuid: args[index + 1],
        currentHp: Number(args[index + 2]),
        maxHp: Number(args[index + 3]),
        attackPower: Number(args[index + 4]),
        spellPower: Number(args[index + 5]),
        armor: Number(args[index + 6]),
        absorb: Number(args[index + 7]),
        powerType: Number(args[index + 8]),
        currentPower: Number(args[index + 9]),
        maxPower: Number(args[index + 10]),
        powerCost: Number(args[index + 11]),
        positionX: Number(args[index + 12]),
        positionY: Number(args[index + 13]),
        uiMapId: Number(args[index + 14]),
        facing: Number(args[index + 15]),
        item_level: Number(args[index + 16]),
    }
}

function extractMissedSuffixProperties(args: string[], index: number) {
    return {
        missType: args[index],
        isOffHand: Number(args[index + 1]),
        amountMissed: Number(args[index + 2]),
        baseAmount: Number(args[index + 3]),
        critical: Number(args[index + 4]),
    }
}

function extractDamageSuffixProperties(args: string[], index: number) {
    return {
        amount: Number(args[index]),
        baseAmount: Number(args[index + 1]),
        overkill: Number(args[index + 2]),
        school: Number(args[index + 3]),
        resisted: assertAlwaysNilOrZero(args, index + 4),
        blocked: Number(args[index + 5]),
        absorbed: Number(args[index + 6]),
        critical: Number(args[index + 7]),
        glancing: assertAlwaysNilOrZero(args, index + 8),
        crushing: assertAlwaysNilOrZero(args, index + 9),
    }
}

function extractSpellPrefixProperties(args: string[], index: number) {
    return {
        spellId: Number(args[index]),
        spellName: args[index + 1],
        spellSchool: Number(args[index + 2]),
    }
}

function extractHealSuffixProperties(args: string[], index: number) {
    return {
        amount: Number(args[index]),
        baseAmount: Number(args[index + 1]),
        overheal: Number(args[index + 2]),
        absorbed: Number(args[index + 3]),
        critical: Number(args[index + 4]),
    }
}

function extractEnergizeSuffixProperties(args: string[], index: number) {
    return {
        amount: Number(args[index]),
        overEnergize: Number(args[index + 1]),
        powerType: Number(args[index + 2]),
        maxPower: Number(args[index + 3]),
    }
}

function ENCHANT_APPLIED(args: string[], extra: any) {
    assertArgLen(args, 13)

    let unitProperties = extractBaseUnitProperties(args, 2)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "ENCHANT_APPLIED" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        //Extracting args 2-9
        ...unitProperties,

        // Suffix
        spellName: args[10],
        itemId: args[11],
        itemName: args[12],
    }
}

function ENCHANT_REMOVED(args: string[], extra: any) {
    assertArgLen(args, 13)

    let unitProperties = extractBaseUnitProperties(args, 2)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "ENCHANT_REMOVED" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        //Extracting args 3-9
        ...unitProperties,

        // Suffix
        spellName: args[10],
        itemId: args[11],
        itemName: args[12],
    }
}

function COMBAT_LOG_VERSION(args: string[], extra: any) {
    assertArgLen(args, 9)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "COMBAT_LOG_VERSION" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,
        combatLogVersionKey: args[1],
        combatLogVersionValue: args[2],
        advancedCombatLogEnabledKey: args[3],
        advancedCombatLogEnabledValue: args[4],
        buildVersionKey: args[5],
        buildVersionValue: args[6],
        projectIdKey: args[7],
        projectIdValue: args[8],
    }
}
function COMBATANT_INFO(args: string[], extra: any) {
    assertArgLen(args, 35)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "COMBATANT_INFO" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        //TODO: add more shit here.
    }
}
function DAMAGE_SPLIT(args: string[], extra: any) {
    assertArgLen(args, 40)
    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    // args13-29
    let advancedUnitProperties = extractAdvancedUnitProperties(args, 13)
    // args30-39
    let damageSuffixProperties = extractDamageSuffixProperties(args, 30)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "DAMAGE_SPLIT" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        // args2-39
        ...baseUnitProperties,
        ...spellPrefixProperties,
        ...advancedUnitProperties,
        ...damageSuffixProperties,
    }
}
function DAMAGE_SHIELD(args: string[], extra: any) {
    assertArgLen(args, 40)
    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    // args13-29
    let advancedUnitProperties = extractAdvancedUnitProperties(args, 13)
    // args30-39
    let damageSuffixProperties = extractDamageSuffixProperties(args, 30)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "DAMAGE_SHIELD" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        // args2-39
        ...baseUnitProperties,
        ...spellPrefixProperties,
        ...advancedUnitProperties,
        ...damageSuffixProperties,
    }
}
function DAMAGE_SHIELD_MISSED(args: string[], extra: any) {
    assertArgLen(args, 15, 16, 18) //Need to find exact size, didn't have a log with it

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    // args13-17 (or only 14/15 depending on size)
    let missedSuffixProperties = extractMissedSuffixProperties(args, 13)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "DAMAGE_SHIELD_MISSED" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        // args2-17
        ...baseUnitProperties,
        ...spellPrefixProperties,
        ...missedSuffixProperties,
    }
}

//Skipped
function EMOTE(args: string[], extra: any) {
    //assertArgLen(args, -1)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "EMOTE" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,
    }
}
function ENCOUNTER_END(args: string[], extra: any) {
    assertArgLen(args, 8)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "ENCOUNTER_END" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        encounterId: args[2],
        encounterName: args[3],
        difficultyId: args[4],
        groupSize: args[5],
        success: args[6],
        fightTimeMs: args[7],
    }
}
function ENCOUNTER_START(args: string[], extra: any) {
    assertArgLen(args, 7)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "ENCOUNTER_START" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        encounterId: args[2],
        encounterName: args[3],
        difficultyId: args[4],
        groupSize: args[5],
        instanceId: args[6],
    }
}
function ENVIRONMENTAL_DAMAGE(args: string[], extra: any) {
    assertArgLen(args, 38)

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-26
    let advancedUnitProperties = extractAdvancedUnitProperties(args, 10)
    // args28-37
    let damageSuffixProperties = extractDamageSuffixProperties(args, 28)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "ENVIRONMENTAL_DAMAGE" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        // args2-37
        ...baseUnitProperties,
        ...advancedUnitProperties,
        environmentalType: args[27],
        ...damageSuffixProperties,
    }
}
function MAP_CHANGE(args: string[], extra: any) {
    assertArgLen(args, 8)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "MAP_CHANGE" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        uiMapId: args[2],
        uiMapName: args[3],
        x0: args[4],
        x1: args[5],
        y0: args[6],
        y1: args[7],
    }
}
function PARTY_KILL(args: string[], extra: any) {
    assertArgLen(args, 11)

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "PARTY_KILL" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        // args2-9
        ...baseUnitProperties,

        // Unclear exactly what this arg is, there's something
        // about "unconsciousOnDeath"
        recapId: args[10]
    }
}
function RANGE_DAMAGE(args: string[], extra: any) {
    assertArgLen(args, 40)
    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    // args13-29
    let advancedUnitProperties = extractAdvancedUnitProperties(args, 13)
    // args30-39
    let damageSuffixProperties = extractDamageSuffixProperties(args, 30)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "RANGE_DAMAGE" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        // args2-39
        ...baseUnitProperties,
        ...spellPrefixProperties,
        ...advancedUnitProperties,
        ...damageSuffixProperties,
    }
}
function RANGE_MISSED(args: string[], extra: any) {
    assertArgLen(args, 15, 16, 18) //Need to find exact size, didn't have a log with it

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    // args13-17 (or only 14/15 depending on size)
    let missedSuffixProperties = extractMissedSuffixProperties(args, 13)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "RANGE_MISSED" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        // args2-17
        ...baseUnitProperties,
        ...spellPrefixProperties,
        ...missedSuffixProperties,
    }
}

// This relatively new subevent fires in addition to
// SWING_MISSED / SPELL_MISSED which already have the
// "ABSORB" missType and same amount.
//
// It optionally includes the spell payload if triggered
// from what would be SPELL_DAMAGE.
function SPELL_ABSORBED(args: string[], extra: any) {
    assertArgLen(args, 20, 23)

    let spellAbsorbedProperties
    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    if (args.length == 20) { //Absorb was not triggered by spell damage:
        spellAbsorbedProperties = {
            casterGuid: args[10],
            casterName: args[11],
            casterFlags: args[12],
            casterRaidFlags: args[13],
            absorbSpellId: args[14],
            absorbSpellName: args[15],
            absorbSpellSchool: args[16],
            absorbAmount: args[17],
            damageAmount: args[18],
            critical: args[19],
        }
    } else { //Absorb was triggered by spell damage, includes spell payload:
        // args10-12
        let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
        spellAbsorbedProperties = {
            ...spellPrefixProperties,
            casterGuid: args[13],
            casterName: args[14],
            casterFlags: args[15],
            casterRaidFlags: args[16],
            absorbSpellId: args[17],
            absorbSpellName: args[18],
            absorbSpellSchool: args[19],
            absorbAmount: args[20],
            damageAmount: args[21],
            critical: args[22],
        }
    }

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_ABSORBED" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        ...baseUnitProperties,
        ...spellAbsorbedProperties,
    }
}
function SPELL_AURA_APPLIED_DOSE(args: string[], extra: any) {
    assertArgLen(args, 15)

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_AURA_APPLIED_DOSE" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        ...baseUnitProperties,
        ...spellPrefixProperties,
        auraType: args[13],
        amount: args[14],
    }
}
function SPELL_AURA_APPLIED(args: string[], extra: any) {
    assertArgLen(args, 15)

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_AURA_APPLIED" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        ...baseUnitProperties,
        ...spellPrefixProperties,
        auraType: args[13],
        amount: args[14],

    }
}
function SPELL_AURA_BROKEN_SPELL(args: string[], extra: any) {
    assertArgLen(args, 17)

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_AURA_BROKEN_SPELL" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        ...baseUnitProperties,
        ...spellPrefixProperties,

        extraSpellId: args[13],
        extraSpellName: args[14],
        extraSchool: args[15],
        auraType: args[16],

    }
}
function SPELL_AURA_BROKEN(args: string[], extra: any) {
    assertArgLen(args, 14)

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_AURA_BROKEN" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        ...baseUnitProperties,
        ...spellPrefixProperties,
        auraType: args[13],

    }
}
function SPELL_AURA_REFRESH(args: string[], extra: any) {
    assertArgLen(args, 14)

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_AURA_REFRESH" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        ...baseUnitProperties,
        ...spellPrefixProperties,
        auraType: args[13],

    }
}
function SPELL_AURA_REMOVED_DOSE(args: string[], extra: any) {
    assertArgLen(args, 15)

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_AURA_REMOVED_DOSE" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        ...baseUnitProperties,
        ...spellPrefixProperties,
        auraType: args[13],
        amount: args[14],

    }
}
function SPELL_AURA_REMOVED(args: string[], extra: any) {
    assertArgLen(args, 15)

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_AURA_REMOVED" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        ...baseUnitProperties,
        ...spellPrefixProperties,
        auraType: args[13],
        amount: args[14],

    }
}
function SPELL_CREATE(args: string[], extra: any) {
    assertArgLen(args, 13)

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_CREATE" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        ...baseUnitProperties,
        ...spellPrefixProperties,

    }
}

//Only triggers for the player recording the log it seems
function SPELL_CAST_FAILED(args: string[], extra: any) {
    assertArgLen(args, 14)

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_CREATE" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        ...baseUnitProperties,
        ...spellPrefixProperties,
        failedType: args[13]

    }
}
function SPELL_CAST_START(args: string[], extra: any) {
    assertArgLen(args, 13)

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_CAST_START" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        ...baseUnitProperties,
        ...spellPrefixProperties,

    }
}
function SPELL_CAST_SUCCESS(args: string[], extra: any) {
    assertArgLen(args, 30)
    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    // args13-29
    let advancedUnitProperties = extractAdvancedUnitProperties(args, 13)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_DAMAGE" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        // args2-29
        ...baseUnitProperties,
        ...spellPrefixProperties,
        ...advancedUnitProperties,
    }
}
function SPELL_DAMAGE(args: string[], extra: any) {
    assertArgLen(args, 40)
    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    // args13-29
    let advancedUnitProperties = extractAdvancedUnitProperties(args, 13)
    // args30-39
    let damageSuffixProperties = extractDamageSuffixProperties(args, 30)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_DAMAGE" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        // args2-39
        ...baseUnitProperties,
        ...spellPrefixProperties,
        ...advancedUnitProperties,
        ...damageSuffixProperties,
    }
}
function SPELL_DRAIN(args: string[], extra: any) {
    assertArgLen(args, 35)
    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    // args13-29
    let advancedUnitProperties = extractAdvancedUnitProperties(args, 13)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_DRAIN" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        // args2-29
        ...baseUnitProperties,
        ...spellPrefixProperties,
        ...advancedUnitProperties,

        amount: args[30],
        extraPowerType: args[31],
        extraAmount: args[32],
        extraMaxPower: args[33],
    }
}
function SPELL_LEECH(args: string[], extra: any) {
    assertArgLen(args, 34)
    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    // args13-29
    let advancedUnitProperties = extractAdvancedUnitProperties(args, 13)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_LEECH" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        // args2-29
        ...baseUnitProperties,
        ...spellPrefixProperties,
        ...advancedUnitProperties,

        amount: args[30],
        extraPowerType: args[31],
        extraAmount: args[32],
    }
}
function SPELL_DISPEL(args: string[], extra: any) {
    assertArgLen(args, 17)

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_DISPEL" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        ...baseUnitProperties,
        ...spellPrefixProperties,

        extraSpellId: args[13],
        extraSpellName: args[14],
        extraSchool: args[15],
        auraType: args[16],

    }
}
function SPELL_ENERGIZE(args: string[], extra: any) {
    assertArgLen(args, 34)
    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    // args13-29
    let advancedUnitProperties = extractAdvancedUnitProperties(args, 13)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_ENERGIZE" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        // args2-29
        ...baseUnitProperties,
        ...spellPrefixProperties,
        ...advancedUnitProperties,

        amount: args[30],
        overEnergize: args[31],
        _powerType: args[32],
        _maxPower: args[33],
    }
}
function SPELL_EXTRA_ATTACKS(args: string[], extra: any) {
    assertArgLen(args, 14)

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_EXTRA_ATTACKS" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        ...baseUnitProperties,
        ...spellPrefixProperties,

        amount: args[13],

    }
}
function SPELL_HEAL_ABSORBED(args: string[], extra: any) {
    assertArgLen(args, 22)

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_HEAL_ABSORBED" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        ...baseUnitProperties,
        ...spellPrefixProperties,

        casterGuid: args[13],
        casterName: args[14],
        casterFlags: args[15],
        casterRaidFlags: args[16],
        absorbSpellId: args[17],
        absorbSpellName: args[18],
        absorbSpellSchool: args[19],
        amount: args[20],
        baseAmount: args[21],

    }
}
function SPELL_HEAL(args: string[], extra: any) {
    assertArgLen(args, 35)
    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    // args13-29
    let advancedUnitProperties = extractAdvancedUnitProperties(args, 13)
    // args30-34
    let healSuffixProperties = extractHealSuffixProperties(args, 30)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_HEAL" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        // args2-34
        ...baseUnitProperties,
        ...spellPrefixProperties,
        ...advancedUnitProperties,
        ...healSuffixProperties,
    }
}
function SPELL_INSTAKILL(args: string[], extra: any) {
    assertArgLen(args, 14)

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_INSTAKILL" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        // args2-12
        ...baseUnitProperties,
        ...spellPrefixProperties,

        // Unclear exactly what this arg is, there's something
        // about "unconsciousOnDeath"
        recapId: args[13]
    }
}
function SPELL_INTERRUPT(args: string[], extra: any) {
    assertArgLen(args, 16)

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_INTERRUPT" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        // args2-12
        ...baseUnitProperties,
        ...spellPrefixProperties,

        // Refers to the interrupted spell
        extraSpellId: args[13],
        extraSpellName: args[14],
        extraSchool: args[15],
    }
}
function SPELL_MISSED(args: string[], extra: any) {
    assertArgLen(args, 15, 16, 18) //Need to find exact size, didn't have a log with it

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    // args13-17 (or only 14/15 depending on size)
    let missedSuffixProperties = extractMissedSuffixProperties(args, 13)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_MISSED" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        // args2-17
        ...baseUnitProperties,
        ...spellPrefixProperties,
        ...missedSuffixProperties,
    }
}
function SPELL_PERIODIC_DAMAGE(args: string[], extra: any) {
    assertArgLen(args, 40)
    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    // args13-29
    let advancedUnitProperties = extractAdvancedUnitProperties(args, 13)
    // args30-39
    let damageSuffixProperties = extractDamageSuffixProperties(args, 30)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_PERIODIC_DAMAGE" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        // args2-39
        ...baseUnitProperties,
        ...spellPrefixProperties,
        ...advancedUnitProperties,
        ...damageSuffixProperties,
    }
}
function SPELL_PERIODIC_ENERGIZE(args: string[], extra: any) {
    assertArgLen(args, 34)
    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    // args13-29
    let advancedUnitProperties = extractAdvancedUnitProperties(args, 13)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_PERIODIC_ENERGIZE" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        // args2-29
        ...baseUnitProperties,
        ...spellPrefixProperties,
        ...advancedUnitProperties,

        amount: args[30],
        overEnergize: args[31],
        _powerType: args[32],
        _maxPower: args[33]
    }
}
function SPELL_PERIODIC_HEAL(args: string[], extra: any) {
    assertArgLen(args, 35)
    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    // args13-29
    let advancedUnitProperties = extractAdvancedUnitProperties(args, 13)
    // args30-34
    let healSuffixProperties = extractHealSuffixProperties(args, 30)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_PERIODIC_HEAL" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        // args2-34
        ...baseUnitProperties,
        ...spellPrefixProperties,
        ...advancedUnitProperties,
        ...healSuffixProperties,
    }
}
function SPELL_PERIODIC_MISSED(args: string[], extra: any) {
    assertArgLen(args, 15, 16, 18) //Need to find exact size, didn't have a log with it

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    // args13-17 (or only 14/15 depending on size)
    let missedSuffixProperties = extractMissedSuffixProperties(args, 13)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_PERIODIC_MISSED" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        // args2-17
        ...baseUnitProperties,
        ...spellPrefixProperties,
        ...missedSuffixProperties,
    }
}
function SPELL_RESURRECT(args: string[], extra: any) {
    assertArgLen(args, 13)

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_RESURRECT" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        ...baseUnitProperties,
        ...spellPrefixProperties,

    }
}
function SPELL_SUMMON(args: string[], extra: any) {
    assertArgLen(args, 13)

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_SUMMON" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        ...baseUnitProperties,
        ...spellPrefixProperties,

    }
}
function SPELL_STOLEN(args: string[], extra: any) {
    assertArgLen(args, 17)

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_STOLEN" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        ...baseUnitProperties,
        ...spellPrefixProperties,

        extraSpellId: args[13],
        extraSpellName: args[14],
        extraSchool: args[15],
        auraType: args[16],

    }
}
function SWING_DAMAGE_LANDED(args: string[], extra: any) {
    assertArgLen(args, 37)
    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-26
    let advancedUnitProperties = extractAdvancedUnitProperties(args, 10)
    // args27-36
    let damageSuffixProperties = extractDamageSuffixProperties(args, 27)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SWING_DAMAGE_LANDED" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        // args2-36
        ...baseUnitProperties,
        ...advancedUnitProperties,
        ...damageSuffixProperties,
    }
}
function SWING_DAMAGE(args: string[], extra: any) {
    assertArgLen(args, 37)
    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-26
    let advancedUnitProperties = extractAdvancedUnitProperties(args, 10)
    // args27-36
    let damageSuffixProperties = extractDamageSuffixProperties(args, 27)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SWING_DAMAGE" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        // args2-36
        ...baseUnitProperties,
        ...advancedUnitProperties,
        ...damageSuffixProperties,
    }
}
function SWING_MISSED(args: string[], extra: any) {
    assertArgLen(args, 12, 13, 15) //Need to find exact size, didn't have a log with it

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-14 (or only 11/12 depending on size)
    let missedSuffixProperties = extractMissedSuffixProperties(args, 10)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SWING_MISSED" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        // args2-14
        ...baseUnitProperties,
        ...missedSuffixProperties,
    }
}
function UNIT_DESTROYED(args: string[], extra: any) {
    assertArgLen(args, 11)

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "UNIT_DESTROYED" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        // args2-9
        ...baseUnitProperties,

        // Unclear exactly what this arg is, there's something
        // about "unconsciousOnDeath"
        recapId: args[10]
    }
}
function UNIT_DIED(args: string[], extra: any) {
    assertArgLen(args, 11)

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "UNIT_DIED" as const,
        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        // args2-9
        ...baseUnitProperties,

        // Unclear exactly what this arg is, there's something
        // about "unconsciousOnDeath"
        recapId: args[10]
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
function WORLD_MARKER_REMOVED(args: string[], extra: any) {
    assertArgLen(args, 3)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "WORLD_MARKER_REMOVED" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,
        marker: args[2]
    }
}
function ZONE_CHANGE(args: string[], extra: any) {
    assertArgLen(args, 5)

    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "ZONE_CHANGE" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,
        instanceId: args[2],
        zoneName: args[3],
        difficultyId: args[4],
    }
}
function SPELL_EMPOWER_START(args: string[], extra: any) {
    assertArgLen(args, 13)

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_EMPOWER_START" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        ...baseUnitProperties,
        ...spellPrefixProperties,

    }
}
function SPELL_EMPOWER_END(args: string[], extra: any) {
    assertArgLen(args, 14)

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_EMPOWER_END" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        ...baseUnitProperties,
        ...spellPrefixProperties,
        // Suffix
        numChargesSpent: args[13] //Maybe? Idk tbh, just guessing at this point

    }
}
function SPELL_EMPOWER_INTERRUPT(args: string[], extra: any) {
    assertArgLen(args, 14)

    // args2-9
    let baseUnitProperties = extractBaseUnitProperties(args, 2)
    // args10-12
    let spellPrefixProperties = extractSpellPrefixProperties(args, 10)
    return {
        // This 'as const' is the magic keyword that makes
        // discrimination work later. 
        event: "SPELL_EMPOWER_INTERRUPT" as const,

        date: args[0],
        timestamp: `${extra.encounterTimeMs}`,

        ...baseUnitProperties,
        ...spellPrefixProperties,
        // Suffix
        failedType: args[13] //Maybe? Idk tbh, just guessing at this point

    }
}
