const HEADER_COLOR = '#272727';
const HOVER_COLOR = '#151515';

addEventListener('DOMContentLoaded', function() {

    // Finds all <li> elements containing navigation-bar links
    sectionLink = document.querySelectorAll('.section-link');

    // For every <li> tag change background when hover
    for (let i = 0; i < sectionLink.length; i++) {

        sectionLink[i].addEventListener('mouseover', function() {
            sectionLink[i].style.backgroundColor = HOVER_COLOR;
        });

        sectionLink[i].addEventListener('mouseout', function() {
            sectionLink[i].style.backgroundColor = HEADER_COLOR;
        });

    }



})