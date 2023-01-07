import { mapCombatantInfoArgs } from './combatant-info-mapper'
import { eventMapperContext } from './event-mapper-context'
import { LineArgs, ParserError, ParserErrors } from './log-parser'
import { PowerType, baseEvent, baseUnitEvent, missedEvent, advancedUnitEvent, damageSuffixEvent, spellPrefixEvent, EnergizeSuffixEvent, HealSuffixEvent, baseDeathEvent } from './event-mapper-types'

const CUSTOM_EVENTS = {
    C_DAMAGE_SPLIT: "SPELL_DAMAGE_SPLIT_C",
    C_DAMAGE_SHIELD: "SPELL_DAMAGE_SHIELD_C",
    C_DAMAGE_SHIELD_MISSED: "SPELL_DAMAGE_SHIELD_MISSED_C",
}

const baseUnitTypes = [
    "DAMAGE_SHIELD_MISSED",
    "ENCHANT_APPLIED",
    "ENCHANT_REMOVED",
    "RANGE_MISSED",
    "SPELL_ABSORBED",
    "SPELL_AURA_APPLIED_DOSE",
    "SPELL_AURA_APPLIED",
    "SPELL_AURA_BROKEN_SPELL",
    "SPELL_AURA_BROKEN",
    "SPELL_AURA_REFRESH",
    "SPELL_AURA_REMOVED_DOSE",
    "SPELL_AURA_REMOVED",
    "SPELL_CREATE",
    "SPELL_CAST_START",
    "SPELL_DISPEL",
    "SPELL_EXTRA_ATTACKS",
    "SPELL_HEAL_ABSORBED",
    "SPELL_INTERRUPT",
    "SPELL_MISSED",
    "SPELL_PERIODIC_MISSED",
    "SPELL_RESURRECT",
    "SPELL_SUMMON",
    "SPELL_STOLEN",
    "SWING_MISSED",
    "SPELL_EMPOWER_START",
    "SPELL_EMPOWER_END",
    "SPELL_EMPOWER_INTERRUPT",
]

const advancedUnitTypes = [
    "DAMAGE_SPLIT",
    "DAMAGE_SHIELD",
    "ENVIRONMENTAL_DAMAGE",
    "RANGE_DAMAGE",
    "SPELL_CAST_SUCCESS",
    "SPELL_DAMAGE",
    "SPELL_LEECH",
    "SPELL_ENERGIZE",
    "SPELL_HEAL",
    "SPELL_PERIODIC_DAMAGE",
    "SPELL_PERIODIC_ENERGIZE",
    "SPELL_PERIODIC_HEAL",
    "SWING_DAMAGE_LANDED",
    "SWING_DAMAGE",
]

const damageSuffixTypes = [
    "DAMAGE_SPLIT",
    "DAMAGE_SHIELD",
    "ENVIRONMENTAL_DAMAGE",
    "RANGE_DAMAGE",
    "SPELL_ABSORBED",
    "SPELL_DAMAGE",
    "SPELL_PERIODIC_DAMAGE",
    "SWING_DAMAGE_LANDED",
    "SWING_DAMAGE",
]

const missedSuffixTypes = [
    "DAMAGE_SHIELD_MISSED",
    "RANGE_MISSED",
    "SPELL_MISSED",
    "SPELL_PERIODIC_MISSED",
    "SWING_MISSED",
]

const spellPrefixTypes = [
    "DAMAGE_SPLIT",
    "DAMAGE_SHIELD",
    "DAMAGE_SHIELD_MISSED",
    "RANGE_DAMAGE",
    "RANGE_MISSED",
    "SPELL_AURA_APPLIED_DOSE",
    "SPELL_AURA_APPLIED",
    "SPELL_AURA_BROKEN_SPELL",
    "SPELL_AURA_BROKEN",
    "SPELL_AURA_REFRESH",
    "SPELL_AURA_REMOVED_DOSE",
    "SPELL_AURA_REMOVED",
    "SPELL_CREATE",
    "SPELL_CAST_START",
    "SPELL_CAST_SUCCESS",
    "SPELL_DAMAGE",
    "SPELL_DRAIN",
    "SPELL_LEECH",
    "SPELL_DISPEL",
    "SPELL_ENERGIZE",
    "SPELL_EXTRA_ATTACKS",
    "SPELL_HEAL_ABSORBED",
    "SPELL_HEAL",
    "SPELL_INSTAKILL",
    "SPELL_INTERRUPT",
    "SPELL_MISSED",
    "SPELL_PERIODIC_DAMAGE",
    "SPELL_PERIODIC_ENERGIZE",
    "SPELL_PERIODIC_HEAL",
    "SPELL_PERIODIC_MISSED",
    "SPELL_RESURRECT",
    "SPELL_SUMMON",
    "SPELL_STOLEN",
    "SPELL_EMPOWER_START",
    "SPELL_EMPOWER_END",
    "SPELL_EMPOWER_INTERRUPT",
]

const energizeSuffixTypes = [
    "SPELL_ENERGIZE",
    "SPELL_PERIODIC_ENERGIZE",
]

const healSuffixTypes = [
    "SPELL_HEAL",
    "SPELL_PERIODIC_HEAL",
]

const baseDeathTypes = [
    "PARTY_KILL",
    "SPELL_INSTAKILL",
    "UNIT_DESTROYED",
    "UNIT_DIED",
]

