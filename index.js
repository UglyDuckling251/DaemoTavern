(function() {
    console.log('DaemoTavern extension loaded');

    // get sillytavern context
    const context = SillyTavern.getContext();

    // extension settings
    const extensionName = 'DaemoTavern';
    const extensionFolderPath = 'scripts/extensions/third-party/Extension-DaemoTavern';
    const defaultSettings = {
        useFunctionTool: false
    };

    // load settings
    function LoadSettings() {
        if (context.extensionSettings[extensionName] === undefined) {
            context.extensionSettings[extensionName] = defaultSettings;
        }
        
        // apply settings to ui
        $('#dice_function_tool').prop('checked', context.extensionSettings[extensionName].useFunctionTool);
        
        console.log('DaemoTavern settings loaded:', context.extensionSettings[extensionName]);
    }

    // save settings
    function SaveSettings() {
        context.extensionSettings[extensionName].useFunctionTool = $('#dice_function_tool').prop('checked');
        context.saveSettingsDebounced();
        console.log('DaemoTavern settings saved');
    }

    // setup event handlers
    function SetupEventHandlers() {
        $('#dice_function_tool').on('change', function() {
            SaveSettings();
        });
    }

    // load settings html
    async function LoadSettingsHtml() {
        const settingsHtml = await $.get(`${extensionFolderPath}/settings.html`);
        $('#extensions_settings2').append(settingsHtml);
    }

    // initialize extension
    async function Init() {
        await LoadSettingsHtml();
        LoadSettings();
        SetupEventHandlers();
        
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
