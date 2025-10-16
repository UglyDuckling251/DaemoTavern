// d&d 5e character creation logic

let characterData = {
    name: '',
    race: '',
    class: '',
    level: 1,
    background: '',
    alignment: '',
    abilityScores: { str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8 },
    hp: 0,
    ac: 10,
    speed: 30,
    weapon: '',
    instrument: '',
    selectedCantrips: [],
    selectedSpells: []
};

let allSpells = [];
let pointsSpent = 0;

// calculate ability modifier
function CalculateModifier(score) {
    return Math.floor((score - 10) / 2);
}

// calculate total ability score with racial bonuses
function GetTotalAbilityScore(ability) {
    let base = characterData.abilityScores[ability];
    let bonus = 0;
    
    if (characterData.race && DND_RACES[characterData.race]) {
        bonus = DND_RACES[characterData.race].abilityBonuses[ability] || 0;
    }
    
    return base + bonus;
}

// calculate points spent in point buy
function CalculatePointsSpent() {
    let total = 0;
    for (let ability in characterData.abilityScores) {
        let score = characterData.abilityScores[ability];
        total += ABILITY_POINT_COSTS[score] || 0;
    }
    return total;
}

// update ability score displays
function UpdateAbilityScoreDisplays() {
    const abilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
    
    abilities.forEach(ability => {
        const abilityLower = ability.toLowerCase();
        const totalScore = GetTotalAbilityScore(abilityLower);
        const modifier = CalculateModifier(totalScore);
        const modifierStr = modifier >= 0 ? `+${modifier}` : `${modifier}`;
        
        $(`#mod${ability}`).text(modifierStr);
        
        const base = characterData.abilityScores[abilityLower];
        const bonus = totalScore - base;
        $(`#total${ability}`).text(`Base: ${base}${bonus > 0 ? ` (+${bonus} racial)` : ''} = ${totalScore}`);
    });
    
    pointsSpent = CalculatePointsSpent();
    const remaining = ABILITY_POINT_BUDGET - pointsSpent;
    $('#pointsRemaining').text(remaining);
    
    if (remaining < 0) {
        $('#pointBudget').addClass('over-budget');
    } else {
        $('#pointBudget').removeClass('over-budget');
    }
}

// calculate hp based on class and level
function CalculateHP() {
    if (!characterData.class || !DND_CLASSES[characterData.class]) {
        return 0;
    }
    
    const classData = DND_CLASSES[characterData.class];
    const conModifier = CalculateModifier(GetTotalAbilityScore('con'));
    
    // level 1 hp = max hit dice + con modifier
    let hp = classData.hitDice + conModifier;
    
    // each additional level adds average of hit dice + con modifier
    if (characterData.level > 1) {
        const avgRoll = Math.floor(classData.hitDice / 2) + 1;
        hp += (avgRoll + conModifier) * (characterData.level - 1);
    }
    
    return Math.max(1, hp);
}

// update combat stats
function UpdateCombatStats() {
    characterData.hp = CalculateHP();
    $('#characterHP').val(characterData.hp);
    
    if (characterData.race && DND_RACES[characterData.race]) {
        characterData.speed = DND_RACES[characterData.race].speed;
        $('#characterSpeed').val(characterData.speed);
    }
}

// populate race features
function UpdateRacialFeatures() {
    const featuresDiv = $('#racialFeatures');
    
    if (!characterData.race || !DND_RACES[characterData.race]) {
        featuresDiv.html('<p class="subtle">Select a race to see features</p>');
        return;
    }
    
    const race = DND_RACES[characterData.race];
    let html = '<ul>';
    race.features.forEach(feature => {
        html += `<li>${feature}</li>`;
    });
    html += `<li>Size: ${race.size}</li>`;
    html += `<li>Speed: ${race.speed} feet</li>`;
    html += '</ul>';
    
    featuresDiv.html(html);
}

