var questionType = { "multipleChoice":0, "trueFalse": 1};

class Question{
  constructor(question, qType, aIndex, imgPath, answers=[]){
    this.question = question;
    this.questionType = qType;
    this.answerIndex = aIndex;
    this.imgPath = imgPath;
    if(this.questionType === questionType.trueFalse){
        this.possibleAnswers = [true, false];
    }else{
        this.possibleAnswers = answers;
    }

  }
}