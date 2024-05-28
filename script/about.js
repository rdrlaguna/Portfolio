

document.addEventListener('DOMContentLoaded', function() {

    let icons = document.querySelectorAll('.program-icon');

    let language = document.createElement('p');
    language.className = 'language';
    language.innerHTML = 'TEST';

    for (let i = 0; i < icons.length; i++) {
        
        //alert(icons[i]);

        icons[i].addEventListener('mouseover', function() {
            icons[i].classList.add('active-icon');
            //icons[i].append(language);

        });

        icons[i].addEventListener('mouseout', function() {
            icons[i].classList.remove('active-icon');
        });
    }
})