// populate class features
function UpdateClassFeatures() {
    const featuresDiv = $('#classFeatures');
    
    if (!characterData.class || !DND_CLASSES[characterData.class]) {
        featuresDiv.html('<p class="subtle">Select a class to see features</p>');
        return;
    }
    
    const classData = DND_CLASSES[characterData.class];
    let html = '<ul>';
    html += `<li>Hit Dice: 1d${classData.hitDice}</li>`;
    classData.features.forEach(feature => {
        html += `<li>${feature}</li>`;
    });
    html += '</ul>';
    
    featuresDiv.html(html);
}

// get spell slots for current class and level
function GetSpellSlots() {
    if (!characterData.class || !DND_CLASSES[characterData.class]) {
        return null;
    }
    
    const classData = DND_CLASSES[characterData.class];
    
    if (!classData.spellcaster) {
        return null;
    }
    
    // determine if full or half caster
    const isHalfCaster = characterData.class === 'paladin' || characterData.class === 'ranger';
    const slotsTable = isHalfCaster ? SPELL_SLOTS_HALF_CASTER : SPELL_SLOTS_FULL_CASTER;
    
    return slotsTable[characterData.level] || null;
}

// update spell slots display
function UpdateSpellSlotsDisplay() {
    const slotsDiv = $('#spellSlotsDisplay');
    const slots = GetSpellSlots();
    
    if (!slots) {
        slotsDiv.html('');
        return;
    }
    
    let html = '';
    for (let i = 0; i < slots.length; i++) {
        if (slots[i] > 0) {
            html += `<div class="spell-slot-item">
                <span class="slot-level">Level ${i + 1}:</span>
                <span class="slot-count">${slots[i]} slots</span>
            </div>`;
        }
    }
    
    slotsDiv.html(html);
}

// get cantrips known for current class and level
function GetCantripsKnown() {
    if (!characterData.class || !CANTRIPS_KNOWN[characterData.class]) {
        return 0;
    }
    
    const cantripsData = CANTRIPS_KNOWN[characterData.class];
    let known = 0;
    
    // find the highest level threshold that applies
    for (let level in cantripsData) {
        if (characterData.level >= parseInt(level)) {
            known = cantripsData[level];
        }
    }
    
    return known;
}

// get spells known for current class and level
function GetSpellsKnown() {
    if (!characterData.class) {
        return 0;
    }
    
    // prepared casters (cleric, druid, paladin, wizard) can prepare spells equal to casting mod + level
    if (['cleric', 'druid', 'paladin', 'wizard'].includes(characterData.class)) {
        const classData = DND_CLASSES[characterData.class];
        const castingAbility = classData.spellcastingAbility;
        const modifier = CalculateModifier(GetTotalAbilityScore(castingAbility));
        return Math.max(1, modifier + characterData.level);
    }
    
    // spells known casters
    if (SPELLS_KNOWN[characterData.class]) {
        return SPELLS_KNOWN[characterData.class][characterData.level] || 0;
    }
    
    return 0;
}

// update spellcasting section visibility and limits
function UpdateSpellcastingSection() {
    if (!characterData.class || !DND_CLASSES[characterData.class]) {
        $('#spellcastingSection').hide();
        return;
    }
    
    const classData = DND_CLASSES[characterData.class];
    
    if (!classData.spellcaster) {
        $('#spellcastingSection').hide();
        return;
    }
    
    $('#spellcastingSection').show();
    UpdateSpellSlotsDisplay();
    
    const cantripsKnown = GetCantripsKnown();
    const spellsKnown = GetSpellsKnown();
    
    $('#cantripsKnown').text(`(${characterData.selectedCantrips.length}/${cantripsKnown})`);
    $('#spellsKnown').text(`(${characterData.selectedSpells.length}/${spellsKnown})`);
    
    // filter spells by class
    PopulateSpellSelectors();
}

// load spells from json
async function LoadSpells(extensionFolderPath) {
    try {
        const response = await $.get(`${extensionFolderPath}/spells.json`);
        allSpells = response;
        console.log('Loaded spells:', allSpells.length);
    } catch (error) {
        console.error('Error loading spells:', error);
        allSpells = [];
    }
}

