var letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var readNumbers = ["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty"];
var mandarin = ["零","一","二","三","四","五","六","七","八","九","十"];

// READS THE VALUE OF THE TITLE FIELD WHEN USER CLICKS THE SPEAK BUTTON
function speakTitle(document, lang){
    var title = document.getElementById('title');
    var utterance = new SpeechSynthesisUtterance(title.innerHTML);
    utterance.volume = 1;
    if (lang){
        utterance.lang = lang;
    }
    window.speechSynthesis.speak(utterance);
}

// SELECT A RANDOM LETTER AND COLOR
function randomLetter(document, colors){
    var letterElement = document.getElementById('letter');

    var letterIndex = Math.floor(Math.random() * letters.length); 

    var letterValue = letters[letterIndex].toUpperCase()

    updateTextWithFadeIn("#letter", letterValue);
    var title = document.getElementById('title');
    
    title.innerHTML = "Letter " + letterValue;
    letterElement.setAttribute("style", "color: " + randomColor(colors) + ";");
    
}

// SELECT A RANDOM NUMBER AND COLOR
function randomNumber(document, colors, lang){

    var maxNum;
    var numValue;

    if (lang == 'zh-CN'){
        maxNum = mandarin.length;
        var index = Math.floor(Math.random() * maxNum);
        numValue = index; 
        var transElement = document.getElementById('language');
        transElement.innerHTML = "MANDARIN: <span style='font-size:4vh;font-weight:bold'>" + mandarin[index] +'</span>';
    }
    else{
        maxNum = 20;
        numValue = Math.floor(Math.random() * maxNum); 
    }

    var numElement = document.getElementById('number');
    updateTextWithFadeIn("#number", numValue);
    var title = document.getElementById('title');
    
    if (lang){
        title.innerHTML = numValue;
    }
    else{
        title.innerHTML = "Number " + numValue;
    }
    
    numElement.setAttribute("style", "color: " + randomColor(colors) + ";");
    
}

// SELECT A RANDOM IMAGE
function randomImage(document, images, elementID){
    var image = document.getElementById(elementID);
    var index = Math.floor(Math.random() * images.length); 

    image.setAttribute("src", images[index].src)

    var title = document.getElementById('title');
    
    title.innerHTML = images[index].desc;
}

// SELECT A RANDOM ADD QUESTION
function randomAdd(document, colors){

    var max = 10;

    var element = document.getElementById('expression');
    element.setAttribute("style", "color: " + randomColor(colors) + ";");

    var a = Math.ceil(Math.random() * max); 
    var b = Math.ceil(Math.random() * max); 
    var sum = a + b

    updateTextWithFadeIn("#expression", a + "+" + b + "=?");

    var title = document.getElementById('title');
    
    title.innerHTML = a + "+" + b + "=" + sum;
    title.setAttribute("data-answer",readNumbers[a] + " + " + readNumbers[b] + "=" + readNumbers[sum]);
 
}


// SELECT A RANDOM SUBTRACT QUESTION
function randomSubtract(document, colors){

    var max = 10;

    var element = document.getElementById('expression');
    element.setAttribute("style", "color: " + randomColor(colors) + ";");

    var a = Math.ceil(Math.random() * max); 
    var b = Math.ceil(Math.random() * a); 

    var diff = a - b

    updateTextWithFadeIn("#expression", a + "-" + b + "=?");
    
    var title = document.getElementById('title');
    
    title.innerHTML = a + "-" + b + "=" + diff;
    title.setAttribute("data-answer",readNumbers[a] + " minus " + readNumbers[b] + "=" + readNumbers[diff]);
 
}

// FADE IN NEW IMAGE WHEN CLICKING NEXT
function updateImageWithFadeIn(elementID){
    $(elementID).on('load', function () {    
        $(elementID + "Div").css({
            opacity:'0'
        })
        .animate( { opacity:'1' }, { duration: 400})
    })
}
// SLIDE IN NEW TEXT WHEN CLICKING NEXT
function updateTextWithSlideIn(elementID,textValue){
    $(elementID).html(textValue).css({
        position:'relative',
        left: "-50%"
    })
    .animate({left: "0"}, { duration: 400} )
}

// FADE IN NEW TEXT WHEN CLICKING NEXT
function updateTextWithFadeIn(elementID,textValue){
    $(elementID).html(textValue).css({
        opacity:'0'
    })
    .animate({opacity:'1'}, { duration: 400} )
}

// SELECTS A RANDOM COLOR FROM THE ARRAY
function randomColor(colors){
    var colorIndex = Math.floor(Math.random() * colors.length); 
    return colors[colorIndex].hex;
}

// READS THE VALUE OF THE TITLE FIELD WHEN USER CLICKS THE SPEAK BUTTON
function speakAnswer(document){
    var title = document.getElementById('title');
   
    var utterance = new SpeechSynthesisUtterance($('#title').attr('data-answer'));
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
}

// DEFINE CLICK EVENTS FOR BUTTONSPEAK AND BUTTONMENU
function addButtonClicks(document, lang){
    $('#buttonAnswer').click(function(){
        var element = document.getElementById('expression');
        element.innerHTML = title.innerHTML;
        speakAnswer(document);
    });
    $('#buttonSpeak').click(function(){
        speakTitle(document, lang);
    });  
    
}

// DEFINE CLICK EVENT FOR BUTTONNEXT IN THE LETTERS PAGE
function addLetterNextClick(document, data){
    $('#buttonLetterNext').click(function(){
        randomLetter(document, data);
    });
}

// DEFINE CLICK EVENT FOR BUTTONNEXT IN THE NUMBERS PAGE
function addNumberNextClick(document, data, lang){
    $('#buttonNumberNext').click(function(){
        randomNumber(document, data, lang);
    });
}

// DEFINE CLICK EVENT FOR BUTTONNEXT IN THE SHAPES PAGE
function addImageNextClick(document, data, elementID){
    $('#buttonImageNext').click(function(){
        randomImage(document, data, elementID);
    });
    // ADD ANIMATION FOR IMAGE LOAD EVENT
    updateImageWithFadeIn(elementID)
}

// DEFINE CLICK EVENT FOR BUTTONNEXT IN THE ADDITION PAGE
function addAdditionNextClick(document, data){
    $('#buttonAdditionNext').click(function(){
        randomAdd(document, data);
    });
}

// DEFINE CLICK EVENT FOR BUTTONNEXT IN THE SUBTRACTION PAGE
function addSubtractionNextClick(document, data){
    $('#buttonSubtractionNext').click(function(){
        randomSubtract(document, data);
    });
}

// CLOSE THE DROPDOWN MENU IF USER CLICKS OUTSIDE OF IT
window.onclick = function(event) {
  if (!event.target.matches('.menuImage')) {

    var dropdowns = document.getElementsByClassName("dropdownMenuContent");

    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

