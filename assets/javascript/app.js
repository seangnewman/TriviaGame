
//
// Declare the questions for the game
//
var q1 = new Question("What is Elliot's pet fish named after? ", questionType.multipleChoice, 1, '',["Norse God of Mischief","The Latin Keyboard","Roman goddess of semiconductors"]);
var q2 = new Question("What novel by Leo Tolstoy is being read by Mr. Robot? ", questionType.multipleChoice, 0, '',["Resurrection","What is Art?","A Confession", "Anna Karenina","War & Peace"]);
var q3 = new Question("What two languages are featured on Mr. Robot? ", questionType.multipleChoice, 2, '',["JavaScript/PHP","C++/C?","Ruby/Python", "Swift/Go"]);
var q4 = new Question("Whiterose is an anagram for otherwise? ", questionType.trueFalse, 0, '');
var q5 = new Question("Mr. Robot is Elliot's Brother? ", questionType.trueFalse, 1, '');
var q6 = new Question("Fsociety is a group of hackers created by Mr. Robot? ", questionType.trueFalse, 0, '');
var q7 = new Question("ECorp is the company in which Fsociety is trying to take down? ", questionType.trueFalse, 0, '');
var q8 = new Question("Elliot's job is a cyber security engineer? ", questionType.trueFalse, 0, '');
var q9 = new Question("What is the primary goal of Fsociety? ", questionType.multipleChoice, 1, '',["world domination","cancel all debts","entertainment"]);

var theQuestions = [q1, q2,q3,q4, q5, q6, q7, q8, q9];
var randomQuestion;
var displayedQuestions = [];

$(document).ready(function(){
    var mrRobot = setInterval(mrRobotQuestions,15000);
});

function mrRobotQuestions(){
    randomQuestion = selectQuestion();
    archiveQuestion(randomQuestion);
    clearPreviousQuestion();
    displayQuestion(randomQuestion);
}

function selectQuestion(){
  // Select a randomQuestion
  var tempQuestion;
  if (displayedQuestions.length === 0){
    tempQuestion = Math.floor(Math.random() * (theQuestions.length + 1) );
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
  $('#theQuestion').text(theQuestions[theIndex].question);

  for(var i =0; i < theQuestions[theIndex].possibleAnswers.length; i++){
    var theLabel = '<label for="rb'+ i +'">'+ theQuestions[theIndex].possibleAnswers[i] + '</label>';
    var theButtons = '<input type="radio" name="radio-'+ i +'" id="radio-'+ i + '" data-value="'+ i  +'">';
    $("#answerContainer").append(theLabel + theButtons);
  }
}

function clearPreviousQuestion(){
    $('#theQuestion').text('');
    $("#answerContainer").empty();
}