// populate spell selectors with filtered spells
function PopulateSpellSelectors() {
    if (!characterData.class || allSpells.length === 0) {
        return;
    }
    
    const classData = DND_CLASSES[characterData.class];
    const className = characterData.class;
    
    // filter cantrips
    const cantrips = allSpells.filter(spell => 
        spell.level === 0 && 
        spell.classes.includes(className)
    );
    
    const cantripSelector = $('#cantripSelector');
    cantripSelector.empty();
    cantrips.forEach(spell => {
        if (!characterData.selectedCantrips.includes(spell.name)) {
            cantripSelector.append(`<option value="${spell.name}">${spell.name}</option>`);
        }
    });
    
    // filter spells by level and class
    PopulateSpellSelector();
}

// populate spell selector based on filter
function PopulateSpellSelector() {
    if (!characterData.class || allSpells.length === 0) {
        return;
    }
    
    const className = characterData.class;
    const levelFilter = $('#spellLevelFilter').val();
    const slots = GetSpellSlots();
    
    let maxSpellLevel = 0;
    if (slots) {
        for (let i = slots.length - 1; i >= 0; i--) {
            if (slots[i] > 0) {
                maxSpellLevel = i + 1;
                break;
            }
        }
    }
    
    const spells = allSpells.filter(spell => {
        if (spell.level === 0) return false;
        if (!spell.classes.includes(className)) return false;
        if (spell.level > maxSpellLevel) return false;
        if (levelFilter !== 'all' && spell.level !== parseInt(levelFilter)) return false;
        if (characterData.selectedSpells.includes(spell.name)) return false;
        return true;
    });
    
    const spellSelector = $('#spellSelector');
    spellSelector.empty();
    spells.forEach(spell => {
        spellSelector.append(`<option value="${spell.name}">${spell.name} (Level ${spell.level})</option>`);
    });
}

// add cantrip to selected list
function AddCantrip() {
    const selector = $('#cantripSelector');
    const selected = selector.val();
    
    if (!selected || selected.length === 0) {
        return;
    }
    
    const cantripsKnown = GetCantripsKnown();
    
    selected.forEach(spellName => {
        if (characterData.selectedCantrips.length >= cantripsKnown) {
            alert(`You can only know ${cantripsKnown} cantrips at level ${characterData.level}`);
            return;
        }
        
        if (!characterData.selectedCantrips.includes(spellName)) {
            characterData.selectedCantrips.push(spellName);
        }
    });
    
    UpdateSelectedSpellsDisplay();
    PopulateSpellSelectors();
}

// add spell to selected list
function AddSpell() {
    const selector = $('#spellSelector');
    const selected = selector.val();
    
    if (!selected || selected.length === 0) {
        return;
    }
    
    const spellsKnown = GetSpellsKnown();
    
    selected.forEach(spellName => {
        if (characterData.selectedSpells.length >= spellsKnown) {
            alert(`You can only know ${spellsKnown} spells at level ${characterData.level}`);
            return;
        }
        
        if (!characterData.selectedSpells.includes(spellName)) {
            characterData.selectedSpells.push(spellName);
        }
    });
    
    UpdateSelectedSpellsDisplay();
    PopulateSpellSelector();
}

// remove cantrip from selected list
function RemoveCantrip(spellName) {
    const index = characterData.selectedCantrips.indexOf(spellName);
    if (index > -1) {
        characterData.selectedCantrips.splice(index, 1);
    }
    UpdateSelectedSpellsDisplay();
    PopulateSpellSelectors();
}

// remove spell from selected list
function RemoveSpell(spellName) {
    const index = characterData.selectedSpells.indexOf(spellName);
    if (index > -1) {
        characterData.selectedSpells.splice(index, 1);
    }
    UpdateSelectedSpellsDisplay();
    PopulateSpellSelector();
}

