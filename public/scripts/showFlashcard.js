var letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var readNumbers = ["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty"];

// READS THE VALUE OF THE TITLE FIELD WHEN USER CLICKS THE SPEAK BUTTON
function speakTitle(document){
    var title = document.getElementById('title');
    var utterance = new SpeechSynthesisUtterance(title.innerHTML);
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
}

// SELECT A RANDOM LETTER AND COLOR
function randomLetter(document, colors){
    var letterElement = document.getElementById('letter');

    var letterIndex = Math.floor(Math.random() * letters.length); 

    var letterValue = letters[letterIndex].toUpperCase()

    letterElement.innerHTML = letterValue;
    
    var title = document.getElementById('title');
    
    title.innerHTML = "Letter " + letterValue;
    letterElement.setAttribute("style", "color: " + randomColor(colors) + ";");
    
}

// SELECT A RANDOM NUMBER AND COLOR
function randomNumber(document, colors){
    var maxNum = 20;

    var numElement = document.getElementById('number');

    var numValue = Math.floor(Math.random() * maxNum); 

    numElement.innerHTML = numValue;
    
    var title = document.getElementById('title');
    
    title.innerHTML = "Number " + numValue;
    numElement.setAttribute("style", "color: " + randomColor(colors) + ";");
    
}

// SELECT A RANDOM SHAPE
function randomShapes(document, shapes){
    var image = document.getElementById('shape');
    var shapeIndex = Math.floor(Math.random() * shapes.length); 
    
    image.setAttribute("src", shapes[shapeIndex].src);
    
    var title = document.getElementById('title');
    
    title.innerHTML = shapes[shapeIndex].desc;
}

// SELECT A RANDOM ADD QUESTION
function randomAdd(document, colors){

    var max = 10;

    var element = document.getElementById('expression');
    element.setAttribute("style", "color: " + randomColor(colors) + ";");

    var a = Math.ceil(Math.random() * max); 
    var b = Math.ceil(Math.random() * max); 
    var sum = a + b

    element.innerHTML = a + "+" + b + "=?";
    
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

    element.innerHTML = a + "-" + b + "=?";
    
    var title = document.getElementById('title');
    
    title.innerHTML = a + "-" + b + "=" + diff;
    title.setAttribute("data-answer",readNumbers[a] + " minus " + readNumbers[b] + "=" + readNumbers[diff]);
 
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

// DEFINE CLICK EVENTS FOR BUTTONSPEAK, BUTTONNEXT AND BUTTONMENU
function addButtonClicks(window, document){
    $('#buttonAnswer').click(function(){
        var element = document.getElementById('expression');
        element.innerHTML = title.innerHTML;
        speakAnswer(document);
    });

    $('#buttonSpeak').click(function(){
        speakTitle(document);
    });


    $('#buttonNext').click(function(){
        window.location.reload();
    });
    
    $('#buttonMenu').click(function(){
        if ($('#dropdownMenuContent').hasClass('show')){
            $('#dropdownMenuContent').addClass('hide');
            $('#dropdownMenuContent').removeClass('show');
        }
        else{
            $('#dropdownMenuContent').addClass('show');
            $('#dropdownMenuContent').removeClass('hide');
        }
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

