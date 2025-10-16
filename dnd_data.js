// d&d 5e data structures

// data loaded from json files
let DND_RACES = {};
let DND_CLASSES = {};
let BACKGROUNDS = [];
let ALIGNMENTS = [];
let ARMOR = {};
let WEAPONS = {};
let INSTRUMENTS = [];

// spell slots by class level (full casters)
const SPELL_SLOTS_FULL_CASTER = {
    1: [2, 0, 0, 0, 0, 0, 0, 0, 0],
    2: [3, 0, 0, 0, 0, 0, 0, 0, 0],
    3: [4, 2, 0, 0, 0, 0, 0, 0, 0],
    4: [4, 3, 0, 0, 0, 0, 0, 0, 0],
    5: [4, 3, 2, 0, 0, 0, 0, 0, 0],
    6: [4, 3, 3, 0, 0, 0, 0, 0, 0],
    7: [4, 3, 3, 1, 0, 0, 0, 0, 0],
    8: [4, 3, 3, 2, 0, 0, 0, 0, 0],
    9: [4, 3, 3, 3, 1, 0, 0, 0, 0],
    10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
    11: [4, 3, 3, 3, 2, 1, 0, 0, 0],
    12: [4, 3, 3, 3, 2, 1, 0, 0, 0],
    13: [4, 3, 3, 3, 2, 1, 1, 0, 0],
    14: [4, 3, 3, 3, 2, 1, 1, 0, 0],
    15: [4, 3, 3, 3, 2, 1, 1, 1, 0],
    16: [4, 3, 3, 3, 2, 1, 1, 1, 0],
    17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
    18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
    19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
    20: [4, 3, 3, 3, 3, 2, 2, 1, 1]
};

// spell slots for half casters (paladin, ranger)
const SPELL_SLOTS_HALF_CASTER = {
    1: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    2: [2, 0, 0, 0, 0, 0, 0, 0, 0],
    3: [3, 0, 0, 0, 0, 0, 0, 0, 0],
    4: [3, 0, 0, 0, 0, 0, 0, 0, 0],
    5: [4, 2, 0, 0, 0, 0, 0, 0, 0],
    6: [4, 2, 0, 0, 0, 0, 0, 0, 0],
    7: [4, 3, 0, 0, 0, 0, 0, 0, 0],
    8: [4, 3, 0, 0, 0, 0, 0, 0, 0],
    9: [4, 3, 2, 0, 0, 0, 0, 0, 0],
    10: [4, 3, 2, 0, 0, 0, 0, 0, 0],
    11: [4, 3, 3, 0, 0, 0, 0, 0, 0],
    12: [4, 3, 3, 0, 0, 0, 0, 0, 0],
    13: [4, 3, 3, 1, 0, 0, 0, 0, 0],
    14: [4, 3, 3, 1, 0, 0, 0, 0, 0],
    15: [4, 3, 3, 2, 0, 0, 0, 0, 0],
    16: [4, 3, 3, 2, 0, 0, 0, 0, 0],
    17: [4, 3, 3, 3, 1, 0, 0, 0, 0],
    18: [4, 3, 3, 3, 1, 0, 0, 0, 0],
    19: [4, 3, 3, 3, 2, 0, 0, 0, 0],
    20: [4, 3, 3, 3, 2, 0, 0, 0, 0]
};

// cantrips known by class and level
const CANTRIPS_KNOWN = {
    bard: { 1: 2, 4: 3, 10: 4 },
    cleric: { 1: 3, 4: 4, 10: 5 },
    druid: { 1: 2, 4: 3, 10: 4 },
    sorcerer: { 1: 4, 4: 5, 10: 6 },
    warlock: { 1: 2, 4: 3, 10: 4 },
    wizard: { 1: 3, 4: 4, 10: 5 }
};

// spells known by class and level (for non-prepared casters)
const SPELLS_KNOWN = {
    bard: { 1: 4, 2: 5, 3: 6, 4: 7, 5: 8, 6: 9, 7: 10, 8: 11, 9: 12, 10: 14, 11: 15, 12: 15, 13: 16, 14: 18, 15: 19, 16: 19, 17: 20, 18: 22, 19: 22, 20: 22 },
    ranger: { 1: 0, 2: 2, 3: 3, 4: 3, 5: 4, 6: 4, 7: 5, 8: 5, 9: 6, 10: 6, 11: 7, 12: 7, 13: 8, 14: 8, 15: 9, 16: 9, 17: 10, 18: 10, 19: 11, 20: 11 },
    sorcerer: { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, 10: 11, 11: 12, 12: 12, 13: 13, 14: 13, 15: 14, 16: 14, 17: 15, 18: 15, 19: 15, 20: 15 },
    warlock: { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, 10: 10, 11: 11, 12: 11, 13: 12, 14: 12, 15: 13, 16: 13, 17: 14, 18: 14, 19: 15, 20: 15 }
};

