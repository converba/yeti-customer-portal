define(function (require) {
  return {
    apiBaseURI: 'https://API_SERVER.COM/', // Base URI for API requests
    language: 'en-US', // Localization code
    theme: {
      colors: {
        primary: '#b5241d',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c'
      },
      showLogoText: false, // show title in header near logo
      customLogoPath: '/assets/img/logo.png' // absolute path or URI
    }
  };
});
