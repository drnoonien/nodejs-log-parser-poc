import { eventMapperContext } from './event-mapper-context'
import { LineArgs, ParserError, ParserErrors } from './log-parser'

const CUSTOM_EVENTS = {
    C_DAMAGE_SPLIT: "SPELL_DAMAGE_SPLIT_C",
    C_DAMAGE_SHIELD: "SPELL_DAMAGE_SHIELD_C",
    C_DAMAGE_SHIELD_MISSED: "SPELL_DAMAGE_SHIELD_MISSED_C",
}

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
}

export type EventLine = {
    timestamp: string
    event: string
    [arg: string]: string
}

export class EventMapper {

    public map(lineArgs: LineArgs): EventLine {

        // TODO: This has to be cleared before we exit from here, but
        // we've got 4 million return statements...
        eventMapperContext.setLineArgs(lineArgs)

        let event = lineArgs.event
        let data: EventLine

        const args = [
            lineArgs.dateTime,
            lineArgs.event,
            ...lineArgs.args
        ]

        if (anyOf(event, EVENTS.ENCHANT_APPLIED, EVENTS.ENCHANT_REMOVED)) {
            assertArgLen(args, 13)

            return {
                // Base
                timestamp: args[0],
                event: args[1],
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

        if (event == EVENTS.WORLD_MARKER_PLACED) {
            assertArgLen(args, 6)

            return {
                timestamp: args[0],
                event: args[1],
                instanceId: args[2],
                marker: args[3],
                x: args[4],
                y: args[5],
            }
        }

        if (event == EVENTS.WORLD_MARKER_REMOVED) {
            assertArgLen(args, 3)

            return {
                timestamp: args[0],
                event: args[1],
                marker: args[2]
            }
        }

        if (event == EVENTS.COMBATANT_INFO) {
            return {
                timestamp: args[0],
                event: args[1],
                nope: "nope",
            }
        }

        if (event == EVENTS.ENCOUNTER_START) {
            assertArgLen(args, 7)

            return {
                timestamp: args[0],
                event: args[1],
                encounterId: args[2],
                encounterName: args[3],
                difficultyId: args[4],
                groupSize: args[5],
                instanceId: args[6],
            }
        }

        if (event == EVENTS.ENCOUNTER_END) {
            assertArgLen(args, 8)

            return {
                timestamp: args[0],
                event: args[1],
                encounterId: args[2],
                encounterName: args[3],
                difficultyId: args[4],
                groupSize: args[5],
                success: args[6],
                fightTimeMs: args[7],
            }
        }

        if (event == EVENTS.MAP_CHANGE) {
            assertArgLen(args, 8)

            return {
                timestamp: args[0],
                event: args[1],
                uiMapId: args[2],
                uiMapName: args[3],
                x0: args[4],
                x1: args[5],
                y0: args[6],
                y1: args[7],
            }
        }

        if (event == EVENTS.ZONE_CHANGE) {
            assertArgLen(args, 5)

            return {
                timestamp: args[0],
                event: args[1],
                instanceId: args[2],
                zoneName: args[3],
                difficultyId: args[4],
            }
        }

        if (event == EVENTS.COMBAT_LOG_VERSION) {
            assertArgLen(args, 9)

            return {
                timestamp: args[0],
                event: "COMBAT_LOG_VERSION",
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

        if (event == EVENTS.EMOTE) {

            // TODO: You can get commas inline in the text without an escape
            // sequence around it:
            //
            // 8/18
            // 19:35:55.758,EMOTE,Creature-0-3893-2481-14644-183533-00007E7769,"Genesis
            // Relic",0000000000000000,nil,|TInterface\\ICONS\\Spell_Broker_GroundState.BLP:20|t
            // The Relic comes to life as Xy'mox channels into it,
            // emanating Genesis Rings!

            // assertArgLen(args, 7)

            // return {
            //     timestamp: args[0],
            //     event: args[1],
            //     sourceGuid: args[2],
            //     sourceName: args[3],
            //     destGuid: args[4],
            //     destName: args[5],
            //     text: args[6],
            // }

            return {
                timestamp: args[0],
                event: args[1]
            }
        }


        if (anyOf(event, EVENTS.UNIT_DIED, EVENTS.UNIT_DESTROYED, EVENTS.PARTY_KILL)) {
            assertArgLen(args, 11)

            return {
                // Base
                timestamp: args[0],
                event: args[1],
                sourceGuid: args[2],
                sourceName: args[3],
                sourceFlags: args[4],
                sourceRaidFlags: args[5],
                destGuid: args[6],
                destName: args[7],
                destFlags: args[8],
                destRaidFlags: args[9],

                // Unclear exactly what this arg is, there's something
                // about "unconsciousOnDeath"
                recapId: args[10]
            }
        }

        // This is an ugly hack, all these events behave as if they
        // were prefixed with SPELL_, so we'll just do that manually
        // for now. In the future we need to modularize the extractors
        // so we can map freely. 
        if ([
            EVENTS.DAMAGE_SPLIT, EVENTS.DAMAGE_SHIELD, EVENTS.DAMAGE_SHIELD_MISSED
        ].includes(event)) {

            if (EVENTS.DAMAGE_SPLIT == event) {
                event = CUSTOM_EVENTS.C_DAMAGE_SPLIT
            }
            if (EVENTS.DAMAGE_SHIELD == event) {
                event = CUSTOM_EVENTS.C_DAMAGE_SHIELD
            }
            if (EVENTS.DAMAGE_SHIELD_MISSED == event) {
                event = CUSTOM_EVENTS.C_DAMAGE_SHIELD_MISSED
            }

        }

        if (event == EVENTS.ENVIRONMENTAL_DAMAGE) {
            assertArgLen(args, 38)

            return {
                // Base
                timestamp: args[0],
                event: args[1],
                sourceGuid: args[2],
                sourceName: args[3],
                sourceFlags: args[4],
                sourceRaidFlags: args[5],
                destGuid: args[6],
                destName: args[7],
                destFlags: args[8],
                destRaidFlags: args[9],

                // Advanced
                infoGuid: args[10],
                ownerGuid: args[11],
                currentHp: args[12],
                maxHp: args[13],
                attackPower: args[14],
                spellPower: args[15],
                armor: args[16],
                absorb: args[17],
                powerType: args[18],
                currentPower: args[19],
                maxPower: args[20],
                powerCost: args[21],
                positionX: args[22],
                positionY: args[23],
                uiMapId: args[24],
                facing: args[25],
                item_level: args[26],

                // Suffix
                environmentalType: args[27],
                amount: args[28],
                baseAmount: args[29],
                overkill: args[30],
                school: args[31],
                unknown_1: assertAlwaysNilOrZero(args, 32),
                blocked: args[33],
                absorbed: args[34],
                critical: args[35], // nil or 1
                unknown_3: assertAlwaysNilOrZero(args, 36),
                unknown_4: assertAlwaysNilOrZero(args, 37),

            }
        }

        if (event.startsWith("SWING_")) {
            data = {
                // Base
                timestamp: args[0],
                event: args[1],
                sourceGuid: args[2],
                sourceName: args[3],
                sourceFlags: args[4],
                sourceRaidFlags: args[5],
                destGuid: args[6],
                destName: args[7],
                destFlags: args[8],
                destRaidFlags: args[9],
            }

            if (anyOf(event, EVENTS.SWING_DAMAGE, EVENTS.SWING_DAMAGE_LANDED)) {
                assertArgLen(args, 37)

                return {
                    ...data,

                    // Advanced
                    infoGuid: args[10],
                    ownerGuid: args[11],
                    currentHp: args[12],
                    maxHp: args[13],
                    attackPower: args[14],
                    spellPower: args[15],
                    armor: args[16],
                    absorb: args[17],
                    powerType: args[18],
                    currentPower: args[19],
                    maxPower: args[20],
                    powerCost: args[21],
                    positionX: args[22],
                    positionY: args[23],
                    uiMapId: args[24],
                    facing: args[25],
                    item_level: args[26],

                    // Suffix
                    amount: args[27],
                    baseAmount: args[28],
                    overkill: args[29],
                    school: args[30],
                    unknown_1: assertAlwaysNilOrZero(args, 31),
                    blocked: args[32],
                    absorbed: args[33],
                    critical: args[34], // nil or 1
                    unknown_3: assertAlwaysNilOrZero(args, 35),
                    unknown_4: assertAlwaysNilOrZero(args, 36),
                }
            }

            if (event == EVENTS.SWING_MISSED) {
                assertArgLen(args, 12, 13, 15)

                if (args.length == 12) {
                    return {
                        ...data,

                        missType: args[10],
                        isOffHand: args[11],
                    }
                }

                if (args.length == 13) {
                    return {
                        ...data,

                        missType: args[10],
                        isOffHand: args[11],
                        amountMissed: args[12],
                    }
                }

                if (args.length == 15) {
                    return {
                        ...data,

                        missType: args[10],
                        isOffHand: args[11],
                        amountMissed: args[12],
                        baseAmount: args[13],
                        critical: args[14],
                    }
                }

            }

        }

        // Special SPELL_ type, cannot be parsed with the rest of the
        // SPELL_ events, it will be missing the spell info if the
        // absorbed attack wasn't a spell.
        if (event == EVENTS.SPELL_ABSORBED) {
            assertArgLen(args, 20, 23)

            // This relatively new subevent fires in addition to
            // SWING_MISSED / SPELL_MISSED which already have the
            // "ABSORB" missType and same amount.
            //
            // It optionally includes the spell payload if triggered
            // from what would be SPELL_DAMAGE.

            const base = {
                // Base
                timestamp: args[0],
                event: args[1],
                sourceGuid: args[2],
                sourceName: args[3],
                sourceFlags: args[4],
                sourceRaidFlags: args[5],
                destGuid: args[6],
                destName: args[7],
                destFlags: args[8],
                destRaidFlags: args[9],
            }

            if (args.length == 20) {
                return {
                    ...base,

                    // Suffix
                    casterGuid: args[10],
                    casterName: args[11],
                    casterFlags: args[12],
                    casterRaidFlags: args[13],
                    absorbSpellId: args[14],
                    absorbSpellName: args[15],
                    absorbSpellSchool: args[16],
                    absorbAmount: args[17],
                    damageAmount: args[18],
                    critical: args[19], // This refers to the damaging attack that was absorbed 
                }
            }

            if (args.length == 23) {
                return {
                    ...base,

                    // Extra spell data
                    spellId: args[10],
                    spellName: args[11],
                    spellSchool: args[12],

                    // Suffix
                    casterGuid: args[13],
                    casterName: args[14],
                    casterFlags: args[15],
                    casterRaidFlags: args[16],
                    absorbSpellId: args[17],
                    absorbSpellName: args[18],
                    absorbSpellSchool: args[19],
                    absorbAmount: args[20],
                    damageAmount: args[21],
                    critical: args[22], // This refers to the damaging attack that was absorbed 
                }
            }

        }

        if ((
            event.startsWith("SPELL_") || event.startsWith("RANGE_")
        ) && event != EVENTS.SPELL_ABSORBED) {

            data = {
                // Base
                timestamp: args[0],
                event: args[1],
                sourceGuid: args[2],
                sourceName: args[3],
                sourceFlags: args[4],
                sourceRaidFlags: args[5],
                destGuid: args[6],
                destName: args[7],
                destFlags: args[8],
                destRaidFlags: args[9],

                // SPELL_
                spellId: args[10],
                spellName: args[11],
                spellSchool: args[12],
            }

            if (anyOf(event, EVENTS.SPELL_DRAIN, EVENTS.SPELL_LEECH)) {
                assertArgLen(args, 34, 35)

                if (args.length == 34) {
                    return {
                        ...data,

                        // Advanced
                        infoGuid: args[13],
                        ownerGuid: args[14],
                        currentHp: args[15],
                        maxHp: args[16],
                        attackPower: args[17],
                        spellPower: args[18],
                        armor: args[19],
                        absorb: args[20],
                        powerType: args[21],
                        currentPower: args[22],
                        maxPower: args[23],
                        powerCost: args[24],
                        positionX: args[25],
                        positionY: args[26],
                        uiMapId: args[27],
                        facing: args[28],
                        item_level: args[29],

                        // Suffix
                        amount: args[30],
                        extraPowerType: args[31],
                        extraAmount: args[32],
                    }
                }

                if (args.length == 35) {
                    return {
                        ...data,

                        // Advanced
                        infoGuid: args[13],
                        ownerGuid: args[14],
                        currentHp: args[15],
                        maxHp: args[16],
                        attackPower: args[17],
                        spellPower: args[18],
                        armor: args[19],
                        absorb: args[20],
                        powerType: args[21],
                        currentPower: args[22],
                        maxPower: args[23],
                        powerCost: args[24],
                        positionX: args[25],
                        positionY: args[26],
                        uiMapId: args[27],
                        facing: args[28],
                        item_level: args[29],

                        // Suffix
                        amount: args[30],
                        extraPowerType: args[31],
                        extraAmount: args[32],
                        extraMaxPower: args[33],
                    }
                }

            }

            if (event == EVENTS.SPELL_INTERRUPT) {
                assertArgLen(args, 16)

                return {
                    ...data,

                    // Suffix
                    extraSpellId: args[13],
                    extraSpellName: args[14],
                    extraSchool: args[15],
                }
            }

            if (event == EVENTS.SPELL_AURA_BROKEN) {
                assertArgLen(args, 14)

                return {
                    ...data,

                    // Suffix
                    auraType: args[13],
                }
            }

            if (anyOf(event, EVENTS.SPELL_DISPEL, EVENTS.SPELL_AURA_BROKEN_SPELL, EVENTS.SPELL_STOLEN)) {
                assertArgLen(args, 17)

                return {
                    ...data,

                    // Suffix
                    extraSpellId: args[13],
                    extraSpellName: args[14],
                    extraSchool: args[15],
                    auraType: args[16],
                }
            }

            if (anyOf(event, EVENTS.SPELL_RESURRECT, EVENTS.SPELL_CREATE)) {
                assertArgLen(args, 13)
                return data
            }

            if (event == EVENTS.SPELL_INSTAKILL) {
                assertArgLen(args, 14)

                return {
                    ...data,

                    // Unclear exactly what this arg is, there's something
                    // about "unconsciousOnDeath"
                    recapId: args[13]
                }
            }

            if (event == EVENTS.SPELL_EXTRA_ATTACKS) {
                assertArgLen(args, 14)

                return {
                    ...data,

                    amount: args[13]
                }
            }

            if (anyOf(event,
                EVENTS.SPELL_MISSED,
                EVENTS.RANGE_MISSED,
                EVENTS.SPELL_PERIODIC_MISSED,
                CUSTOM_EVENTS.C_DAMAGE_SHIELD_MISSED)
            ) {
                assertArgLen(args, 15, 16, 18)

                if (args.length == 15) {
                    return {
                        ...data,

                        missType: args[13],
                        isOffHand: args[14],
                    }
                }

                if (args.length == 16) {
                    return {
                        ...data,

                        missType: args[13],
                        isOffHand: args[14],
                        amountMissed: args[15]
                    }
                }

                if (args.length == 18) {
                    return {
                        ...data,

                        missType: args[13],
                        isOffHand: args[14],
                        amountMissed: args[15],
                        baseAmount: args[16],
                        critical: args[17],
                    }
                }
            }

            if (anyOf(event, EVENTS.SPELL_ENERGIZE, EVENTS.SPELL_PERIODIC_ENERGIZE)) {
                assertArgLen(args, 34)

                return {
                    ...data,

                    // Advanced
                    infoGuid: args[13],
                    ownerGuid: args[14],
                    currentHp: args[15],
                    maxHp: args[16],
                    attackPower: args[17],
                    spellPower: args[18],
                    armor: args[19],
                    absorb: args[20],
                    powerType: args[21],
                    currentPower: args[22],
                    maxPower: args[23],
                    powerCost: args[24],
                    positionX: args[25],
                    positionY: args[26],
                    uiMapId: args[27],
                    facing: args[28],
                    item_level: args[29],

                    // Suffix
                    amount: args[30],
                    overEnergize: args[31],
                    _powerType: args[32],
                    _maxPower: args[33]
                }
            }

            if ([EVENTS.SPELL_HEAL, EVENTS.SPELL_PERIODIC_HEAL].includes(event)) {
                assertArgLen(args, 35)

                return {
                    ...data,

                    // Advanced
                    infoGuid: args[13],
                    ownerGuid: args[14],
                    currentHp: args[15],
                    maxHp: args[16],
                    attackPower: args[17],
                    spellPower: args[18],
                    armor: args[19],
                    absorb: args[20],
                    powerType: args[21],
                    currentPower: args[22],
                    maxPower: args[23],
                    powerCost: args[24],
                    positionX: args[25],
                    positionY: args[26],
                    uiMapId: args[27],
                    facing: args[28],
                    item_level: args[29],

                    // Suffix
                    amount: args[30],
                    baseAmount: args[31],
                    overheal: args[32], // 0 or amount
                    absorbed: args[33], // 0 or amount
                    critical: args[34], // nil or 1
                }
            }

            if (event == EVENTS.SPELL_HEAL_ABSORBED) {
                assertArgLen(args, 22)

                return {
                    ...data,

                    caserGuid: args[13],
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

            if (event == EVENTS.SPELL_CAST_SUCCESS) {
                assertArgLen(args, 30)

                return {
                    ...data,

                    // Advanced
                    infoGuid: args[13],
                    ownerGuid: args[14],
                    currentHp: args[15],
                    maxHp: args[16],
                    attackPower: args[17],
                    spellPower: args[18],
                    armor: args[19],
                    absorb: args[20],
                    powerType: args[21],
                    currentPower: args[22],
                    maxPower: args[23],
                    powerCost: args[24],
                    positionX: args[25],
                    positionY: args[26],
                    uiMapId: args[27],
                    facing: args[28],
                    item_level: args[29],
                }
            }

            // This seems to only trigger for the player recording the log
            if (event == EVENTS.SPELL_CAST_FAILED) {
                assertArgLen(args, 14)

                return {
                    ...data,

                    // Suffix
                    failedType: args[13]
                }
            }

            if ([EVENTS.SPELL_CAST_START, EVENTS.SPELL_SUMMON].includes(event)) {
                assertArgLen(args, 13)
                return data
            }

            if ([
                EVENTS.SPELL_DAMAGE, EVENTS.SPELL_PERIODIC_DAMAGE, EVENTS.RANGE_DAMAGE,
                CUSTOM_EVENTS.C_DAMAGE_SPLIT, CUSTOM_EVENTS.C_DAMAGE_SHIELD
            ].includes(event)) {
                assertArgLen(args, 40)

                return {
                    ...data,

                    // Advanced
                    infoGuid: args[13],
                    ownerGuid: args[14],
                    currentHp: args[15],
                    maxHp: args[16],
                    attackPower: args[17],
                    spellPower: args[18],
                    armor: args[19],
                    absorb: args[20],
                    powerType: args[21],
                    currentPower: args[22],
                    maxPower: args[23],
                    powerCost: args[24],
                    positionX: args[25],
                    positionY: args[26],
                    uiMapId: args[27],
                    facing: args[28],
                    item_level: args[29],

                    // Suffix
                    amount: args[30],
                    baseAmount: args[31],
                    overkill: args[32], // -1 or the overkill value
                    school: args[33],
                    unknown_1: assertAlwaysNilOrZero(args, 34),
                    blocked: args[35],
                    absorbed: args[36], // 0 or above
                    critical: args[37], // nil or 1
                    unknown_3: assertAlwaysNilOrZero(args, 38),
                    unknown_4: assertAlwaysNilOrZero(args, 39),
                }
            }

            if ([EVENTS.SPELL_AURA_APPLIED, EVENTS.SPELL_AURA_REMOVED, EVENTS.SPELL_AURA_APPLIED_DOSE,
            EVENTS.SPELL_AURA_REMOVED_DOSE, EVENTS.SPELL_AURA_REFRESH].includes(event)) {
                assertArgLen(args, 14, 15, 16)

                if (args.length == 14) {
                    return {
                        ...data,

                        auraType: args[13],
                    }
                }

                if (args.length == 15) {
                    return {
                        ...data,

                        auraType: args[13],
                        amount: args[14]
                    }
                }

                if (args.length == 16) {
                    return {
                        ...data,

                        auraType: args[13],
                        amount: args[14],

                        // I'm unsure exactly what this 16th param is.
                        // It showed up during S4 fated, on the
                        // double-absorb orb (one enemy one friendly).
                        /*

                        // This is the one we DPS
                        args: [
                            'Creature-0-3111-2296-14971-188703-00006AB622',
                            '"Protoform Barrier"',
                            '0xa48',
                            '0x0',
                            'Creature-0-3111-2296-14971-188703-00006AB622',
                            '"Protoform Barrier"',
                            '0xa48',
                            '0x0',
                            '371597',
                            '"Protoform Barrier"',
                            '0x6a',
                            'BUFF',
                            '1901334',
                            '0' // Zero, absorb amount is the prev arg
                        ]

                        // I assume this is the one we heal?
                        args: [
                            'Creature-0-3111-2296-14971-188703-00006AB622',
                            '"Protoform Barrier"',
                            '0xa48',
                            '0x0',
                            'Creature-0-3111-2296-14971-189773-00006AB622',
                            '"Protoform Barrier"',
                            '0xa18',
                            '0x0',
                            '371597',
                            '"Protoform Barrier"',
                            '0x6a',
                            'BUFF',
                            '0',
                            '1901334' // Non-zero, I'm assuming this is a "heal" absorb
                        ]

                        */
                        _healAbsorb: args[15]
                    }
                }
            }

        }

        throw Error(`Unhandled event, ${args}`)
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
