// d&d 5e data structures

// race data with ability score bonuses and features
const DND_RACES = {
    human: {
        name: 'Human',
        abilityBonuses: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
        speed: 30,
        features: ['Versatile: +1 to all ability scores'],
        size: 'Medium'
    },
    elf: {
        name: 'Elf',
        abilityBonuses: { dex: 2 },
        speed: 30,
        features: ['Darkvision (60 ft)', 'Keen Senses: Proficiency in Perception', 'Fey Ancestry: Advantage vs charm, immune to sleep magic', 'Trance: 4 hours of meditation instead of sleep'],
        size: 'Medium'
    },
    dwarf: {
        name: 'Dwarf',
        abilityBonuses: { con: 2 },
        speed: 25,
        features: ['Darkvision (60 ft)', 'Dwarven Resilience: Advantage vs poison, resistance to poison damage', 'Stonecunning: +2 bonus to History checks on stonework'],
        size: 'Medium'
    },
    halfling: {
        name: 'Halfling',
        abilityBonuses: { dex: 2 },
        speed: 25,
        features: ['Lucky: Reroll 1s on attack, ability check, or saving throw', 'Brave: Advantage vs frightened', 'Halfling Nimbleness: Move through space of larger creatures'],
        size: 'Small'
    },
    dragonborn: {
        name: 'Dragonborn',
        abilityBonuses: { str: 2, cha: 1 },
        speed: 30,
        features: ['Draconic Ancestry: Choose dragon type for breath weapon and resistance', 'Breath Weapon: 2d6 damage (increases with level)', 'Damage Resistance: Resistance to breath weapon damage type'],
        size: 'Medium'
    },
    gnome: {
        name: 'Gnome',
        abilityBonuses: { int: 2 },
        speed: 25,
        features: ['Darkvision (60 ft)', 'Gnome Cunning: Advantage on Int, Wis, Cha saves vs magic'],
        size: 'Small'
    },
    halforc: {
        name: 'Half-Orc',
        abilityBonuses: { str: 2, con: 1 },
        speed: 30,
        features: ['Darkvision (60 ft)', 'Relentless Endurance: Drop to 1 HP instead of 0 (once per long rest)', 'Savage Attacks: Extra weapon damage die on critical hits'],
        size: 'Medium'
    },
    tiefling: {
        name: 'Tiefling',
        abilityBonuses: { cha: 2, int: 1 },
        speed: 30,
        features: ['Darkvision (60 ft)', 'Hellish Resistance: Resistance to fire damage', 'Infernal Legacy: Know Thaumaturgy cantrip, cast Hellish Rebuke at level 3, Darkness at level 5'],
        size: 'Medium'
    }
};

// class data with hit dice and features
const DND_CLASSES = {
    barbarian: {
        name: 'Barbarian',
        hitDice: 12,
        primaryAbility: ['str'],
        savingThrows: ['str', 'con'],
        spellcaster: false,
        features: ['Rage', 'Unarmored Defense']
    },
    bard: {
        name: 'Bard',
        hitDice: 8,
        primaryAbility: ['cha'],
        savingThrows: ['dex', 'cha'],
        spellcaster: true,
        spellcastingAbility: 'cha',
        features: ['Spellcasting', 'Bardic Inspiration'],
        hasInstrument: true
    },
    cleric: {
        name: 'Cleric',
        hitDice: 8,
        primaryAbility: ['wis'],
        savingThrows: ['wis', 'cha'],
        spellcaster: true,
        spellcastingAbility: 'wis',
        features: ['Spellcasting', 'Divine Domain']
    },
    druid: {
        name: 'Druid',
        hitDice: 8,
        primaryAbility: ['wis'],
        savingThrows: ['int', 'wis'],
        spellcaster: true,
        spellcastingAbility: 'wis',
        features: ['Spellcasting', 'Druidic', 'Wild Shape']
    },
    fighter: {
        name: 'Fighter',
        hitDice: 10,
        primaryAbility: ['str', 'dex'],
        savingThrows: ['str', 'con'],
        spellcaster: false,
        features: ['Fighting Style', 'Second Wind']
    },
    monk: {
        name: 'Monk',
        hitDice: 8,
        primaryAbility: ['dex', 'wis'],
        savingThrows: ['str', 'dex'],
        spellcaster: false,
        features: ['Unarmored Defense', 'Martial Arts']
    },
    paladin: {
        name: 'Paladin',
        hitDice: 10,
        primaryAbility: ['str', 'cha'],
        savingThrows: ['wis', 'cha'],
        spellcaster: true,
        spellcastingAbility: 'cha',
        features: ['Divine Sense', 'Lay on Hands']
    },
    ranger: {
        name: 'Ranger',
        hitDice: 10,
        primaryAbility: ['dex', 'wis'],
        savingThrows: ['str', 'dex'],
        spellcaster: true,
        spellcastingAbility: 'wis',
        features: ['Favored Enemy', 'Natural Explorer']
    },
    rogue: {
        name: 'Rogue',
        hitDice: 8,
        primaryAbility: ['dex'],
        savingThrows: ['dex', 'int'],
        spellcaster: false,
        features: ['Sneak Attack', 'Thieves\' Cant']
    },
    sorcerer: {
        name: 'Sorcerer',
        hitDice: 6,
        primaryAbility: ['cha'],
        savingThrows: ['con', 'cha'],
        spellcaster: true,
        spellcastingAbility: 'cha',
        features: ['Spellcasting', 'Sorcerous Origin']
    },
    warlock: {
        name: 'Warlock',
        hitDice: 8,
        primaryAbility: ['cha'],
        savingThrows: ['wis', 'cha'],
        spellcaster: true,
        spellcastingAbility: 'cha',
        features: ['Otherworldly Patron', 'Pact Magic']
    },
    wizard: {
        name: 'Wizard',
        hitDice: 6,
        primaryAbility: ['int'],
        savingThrows: ['int', 'wis'],
        spellcaster: true,
        spellcastingAbility: 'int',
        features: ['Spellcasting', 'Arcane Recovery']
    }
};

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

