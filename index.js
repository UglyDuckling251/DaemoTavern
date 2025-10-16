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
    }

    // load settings html
    async function LoadSettingsHtml() {
        const settingsHtml = await $.get(`${extensionFolderPath}/settings.html`);
        $('#extensions_settings2').append(settingsHtml);
    }

    // load dnd data and character creator scripts
    async function LoadCharacterCreatorScripts() {
        try {
            // load dnd data
            await $.getScript(`${extensionFolderPath}/dnd_data.js`);
            console.log('DnD data loaded');
            
            // load character creator logic
            await $.getScript(`${extensionFolderPath}/character_creator.js`);
            console.log('Character creator logic loaded');
        } catch (error) {
            console.error('Error loading character creator scripts:', error);
        }
    }

    // load popup button
    async function LoadPopupButton() {
        const iconHtml = `<div class="menu_button fa-solid fa-dragon interactable daemoTavern-icon" title="Daemo Tavern"></div>`;
        
        $('.form_create_bottom_buttons_block').prepend(iconHtml);
        $('#GroupFavDelOkBack').prepend(iconHtml);
        $('#form_character_search_form').prepend(iconHtml);
        
        const popupIcons = document.querySelectorAll('.daemoTavern-icon');
        
        popupIcons.forEach((icon) => {
            icon.addEventListener('click', async () => {
                const popupHtml = await $.get(`${extensionFolderPath}/popup.html`);
                context.callGenericPopup(popupHtml, 4, undefined, {
                    large: true,
                    wide: true
                });
                
                // initialize character creator after popup is shown
                setTimeout(() => {
                    if (typeof InitializeCharacterCreator === 'function') {
                        InitializeCharacterCreator(extensionFolderPath);
                    }
                }, 100);
            });
        });
    }

    // initialize extension
    async function Init() {
        await LoadSettingsHtml();
        LoadSettings();
        SetupEventHandlers();
        await LoadCharacterCreatorScripts();
        await LoadPopupButton();
        
        console.log('DaemoTavern initialized successfully');
    }

    // register extension
    jQuery(async () => {
        await Init();
    });
})();
