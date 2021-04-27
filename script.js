
// document.body.classList.add('container');

//Create Navbar using bootstrap classes

let nav = createDomElement('nav', document.body, [['class', 'navbar navbar-expand-lg navbar-light bg-light']]);
// let toggle = createDomElement('button', nav, [['class', "navbar-toggler"], ['type', "button"], ['data-toggle', "collapse"],
// ['data-target', "#navbarSupportedContent"], ['aria-controls', "navbarSupportedContent"], ['aria-expanded', "false"], ['aria-label', "Toggle navigation"]]);
// createDomElement('span', toggle, [['class', "navbar-toggler-icon"]]);
let links = createDomElement('div', nav, [['class', "collapse navbar-collapse"], ['id', "navbarSupportedContent"]]);
let navbarList = createDomElement('ul', links, [['class', "navbar-nav mr-auto"]]);
let navHome = createDomElement('li', navbarList, [['class', "nav-item active"]]);
let home = createDomElement('a', navHome, [['class', "nav-link"]], [['textContent', 'HOME'], ['onclick', () => { navigate('home', navHome) }]]);
let navWorld = createDomElement('li', navbarList, [['class', "nav-item"]]);
let world = createDomElement('a', navWorld, [['class', "nav-link"]], [['textContent', 'WORLD'], ['onclick', () => { navigate('world', navWorld) }]]);
let navPolitics = createDomElement('li', navbarList, [['class', "nav-item"]]);
let politics = createDomElement('a', navPolitics, [['class', "nav-link"]], [['textContent', 'POLITICS'], ['onclick', () => { navigate('politics', navPolitics) }]]);
let navMagazine = createDomElement('li', navbarList, [['class', "nav-item"]]);
let magazine = createDomElement('a', navMagazine, [['class', "nav-link"]], [['textContent', 'MAGAZINE'], ['onclick', () => { navigate('magazine', navMagazine) }]]);
let navTechnology = createDomElement('li', navbarList, [['class', "nav-item"]]);
let technology = createDomElement('a', navTechnology, [['class', "nav-link"]], [['textContent', 'TECHNOLOGY'], ['onclick', () => { navigate('technology', navTechnology) }]]);
let navScience = createDomElement('li', navbarList, [['class', "nav-item"]]);
let science = createDomElement('a', navScience, [['class', "nav-link"]], [['textContent', 'SCIENCE'], ['onclick', () => { navigate('science', navScience) }]]);
let navHealth = createDomElement('li', navbarList, [['class', "nav-item"]]);
let health = createDomElement('a', navHealth, [['class', "nav-link"]], [['textContent', 'HEALTH'], ['onclick', () => { navigate('health', navHealth) }]]);
let navSports = createDomElement('li', navbarList, [['class', "nav-item"]]);
let sports = createDomElement('a', navSports, [['class', "nav-link"]], [['textContent', 'SPORTS'], ['onclick', () => { navigate('sports', navSports) }]]);
let navArts = createDomElement('li', navbarList, [['class', "nav-item"]]);
let arts = createDomElement('a', navArts, [['class', "nav-link"]], [['textContent', 'ARTS'], ['onclick', () => { navigate('arts', navArts) }]]);
let navFashion = createDomElement('li', navbarList, [['class', "nav-item"]]);
let fashion = createDomElement('a', navFashion, [['class', "nav-link"]], [['textContent', 'FASHION'], ['onclick', () => { navigate('fashion', navFashion) }]]);
let navFood = createDomElement('li', navbarList, [['class', "nav-item"]]);
let food = createDomElement('a', navFood, [['class', "nav-link"]], [['textContent', 'FOOD'], ['onclick', () => { navigate('food', navFood) }]]);
let navTravel = createDomElement('li', navbarList, [['class', "nav-item"]]);
let travel = createDomElement('a', navTravel, [['class', "nav-link"]], [['textContent', 'TRAVEL'], ['onclick', () => { navigate('travel', navTravel) }]]);


// Render home page
let horizontal = createDomElement('hr', document.body, [['style', '5px black']])
let displayMain = createDomElement('div', document.body, [['class', 'row']]);
navigate('home', navHome);

function navigate(section, parent) {
    document.getElementsByClassName('active')[0].classList.remove('active');
    parent.classList.add('active');
    while(displayMain.firstChild) {
        displayMain.removeChild(displayMain.lastChild);
    }
    downloadSectionData(section);
}

async function downloadSectionData(section) {
    try {
        let resp = await fetch('https://api.nytimes.com/svc/topstories/v2/'+ section +
         '.json?api-key=WQw590DmNpAVeUnp2wzQ9vknQhqETk3T');
        if (resp.status >= 200) {
            let data = await resp.json();
            console.log(data);
            renderMain(section, data);
        }
    } catch (error) {
        console.log(error)
    }

}

function renderMain(section, data) {
    data.results.forEach((val) => {
        renderCard(val, section.toUpperCase());
    })
}

function renderCard(data, section) {
    let colCard = createDomElement('div', displayMain, [['class', 'col-12']]);
    let card = createDomElement('div', colCard, [['class', 'card']]);
    let cardRow = createDomElement('div', card, [['class', 'row']]);
    let cardBody = createDomElement('div', cardRow, [['class', 'card-body col-md-8']]);
    createDomElement('p', cardBody, [['class', 'section-card']], [['textContent', section]]);
    createDomElement('p', cardBody, [['class', 'titlecard']], [['textContent', data.title]]);
    const createdDate = new Date(data.created_date);
    createDomElement('p', cardBody, [['class', 'date-card']], [['textContent', new Intl.DateTimeFormat('en-US', {month:'long'}).format(createdDate) + ' ' + createdDate.getDate()]]);
    createDomElement('p', cardBody, [['class', 'abstract-card']], [['textContent', data.abstract]]);
    createDomElement('a', cardBody, [['href', data.url], ['class', 'continueReading'], ['target', '_blank']], [['textContent', 'Continue reading...']]);
    createDomElement('img', cardRow, [['class', 'img-thumbnail col-md-4 p-0 m-0'], ['src', data.multimedia[4].url]]);    
}

function createDomElement(elemtype, parent, attributes = [], properties = []) {
    let elem = document.createElement(elemtype);
    attributes.forEach((value) => {
        elem.setAttribute(value[0], value[1]);
    })
    properties.forEach((val) => {
        elem[val[0]] = val[1];
    })
    parent.append(elem);
    return elem;
}