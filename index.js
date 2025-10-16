(function() {
    console.log('DaemoTavern extension loaded');

    // get sillytavern context
    const context = SillyTavern.getContext();

    // extension settings
    const extensionName = 'DaemoTavern';
    const extensionFolderPath = 'scripts/extensions/third-party/Extension-DaemoTavern';
    const defaultSettings = {
        testCheckbox: false
    };

    // default character sheet data
    const defaultCharacterSheet = {
        level: 1,
        race: '',
        subrace: '',
        class: '',
        subclass: '',
        origin: '',
        hp_current: 10,
        hp_max: 10,
        ac: 10,
        speed: 30,
        str: 10,
        dex: 10,
        con: 10,
        int: 10,
        wis: 10,
        cha: 10,
        weapons: '',
        armor: '',
        instruments: '',
        other_equipment: '',
        cantrips: '',
        spells: '',
        spell_slots: '',
        backstory: ''
    };

    let currentEditingType = null;
    let currentEditingId = null;

    // load settings
    function LoadSettings() {
        if (context.extensionSettings[extensionName] === undefined) {
            context.extensionSettings[extensionName] = defaultSettings;
        }
        
        // apply settings to ui
        $('#test').prop('checked', context.extensionSettings[extensionName].testCheckbox);
        
        console.log('DaemoTavern settings loaded:', context.extensionSettings[extensionName]);
    }

    // save settings
    function SaveSettings() {
        context.extensionSettings[extensionName].testCheckbox = $('#test').prop('checked');
        context.saveSettingsDebounced();
        console.log('DaemoTavern settings saved');
    }

    // setup event handlers
    function SetupEventHandlers() {
        $('#test').on('change', function() {
            SaveSettings();
        });

        // daemo agent popup close
        $(document).on('click', '#daemo_agent_close', function() {
            $('#daemo_agent_popup').hide();
        });

        // daemo agent save button
        $(document).on('click', '#daemo_agent_save', function() {
            SaveCharacterSheet();
        });

        // ability score change handlers to update modifiers
        const abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
        abilities.forEach(ability => {
            $(document).on('input', `#daemo_${ability}`, function() {
                UpdateAbilityModifier(ability);
            });
        });

        // character button click handler
        $(document).on('click', '.daemo_agent_char_button', function() {
            const charId = context.characterId;
            if (charId !== undefined) {
                OpenCharacterSheet('character', charId);
            }
        });

        // persona button click handler
        $(document).on('click', '.daemo_agent_persona_button', function() {
            const personaName = context.name2;
            if (personaName) {
                OpenCharacterSheet('persona', personaName);
            }
        });
    }

    // calculate ability modifier
    function CalculateModifier(score) {
        return Math.floor((score - 10) / 2);
    }

    // update ability modifier display
    function UpdateAbilityModifier(ability) {
        const score = parseInt($(`#daemo_${ability}`).val()) || 10;
        const modifier = CalculateModifier(score);
        const modifierText = modifier >= 0 ? `(+${modifier})` : `(${modifier})`;
        $(`#daemo_${ability}_mod`).text(modifierText);
    }

    // get character sheet data
    function GetCharacterSheetData(type, id) {
        if (type === 'character') {
            const character = context.characters[id];
            if (character && character.data && character.data.extensions && character.data.extensions[extensionName]) {
                return character.data.extensions[extensionName];
            }
        } else if (type === 'persona') {
            // get persona data from extension settings
            if (context.extensionSettings[extensionName].personas && context.extensionSettings[extensionName].personas[id]) {
                return context.extensionSettings[extensionName].personas[id];
            }
        }
        return { ...defaultCharacterSheet };
    }

    // save character sheet data
    function SaveCharacterSheetData(type, id, data) {
        if (type === 'character') {
            const character = context.characters[id];
            if (character) {
                if (!character.data.extensions) {
                    character.data.extensions = {};
                }
                character.data.extensions[extensionName] = data;
                // save character data
                context.saveCharacterDebounced(id);
            }
        } else if (type === 'persona') {
            // save persona data to extension settings
            if (!context.extensionSettings[extensionName].personas) {
                context.extensionSettings[extensionName].personas = {};
            }
            context.extensionSettings[extensionName].personas[id] = data;
            context.saveSettingsDebounced();
        }
    }

    // load character sheet into ui
    function LoadCharacterSheetUI(data) {
        $('#daemo_level').val(data.level || 1);
        $('#daemo_race').val(data.race || '');
        $('#daemo_subrace').val(data.subrace || '');
        $('#daemo_class').val(data.class || '');
        $('#daemo_subclass').val(data.subclass || '');
        $('#daemo_origin').val(data.origin || '');
        $('#daemo_hp_current').val(data.hp_current || 10);
        $('#daemo_hp_max').val(data.hp_max || 10);
        $('#daemo_ac').val(data.ac || 10);
        $('#daemo_speed').val(data.speed || 30);
        $('#daemo_str').val(data.str || 10);
        $('#daemo_dex').val(data.dex || 10);
        $('#daemo_con').val(data.con || 10);
        $('#daemo_int').val(data.int || 10);
        $('#daemo_wis').val(data.wis || 10);
        $('#daemo_cha').val(data.cha || 10);
        $('#daemo_weapons').val(data.weapons || '');
        $('#daemo_armor').val(data.armor || '');
        $('#daemo_instruments').val(data.instruments || '');
        $('#daemo_other_equipment').val(data.other_equipment || '');
        $('#daemo_cantrips').val(data.cantrips || '');
        $('#daemo_spells').val(data.spells || '');
        $('#daemo_spell_slots').val(data.spell_slots || '');
        $('#daemo_backstory').val(data.backstory || '');

        // update all ability modifiers
        const abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
        abilities.forEach(ability => UpdateAbilityModifier(ability));
    }

    // get character sheet data from ui
    function GetCharacterSheetFromUI() {
        return {
            level: parseInt($('#daemo_level').val()) || 1,
            race: $('#daemo_race').val(),
            subrace: $('#daemo_subrace').val(),
            class: $('#daemo_class').val(),
            subclass: $('#daemo_subclass').val(),
            origin: $('#daemo_origin').val(),
            hp_current: parseInt($('#daemo_hp_current').val()) || 10,
            hp_max: parseInt($('#daemo_hp_max').val()) || 10,
            ac: parseInt($('#daemo_ac').val()) || 10,
            speed: parseInt($('#daemo_speed').val()) || 30,
            str: parseInt($('#daemo_str').val()) || 10,
            dex: parseInt($('#daemo_dex').val()) || 10,
            con: parseInt($('#daemo_con').val()) || 10,
            int: parseInt($('#daemo_int').val()) || 10,
            wis: parseInt($('#daemo_wis').val()) || 10,
            cha: parseInt($('#daemo_cha').val()) || 10,
            weapons: $('#daemo_weapons').val(),
            armor: $('#daemo_armor').val(),
            instruments: $('#daemo_instruments').val(),
            other_equipment: $('#daemo_other_equipment').val(),
            cantrips: $('#daemo_cantrips').val(),
            spells: $('#daemo_spells').val(),
            spell_slots: $('#daemo_spell_slots').val(),
            backstory: $('#daemo_backstory').val()
        };
    }

    // open character sheet editor
    function OpenCharacterSheet(type, id) {
        currentEditingType = type;
        currentEditingId = id;

        const data = GetCharacterSheetData(type, id);
        LoadCharacterSheetUI(data);

        // update popup title
        let title = 'Daemo Agent - Character Sheet';
        if (type === 'character' && context.characters[id]) {
            title = `Daemo Agent - ${context.characters[id].name}`;
        } else if (type === 'persona') {
            title = `Daemo Agent - ${id} (Persona)`;
        }
        $('.daemo_agent_character_name').text(title);

        $('#daemo_agent_popup').show();
    }

    // save character sheet
    function SaveCharacterSheet() {
        if (!currentEditingType || !currentEditingId) {
            console.error('No character/persona selected for editing');
            return;
        }

        const data = GetCharacterSheetFromUI();
        SaveCharacterSheetData(currentEditingType, currentEditingId, data);

        if (typeof toastr !== 'undefined') {
            toastr.success('Character sheet saved!');
        }

        $('#daemo_agent_popup').hide();
    }

    // add daemo agent button to character card
    function AddCharacterButton() {
        // remove existing button if any
        $('.daemo_agent_char_button').remove();

        // add button next to favorite button
        const favoriteButton = $('#fav_checkbox').closest('.avatar_fav_icon');
        if (favoriteButton.length > 0) {
            const daemoButton = $('<div class="daemo_agent_char_button avatar_fav_icon" title="Daemo Agent"><i class="fa-solid fa-dice-d20"></i></div>');
            favoriteButton.after(daemoButton);
        }
    }

    // add daemo agent button to persona editor
    function AddPersonaButton() {
        // remove existing button if any
        $('.daemo_agent_persona_button').remove();

        // add button next to edit persona button
        const editButton = $('#persona_description');
        if (editButton.length > 0) {
            const container = editButton.closest('.flex-container');
            if (container.length > 0) {
                const daemoButton = $('<div class="daemo_agent_persona_button menu_button" title="Daemo Agent"><i class="fa-solid fa-dice-d20"></i><span>Daemo Agent</span></div>');
                container.append(daemoButton);
            }
        }
    }

    // load settings html
    async function LoadSettingsHtml() {
        const settingsHtml = await $.get(`${extensionFolderPath}/settings.html`);
        $('#extensions_settings2').append(settingsHtml);
    }

    // load character editor html
    async function LoadCharacterEditorHtml() {
        const editorHtml = await $.get(`${extensionFolderPath}/character_editor.html`);
        $('body').append(editorHtml);
    }

    // initialize extension
    async function Init() {
        await LoadSettingsHtml();
        await LoadCharacterEditorHtml();
        LoadSettings();
        SetupEventHandlers();

        // add buttons when character changes
        context.eventSource.on('CHARACTER_MESSAGE_RENDERED', AddCharacterButton);
        context.eventSource.on('characterSelected', AddCharacterButton);
        context.eventSource.on('USER_MESSAGE_RENDERED', AddPersonaButton);

        // add initial buttons
        AddCharacterButton();
        AddPersonaButton();
        
        console.log('DaemoTavern initialized successfully');
        
        // show toast notification that extension loaded
        if (typeof toastr !== 'undefined') {
            toastr.info('DaemoTavern extension loaded!');
        }
    }

    // register extension
    jQuery(async () => {
        await Init();
    });
})();
