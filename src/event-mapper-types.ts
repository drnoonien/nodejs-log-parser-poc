
export enum PowerType {
    HealthCost = -2,
    None = -1,
    Mana = 0,
    Rage = 1,
    Focus = 2,
    Energy = 3,
    ComboPoints = 4,
    Runes = 5,
    RunicPower = 6,
    SoulShards = 7,
    LunarPower = 8,
    HolyPower = 9,
    Alternate = 10, // Boss specific stuff, think cho'gall corruption level
    Maelstrom = 11,
    Chi = 12,
    Insanity = 13,
    Obsolete = 14, //Warlock remnant
    Obsolete2 = 15, //Warlock remnant
    ArcaneCharges = 16,
    Fury = 17,
    Pain = 18,
    Essence = 19,
    RuneBlood = 20,
    RuneFrost = 21,
    RuneUnholy = 22,
    NumPowerTypes = 23
}
/*
TODO:
enum SchoolType {
    Physical = 1,
    Holy = 2,
    Holystrike = 3,
    Fire = 4,
    Flamestrike = 5,

}
*/

export type baseEvent = {
    date: string
    timestamp: string
}

export type baseUnitEvent = baseEvent & {
    sourceGuid: string
    sourceName: string
    sourceFlags: number
    sourceRaidFlags: number
    destGuid: string
    destName: string
    destFlags: number
    destRaidFlags: number
}

export type missedEvent = {
    missType: string
    isOffHand?: number
    amountMissed?: number
    baseAmount?: number
    critical?: number
}

export type advancedUnitEvent = baseUnitEvent & {
    infoGuid: string
    ownerGuid: string
    currentHp: number
    maxHp: number
    attackPower: number
    spellPower: number
    armor: number
    absorb: number
    powerType: PowerType
    currentPower: number
    maxPower: number
    powerCost: number
    positionX: number
    positionY: number
    uiMapId: number
    facing: number
    item_level: number //TODO: This is still documented as "item level" for players, but level for NPCs
}

export type damageSuffixEvent = {
    amount: number
    baseAmount: number
    overkill: number
    school: number
    resisted?: number
    blocked?: number
    absorbed?: number
    critical?: number
    glancing?: number
    crushing?: number
}

export type spellPrefixEvent =  {
    spellId: number
    spellName: string
    spellSchool: number
}

export type EnergizeSuffixEvent =  {
    amount: number
    overEnergize: number
    powerType: PowerType
    maxPower: number
}
export type HealSuffixEvent =  {
    amount: number
    baseAmount: number
    overheal: number
    absorbed: number
    critical?: number
}

export type baseDeathEvent = baseUnitEvent & {
    recapID?: number //guessing type tbh, also maybe not present it seems?
    unconsciousOnDeath: number //Guessing it's a bool expressed a 0 or 1, real name is #unconsciousOnDeath
};