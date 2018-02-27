//
// Declare the questions for the game
//

var q1 = new Question("What is Elliot's pet cat named after? ", questionType.multipleChoice, 1,
 './assets/images/qwerty.png','Qwerty is named after the latin keyboard, the first six letters on the keyboard are Q-W-E-R-T-Y', ["Norse God of Mischief","The Latin Keyboard","Roman goddess of semiconductors"]);

var q2 = new Question("What novel by Leo Tolstoy is being read by Mr. Robot? ", questionType.multipleChoice, 0, 
'./assets/images/tolstoy.jpg','Mr. Robot is frequently seen with the Resurrection novel. The novel advances the principle of Georgism. an attempt to integrate economics with social justice. ',["Resurrection","What is Art?","A Confession", "Anna Karenina","War & Peace"]);
var q3 = new Question("What two languages are featured on Mr. Robot? ", questionType.multipleChoice, 2, 
'./assets/images/python.jpg','Python is the featured language on Mr. Robot although Ruby was also seen in season 2.',["JavaScript/PHP","C++/C?","Ruby/Python", "Swift/Go"]);
var q4 = new Question("Whiterose is an anagram for otherwise? ", questionType.trueFalse, 0, 
'./assets/images/whiterose.jpg', 'The Chinese Minister of Security Zhi Zhang is OTHERWISE known as Whiterose, leader of the Dark Army');
var q5 = new Question("Mr. Robot is Elliot's Brother? ", questionType.trueFalse, 1, 
'./assets/images/mrRobot.jpg', "Mr. Robot is Edward Aldeson, the father of Elliot");
var q6 = new Question("fSociety is a group of hackers created by Mr. Robot? ", questionType.trueFalse, 0, 
'./assets/images/fSociety.jpg', "Mr. Robot recruited Elliot to join fSociety");
var q7 = new Question("eCorp is the company in which fSociety is trying to take down? ", questionType.trueFalse, 0, 
'./assets/images/ecorp.jpg',"The eCorp logo is similar in design to the old Dell logo as well as the Enron logo.  It is the target of fSociety");
var q8 = new Question("Elliot's job is a cyber security engineer? ", questionType.trueFalse, 0, 
'./assets/images/allsafe.png',"Elliot was one of the most trusted engineers at AllSafe.  A cyber security firm.");
var q9 = new Question("What is the primary goal of fSociety? ", questionType.multipleChoice, 1, 
'./assets/images/atm.jpg',"Unfortunately for Elliot and Mr. Robot, the destruction of records as a result of 5/9 did not have the intended impact.",["world domination","cancel all debts","entertainment"]);

var theQuestions = [q1, q2,q3,q4, q5, q6, q7, q8, q9];
var randomQuestion;
var displayedQuestions = [];
var mrRobot;
var questionInterval;
var setTimeLimit = 15;
var questionIntervalCount = 0;
var robotWins = 0;
var robotLosses = 0;
var value;
var index;

$(document).ready(function(){

  initialImages(); 
  mrRobot = setInterval(mrRobotQuestions,15000);
  $('#answerContainer').on("click","input", function(){
  // stop the timer

     
    value = $(this).data("value");
    index = $(this).data("index");
    questionResult(index, value);
     
   });

   //The play again button was not available at bind
   //Delegating the event listener to the #answerText element
   $('#answerText').on("click","#playAgain", function(){
     
     //Need to reset all global variables
     resetGlobals();
     clearPreviousGameQuestion();
     initialImages();
     mrRobot = setInterval(mrRobotQuestions,15000);
   });
     
});
function resetGlobals(){
 displayedQuestions = [];
 questionIntervalCount = 0;
 robotWins = 0;
 robotLosses = 0;
}

function mrRobotQuestions(){
  randomQuestion = selectQuestion();
  archiveQuestion(randomQuestion);
  clearPreviousGameQuestion();
  displayQuestion(randomQuestion);
   
    
  if(displayedQuestions.length  === theQuestions.length + 1){
    //Game is over ... stop timer
    clearInterval(mrRobot);
    clearInterval(questionInterval); 
    //Display results
    clearPreviousGameQuestion();
    displayGameResults();
    }
}

