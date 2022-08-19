import { mapCombatantInfoArgs, mapGearRowsToSlot, parseGearRows } from './combatant-info-mapper'

function createGearString(params: {
    itemId: number,
    itemLevel: number,
    enchantInfo: number[],
    bonusIDs: number[],
    gemInfo: number[]
}): string {

    const content = [
        params.itemId,
        params.itemLevel,
        `(${params.enchantInfo.map(i => i)})`,
        `(${params.bonusIDs.map(i => i)})`,
        `(${params.gemInfo.map(i => i)})`,
    ].join(",")

    return `(${content})`

}

describe(mapCombatantInfoArgs.name, () => {

    it('works', () => {

        const result = mapCombatantInfoArgs([
            '8/18 19:30:39.271',
            'COMBATANT_INFO',
            'Player-1305-0BD7FA7F',
            '0',
            '2167',
            '155',
            '6898',
            '470',
            '0',
            '249',
            '0',
            '249',
            '249',
            '249',
            '0',
            '30',
            '828',
            '828',
            '828',
            '0',
            '1205',
            '265',
            '265',
            '265',
            '3526',
            '66',
            '(152261,204023,115750,204018,223817,183778,204074)',
            '(0,0,0,0)',
            '[9,2,[],[(1545),(1547),(1549),(1551),(1553),(1556),(1557),(1560),(1872),(1874),(1876),(1877)],[(215,278),(209,278),(159,278),(197,278),(196,278),(133,278)]]',
            '[(188933,304,(),(6652,8258,7580,7359,8765,8151,1524),(173128,120)),(183040,291,(),(8758,6652,7579,1563,6646),()),(171417,291,(),(8125,7882,8156,6649,6648,1588),()),(0,0,(),(),()),(188929,291,(6230,6225,0),(6652,8758,8094,8153,1511),()),(185806,298,(),(8765,8136,8137,7359,6652,7578,8270,1615,6646),()),(188931,304,(),(6652,8759,8095,8155,1524),()),(171413,291,(),(7054,7882,8156,6649,6648,1588),()),(189777,304,(6222,0,0),(6652,7578,8759,8132,8138,1550,6646),()),(188928,298,(6210,0,0),(6652,7749,8765,8154,8270,1518,6646),()),(185840,298,(6166,0,0),(8765,7359,6652,7580,8284,1615,6646),(173128,120)),(178824,268,(6166,0,0),(7359,6652,7578,7797,1582,6646),()),(186438,298,(),(6652,8764,1537,6646),()),(186424,304,(),(8759,6652,1550,6646),()),(185781,298,(6204,0,0),(8765,8136,8138,7359,6652,8284,1615,6646),()),(185824,298,(6229,6200,0),(8765,7359,6652,8214,1615,6646),()),(169068,298,(),(7359,6652,8765,8228,3149,6646),()),(0,0,(),(),())]',
            '[Player-1305-049858B6,156910,Player-1305-08E0EF91,1459,Player-1305-0464CD8F,21562,Player-1305-0C3BDC95,53563,Player-1305-0BD7FA7F,307166,Player-1305-0C10939D,166646,Player-1305-0BD7FA7F,371278,Player-1305-0AF41BF4,6673]',
            '35',
            '0',
            '0',
            '0'
        ])

        // Match against known correct snapshot. You generate a new
        // snapshot by logging a correct output to the function.
        expect(result).toEqual({
            "talentInfo": [
                "152261",
                "204023",
                "115750",
                "204018",
                "223817",
                "183778",
                "204074"
            ],
            "pvpTalentInfo": [
                "0",
                "0",
                "0",
                "0"
            ],
            "gearInfo": {
                "head": {
                    "itemId": 188933,
                    "itemLevel": 304,
                    "enchantInfo": [],
                    "bonusIDs": [
                        6652,
                        8258,
                        7580,
                        7359,
                        8765,
                        8151,
                        1524
                    ],
                    "gemInfo": [
                        173128,
                        120
                    ]
                },
                "neck": {
                    "itemId": 183040,
                    "itemLevel": 291,
                    "enchantInfo": [],
                    "bonusIDs": [
                        8758,
                        6652,
                        7579,
                        1563,
                        6646
                    ],
                    "gemInfo": []
                },
                "shoulder": {
                    "itemId": 171417,
                    "itemLevel": 291,
                    "enchantInfo": [],
                    "bonusIDs": [
                        8125,
                        7882,
                        8156,
                        6649,
                        6648,
                        1588
                    ],
                    "gemInfo": []
                },
                "shirt": {
                    "itemId": 0,
                    "itemLevel": 0,
                    "enchantInfo": [],
                    "bonusIDs": [],
                    "gemInfo": []
                },
                "chest": {
                    "itemId": 188929,
                    "itemLevel": 291,
                    "enchantInfo": [
                        6230,
                        6225,
                        0
                    ],
                    "bonusIDs": [
                        6652,
                        8758,
                        8094,
                        8153,
                        1511
                    ],
                    "gemInfo": []
                },
                "waist": {
                    "itemId": 185806,
                    "itemLevel": 298,
                    "enchantInfo": [],
                    "bonusIDs": [
                        8765,
                        8136,
                        8137,
                        7359,
                        6652,
                        7578,
                        8270,
                        1615,
                        6646
                    ],
                    "gemInfo": []
                },
                "legs": {
                    "itemId": 188931,
                    "itemLevel": 304,
                    "enchantInfo": [],
                    "bonusIDs": [
                        6652,
                        8759,
                        8095,
                        8155,
                        1524
                    ],
                    "gemInfo": []
                },
                "feet": {
                    "itemId": 171413,
                    "itemLevel": 291,
                    "enchantInfo": [],
                    "bonusIDs": [
                        7054,
                        7882,
                        8156,
                        6649,
                        6648,
                        1588
                    ],
                    "gemInfo": []
                },
                "wrist": {
                    "itemId": 189777,
                    "itemLevel": 304,
                    "enchantInfo": [
                        6222,
                        0,
                        0
                    ],
                    "bonusIDs": [
                        6652,
                        7578,
                        8759,
                        8132,
                        8138,
                        1550,
                        6646
                    ],
                    "gemInfo": []
                },
                "hands": {
                    "itemId": 188928,
                    "itemLevel": 298,
                    "enchantInfo": [
                        6210,
                        0,
                        0
                    ],
                    "bonusIDs": [
                        6652,
                        7749,
                        8765,
                        8154,
                        8270,
                        1518,
                        6646
                    ],
                    "gemInfo": []
                },
                "finger1": {
                    "itemId": 185840,
                    "itemLevel": 298,
                    "enchantInfo": [
                        6166,
                        0,
                        0
                    ],
                    "bonusIDs": [
                        8765,
                        7359,
                        6652,
                        7580,
                        8284,
                        1615,
                        6646
                    ],
                    "gemInfo": [
                        173128,
                        120
                    ]
                },
                "finger2": {
                    "itemId": 178824,
                    "itemLevel": 268,
                    "enchantInfo": [
                        6166,
                        0,
                        0
                    ],
                    "bonusIDs": [
                        7359,
                        6652,
                        7578,
                        7797,
                        1582,
                        6646
                    ],
                    "gemInfo": []
                },
                "trinket1": {
                    "itemId": 186438,
                    "itemLevel": 298,
                    "enchantInfo": [],
                    "bonusIDs": [
                        6652,
                        8764,
                        1537,
                        6646
                    ],
                    "gemInfo": []
                },
                "trinket2": {
                    "itemId": 186424,
                    "itemLevel": 304,
                    "enchantInfo": [],
                    "bonusIDs": [
                        8759,
                        6652,
                        1550,
                        6646
                    ],
                    "gemInfo": []
                },
                "back": {
                    "itemId": 185781,
                    "itemLevel": 298,
                    "enchantInfo": [
                        6204,
                        0,
                        0
                    ],
                    "bonusIDs": [
                        8765,
                        8136,
                        8138,
                        7359,
                        6652,
                        8284,
                        1615,
                        6646
                    ],
                    "gemInfo": []
                },
                "main_hand": {
                    "itemId": 185824,
                    "itemLevel": 298,
                    "enchantInfo": [
                        6229,
                        6200,
                        0
                    ],
                    "bonusIDs": [
                        8765,
                        7359,
                        6652,
                        8214,
                        1615,
                        6646
                    ],
                    "gemInfo": []
                },
                "off_hand": {
                    "itemId": 169068,
                    "itemLevel": 298,
                    "enchantInfo": [],
                    "bonusIDs": [
                        7359,
                        6652,
                        8765,
                        8228,
                        3149,
                        6646
                    ],
                    "gemInfo": []
                },
                "relic": {
                    "itemId": 0,
                    "itemLevel": 0,
                    "enchantInfo": [],
                    "bonusIDs": [],
                    "gemInfo": []
                }
            }
        })

    })

    test(mapGearRowsToSlot.name, () => {
        const res2 = mapGearRowsToSlot(parseGearRows(
            '[(188933,304,(),(6652,8258,7580,7359,8765,8151,1524),(173128,120)),(183040,291,(),(8758,6652,7579,1563,6646),()),(171417,291,(),(8125,7882,8156,6649,6648,1588),()),(0,0,(),(),()),(188929,291,(6230,6225,0),(6652,8758,8094,8153,1511),()),(185806,298,(),(8765,8136,8137,7359,6652,7578,8270,1615,6646),()),(188931,304,(),(6652,8759,8095,8155,1524),()),(171413,291,(),(7054,7882,8156,6649,6648,1588),()),(189777,304,(6222,0,0),(6652,7578,8759,8132,8138,1550,6646),()),(188928,298,(6210,0,0),(6652,7749,8765,8154,8270,1518,6646),()),(185840,298,(6166,0,0),(8765,7359,6652,7580,8284,1615,6646),(173128,120)),(178824,268,(6166,0,0),(7359,6652,7578,7797,1582,6646),()),(186438,298,(),(6652,8764,1537,6646),()),(186424,304,(),(8759,6652,1550,6646),()),(185781,298,(6204,0,0),(8765,8136,8138,7359,6652,8284,1615,6646),()),(185824,298,(6229,6200,0),(8765,7359,6652,8214,1615,6646),()),(169068,298,(),(7359,6652,8765,8228,3149,6646),()),(0,0,(),(),())]'
        ))

        // Match against known correct snapshot. You generate a new
        // snapshot by logging a correct output to the function.
        expect(res2).toEqual({
            head: {
                itemId: 188933,
                itemLevel: 304,
                enchantInfo: [],
                bonusIDs: [
                    6652, 8258,
                    7580, 7359,
                    8765, 8151,
                    1524
                ],
                gemInfo: [173128, 120]
            },
            neck: {
                itemId: 183040,
                itemLevel: 291,
                enchantInfo: [],
                bonusIDs: [8758, 6652, 7579, 1563, 6646],
                gemInfo: []
            },
            shoulder: {
                itemId: 171417,
                itemLevel: 291,
                enchantInfo: [],
                bonusIDs: [8125, 7882, 8156, 6649, 6648, 1588],
                gemInfo: []
            },
            shirt: {
                itemId: 0,
                itemLevel: 0,
                enchantInfo: [],
                bonusIDs: [],
                gemInfo: []
            },
            chest: {
                itemId: 188929,
                itemLevel: 291,
                enchantInfo: [6230, 6225, 0],
                bonusIDs: [6652, 8758, 8094, 8153, 1511],
                gemInfo: []
            },
            waist: {
                itemId: 185806,
                itemLevel: 298,
                enchantInfo: [],
                bonusIDs: [
                    8765, 8136, 8137,
                    7359, 6652, 7578,
                    8270, 1615, 6646
                ],
                gemInfo: []
            },
            legs: {
                itemId: 188931,
                itemLevel: 304,
                enchantInfo: [],
                bonusIDs: [6652, 8759, 8095, 8155, 1524],
                gemInfo: []
            },
            feet: {
                itemId: 171413,
                itemLevel: 291,
                enchantInfo: [],
                bonusIDs: [7054, 7882, 8156, 6649, 6648, 1588],
                gemInfo: []
            },
            wrist: {
                itemId: 189777,
                itemLevel: 304,
                enchantInfo: [6222, 0, 0],
                bonusIDs: [
                    6652, 7578,
                    8759, 8132,
                    8138, 1550,
                    6646
                ],
                gemInfo: []
            },
            hands: {
                itemId: 188928,
                itemLevel: 298,
                enchantInfo: [6210, 0, 0],
                bonusIDs: [
                    6652, 7749,
                    8765, 8154,
                    8270, 1518,
                    6646
                ],
                gemInfo: []
            },
            finger1: {
                itemId: 185840,
                itemLevel: 298,
                enchantInfo: [6166, 0, 0],
                bonusIDs: [
                    8765, 7359,
                    6652, 7580,
                    8284, 1615,
                    6646
                ],
                gemInfo: [173128, 120]
            },
            finger2: {
                itemId: 178824,
                itemLevel: 268,
                enchantInfo: [6166, 0, 0],
                bonusIDs: [7359, 6652, 7578, 7797, 1582, 6646],
                gemInfo: []
            },
            trinket1: {
                itemId: 186438,
                itemLevel: 298,
                enchantInfo: [],
                bonusIDs: [6652, 8764, 1537, 6646],
                gemInfo: []
            },
            trinket2: {
                itemId: 186424,
                itemLevel: 304,
                enchantInfo: [],
                bonusIDs: [8759, 6652, 1550, 6646],
                gemInfo: []
            },
            back: {
                itemId: 185781,
                itemLevel: 298,
                enchantInfo: [6204, 0, 0],
                bonusIDs: [
                    8765, 8136, 8138,
                    7359, 6652, 8284,
                    1615, 6646
                ],
                gemInfo: []
            },
            main_hand: {
                itemId: 185824,
                itemLevel: 298,
                enchantInfo: [6229, 6200, 0],
                bonusIDs: [8765, 7359, 6652, 8214, 1615, 6646],
                gemInfo: []
            },
            off_hand: {
                itemId: 169068,
                itemLevel: 298,
                enchantInfo: [],
                bonusIDs: [7359, 6652, 8765, 8228, 3149, 6646],
                gemInfo: []
            },
            relic: {
                itemId: 0,
                itemLevel: 0,
                enchantInfo: [],
                bonusIDs: [],
                gemInfo: []
            }
        })
    })

    test(parseGearRows.name, () => {

        const gear1Data = {
            itemId: 1,
            itemLevel: 99,
            bonusIDs: [1, 2, 3],
            enchantInfo: [4, 5, 6],
            gemInfo: [7, 8, 9]
        }

        const gear2Data = {
            itemId: 2,
            itemLevel: 199,
            bonusIDs: [11, 12, 13],
            enchantInfo: [14, 15, 16],
            gemInfo: [17, 18, 19]
        }
        const gear3Data = {
            itemId: 0,
            itemLevel: 0,
            bonusIDs: [],
            enchantInfo: [],
            gemInfo: []
        }

        const gear4Data = {
            itemId: 3,
            itemLevel: 299,
            bonusIDs: [21, 22, 23],
            enchantInfo: [1, 0, 0],
            gemInfo: []
        }

        const res = parseGearRows(`[${[
            createGearString(gear1Data),
            createGearString(gear2Data),
            createGearString(gear3Data),
            createGearString(gear4Data),
        ].join(",")}]`)

        expect(res[0]).toEqual(gear1Data)
        expect(res[1]).toEqual(gear2Data)
        expect(res[2]).toEqual(gear3Data)
        expect(res[3]).toEqual(gear4Data)

    })

})