(function() {
    console.log('DaemoTavern extension loaded');

    // get sillytavern context
    const context = SillyTavern.getContext();

    // extension settings
    const extensionName = 'DaemoTavern';
    const defaultSettings = {
        enabled: true
    };

    // load settings
    function LoadSettings() {
        if (context.extensionSettings[extensionName] === undefined) {
            context.extensionSettings[extensionName] = defaultSettings;
        }
        console.log('DaemoTavern settings loaded:', context.extensionSettings[extensionName]);
    }

    // save settings
    function SaveSettings() {
        context.saveSettingsDebounced();
        console.log('DaemoTavern settings saved');
    }

    // initialize extension
    function Init() {
        LoadSettings();
        
        console.log('DaemoTavern initialized successfully');
        
        // show toast notification that extension loaded
        if (typeof toastr !== 'undefined') {
            toastr.info('DaemoTavern extension loaded!');
        }
    }

    // register extension
    jQuery(async () => {
        Init();
    });
})();