// ability score point buy system (starts at 10, 27 points available for standard buy)
// extended to 20 for characters who gain ability score increases through leveling
const ABILITY_POINT_COSTS = {
    8: -2, 9: -1, 10: 0, 11: 1, 12: 2, 13: 3, 14: 5, 15: 7, 16: 9, 17: 12, 18: 15, 19: 19, 20: 24
};

const ABILITY_POINT_BUDGET = 27;

// proficiency bonus by level
const PROFICIENCY_BONUS = {
    1: 2, 2: 2, 3: 2, 4: 2,
    5: 3, 6: 3, 7: 3, 8: 3,
    9: 4, 10: 4, 11: 4, 12: 4,
    13: 5, 14: 5, 15: 5, 16: 5,
    17: 6, 18: 6, 19: 6, 20: 6
};

// class proficiencies
const CLASS_PROFICIENCIES = {
    barbarian: {
        armor: ['light', 'medium', 'shields'],
        weapons: ['simple', 'martial'],
        savingThrows: ['str', 'con']
    },
    bard: {
        armor: ['light'],
        weapons: ['simple', 'hand crossbow', 'longsword', 'rapier', 'shortsword'],
        savingThrows: ['dex', 'cha']
    },
    cleric: {
        armor: ['light', 'medium', 'shields'],
        weapons: ['simple'],
        savingThrows: ['wis', 'cha']
    },
    druid: {
        armor: ['light', 'medium', 'shields'],
        weapons: ['club', 'dagger', 'dart', 'javelin', 'mace', 'quarterstaff', 'scimitar', 'sickle', 'sling', 'spear'],
        savingThrows: ['int', 'wis']
    },
    fighter: {
        armor: ['light', 'medium', 'heavy', 'shields'],
        weapons: ['simple', 'martial'],
        savingThrows: ['str', 'con']
    },
    monk: {
        armor: [],
        weapons: ['simple', 'shortsword'],
        savingThrows: ['str', 'dex']
    },
    paladin: {
        armor: ['light', 'medium', 'heavy', 'shields'],
        weapons: ['simple', 'martial'],
        savingThrows: ['wis', 'cha']
    },
    ranger: {
        armor: ['light', 'medium', 'shields'],
        weapons: ['simple', 'martial'],
        savingThrows: ['str', 'dex']
    },
    rogue: {
        armor: ['light'],
        weapons: ['simple', 'hand crossbow', 'longsword', 'rapier', 'shortsword'],
        savingThrows: ['dex', 'int']
    },
    sorcerer: {
        armor: [],
        weapons: ['dagger', 'dart', 'sling', 'quarterstaff', 'light crossbow'],
        savingThrows: ['con', 'cha']
    },
    warlock: {
        armor: ['light'],
        weapons: ['simple'],
        savingThrows: ['wis', 'cha']
    },
    wizard: {
        armor: [],
        weapons: ['dagger', 'dart', 'sling', 'quarterstaff', 'light crossbow'],
        savingThrows: ['int', 'wis']
    }
};

// load data from json files
async function LoadDndData(extensionFolderPath) {
    try {
        // load races
        DND_RACES = await $.get(`${extensionFolderPath}/races.json`);
        console.log('Loaded races:', Object.keys(DND_RACES).length);
        
        // load classes
        DND_CLASSES = await $.get(`${extensionFolderPath}/classes.json`);
        console.log('Loaded classes:', Object.keys(DND_CLASSES).length);
        
        // load backgrounds
        BACKGROUNDS = await $.get(`${extensionFolderPath}/backgrounds.json`);
        console.log('Loaded backgrounds:', BACKGROUNDS.length);
        
        // load alignments
        ALIGNMENTS = await $.get(`${extensionFolderPath}/alignments.json`);
        console.log('Loaded alignments:', ALIGNMENTS.length);
        
        // load armors
        ARMOR = await $.get(`${extensionFolderPath}/armors.json`);
        console.log('Loaded armors:', Object.keys(ARMOR).length);
        
        // load weapons
        WEAPONS = await $.get(`${extensionFolderPath}/weapons.json`);
        console.log('Loaded weapons:', WEAPONS.simple.length + WEAPONS.martial.length);
        
        // load instruments
        INSTRUMENTS = await $.get(`${extensionFolderPath}/instruments.json`);
        console.log('Loaded instruments:', INSTRUMENTS.length);
    } catch (error) {
        console.error('Error loading D&D data:', error);
    }
}
