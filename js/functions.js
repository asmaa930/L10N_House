//! _________________________________________________________

function prepareDescription(description) {
    let regex = /L10N House/gmi;
    return description.replace(regex, `<span class="fw-medium"><span class="first-color">L10N</span> <span class="second-color">House</span></span>`);
}


//! _________________________________________________________

function openPopup(popupName) {
    let $popup = $(`.popup[data-popup-name='${popupName}']`);

    $('body').css('overflow-y', 'hidden');

    $popup.fadeIn(500, function () {

        if (popupName == 'languages') {
            $(this).find('.box').addClass('show');
        }
    });

    $popup[0].scrollTo(0, 0);
}

//! _________________________________________________________

function closePopup(popupName) {
    let $popup = $(`.popup[data-popup-name='${popupName}']`);

    if (popupName == 'languages') {
        $popup.find('.box').removeClass('show');

        $popup.delay(500).fadeOut(500, function () {
            $('body').css('overflow-y', 'auto');
        });

    } else {
        $popup.fadeOut(500, function () {
            $('body').css('overflow-y', 'auto');
        });
    }

}

//! _________________________________________________________

function prepareLanguages(languages) {
    let lis = ``;

    for (let language of languages) {
        lis += `<li><i class="fa-regular fa-circle-dot me-1"></i>${language}</li>`;
    }

    return lis;
}

//! _________________________________________________________

function preparePoints(points) {

    let lis = ``;

    for (let point of points) {
        lis += `<li>${point}</li>`;
    }

    return lis;
}

//! _________________________________________________________

function prepareServiceSections(sections) {

    let sectionsEle = ``;

    $(sections).each(function (index, section) {
        sectionsEle += `
            <section class="${(index != 0) ? 'mt-4' : ''}">
                <h5>${section.title}</h5>
                <ol>
                  ${preparePoints(section.points)}
                </ol>
            </section>
        `;
    });

    return sectionsEle;

}
//! _________________________________________________________

function showService(serviceIndex) {

    let currentService = services[serviceIndex];

    $(`.popup[data-popup-name='service'] .box .popup-body`).html(`
    
        <div class="s-title text-center mb-5">
            <h2 class="mb-0 fw-bold second-color">${currentService.title}</h2>
        </div>

        <div class="row mb-5">
            <div class="col-xl-6">
                <div class="item">
                    <p>${prepareDescription(currentService.description)}</p>
                </div>
            </div>
            <div class="col-xl-6">
                <div class="item">
                    <img src="images/${currentService.img}" class="img-fluid rounded-3" alt="${currentService.title}">
                </div>
            </div>
        </div>

        ${prepareServiceSections(currentService.sections)}
    `);

    openPopup('service');
}

//! _________________________________________________________

function checkNavOnScroll() {
    // if (window.scrollY > 20) {
    //     $('nav.navbar').addClass('scrolled');

    // } else {
    //     $('nav.navbar').removeClass('scrolled');
    // }


    $('nav.navbar').toggleClass('scrolled', window.scrollY > 20);
}

//! _________________________________________________________     


function scrollToSection(that) {

    let $sectionId = that.attr('href'),
        $section = $($sectionId),
        $sectionOffsetTop = $section.offset().top;

    window.scrollTo(0, $sectionOffsetTop - navbarHeight_1 + 35);
}
