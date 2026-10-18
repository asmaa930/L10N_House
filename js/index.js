let services = null,
    $popupBoxes = $('.popup .box'),
    navbarHeight_1 = $('nav').outerHeight(),
    $sections = $('header , section[id]'),
    landingPage = $('#LoadingPage'),
    body = $('body'),
    scrollTopBtn = $('#Scroll_Up'),
    isHovered = false;

// !------------------------------------------------------------------
checkNavOnScroll();


new WOW({
    animateClass: 'animate__animated',
}).init();

// !------------------------------------------------------------------

$(document).ready(function () {

    $(".owl-carousel").owlCarousel({
        items: 5,
        margin: 10,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        slideBy: 5,
        dots: true,

        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 2
            },
            650: {
                items: 3
            },
            850: {
                items: 4
            },
            1050: {
                items: 5
            },
            1250: {
                items: 5
            }
        }
    });

});

// !------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {

    landingPage.fadeOut(1000, function () {
        body.attr('style', 'overflow-y:auto');
    });

});

// !------------------------------------------------------------------

(async function () {
    let response = await fetch('https://semicode.tech/api/v1/l10nhouse/services');

    services = await response.json(),

        i = 0;

    for (let service of services) {
        $('#Services .row').append(`

            <div class="box col-md-6 wow ${((i + 1) % 2 == 0) ? 'animate__backInRight' : 'animate__backInLeft'}" data-wow-delay="${i * 0.2}s" data-wow-duration="1.5s">
                <div class="item rounded-4 py-4 px-3 px-lg-4 px-xxl-5">
                    <img src="images/${service.icon}" class="img-fluid" alt="${service.title}">
                    <h5 class="my-3">${service.title}</h5>
                    <p class="mb-0">${prepareDescription(service.description.slice(0, 150))}... <span class="first-color service-opener" onclick="showService(${i})">Read More</span></p>
                </div>
            </div>

        `);

        i++;
    }

})();



// !------------------------------------------------------------------   //! ????????????????? wow not work

(async function () {
    let response = await fetch('https://semicode.tech/api/v1/l10nhouse/sectors'),
        sectors = await response.json(),

        i = 0;

    for (let sector of sectors) {
        $('.popup[data-popup-name="sectors"] .popup-body .row').append(`

            <div class="col-md-6 col-xl-3">
                <div class="item rounded-3 p-3 text-center">
                    <img src="images/sec/${sector.icon}" alt="${sector.name}" class="img-fluid wow animate__jello" data-wow-duration-"0.5s"> 
                    <p class="mb-0 mt-3 text-dark rounded-1">${sector.name}</p>
                </div>
            </div>

        `);

        i++;
    }
})();

// !------------------------------------------------------------------

(async function () {
    let response = await fetch('https://semicode.tech/api/v1/l10nhouse/languages'),
        languages = await response.json(),

        i = 0;

    for (let language of languages) {
        $('.popup[data-popup-name="languages"] .sections').append(`
            
            <div class="section">
                <h5>${language.continent}</h5>
                <ul class="list-unstyled">
                    ${prepareLanguages(language.languages)}
                </ul>
            </div>

        `);

        i++;
    }
})();

// !------------------------------------------------------------------

$popupBoxes.click(function (e) {
    e.stopPropagation();
});

// !------------------------------------------------------------------

$(document).on('scroll', function () {
    checkNavOnScroll();

    $sections.each(function (index, section) {
        let $section = $(section),
            sectionId = $section.attr('id'),
            sectionTop = $section.offset().top,
            sectionBottom = sectionTop + $section.outerHeight(),
            navbarHeight_2 = $('nav').outerHeight(),
            scrollY = window.scrollY + navbarHeight_2;

        if (scrollY > sectionTop && scrollY < sectionBottom) {
            $('.nav-link.active').removeClass('active');
            $(`.nav-link[href="#${sectionId}"]`).addClass('active');
        }
    });


    // !----------- scrollTopBtn --------------


    if ((window.scrollY <= window.innerHeight / 2) && !isHovered) {
        scrollTopBtn.addClass('hide');

    } else {
        scrollTopBtn.removeClass('hide');
    }

});

// !----------- scrollTopBtn --------------

scrollTopBtn.hover(
    // mouseenter
    function () {
        isHovered = true;
    },

    // mouseleave
    function () {
        isHovered = false;

        if (window.scrollY <= window.innerHeight / 2) {
            scrollTopBtn.addClass('hide');
        }
    }
);

// !------------------------------------------------------------------

scrollTopBtn.click(function () {
    window.scrollTo(0, 0);
});

// !------------------------------------------------------------------   //! ?????????????????

//? navbar links , arrows down , anchor scroll to video section
// $('nav .nav-link[href] , .arrows , a[href="#Video"]').click(function (e) {
//     e.preventDefault();


//     if ($(this).parents('.navbar-collapse').hasClass('show')) {
//         $(".navbar-toggler").click();
//     }
//     scrollToSection($(this));
// });


// //? Navbar links, down arrows, and the anchor link to the video section
$('nav .nav-link[href], .arrows, a[href="#Video"]').click(function (e) {
    e.preventDefault();

    let timeFunction = 1;

    if (window.scrollY < 25 && ($(this).attr('href') != '#Home')) {
        scrollTo(0, 25);
        timeFunction = 80;
    }

    setTimeout(() => {

        navbarHeight_1 = $("nav").outerHeight();

        scrollToSection($(this));
    }, timeFunction);
});