type Event =
    | CombatLogVersion | CombatantInfo | DamageSplit
    | DamageShield | DamageShieldMissed | Emote
    | EncounterEnd | EncounterStart | EnvironmentalDamage
    | EnchantApplied | EnchantRemoved | MapChange | PartyKill
    | RangeDamage | RangeMissed | SpellAbsorbed
    | SpellAuraAppliedDose | SpellAuraApplied | SpellAuraBrokenSpell
    | SpellAuraBroken | SpellAuraRefresh | SpellAuraRemovedDose
    | SpellAuraRemoved | SpellCreate | SpellCastFailed | SpellCastStart
    | SpellCastSuccess | SpellDamage | SpellDrain | SpellLeech
    | SpellDispel | SpellEnergize | SpellExtraAttacks | SpellHealAbsorbed
    | SpellHeal | SpellInstakill | SpellInterrupt | SpellMissed
    | SpellPeriodicDamage | SpellPeriodicEnergize | SpellPeriodicHeal
    | SpellPeriodicMissed | SpellResurrect | SpellSummon | SpellStolen
    | SwingDamageLanded | SwingDamage | SwingMissed | UnitDestroyed
    | UnitDied | WorldMarkerPlaced | WorldMarkerRemoved | ZoneChange
    | SpellEmpowerStart | SpellEmpowerEnd | SpellEmpowerInterrupt

type CombatLogVersion = baseEvent & {
    event: "COMBAT_LOG_VERSION"
    combatLogVersionKey: string
    combatLogVersionValue: number
    advancedCombatLogEnabledKey: string
    advancedCombatLogEnabledValue: number
    buildVersionKey: string
    buildVersionValue: number
    projectIdKey: string
    projectIdValue: number
}

// Cba fixing for now, it's filtered
type CombatantInfo = baseEvent & {
    event: "COMBATANT_INFO"
};
type DamageSplit = advancedUnitEvent & spellPrefixEvent & damageSuffixEvent & {
    event: "DAMAGE_SPLIT"
};
type DamageShield = advancedUnitEvent & spellPrefixEvent & damageSuffixEvent & {
    event: "DAMAGE_SHIELD"
};
type DamageShieldMissed = baseUnitEvent & spellPrefixEvent & missedEvent & {
    event: "DAMAGE_SHIELD_MISSED"
};
// Filtered
type Emote = baseEvent & {
    event: "EMOTE"
};
type EncounterEnd = baseEvent & {
    event: "ENCOUNTER_END"
    encounterId: number
    encounterName: string
    difficultyId: number
    groupSize: number
    success: number
    fightTimeMs: number
};
type EncounterStart = baseEvent & {
    event: "ENCOUNTER_START"
    encounterId: number
    encounterName: string
    difficultyId: number
    groupSize: number
    instanceId: number
};
type EnvironmentalDamage = advancedUnitEvent & damageSuffixEvent & {
    event: "ENVIRONMENTAL_DAMAGE"
    environmentalType: string
};
type EnchantApplied = baseUnitEvent & {
    event: "ENCHANT_APPLIED"
    spellName: string
    itemId: number
    itemName: string
};
type EnchantRemoved = baseUnitEvent & {
    event: "ENCHANT_REMOVED"
    spellName: string
    itemId: number
    itemName: string
};
type MapChange = baseEvent & {
    event: "MAP_CHANGE"
    uiMapId: number
    uiMapName: string
    x0: number
    x1: number
    y0: number
    y1: number
};
type PartyKill = baseDeathEvent & {
    event: "PARTY_KILL"
};
type RangeDamage = advancedUnitEvent & spellPrefixEvent & damageSuffixEvent & {
    event: "RANGE_DAMAGE"
};
type RangeMissed = baseUnitEvent & spellPrefixEvent & missedEvent & {
    event: "RANGE_MISSED"
};

