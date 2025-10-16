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

// ability score point buy system (27 points)
const ABILITY_POINT_COSTS = {
    8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9
};

const ABILITY_POINT_BUDGET = 27;
