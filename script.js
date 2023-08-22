window.addEventListener('scroll', function() {
    const header = document.querySelector('.sticky-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


fetch('translations.json')
    .then(response => response.json())
    .then(data => {
        translatePage(data);
    });


    function translatePage(translations) {
        // Get the language selected by the user from the select element
        let lang = document.querySelector('.selector').value;
    
        // Find all elements with the data-translate attribute
        let elements = document.querySelectorAll('[data-translate]');
    
        // Iterate through those elements and apply translations
        elements.forEach(element => {
            let key = element.getAttribute('data-translate');
            let translation = translations[lang][key];
    
            // Apply the translation
            if (translation) {
                element.innerHTML = translation;
            }
        });
    }

    
    document.querySelector('.selector').addEventListener('change', () => {
        // Reload translations when language is changed
        fetch('translations.json')
            .then(response => response.json())
            .then(data => {
                translatePage(data);
            });
    });
    

    function changeLanguage(language) {
    var currentUrl = window.location.href;
    
    // Remove any existing language parameter
    var updatedUrl = currentUrl.replace(/[?&]lang=\w+/, '');

    // Append the new language parameter
    if (updatedUrl.indexOf('?') === -1) {
        updatedUrl += '?lang=' + language;
    } else {
        updatedUrl += '&lang=' + language;
    }
    
    window.location.href = updatedUrl;
}
