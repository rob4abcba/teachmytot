/* ADD THE HEADER */
var divHeader = document.getElementById("header");

var divLogo = document.createElement('div'); 
divLogo.setAttribute("id", "logo");

var imgElement = createImg(document, "baby", "baby", "public/images/logos/babies.png");
divLogo.appendChild(imgElement);

divHeader.appendChild(divLogo);

spanElement = createSpan(document, "TEACH MY TOT","headerTitle")
divHeader.appendChild(spanElement);

var divMenu = document.createElement('div'); 
divMenu.setAttribute("class", "menu");

imgElement = createImg(document, "buttonMenu", "menu", "public/images/menu.png");
divMenu.appendChild(imgElement);
divHeader.appendChild(divMenu);

function createImg(document, id, alt, src){
    var imageElement = document.createElement('img'); 
    imageElement.setAttribute("id", id);
    imageElement.setAttribute("alt", alt);
    imageElement.setAttribute("src", src);
    return imageElement;
}

/* ADD THE NAVIGATION MENU */
var linkInfo = [
    {   href:"addition.html",
        title:"ADDING NUMBERS"},
    {   href:"letters.html",
        title:"LETTERS"},         
    {   href:"numbers.html",
        title:"NUMBERS"},
    {   href:"/",
        title:"SHAPES AND COLORS"},
    {   href:"subtraction.html",
        title:"SUBTRACTING NUMBERS"},
];

var divMenu = document.getElementById("dropdownMenuContent");

linkInfo.forEach(function(item){
    var aMenu = createA(document, item);
    divMenu.appendChild(aMenu);
});

function createA(document, item){
    var aElement = document.createElement('a'); 
    aElement.setAttribute("href", item.href);
    aElement.innerHTML = item.title;
    return aElement;
}

/* ADD THE FOOTER */

var divFooter = document.getElementById("footer");
var spanFooter = createSpan(document, "&copy; 2018 TEACHMYTOT ", "");
divFooter.appendChild(spanFooter);

var footerInfo = {
    href:"/iconcredits.html",
    title:""
}

var aFooter = createA(document, footerInfo)
aFooter.appendChild(createImg(document, "iconCredit", "Icon Credits", "/public/images/logos/heart.png"));
divFooter.appendChild(aFooter);

function createSpan(document, text, className){
    var spanElement = document.createElement('span'); 
    spanElement.innerHTML = text;
    spanElement.setAttribute("class", className);
    return spanElement;
}