// update display of selected spells
function UpdateSelectedSpellsDisplay() {
    const cantripsDiv = $('#selectedCantrips');
    const spellsDiv = $('#selectedSpells');
    
    const cantripsKnown = GetCantripsKnown();
    const spellsKnown = GetSpellsKnown();
    
    $('#cantripsKnown').text(`(${characterData.selectedCantrips.length}/${cantripsKnown})`);
    $('#spellsKnown').text(`(${characterData.selectedSpells.length}/${spellsKnown})`);
    
    // display selected cantrips
    let cantripsHtml = '';
    characterData.selectedCantrips.forEach(spellName => {
        cantripsHtml += `<div class="selected-spell-item" data-spell="${spellName}" data-type="cantrip">
            <span class="spell-name">${spellName}</span>
            <button class="remove-spell-btn">×</button>
        </div>`;
    });
    cantripsDiv.html(cantripsHtml || '<p class="subtle">No cantrips selected</p>');
    
    // display selected spells
    let spellsHtml = '';
    characterData.selectedSpells.forEach(spellName => {
        const spell = allSpells.find(s => s.name === spellName);
        const level = spell ? spell.level : '?';
        spellsHtml += `<div class="selected-spell-item" data-spell="${spellName}" data-type="spell">
            <span class="spell-name">${spellName} <small>(Lvl ${level})</small></span>
            <button class="remove-spell-btn">×</button>
        </div>`;
    });
    spellsDiv.html(spellsHtml || '<p class="subtle">No spells selected</p>');
}