function initialImages(){
  var solutionHTML = '<h4> You correctly answered '+ robotWins +' out of '+ theQuestions.length +' questions</h4>';  
   
  //$('#answerText').html('<h4> You correctly answered '+ robotWins +' out of '+ theQuestions.length +' questions</h4>');
  var solutionHTML = '<h4> Mr. Robot is an American drama thriller television series created by Sam Esmail. It stars Rami Malek as Elliot Alderson, a cybersecurity' + 
  'engineer and hacker who suffers from social anxiety disorder and clinical depression. Alderson is recruited by an insurrectionary anarchist known as "Mr. Robot", played ' + 
  'by Christian Slater, to join a group of hacktivists called "fsociety". The group aims to destroy all debt records by encrypting the financial data of the largest conglomerate in the world, E Corp..</h4>';
  $('#answerText').html(solutionHTML);
  $('#answerText').css('background-image','url(./assets/images/misterobot.jpeg )');
}

function displayGameResults(){
  var solutionHTML = '<h4> You correctly answered '+ robotWins +' out of '+ theQuestions.length +' questions</h4>';  
  solutionHTML += '<button type="button" class="btn btn-secondary" id="playAgain">Play Again?</button>';
  $('#answerText').html(solutionHTML);
  $('#answerText').css('background-image','url(./assets/images/RW4.jpg )');
}

function selectQuestion(){
  // Select a randomQuestion
  var tempQuestion;
  if (displayedQuestions.length === 0){
    tempQuestion = Math.floor(Math.random() * (theQuestions.length) );
  }else{
    do{
      tempQuestion = Math.floor(Math.random() * theQuestions.length);
    }while( displayedQuestions.indexOf(tempQuestion) > 0)
  }
  return tempQuestion;
}

function archiveQuestion(currentIndex){
  displayedQuestions.push(currentIndex);
}

function displayQuestion(theIndex){
  //Need to clear results of previous question
  clearPreviousQuestion();
  //In the question result div, display the remaining seconds
  $('#theQuestion').text(theQuestions[theIndex].question);
  for(var i =0; i < theQuestions[theIndex].possibleAnswers.length; i++){
    var theLabel = '<label for="rb'+ i +'">'+ theQuestions[theIndex].possibleAnswers[i] + '</label>';
    var theButtons = '<input type="radio" name="radio-'+ i +'" id="radio-'+ i + '"data-index="'+ theIndex + '"data-value="'+ i  +'">';
    $("#answerContainer").append(theButtons + theLabel);
  }
  questionInterval = setInterval(displayRemainingTime, 1000);   
}

function displayRemainingTime(){
  questionIntervalCount++;
  var remainingTime = setTimeLimit - questionIntervalCount;
  if(remainingTime === 1){
    $('#questionResult').html('<h3>InCorrect!</h3>');
    expIndex = $('input').data("index");
    expValue = $('input').data("value");
    questionResult(expIndex, "expired"); 
  }else{
    if( remainingTime < 6) {
      $('#questionResult').html('<h3 class="secondsDisplayWarning">' + remainingTime  + '</h3>');
    }else{
      $('#questionResult').html('<h3 class="secondsDisplay">' + remainingTime  + '</h3>');
    }
  }
}

function clearPreviousQuestion(){
  $('#theQuestion').text('');
  $("#answerContainer").empty();
  questionIntervalCount = 0;
}

function questionResult(arrrayIndex, theChoice){
  //clearInterval(questionInterval); 
  //clearInterval(mrRobot);
  clearPreviousGameQuestion();
  
  $('#answerText').html('<h4>'+ theQuestions[arrrayIndex].answerText +'</h4>');
   $('#answerText').css('background-image','url(' + theQuestions[arrrayIndex].imgPath + ')');

  if(typeof theChoice === "number"){
    if(theChoice === theQuestions[arrrayIndex].answerIndex){
      //the correct answer was chosen
       
      $('#questionResult').html('<h2>Correct!</h2>');
      robotWins++;
    }else if (theChoice != theQuestions[arrrayIndex].answerIndex){
    // the incorrect choice was made
    $('#questionResult').html('<h2>InCorrect!</h2>');
    robotLosses++;
  }else{
    $('#questionResult').html('<h2>InCorrect!</h2>');
    robotLosses++;
  }
  }else{
    $('#questionResult').html('<h2>No Response!</h2>');
    robotLosses++;
  }
   
  if(displayedQuestions.length <= theQuestions.length){
    mrRobot = setInterval(mrRobotQuestions, 15000); 
  }
}

function clearPreviousGameQuestion(){
  clearInterval(questionInterval);
  clearInterval(mrRobot);
  questionIntervalCount = 0;
  $('#questionResult').html('');
  $('#gameResult').text(''); 
  $('#answerText').html('');
  $('#answerText').css("background-image","none");
  $('#theQuestion').text('');
  $("#answerContainer").empty();
}
