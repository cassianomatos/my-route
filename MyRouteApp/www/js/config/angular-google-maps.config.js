app.config(function(uiGmapGoogleMapApiProvider, config) {
    uiGmapGoogleMapApiProvider.configure({
        key: config.googleKey,
        v: '3.30.5',
        libraries: 'weather,geometry,visualization',
        language: 'pt-br'
    }); 
}); 