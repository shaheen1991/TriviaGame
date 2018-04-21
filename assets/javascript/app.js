$(document).ready(function() {
	
	function initialScreen() {
		startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
		$(".mainArea").html(startScreen);
	}
	
	initialScreen();
	
	
	$("body").on("click", ".start-button", function(event){
		event.preventDefault(); 
		clickSound.play();
		generateHTML();
	
		timerWrapper();
	
	}); //start-button click
	
	$("body").on("click", ".answer", function(event){
		clickSound.play();
		selectedAnswer = $(this).text();
		if(selectedAnswer === correctAnswers[questionCounter]) {
	
			clearInterval(theClock);
			generateWin();
		}
		else {
			clearInterval(theClock);
			generateLoss();
		}
	}); // Close .answer click
	
	$("body").on("click", ".reset-button", function(event){
		clickSound.play();
		resetGame();
	}); // Closes reset-button click
	
	});  //  Closes jQuery wrapper
	
	function generateLossDueToTimeOut() {
		unansweredTally++;
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/x.png'>";
		$(".mainArea").html(gameHTML);
		setTimeout(wait, 4000); 
	}
	
	function generateWin() {
		correctTally++;
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
		$(".mainArea").html(gameHTML);
		setTimeout(wait, 4000);
	}
	
	function generateLoss() {
		incorrectTally++;
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/x.png'>";
		$(".mainArea").html(gameHTML);
		setTimeout(wait, 4000);
	}
	
	function generateHTML() {
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
		$(".mainArea").html(gameHTML);
	}
	
	function wait() {
		if (questionCounter < 9) {
		questionCounter++;
		generateHTML();
		counter = 30;
		timerWrapper();
		}
		else {
			finalScreen();
		}
	}
	
	function timerWrapper() {
		theClock = setInterval(thirtySeconds, 1000);
		function thirtySeconds() {
			if (counter === 0) {
				clearInterval(theClock);
				generateLossDueToTimeOut();
			}
			if (counter > 0) {
				counter--;
			}
			$(".timer").html(counter);
		}
	}
	
	function finalScreen() {
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
		$(".mainArea").html(gameHTML);
	}
	
	function resetGame() {
		questionCounter = 0;
		correctTally = 0;
		incorrectTally = 0;
		unansweredTally = 0;
		counter = 30;
		generateHTML();
		timerWrapper();
	}
	
	var startScreen;
	var gameHTML;
	var counter = 30;
	var questionArray = ["Which is the only American state to begin with the letter 'p'?", "What is the world's biggest island?", "What is the world's longest river?", "What is the world's largest ocean?", "What is the capital of China?", "Which country is Prague in?", "What is the capital of Colombia?", "What is the capital of India?", "What is the diameter of Earth?", "Which English town was a forerunner of the Parks Movement and the first city in Europe to have a street tram system?"];
	var answerArray = [["Pennsylvania","Philadelphia","Phoenix","Portland"], ["New Guinea","Greenland","Borneo","Madagascar"], ["Nile", "Yukon", "Amazon", "Congo"], ["Pacific", "Southern Ocean", "Arctic", "Indian Ocean"], ["Hong Kong", "Macau", "Shanghai", "Beijing"], ["Czech Republic","Italy","Russia","France"], ["Medellin", "Bogota", "Cartagena", "Cali"], ["Mumbai","Hyderabad","Bangalore","New Delhi"], ["12,590 Miles","8000 Miles","9500 Miles","30,000 Miles"], ["London","Oxford","Birkenhead","York"]];
	var imageArray = ["<img class='center-block img-right' src='assets/images/Pennsylvania.png'>", "<img class='center-block img-right' src='assets/images/Greenland.png'>", "<img class='center-block img-right' src='assets/images/amazon.png'>", "<img class='center-block img-right' src='assets/images/pacific.png'>", "<img class='center-block img-right' src='assets/images/china.png'>", "<img class='center-block img-right' src='assets/images/Czech-Republic.png'>", "<img class='center-block img-right' src='assets/images/colombia.png'>", "<img class='center-block img-right' src='assets/images/india.png'>", "<img class='center-block img-right' src='assets/images/earth.png'>", "<img class='center-block img-right' src='assets/images/england.png'>"];
	var correctAnswers = ["A. Pennsylvania", "B. Greenland", "C. Amazon", "A. Pacific", "D. Beijing", "A. Czech Republic", "B. Bogota", "D. New Delhi", "B. 8000 Miles", "C. Birkenhead"];
	var questionCounter = 0;
	var selecterAnswer;
	var theClock;
	var correctTally = 0;
	var incorrectTally = 0;
	var unansweredTally = 0;
	var clickSound = new Audio("assets/sound/button-click.mp3");