// show spell tooltip
function ShowSpellTooltip(spellName, event) {
    const spell = allSpells.find(s => s.name === spellName);
    if (!spell) return;
    
    let html = `<div class="spell-tooltip-content">
        <h4>${spell.name}</h4>
        <p class="spell-level">${spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`} ${spell.school}</p>
        <p><strong>Casting Time:</strong> ${spell.actionType}</p>
        <p><strong>Range:</strong> ${spell.range}</p>
        <p><strong>Components:</strong> ${spell.components.join(', ').toUpperCase()}</p>
        ${spell.material ? `<p><strong>Materials:</strong> ${spell.material}</p>` : ''}
        <p><strong>Duration:</strong> ${spell.duration}${spell.concentration ? ' (Concentration)' : ''}</p>
        <p class="spell-description">${spell.description}</p>
        ${spell.cantripUpgrade ? `<p class="spell-upgrade"><strong>At Higher Levels:</strong> ${spell.cantripUpgrade}</p>` : ''}
    </div>`;
    
    const tooltip = $('#spellTooltip');
    tooltip.html(html);
    tooltip.css({
        display: 'block',
        left: event.pageX + 10 + 'px',
        top: event.pageY + 10 + 'px'
    });
}

// hide spell tooltip
function HideSpellTooltip() {
    $('#spellTooltip').hide();
}

// initialize character creator
function InitializeCharacterCreator(extensionFolderPath) {
    // populate race dropdown
    const raceSelect = $('#characterRace');
    for (let key in DND_RACES) {
        raceSelect.append(`<option value="${key}">${DND_RACES[key].name}</option>`);
    }
    
    // populate class dropdown
    const classSelect = $('#characterClass');
    for (let key in DND_CLASSES) {
        classSelect.append(`<option value="${key}">${DND_CLASSES[key].name}</option>`);
    }
    
    // populate background dropdown
    const backgroundSelect = $('#characterBackground');
    BACKGROUNDS.forEach(bg => {
        backgroundSelect.append(`<option value="${bg}">${bg}</option>`);
    });
    
    // populate alignment dropdown
    const alignmentSelect = $('#characterAlignment');
    ALIGNMENTS.forEach(align => {
        alignmentSelect.append(`<option value="${align}">${align}</option>`);
    });
    
    // populate weapons dropdown
    const weaponSelect = $('#characterWeapon');
    weaponSelect.append('<optgroup label="Simple Weapons">');
    WEAPONS.simple.forEach(weapon => {
        weaponSelect.append(`<option value="${weapon}">${weapon}</option>`);
    });
    weaponSelect.append('</optgroup>');
    weaponSelect.append('<optgroup label="Martial Weapons">');
    WEAPONS.martial.forEach(weapon => {
        weaponSelect.append(`<option value="${weapon}">${weapon}</option>`);
    });
    weaponSelect.append('</optgroup>');
    
    // populate instruments dropdown
    const instrumentSelect = $('#characterInstrument');
    INSTRUMENTS.forEach(instrument => {
        instrumentSelect.append(`<option value="${instrument}">${instrument}</option>`);
    });
    
    // load spells
    LoadSpells(extensionFolderPath);
    
    // event handlers
    $('#characterName').on('input', function() {
        characterData.name = $(this).val();
    });
    
    $('#characterRace').on('change', function() {
        characterData.race = $(this).val();
        UpdateAbilityScoreDisplays();
        UpdateCombatStats();
        UpdateRacialFeatures();
    });
    
    $('#characterClass').on('change', function() {
        characterData.class = $(this).val();
        UpdateCombatStats();
        UpdateClassFeatures();
        UpdateSpellcastingSection();
        
        // show instrument selection for bards
        if (characterData.class === 'bard') {
            $('#instrumentSection').show();
        } else {
            $('#instrumentSection').hide();
        }
    });
    
    $('#characterLevel').on('input', function() {
        let level = parseInt($(this).val());
        if (level < 1) level = 1;
        if (level > 20) level = 20;
        characterData.level = level;
        $(this).val(level);
        UpdateCombatStats();
        UpdateSpellcastingSection();
    });
    
    $('#characterBackground').on('change', function() {
        characterData.background = $(this).val();
    });
    
    $('#characterAlignment').on('change', function() {
        characterData.alignment = $(this).val();
    });
    
    $('#characterWeapon').on('change', function() {
        characterData.weapon = $(this).val();
    });
    
    $('#characterInstrument').on('change', function() {
        characterData.instrument = $(this).val();
    });
    
    $('#characterAC').on('input', function() {
        characterData.ac = parseInt($(this).val()) || 10;
    });
    
    // ability score inputs
    $('.ability-input').on('input', function() {
        const ability = $(this).data('ability');
        let value = parseInt($(this).val());
        
        if (value < 8) value = 8;
        if (value > 15) value = 15;
        
        characterData.abilityScores[ability] = value;
        $(this).val(value);
        
        UpdateAbilityScoreDisplays();
        UpdateCombatStats();
        UpdateSpellcastingSection();
    });
    
    // spell selection
    $('#addCantripBtn').on('click', AddCantrip);
    $('#addSpellBtn').on('click', AddSpell);
    $('#spellLevelFilter').on('change', PopulateSpellSelector);
    
    // spell tooltips
    $(document).on('mouseenter', '#cantripSelector option, #spellSelector option', function(e) {
        const spellName = $(this).val();
        ShowSpellTooltip(spellName, e);
    });
    
    $(document).on('mouseleave', '#cantripSelector option, #spellSelector option', function() {
        HideSpellTooltip();
    });
    
    $(document).on('mouseenter', '.selected-spell-item', function(e) {
        const spellName = $(this).data('spell');
        ShowSpellTooltip(spellName, e);
    });
    
    $(document).on('mouseleave', '.selected-spell-item', function() {
        HideSpellTooltip();
    });
    
    // remove spell buttons
    $(document).on('click', '.remove-spell-btn', function() {
        const parent = $(this).closest('.selected-spell-item');
        const spellName = parent.data('spell');
        const type = parent.data('type');
        
        if (type === 'cantrip') {
            RemoveCantrip(spellName);
        } else if (type === 'spell') {
            RemoveSpell(spellName);
        }
    });
    
    // initialize displays
    UpdateAbilityScoreDisplays();
    UpdateCombatStats();
}
