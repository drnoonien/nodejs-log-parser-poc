import { expectNumber } from './assert-utils'
import { ArrayBuilder, WordBuilder } from './parser-utils'

export type Gear = {
    itemId: number
    itemLevel: number
    enchantInfo: number[]
    bonusIDs: number[]
    gemInfo: number[]
}

export type GearInfo = {
    head: Gear | null
    neck: Gear | null
    shoulder: Gear | null
    back: Gear | null
    chest: Gear | null
    wrist: Gear | null
    hands: Gear | null
    waist: Gear | null
    legs: Gear | null
    feet: Gear | null
    finger1: Gear | null
    finger2: Gear | null
    trinket1: Gear | null
    trinket2: Gear | null
    main_hand: Gear | null
    off_hand: Gear | null
    relic: Gear | null
}

export type BorrowedPowerInfo = {
    soulbindId: number
    covenantId: number
    animaPowers: (number | number[])[]
    soulbindTraits: number[]
    conduitSpells: number[][]
}

export function mapCombatantInfoArgs(args: string[]) {

    // Stored as plain arrays for now
    const talentInfo = args[26].replace("(", "").replace(")", "").split(",")
    const pvpTalentInfo = args[27].replace("(", "").replace(")", "").split(",")
    const gearInfo = mapGearRowsToSlot(parseGearRows(args[29]))

    return {
        talentInfo,
        pvpTalentInfo,
        gearInfo
    }
}

/**
 * Maps a given array of gear instances onto their respective gear
 * slots.
 */
export function mapGearRowsToSlot(gearRows: Gear[]): GearInfo {

    // Order of gear in log output, this is unenforced and assumed to
    // be correct.
    const gearIndexArray = [
        "head", "neck", "shoulder", "shirt", "chest", "waist",
        "legs", "feet", "wrist", "hands", "finger1", "finger2", "trinket1", "trinket2",
        "back", "main_hand", "off_hand", "relic"
    ]

    const gearInfo: Partial<GearInfo> = {}

    for (let index = 0; index < gearIndexArray.length; index++) {
        // Tell the compiler that everything we grab out of
        // gearIndexArray is a valid property name in GearInfo. This
        // is not typesafe, if a key is changed in GearInfo, it has to
        // be changed in here as well.
        const slotName = gearIndexArray[index] as keyof GearInfo

        const gearRow = gearRows[index]

        gearInfo[slotName] = {
            itemId: gearRow.itemId,
            itemLevel: gearRow.itemLevel,
            enchantInfo: gearRow.enchantInfo,
            bonusIDs: gearRow.bonusIDs,
            gemInfo: gearRow.gemInfo
        }
    }

    return gearInfo as GearInfo
}

/**
 * Parses a full array of gear items and returns an array of gear
 * instances.
 */
export function parseGearRows(gearInfo: string): Gear[] {

    /*

    One full item array, each line represents an item slot. Lines
    starting with -- are comments added here.
    '[
        (188933,304,(),(6652,8258,7580,7359,8765,8151,1524),(173128,120)),
        (183040,291,(),(8758,6652,7579,1563,6646),()),
        (171417,291,(),(8125,7882,8156,6649,6648,1588),()),
        -- Missing item, in this case an empty shirt slot.
        (0,0,(),(),()),
        (188929,291,(6230,6225,0),(6652,8758,8094,8153,1511),()),
        (185806,298,(),(8765,8136,8137,7359,6652,7578,8270,1615,6646),()),
        (188931,304,(),(6652,8759,8095,8155,1524),()),
        (171413,291,(),(7054,7882,8156,6649,6648,1588),()),
        (189777,304,(6222,0,0),(6652,7578,8759,8132,8138,1550,6646),()),
        (188928,298,(6210,0,0),(6652,7749,8765,8154,8270,1518,6646),()),
        (185840,298,(6166,0,0),(8765,7359,6652,7580,8284,1615,6646),(173128,120)),
        (178824,268,(6166,0,0),(7359,6652,7578,7797,1582,6646),()),
        (186438,298,(),(6652,8764,1537,6646),()),
        (186424,304,(),(8759,6652,1550,6646),()),
        (185781,298,(6204,0,0),(8765,8136,8138,7359,6652,8284,1615,6646),()),
        (185824,298,(6229,6200,0),(8765,7359,6652,8214,1615,6646),()),
        (169068,298,(),(7359,6652,8765,8228,3149,6646),()),
        -- Unused slot (old ranged weapon, relic, etc...)
        (0,0,(),(),())
    ]',

    One full item row. Lines starting with -- are comments added here.
    (
        -- Item ID
        185840,
        -- Item iL
        298,
        -- Enchants
        (6166,0,0),
        -- Bonus IDs
        (8765,7359,6652,7580,8284,1615,6646),
        -- Gems
        (173128,120)
    ),

    */

    // Remove surrounding square brackets, we don't need them
    gearInfo = gearInfo.replace(/\[|\]/g, '')

    const out: Gear[] = []

    let depth = 0
    let topLevelCommaIndex = 0

    const arrayBuilder = ArrayBuilder()
    const wordBuilder = WordBuilder()

    // Instantiate as Partial<> to satisfy the compiler. Will be cast
    // back to non-partial when finished.
    let accumulator: Partial<Gear> = {}

    for (let index = 0; index < gearInfo.length; index++) {
        const char = gearInfo[index]

        // Collect everything that isn't a keyword.
        if (char != "(" && char != ")" && char != ",") {
            wordBuilder.push(char)
            continue
        }

        if (char == "(") {
            depth += 1
        }

        if (char == ")") {

            // Take care of the last value in a nested array.
            if (depth == 2 && wordBuilder.peek() != "") {
                arrayBuilder.push(expectNumber(wordBuilder.flush()))
            }

            depth -= 1

            // If we reach depth 0 here it means a full item has been
            // processed.
            if (depth == 0) {

                // Gems are stored on the tail end of an item row and
                // have to be flushed here as opposed to at depth 1
                // like the previous arrays.
                accumulator.gemInfo = arrayBuilder.flush()

                // Force cast out of Partial<>
                out.push(accumulator as Gear)

                accumulator = {}
                topLevelCommaIndex = 0
            }

        }

        // Processing a comma means it's time to flush something.
        if (char == ",") {

            // Depth 1 means we're inside the item row.
            if (depth == 1) {

                switch (topLevelCommaIndex) {
                    case 0: {
                        accumulator.itemId = expectNumber(wordBuilder.flush())
                        break
                    }
                    case 1: {
                        accumulator.itemLevel = expectNumber(wordBuilder.flush())
                        break
                    }
                    case 2: {
                        accumulator.enchantInfo = arrayBuilder.flush()
                        break
                    }
                    case 3: {
                        accumulator.bonusIDs = arrayBuilder.flush()
                        break
                    }
                    default: {
                        throw Error(`Unhandled comma index, this was not expected to exist: ${topLevelCommaIndex}`)
                    }
                }

                topLevelCommaIndex += 1
            }

            // Depth 2 means we're inside a nested array on an item
            // row.
            if (depth == 2) {
                // Value order in here is assumed arbitrary and
                // unnamed, just collect everything into an array.
                arrayBuilder.push(expectNumber(wordBuilder.flush()))
            }
        }

    }

    return out
}