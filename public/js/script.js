var temp = document.querySelector(".time");
var button = document.querySelector(".btn-start");
var words = document.querySelector(".words");
var timerDiv = document.querySelector(".time");
var scoreDiv = document.querySelector(".score");
var picture = document.querySelector(".picture");
var points = 0;
var spans;
var typed;
var seconds = 10;
var spark = new Audio("./sound/correct.opus");

function countdown() {
	points = 0;
	var timer = setInterval(function(){
        button.disabled = true;
        seconds--;
        temp.innerHTML = seconds;
        if (seconds === 0) {
            alert("Great job! Your have successfully typed " + points + " words.");
            scoreDiv.innerHTML = "0";
            words.innerHTML = "";
            picture.innerHTML = "";
            button.style.display = "initial";
            clearInterval(timer);
            seconds = 10;
            timerDiv.innerHTML = "10";
            button.disabled = false;
        }
	}, 1000);
 }

 function random() {
 	words.innerHTML = "";
    picture.innerHTML = "";
 	var random = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
 	var wordArray = data[random].word.split("");
 	for (var i = 0; i < wordArray.length; i++) { //building the words with spans around the letters
 		var span = document.createElement("span");
 		span.classList.add("span");
 		span.innerHTML = wordArray[i];
 		words.appendChild(span);
 	}
 	spans = document.querySelectorAll(".span");
    var img = document.createElement("img");
    img.src = data[random].image;
    picture.appendChild(img);
 }


 var data = [
        {word: "APPLE", image: "./images/apple.jpg"},
        {word: "KIWI", image: "./images/kiwi.jpg"}
    ];

 button.addEventListener("click", function(e){
 	countdown();
 	random();
 	button.style.display = "none";
 });


 function typing(e) {
 	typed = String.fromCharCode(e.which);
 	for (var i = 0; i < spans.length; i++) {
        if (spans[i].innerHTML === typed) { // if typed letter is the one from the word
            if (spans[i].classList.contains("bg")) { // if it already has class with the bacground color then check the next one
                continue;
            } else if (spans[i].classList.contains("bg") === false && spans[i-1] === undefined || spans[i-1].classList.contains("bg") !== false ) { // if it dont have class, if it is not first letter or if the letter before it dont have class (this is done to avoid marking the letters who are not in order for being checked, for example if you have two "A"s so to avoid marking both of them if the first one is at the index 0 and second at index 5 for example)
                spans[i].classList.add("bg");
                break;
            }
 		}
 	}
 	var checker = 0;
 	for (var j = 0; j < spans.length; j++) { //checking if all the letters are typed
 		if (spans[j].className === "span bg") {
 			checker++;
 		}
 		if (checker === spans.length) { // if so, animate the words with animate.css class
            spark.pause();
			spark.currentTime = 0;
            spark.play();
 			words.classList.add("animated");
 			words.classList.add("fadeOut");
 			points++; // increment the points
 			scoreDiv.innerHTML = points; //add points to the points div
 			document.removeEventListener("keydown", typing, false);
 			setTimeout(function(){
 				words.className = "words"; // restart the classes
 				random(); // give another word
 				document.addEventListener("keydown", typing, false);
 			}, 400);
 		}
 	}
 }

document.addEventListener("keydown", typing, false);