type SpellAbsorbed = baseUnitEvent & {
    event: "SPELL_ABSORBED"
    spellId?: number
    spellName?: string
    spellSchool?: number
    casterGuid: string,
    casterName: string,
    casterFlags: number,
    casterRaidFlags: number,
    absorbSpellId: number,
    absorbSpellName: string,
    absorbSpellSchool: number,
    absorbAmount: number,
    damageAmount: number,
    critical: number,
};
type SpellAuraAppliedDose = baseUnitEvent & spellPrefixEvent & {
    event: "SPELL_AURA_APPLIED_DOSE"
    auraType: string
    amount?: number
};
type SpellAuraApplied = baseUnitEvent & spellPrefixEvent & {
    event: "SPELL_AURA_APPLIED"
    auraType: string
    amount?: number
};
type SpellAuraBrokenSpell = baseUnitEvent & spellPrefixEvent & {
    event: "SPELL_AURA_BROKEN_SPELL"
    extraSpellId: number
    extraSpellName: string
    extraSchool: number
    auraType: string
};
type SpellAuraBroken = baseUnitEvent & spellPrefixEvent & {
    event: "SPELL_AURA_BROKEN"
    auraType: string
};
type SpellAuraRefresh = baseUnitEvent & spellPrefixEvent & {
    event: "SPELL_AURA_REFRESH"
    auraType: string
    amount?: number
};
type SpellAuraRemovedDose = baseUnitEvent & spellPrefixEvent & {
    event: "SPELL_AURA_REMOVED_DOSE"
    auraType: string
    amount?: number
};
type SpellAuraRemoved = baseUnitEvent & spellPrefixEvent & {
    event: "SPELL_AURA_REMOVED"
    auraType: string
    amount?: number
};
type SpellCreate = baseUnitEvent & spellPrefixEvent & {
    event: "SPELL_CREATE"
};
// Seems to be self-only, so filtered for now
type SpellCastFailed = baseEvent & {
    event: "SPELL_CAST_FAILED"
};
type SpellCastStart = baseUnitEvent & spellPrefixEvent & {
    event: "SPELL_CAST_START"
};
type SpellCastSuccess = advancedUnitEvent & spellPrefixEvent & {
    event: "SPELL_CAST_SUCCESS"
};
type SpellDamage = advancedUnitEvent & spellPrefixEvent & damageSuffixEvent & {
    event: "SPELL_DAMAGE"
};
type SpellDrain = advancedUnitEvent & spellPrefixEvent & {
    event: "SPELL_DRAIN"
    amount: number
    extraPowerType: PowerType
    extraAmount: number
    extraMaxPower?: number //Assumption on wowpedia
};
type SpellLeech = advancedUnitEvent & spellPrefixEvent & {
    event: "SPELL_LEECH"
    amount: number
    extraPowerType: PowerType
    extraAmount: number
};
type SpellDispel = baseUnitEvent & spellPrefixEvent & {
    event: "SPELL_DISPEL"
    extraSpellId: number
    extraSpellName: string
    extraSchool: number
    auraType: string
};
type SpellEnergize = advancedUnitEvent & spellPrefixEvent & EnergizeSuffixEvent & {
    event: "SPELL_ENERGIZE"
};
type SpellExtraAttacks = baseUnitEvent & spellPrefixEvent & {
    event: "SPELL_EXTRA_ATTACKS"
    amount: number
};
type SpellHealAbsorbed = baseUnitEvent & spellPrefixEvent & {
    event: "SPELL_HEAL_ABSORBED"
    caserGuid: string
    casterName: string
    casterFlags: number
    casterRaidFlags: number
    absorbSpellId: number
    absorbSpellName: string
    absorbSpellSchool: number
    amount: number
    baseAmount: number
};
type SpellHeal = advancedUnitEvent & spellPrefixEvent & HealSuffixEvent & {
    event: "SPELL_HEAL"
};
type SpellInstakill = baseDeathEvent & spellPrefixEvent & {
    event: "SPELL_INSTAKILL"
};
type SpellInterrupt = baseUnitEvent & spellPrefixEvent & {
    event: "SPELL_INTERRUPT"
    extraSpellId: number
    extraSpellName: string
    extraSchool: number
};
type SpellMissed = baseUnitEvent & spellPrefixEvent & missedEvent & {
    event: "SPELL_MISSED"
};
type SpellPeriodicDamage = advancedUnitEvent & spellPrefixEvent & damageSuffixEvent & {
    event: "SPELL_PERIODIC_DAMAGE"
};
type SpellPeriodicEnergize = advancedUnitEvent & spellPrefixEvent & EnergizeSuffixEvent & {
    event: "SPELL_PERIODIC_ENERGIZE"
};
type SpellPeriodicHeal = advancedUnitEvent & spellPrefixEvent & HealSuffixEvent & {
    event: "SPELL_PERIODIC_HEAL"
};
type SpellPeriodicMissed = baseUnitEvent & spellPrefixEvent & missedEvent & {
    event: "SPELL_PERIODIC_MISSED"
};
type SpellResurrect = baseUnitEvent & spellPrefixEvent & {
    event: "SPELL_RESURRECT"
};
type SpellSummon = baseUnitEvent & spellPrefixEvent & {
    event: "SPELL_SUMMON"
};
type SpellStolen = baseUnitEvent & spellPrefixEvent & {
    event: "SPELL_STOLEN"
    extraSpellId: number
    extraSpellName: string
    extraSchool: number
    auraType: string
};
type SwingDamageLanded = advancedUnitEvent & damageSuffixEvent & {
    event: "SWING_DAMAGE_LANDED"
};
type SwingDamage = advancedUnitEvent & damageSuffixEvent & {
    event: "SWING_DAMAGE"
};
type SwingMissed = baseUnitEvent & missedEvent & {
    event: "SWING_MISSED"
};
type UnitDestroyed = baseDeathEvent & {
    event: "UNIT_DESTROYED"
};
type UnitDied = baseDeathEvent & {
    event: "UNIT_DIED"
};
type WorldMarkerPlaced = baseEvent & {
    event: "WORLD_MARKER_PLACED"
    instanceId: number
    marker: number
    x: number
    y: number
};
type WorldMarkerRemoved = baseEvent & {
    event: "WORLD_MARKER_REMOVED"
    marker: number
};
type ZoneChange = baseEvent & {
    event: "ZONE_CHANGE"
    instanceId: number
    zoneName: string
    difficultyId: number
};
type SpellEmpowerStart = baseUnitEvent & spellPrefixEvent & {
    event: "SPELL_EMPOWER_START"
};
type SpellEmpowerEnd = baseUnitEvent & spellPrefixEvent & {
    event: "SPELL_EMPOWER_END"
    chargesSpent: number //Still guessing here
};
type SpellEmpowerInterrupt = baseUnitEvent & spellPrefixEvent & {
    event: "SPELL_EMPOWER_INTERRUPT"
    failedType: string //Still guessing here
};