// alignments
const ALIGNMENTS = [
    'Lawful Good', 'Neutral Good', 'Chaotic Good',
    'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
    'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
];

// backgrounds
const BACKGROUNDS = [
    'Acolyte', 'Charlatan', 'Criminal', 'Entertainer', 'Folk Hero',
    'Guild Artisan', 'Hermit', 'Noble', 'Outlander', 'Sage',
    'Sailor', 'Soldier', 'Urchin'
];

// weapons
const WEAPONS = {
    simple: [
        'Club', 'Dagger', 'Greatclub', 'Handaxe', 'Javelin',
        'Light Hammer', 'Mace', 'Quarterstaff', 'Sickle', 'Spear',
        'Crossbow (Light)', 'Dart', 'Shortbow', 'Sling'
    ],
    martial: [
        'Battleaxe', 'Flail', 'Glaive', 'Greataxe', 'Greatsword',
        'Halberd', 'Lance', 'Longsword', 'Maul', 'Morningstar',
        'Pike', 'Rapier', 'Scimitar', 'Shortsword', 'Trident',
        'War Pick', 'Warhammer', 'Whip', 'Blowgun',
        'Crossbow (Hand)', 'Crossbow (Heavy)', 'Longbow', 'Net'
    ]
};

// musical instruments
const INSTRUMENTS = [
    'Bagpipes', 'Drum', 'Dulcimer', 'Flute', 'Lute',
    'Lyre', 'Horn', 'Pan Flute', 'Shawm', 'Viol'
];

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

// armor types
const ARMOR = {
    none: { name: 'No Armor', type: 'none', ac: 10, dexBonus: 'full', stealthDisadvantage: false },
    padded: { name: 'Padded', type: 'light', ac: 11, dexBonus: 'full', stealthDisadvantage: true },
    leather: { name: 'Leather', type: 'light', ac: 11, dexBonus: 'full', stealthDisadvantage: false },
    studdedLeather: { name: 'Studded Leather', type: 'light', ac: 12, dexBonus: 'full', stealthDisadvantage: false },
    hide: { name: 'Hide', type: 'medium', ac: 12, dexBonus: 2, stealthDisadvantage: false },
    chainShirt: { name: 'Chain Shirt', type: 'medium', ac: 13, dexBonus: 2, stealthDisadvantage: false },
    scaleMail: { name: 'Scale Mail', type: 'medium', ac: 14, dexBonus: 2, stealthDisadvantage: true },
    breastplate: { name: 'Breastplate', type: 'medium', ac: 14, dexBonus: 2, stealthDisadvantage: false },
    halfPlate: { name: 'Half Plate', type: 'medium', ac: 15, dexBonus: 2, stealthDisadvantage: true },
    ringMail: { name: 'Ring Mail', type: 'heavy', ac: 14, dexBonus: 0, stealthDisadvantage: true },
    chainMail: { name: 'Chain Mail', type: 'heavy', ac: 16, dexBonus: 0, stealthDisadvantage: true },
    splint: { name: 'Splint', type: 'heavy', ac: 17, dexBonus: 0, stealthDisadvantage: true },
    plate: { name: 'Plate', type: 'heavy', ac: 18, dexBonus: 0, stealthDisadvantage: true }
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
