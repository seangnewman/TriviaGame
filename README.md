# ** ** Mr. Robot Trivia Game
## ** ** UABootcamp Week 5
### JavaScript Assignment 2

#### ** ** Overview
Using javascript and jQuery simulate a trivia game that displays a question to the user for a specified period of time.  If no response is received within the allotted period display the next question. 

At the end of the game,  provide final score and present an option to replay the game.  If user chooses to reload game,  reset the game values ** ** without using a refresh.

#### ** ** Data Object

An enumerator will identify the type of question asked.  If the question is true/false, then a value of 1 will be used.  Multiple Choice values will be represented by a value of 0.

Each question is represented by a class with the following attributes.
	Question = string holding the verbiage of the question being asked.
	Type       =  enumerator specifying if this is a true/false or multiple choice
	Possible =  array holding the possible correct answers
	Index     =   Index of the correct response in the possible questions array
	Answer =   Text to display when revealing the answer
	Image  =    Image that will be displayed as background to the answer.

#### ** ** Functionality

For this assignment,  jQuery will interact with the DOM.  Vanilla javascript primarily used for logic manipulation. There will, of course, be some overlap. 

##### ** ** Psuedo Code

Display Introduction to Mr. Robot Trivia Game
Repeat every 15 seconds
  Select a * *random index between 0 and the length of the questions array
  Push index to archive array, used to prevent duplicate questions 
  Clear the previous question from the DOM
  Display current question to DOM
Until the number of indexes in the archive equals the number of elements in the questions array
Display game results

If the user does not respond within 15 seconds the game will mark the answer as incorrect and display the next question. During the final 5 seconds of the period, the background of the time will turn red.

At the end of the game, a button is displayed prompting the user to play again.  Because this element was not available when the DOM was created, an event cannot be bound to the document.  A delegate will be created on the containing element to allow the event to “bubble” through. 
	