export const EVENTS = {
    COMBAT_LOG_VERSION: "COMBAT_LOG_VERSION",
    COMBATANT_INFO: "COMBATANT_INFO",
    DAMAGE_SPLIT: "DAMAGE_SPLIT",
    DAMAGE_SHIELD: "DAMAGE_SHIELD",
    DAMAGE_SHIELD_MISSED: "DAMAGE_SHIELD_MISSED",
    EMOTE: "EMOTE",
    ENCOUNTER_END: "ENCOUNTER_END",
    ENCOUNTER_START: "ENCOUNTER_START",
    ENVIRONMENTAL_DAMAGE: "ENVIRONMENTAL_DAMAGE",
    ENCHANT_APPLIED: "ENCHANT_APPLIED",
    ENCHANT_REMOVED: "ENCHANT_REMOVED",
    MAP_CHANGE: "MAP_CHANGE",
    PARTY_KILL: "PARTY_KILL",
    RANGE_DAMAGE: "RANGE_DAMAGE",
    RANGE_MISSED: "RANGE_MISSED",
    SPELL_ABSORBED: "SPELL_ABSORBED",
    SPELL_AURA_APPLIED_DOSE: "SPELL_AURA_APPLIED_DOSE",
    SPELL_AURA_APPLIED: "SPELL_AURA_APPLIED",
    SPELL_AURA_BROKEN_SPELL: "SPELL_AURA_BROKEN_SPELL",
    SPELL_AURA_BROKEN: "SPELL_AURA_BROKEN",
    SPELL_AURA_REFRESH: "SPELL_AURA_REFRESH",
    SPELL_AURA_REMOVED_DOSE: "SPELL_AURA_REMOVED_DOSE",
    SPELL_AURA_REMOVED: "SPELL_AURA_REMOVED",
    SPELL_CREATE: "SPELL_CREATE",
    SPELL_CAST_FAILED: "SPELL_CAST_FAILED",
    SPELL_CAST_START: "SPELL_CAST_START",
    SPELL_CAST_SUCCESS: "SPELL_CAST_SUCCESS",
    SPELL_DAMAGE: "SPELL_DAMAGE",
    SPELL_DRAIN: "SPELL_DRAIN",
    SPELL_LEECH: "SPELL_LEECH",
    SPELL_DISPEL: "SPELL_DISPEL",
    SPELL_ENERGIZE: "SPELL_ENERGIZE",
    SPELL_EXTRA_ATTACKS: "SPELL_EXTRA_ATTACKS",
    SPELL_HEAL_ABSORBED: "SPELL_HEAL_ABSORBED",
    SPELL_HEAL: "SPELL_HEAL",
    SPELL_INSTAKILL: "SPELL_INSTAKILL",
    SPELL_INTERRUPT: "SPELL_INTERRUPT",
    SPELL_MISSED: "SPELL_MISSED",
    SPELL_PERIODIC_DAMAGE: "SPELL_PERIODIC_DAMAGE",
    SPELL_PERIODIC_ENERGIZE: "SPELL_PERIODIC_ENERGIZE",
    SPELL_PERIODIC_HEAL: "SPELL_PERIODIC_HEAL",
    SPELL_PERIODIC_MISSED: "SPELL_PERIODIC_MISSED",
    SPELL_RESURRECT: "SPELL_RESURRECT",
    SPELL_SUMMON: "SPELL_SUMMON",
    SPELL_STOLEN: "SPELL_STOLEN",
    SWING_DAMAGE_LANDED: "SWING_DAMAGE_LANDED",
    SWING_DAMAGE: "SWING_DAMAGE",
    SWING_MISSED: "SWING_MISSED",
    UNIT_DESTROYED: "UNIT_DESTROYED",
    UNIT_DIED: "UNIT_DIED",
    WORLD_MARKER_PLACED: "WORLD_MARKER_PLACED",
    WORLD_MARKER_REMOVED: "WORLD_MARKER_REMOVED",
    ZONE_CHANGE: "ZONE_CHANGE",
    SPELL_EMPOWER_START: "SPELL_EMPOWER_START",
    SPELL_EMPOWER_END: "SPELL_EMPOWER_END",
    SPELL_EMPOWER_INTERRUPT: "SPELL_EMPOWER_INTERRUPT",
}

export type EventLine = {
    date: string
    timestamp: string
    event: string
    [arg: string]: any
}

export class EventMapper {

    public filteredMap(lineArgs: LineArgs): EventLine | undefined {
        if (anyOf(lineArgs.event,
            EVENTS.EMOTE,
            EVENTS.SPELL_CAST_FAILED,
            EVENTS.COMBATANT_INFO,
        )) {
            return undefined
        }

        return this.map(lineArgs)
    }

