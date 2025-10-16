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
        const iconHtml = `<div class="menu_button fa-solid fa-dragon interactable daemoTavern-icon" title="Daemon Editor - Create/Edit Daemon Profile"></div>`;
        
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
                setTimeout(async () => {
                    if (typeof InitializeCharacterCreator === 'function') {
                        await InitializeCharacterCreator(extensionFolderPath);
                    }
                }, 100);
            });
        });
    }

    // generate stats text from profile data
    function GenerateStatsTextFromProfile(profile) {
        // use the GenerateStatsText function from character_creator.js if available
        if (typeof GenerateStatsText === 'function') {
            // temporarily set characterData to the profile
            const originalData = typeof characterData !== 'undefined' ? JSON.parse(JSON.stringify(characterData)) : null;
            characterData = profile;
            const text = GenerateStatsText();
            if (originalData) {
                characterData = originalData;
            }
            return text;
        }
        
        return '';
    }
    
    // get extension prompt for injection into ai
    function GetExtensionPrompt() {
        if (!context.extensionSettings[extensionName]?.statsEnabled) {
            return '';
        }
        
        // get current character id
        const characterId = context.characterId;
        if (!characterId) {
            return '';
        }
        
        // build profile key for current character
        let profileKey = `daemonProfile_char_${characterId}`;
        
        // get profile for current character
        const profile = context.extensionSettings[extensionName]?.profiles?.[profileKey];
        if (!profile) {
            return '';
        }
        
        // generate stats text from profile
        return GenerateStatsTextFromProfile(profile);
    }
    
    // get character profile for display
    function GetCharacterProfile(characterId) {
        if (!characterId) return null;
        
        const profileKey = `daemonProfile_char_${characterId}`;
        return context.extensionSettings[extensionName]?.profiles?.[profileKey] || null;
    }
    
    // create stat badges html
    function CreateStatBadges(profile) {
        if (!profile) return '';
        
        const hp = profile.hp || 0;
        const ac = profile.ac || 10;
        const speed = profile.speed || 30;
        const level = profile.level || 1;
        const className = profile.class ? (DND_CLASSES?.[profile.class]?.name || profile.class) : '';
        const raceName = profile.race ? (DND_RACES?.[profile.race]?.name || profile.race) : '';
        
        return `<div class="daemo-stat-badges">
            <span class="daemo-badge daemo-hp" title="Hit Points"><i class="fa-solid fa-heart"></i> ${hp}</span>
            <span class="daemo-badge daemo-ac" title="Armor Class"><i class="fa-solid fa-shield"></i> ${ac}</span>
            <span class="daemo-badge daemo-speed" title="Speed"><i class="fa-solid fa-person-running"></i> ${speed}</span>
            <span class="daemo-badge daemo-info" title="Race / Class / Level">${raceName} ${className} ${level}</span>
        </div>`;
    }
    
    // inject stat badges into message headers
    function InjectStatBadges() {
        const characterId = context.characterId;
        if (!characterId) return;
        
        const profile = GetCharacterProfile(characterId);
        if (!profile) return;
        
        // find all character message headers without badges
        $('.mes_block:not(.daemo-badges-added)').each(function() {
            const $mesBlock = $(this);
            
            // check if this is a character message (not user)
            if ($mesBlock.hasClass('last_mes') && !$mesBlock.find('.ch_name').length) {
                return; // skip user messages
            }
            
            // only add to character messages
            const $chName = $mesBlock.find('.ch_name');
            if ($chName.length > 0) {
                // check if badges already exist
                if (!$mesBlock.find('.daemo-stat-badges').length) {
                    const badgesHtml = CreateStatBadges(profile);
                    $chName.after(badgesHtml);
                    $mesBlock.addClass('daemo-badges-added');
                }
            }
        });
    }
    
    // setup stat badge injection
    function SetupStatBadges() {
        // inject badges on initial load
        setTimeout(() => {
            InjectStatBadges();
        }, 1000);
        
        // watch for new messages
        const observer = new MutationObserver((mutations) => {
            let shouldUpdate = false;
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length > 0) {
                    shouldUpdate = true;
                }
            });
            
            if (shouldUpdate) {
                InjectStatBadges();
            }
        });
        
        // observe chat container
        const chatContainer = document.getElementById('chat');
        if (chatContainer) {
            observer.observe(chatContainer, {
                childList: true,
                subtree: true
            });
        }
        
        // re-inject on character switch
        $(document).on('characterSelected', () => {
            setTimeout(() => {
                // remove old badges
                $('.daemo-stat-badges').remove();
                $('.mes_block').removeClass('daemo-badges-added');
                // inject new badges
                InjectStatBadges();
            }, 100);
        });
    }
    
    // setup prompt injection hook
    function SetupPromptInjection() {
        // register extension prompts
        if (window.setExtensionPrompt) {
            window.setExtensionPrompt(extensionName, GetExtensionPrompt, 100, 0);
        }
        
        // register slash command to toggle stats injection
        if (context.registerSlashCommand) {
            context.registerSlashCommand('daemo-stats', (args) => {
                const action = String(args).trim().toLowerCase() || 'toggle';
                
                if (action === 'on') {
                    context.extensionSettings[extensionName].statsEnabled = true;
                    toastr.success('Daemon Profile injection enabled', 'Daemon Tavern');
                } else if (action === 'off') {
                    context.extensionSettings[extensionName].statsEnabled = false;
                    toastr.info('Daemon Profile injection disabled', 'Daemon Tavern');
                } else {
                    // toggle
                    const enabled = !context.extensionSettings[extensionName]?.statsEnabled;
                    if (!context.extensionSettings[extensionName]) {
                        context.extensionSettings[extensionName] = {};
                    }
                    context.extensionSettings[extensionName].statsEnabled = enabled;
                    toastr.info(`Daemon Profile injection ${enabled ? 'enabled' : 'disabled'}`, 'Daemon Tavern');
                }
                
                context.saveSettingsDebounced();
                return '';
            }, [], '<span class="monospace">on/off/toggle</span> – Toggle D&D character stats injection into AI prompts', true, true);
        }
    }
    
    // initialize extension
    async function Init() {
        await LoadSettingsHtml();
        LoadSettings();
        SetupEventHandlers();
        await LoadCharacterCreatorScripts();
        await LoadPopupButton();
        SetupPromptInjection();
        SetupStatBadges();
        
        console.log('DaemoTavern initialized successfully');
    }

    // register extension
    jQuery(async () => {
        await Init();
    });
})();