    public map(lineArgs: LineArgs): Event {

        // TODO: This has to be cleared before we exit from here, but
        // we've got 4 million return statements...
        eventMapperContext.setLineArgs(lineArgs)

        let event = lineArgs.event
        let data: Event

        const args = [
            lineArgs.dateTime,
            lineArgs.event,
            ...lineArgs.args
        ]


        let baseUnitEvent: baseUnitEvent;
        let advancedUnitEvent: advancedUnitEvent;
        let baseDeathEvent: baseDeathEvent;
        let missedEvent: missedEvent;
        let damageSuffixEvent: damageSuffixEvent;
        let spellPrefixEvent: spellPrefixEvent;
        let EnergizeSuffixEvent: EnergizeSuffixEvent;
        let HealSuffixEvent: HealSuffixEvent;
        var baseEvent: baseEvent = {
            date: args[0],
            timestamp: `${lineArgs.encounterTimeMs}`
        }

        if (anyOf(event, ...baseUnitTypes) || anyOf(event, ...advancedUnitTypes) || anyOf(event, ...baseDeathTypes)) {
            baseUnitEvent = {
                ...baseEvent,
                sourceGuid: args[2],
                sourceName: args[3],
                sourceFlags: Number(args[4]),
                sourceRaidFlags: Number(args[5]),
                destGuid: args[6],
                destName: args[7],
                destFlags: Number(args[8]),
                destRaidFlags: Number(args[9]),
            }
            if (anyOf(event, ...advancedUnitTypes)) {
                advancedUnitEvent = {
                    ...baseUnitEvent,
                    infoGuid: args[13],
                    ownerGuid: args[14],
                    currentHp: Number(args[15]),
                    maxHp: Number(args[16]),
                    attackPower: Number(args[17]),
                    spellPower: Number(args[18]),
                    armor: Number(args[19]),
                    absorb: Number(args[20]),
                    powerType: Number(args[21]),
                    currentPower: Number(args[22]),
                    maxPower: Number(args[23]),
                    powerCost: Number(args[24]),
                    positionX: Number(args[25]),
                    positionY: Number(args[26]),
                    uiMapId: Number(args[27]),
                    facing: Number(args[28]),
                    item_level: Number(args[29]),
                }
            }
            if (anyOf(event, ...baseDeathTypes)) {
                baseDeathEvent = {
                    ...baseUnitEvent,
                    unconsciousOnDeath: Number(args[10]), //Unsure here tbh
                }
            }
        }

        if (anyOf(event, ...missedSuffixTypes)) {
            missedEvent = {
                missType: args[13],
                isOffHand: Number(args[14]),
                amountMissed: Number(args[15]),
                baseAmount: Number(args[16]),
                critical: Number(args[17]),
            }
        }

        if (anyOf(event, ...damageSuffixTypes) && !anyOf(event, ...spellPrefixTypes) && event != EVENTS.SPELL_ABSORBED) {
            //Some events add parameters in the middle of the event, requiring an offset
            let extraOffset = 0 
            if(event == EVENTS.ENVIRONMENTAL_DAMAGE) {
                extraOffset = 1
            }
            damageSuffixEvent = {
                amount: Number(args[27+extraOffset]),
                baseAmount: Number(args[28+extraOffset]),
                overkill: Number(args[29+extraOffset]),
                school: Number(args[30+extraOffset]),
                resisted: assertAlwaysNilOrZero(args, 31+extraOffset),
                blocked: Number(args[32+extraOffset]),
                absorbed: Number(args[33+extraOffset]),
                critical: Number(args[34+extraOffset]), // nil or 1
                glancing: assertAlwaysNilOrZero(args, 35+extraOffset),
                crushing: assertAlwaysNilOrZero(args, 36+extraOffset),
            }
        }
        if (anyOf(event, ...damageSuffixTypes) && anyOf(event, ...spellPrefixTypes)) {
            damageSuffixEvent = {
                amount: Number(args[30]),
                baseAmount: Number(args[31]),
                overkill: Number(args[32]),
                school: Number(args[33]),
                resisted: assertAlwaysNilOrZero(args, 34),
                blocked: Number(args[35]),
                absorbed: Number(args[36]),
                critical: Number(args[37]), // nil or 1
                glancing: assertAlwaysNilOrZero(args, 38),
                crushing: assertAlwaysNilOrZero(args, 39),
            }
        }

        if (anyOf(event, ...spellPrefixTypes)) {
            spellPrefixEvent = {
                spellId: Number(args[10]),
                spellName: args[11],
                spellSchool: Number(args[12]),
            }
        }

        if (anyOf(event, ...energizeSuffixTypes)) {
            EnergizeSuffixEvent = {
                amount: Number(args[30]),
                overEnergize: Number(args[31]),
                powerType: Number(args[32]),
                maxPower: Number(args[33]),
            }
        }

        if (anyOf(event, ...healSuffixTypes)) {
            HealSuffixEvent = {
                amount: Number(args[30]),
                baseAmount: Number(args[31]),
                overheal: Number(args[32]), // 0 or amount
                absorbed: Number(args[33]), // 0 or amount
                critical: Number(args[34]), // nil or 1
            }
        }

        switch (event) {
            case EVENTS.ENCHANT_APPLIED:
                return {
                    ...baseUnitEvent!,
                    spellName: args[10],
                    itemId: Number(args[11]),
                    itemName: args[12],
                    event: "ENCHANT_APPLIED"
                };
            case EVENTS.ENCHANT_REMOVED:
                return {
                    ...baseUnitEvent!,
                    spellName: args[10],
                    itemId: Number(args[11]),
                    itemName: args[12],
                    event: "ENCHANT_REMOVED"
                };
            case EVENTS.COMBAT_LOG_VERSION:
                return {
                    ...baseEvent,
                    event: "COMBAT_LOG_VERSION",
                    combatLogVersionKey: args[1],
                    combatLogVersionValue: Number(args[2]),
                    advancedCombatLogEnabledKey: args[3],
                    advancedCombatLogEnabledValue: Number(args[4]),
                    buildVersionKey: args[5],
                    buildVersionValue: Number(args[6]),
                    projectIdKey: args[7],
                    projectIdValue: Number(args[8]),
                };
            case EVENTS.COMBATANT_INFO:
                // Handle COMBATANT_INFO event
                return {
                    ...baseEvent,
                    event: "COMBATANT_INFO",
                };
            case EVENTS.DAMAGE_SPLIT:
                // Handle DAMAGE_SPLIT event
                return {
                    ...advancedUnitEvent!,
                    ...spellPrefixEvent!,
                    ...damageSuffixEvent!,
                    event: "DAMAGE_SPLIT"
                };
            case EVENTS.DAMAGE_SHIELD:
                // Handle DAMAGE_SHIELD event
                return {
                    ...advancedUnitEvent!,
                    ...spellPrefixEvent!,
                    ...damageSuffixEvent!,
                    event: "DAMAGE_SHIELD"
                };
            case EVENTS.DAMAGE_SHIELD_MISSED:
                // Handle DAMAGE_SHIELD_MISSED event
                return {
                    ...advancedUnitEvent!,
                    ...spellPrefixEvent!,
                    ...missedEvent!,
                    event: "DAMAGE_SHIELD_MISSED"
                };
            case EVENTS.EMOTE:
                // Handle EMOTE event
                return {
                    ...baseEvent,
                    event: "EMOTE"
                };
            case EVENTS.ENCOUNTER_END:
                // Handle ENCOUNTER_END event
                return {
                    ...baseEvent,
                    event: "ENCOUNTER_END",
                    encounterId: Number(args[2]),
                    encounterName: args[3],
                    difficultyId: Number(args[4]),
                    groupSize: Number(args[5]),
                    success: Number(args[6]),
                    fightTimeMs: Number(args[7]),
                };
            case EVENTS.ENCOUNTER_START:
                // Handle ENCOUNTER_START event
                return {
                    ...baseEvent,
                    event: "ENCOUNTER_START",
                    encounterId: Number(args[2]),
                    encounterName: args[3],
                    difficultyId: Number(args[4]),
                    groupSize: Number(args[5]),
                    instanceId: Number(args[6]),
                };
            case EVENTS.ENVIRONMENTAL_DAMAGE:
                // Handle ENVIRONMENTAL_DAMAGE event
                return {
                    ...advancedUnitEvent!,
                    ...damageSuffixEvent!,
                    event: "ENVIRONMENTAL_DAMAGE",
                    environmentalType: args[27],
                };
            case EVENTS.MAP_CHANGE:
                // Handle MAP_CHANGE event
                return {
                    ...baseEvent,
                    event: "MAP_CHANGE",
                    uiMapId: Number(args[2]),
                    uiMapName: args[3],
                    x0: Number(args[4]),
                    x1: Number(args[5]),
                    y0: Number(args[6]),
                    y1: Number(args[7]),
                };
            case EVENTS.PARTY_KILL:
                // Handle PARTY_KILL event
                return {
                    ...baseDeathEvent!,
                    event: "PARTY_KILL"
                };
            case EVENTS.RANGE_DAMAGE:
                // Handle RANGE_DAMAGE event
                return {
                    ...advancedUnitEvent!,
                    ...damageSuffixEvent!,
                    ...spellPrefixEvent!,
                    event: "RANGE_DAMAGE",
                };
            case EVENTS.RANGE_MISSED:
                // Handle RANGE_MISSED event
                return {
                    ...baseUnitEvent!,
                    ...missedEvent!,
                    ...spellPrefixEvent!,
                    event: "RANGE_MISSED",
                };
            case EVENTS.SPELL_ABSORBED:
                // Handle SPELL_ABSORBED event
                let isFromSpell = args[21] != undefined;
                if(isFromSpell) {
                    return {
                        ...baseUnitEvent!,
                        event: "SPELL_ABSORBED",
                        // Extra spell data
                        spellId: Number(args[10]),
                        spellName: args[11],
                        spellSchool: Number(args[12]),

                        // Suffix
                        casterGuid: args[13],
                        casterName: args[14],
                        casterFlags: Number(args[15]),
                        casterRaidFlags: Number(args[16]),
                        absorbSpellId: Number(args[17]),
                        absorbSpellName: args[18],
                        absorbSpellSchool: Number(args[19]),
                        absorbAmount: Number(args[20]),
                        damageAmount: Number(args[21]),
                        critical: Number(args[22]),
                    };
                } else {
                    return { 
                        ...baseUnitEvent!,
                        event: "SPELL_ABSORBED",
                        casterGuid: args[10],
                        casterName: args[11],
                        casterFlags: Number(args[12]),
                        casterRaidFlags: Number(args[13]),
                        absorbSpellId: Number(args[14]),
                        absorbSpellName: args[15],
                        absorbSpellSchool: Number(args[16]),
                        absorbAmount: Number(args[17]),
                        damageAmount: Number(args[18]),
                        critical: Number(args[19]),
                    };
                }
            case EVENTS.SPELL_AURA_APPLIED_DOSE:
                // Handle SPELL_AURA_APPLIED_DOSE event
                return {
                    ...baseUnitEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_AURA_APPLIED_DOSE",
                    auraType: args[13],
                    amount: Number(args[14]),
                };
            case EVENTS.SPELL_AURA_APPLIED:
                // Handle SPELL_AURA_APPLIED event
                return {
                    ...baseUnitEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_AURA_APPLIED",
                    auraType: args[13],
                    amount: Number(args[14]),
                };
            case EVENTS.SPELL_AURA_BROKEN_SPELL:
                // Handle SPELL_AURA_BROKEN_SPELL event
                return {
                    ...baseUnitEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_AURA_BROKEN_SPELL",
                    extraSpellId: Number(args[13]),
                    extraSpellName: args[14],
                    extraSchool: Number(args[15]),
                    auraType: args[16],
                };
            case EVENTS.SPELL_AURA_BROKEN:
                // Handle SPELL_AURA_BROKEN event
                return {
                    ...baseUnitEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_AURA_BROKEN",
                    auraType: args[13],
                };
            case EVENTS.SPELL_AURA_REFRESH:
                // Handle SPELL_AURA_REFRESH event
                return {
                    ...baseUnitEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_AURA_REFRESH",
                    auraType: args[13],
                    amount: Number(args[14]),
                };
            case EVENTS.SPELL_AURA_REMOVED_DOSE:
                // Handle SPELL_AURA_REMOVED_DOSE event
                return {
                    ...baseUnitEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_AURA_REMOVED_DOSE",
                    auraType: args[13],
                    amount: Number(args[14]),
                };
            case EVENTS.SPELL_AURA_REMOVED:
                // Handle SPELL_AURA_REMOVED event
                return {
                    ...baseUnitEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_AURA_REMOVED",
                    auraType: args[13],
                    amount: Number(args[14]),
                };
            case EVENTS.SPELL_CREATE:
                // Handle SPELL_CREATE event
                return {
                    ...baseUnitEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_CREATE",
                };
            case EVENTS.SPELL_CAST_FAILED:
                // Handle SPELL_CAST_FAILED event
                return {
                    ...baseEvent!,
                    event: "SPELL_CAST_FAILED",
                };
            case EVENTS.SPELL_CAST_START:
                // Handle SPELL_CAST_START event
                return {
                    ...baseUnitEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_CAST_START",
                };
            case EVENTS.SPELL_CAST_SUCCESS:
                // Handle SPELL_CAST_SUCCESS event
                return {
                    ...advancedUnitEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_CAST_SUCCESS",
                };
            case EVENTS.SPELL_DAMAGE:
                // Handle SPELL_DAMAGE event
                return {
                    ...advancedUnitEvent!,
                    ...damageSuffixEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_DAMAGE",
                };
            case EVENTS.SPELL_DRAIN:
                // Handle SPELL_DRAIN event
                return {
                    ...advancedUnitEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_DRAIN",
                    amount: Number(args[30]),
                    extraPowerType: Number(args[31]),
                    extraAmount: Number(args[32]),
                    extraMaxPower: Number(args[33]),
                };
            case EVENTS.SPELL_LEECH:
                // Handle SPELL_LEECH event
                return {
                    ...advancedUnitEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_LEECH",
                    amount: Number(args[30]),
                    extraPowerType: Number(args[31]),
                    extraAmount: Number(args[32]),
                };
            case EVENTS.SPELL_DISPEL:
                // Handle SPELL_DISPEL event
                return {
                    ...baseUnitEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_DISPEL",
                    extraSpellId: Number(args[13]),
                    extraSpellName: args[14],
                    extraSchool: Number(args[15]),
                    auraType: args[16],
                };
            case EVENTS.SPELL_ENERGIZE:
                // Handle SPELL_ENERGIZE event
                return {
                    ...advancedUnitEvent!,
                    ...spellPrefixEvent!,
                    ...EnergizeSuffixEvent!,
                    event: "SPELL_ENERGIZE"
                };
            case EVENTS.SPELL_EXTRA_ATTACKS:
                // Handle SPELL_EXTRA_ATTACKS event
                return {
                    ...baseUnitEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_DISPEL",
                    extraSpellId: Number(args[13]),
                    extraSpellName: args[14],
                    extraSchool: Number(args[15]),
                    auraType: args[16],
                };
            case EVENTS.SPELL_HEAL_ABSORBED:
                // Handle SPELL_HEAL_ABSORBED event
                return {
                    ...baseUnitEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_HEAL_ABSORBED",
                    caserGuid: args[13],
                    casterName: args[14],
                    casterFlags: Number(args[15]),
                    casterRaidFlags: Number(args[16]),
                    absorbSpellId: Number(args[17]),
                    absorbSpellName: args[18],
                    absorbSpellSchool: Number(args[19]),
                    amount: Number(args[20]),
                    baseAmount: Number(args[21]),
                };
            case EVENTS.SPELL_HEAL:
                // Handle SPELL_HEAL event
                return {
                    ...advancedUnitEvent!,
                    ...spellPrefixEvent!,
                    ...HealSuffixEvent!,
                    event: "SPELL_HEAL",
                };
            case EVENTS.SPELL_INSTAKILL:
                // Handle SPELL_INSTAKILL event
                return {
                    ...baseDeathEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_INSTAKILL"
                };
            case EVENTS.SPELL_INTERRUPT:
                // Handle SPELL_INTERRUPT event
                return {
                    ...baseUnitEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_INTERRUPT",
                    extraSpellId: Number(args[13]),
                    extraSpellName: args[14],
                    extraSchool: Number(args[15]),
                };
            case EVENTS.SPELL_MISSED:
                // Handle SPELL_MISSED event
                return {
                    ...baseUnitEvent!,
                    ...spellPrefixEvent!,
                    ...missedEvent!,
                    event: "SPELL_MISSED",
                };
            case EVENTS.SPELL_PERIODIC_DAMAGE:
                // Handle SPELL_PERIODIC_DAMAGE event
                return {
                    ...advancedUnitEvent!,
                    ...damageSuffixEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_PERIODIC_DAMAGE",
                };
            case EVENTS.SPELL_PERIODIC_ENERGIZE:
                // Handle SPELL_PERIODIC_ENERGIZE event
                return {
                    ...advancedUnitEvent!,
                    ...EnergizeSuffixEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_PERIODIC_ENERGIZE",
                };
            case EVENTS.SPELL_PERIODIC_HEAL:
                // Handle SPELL_PERIODIC_HEAL event
                return {
                    ...advancedUnitEvent!,
                    ...spellPrefixEvent!,
                    ...HealSuffixEvent!,
                    event: "SPELL_PERIODIC_HEAL",
                };
            case EVENTS.SPELL_PERIODIC_MISSED:
                // Handle SPELL_PERIODIC_MISSED event
                return {
                    ...baseUnitEvent!,
                    ...spellPrefixEvent!,
                    ...missedEvent!,
                    event: "SPELL_PERIODIC_MISSED",
                };
            case EVENTS.SPELL_RESURRECT:
                // Handle SPELL_RESURRECT event
                return {
                    ...baseUnitEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_RESURRECT",
                };
            case EVENTS.SPELL_SUMMON:
                // Handle SPELL_SUMMON event
                return {
                    ...baseUnitEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_SUMMON",
                };
            case EVENTS.SPELL_STOLEN:
                // Handle SPELL_STOLEN event
                return {
                    ...baseUnitEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_STOLEN",
                    extraSpellId: Number(args[13]),
                    extraSpellName: args[14],
                    extraSchool: Number(args[15]),
                    auraType: args[16],
                };
            case EVENTS.SWING_DAMAGE_LANDED:
                // Handle SWING_DAMAGE_LANDED event
                return {
                    ...advancedUnitEvent!,
                    ...damageSuffixEvent!,
                    event: "SWING_DAMAGE_LANDED"
                };
            case EVENTS.SWING_DAMAGE:
                // Handle SWING_DAMAGE event
                return {
                    ...advancedUnitEvent!,
                    ...damageSuffixEvent!,
                    event: "SWING_DAMAGE"
                };
            case EVENTS.SWING_MISSED:
                // Handle SWING_MISSED event
                return {
                    ...baseUnitEvent!,
                    ...missedEvent!,
                    event: "SWING_MISSED"
                };
            case EVENTS.UNIT_DESTROYED:
                // Handle UNIT_DESTROYED event
                return {
                    ...baseDeathEvent!,
                    event: "UNIT_DESTROYED"
                };
            case EVENTS.UNIT_DIED:
                // Handle UNIT_DIED event
                return {
                    ...baseDeathEvent!,
                    event: "UNIT_DIED"
                };
            case EVENTS.WORLD_MARKER_PLACED:
                // Handle WORLD_MARKER_PLACED event
                return {
                    ...baseEvent,
                    event: "WORLD_MARKER_PLACED",
                    instanceId: Number(args[2]),
                    marker: Number(args[3]),
                    x: Number(args[4]),
                    y: Number(args[5]),
                };
            case EVENTS.WORLD_MARKER_REMOVED:
                // Handle WORLD_MARKER_REMOVED event
                return {
                    ...baseEvent,
                    event: "WORLD_MARKER_REMOVED",
                    marker: Number(args[2]),
                };
            case EVENTS.ZONE_CHANGE:
                // Handle ZONE_CHANGE event
                return {
                    ...baseEvent!,
                    event: "ZONE_CHANGE",
                    instanceId: Number(args[2]),
                    zoneName: args[3],
                    difficultyId: Number(args[4]),
                };
            case EVENTS.SPELL_EMPOWER_START:
                return {
                    ...baseUnitEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_EMPOWER_START",
                };
            case EVENTS.SPELL_EMPOWER_END:
                return {
                    ...baseUnitEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_EMPOWER_END",
                    chargesSpent: Number(args[13]),
                };
            case EVENTS.SPELL_EMPOWER_INTERRUPT:
                return {
                    ...baseUnitEvent!,
                    ...spellPrefixEvent!,
                    event: "SPELL_EMPOWER_INTERRUPT",
                    failedType: args[13],
                };
            default:
                throw Error(`Unhandled event, ${args}`);
            
        }
        
    }

}

function anyOf(needle: string, ...haystack: string[]) {
    return haystack.includes(needle)
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

function assertIsExactly(value: string, args: any[], index: number) {
    const arg = args[index]

    if (value !== arg) {
        throw new ParserError({
            code: ParserErrors.INVALID_ARG_VALUE.code,
            message: ParserErrors.INVALID_ARG_VALUE.message(value, arg),
            logLine: args.join(',')
        })
    }

    return arg
}