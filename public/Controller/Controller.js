function writeUserData(quizList) {
    firebase.database().ref('Quizz').set({
        quiz: quizList
    });
}

quizContainer = document.getElementById('quiz');
resultsContainer = document.getElementById('results');
saveButton = document.getElementById('save');
addButton = document.getElementById('add');
counter = 0;
var output = [];

function viewQuestions(questions, quizContainer) {
    // we'll need a place to store the output and the answer choices
    var output = [];
    var answers;

    // for each question...
    for (var i = 0; i < questions.length; i++) {

        // first reset the list of answers
        answers = [];

        // for each available answer to this question...
        for (letter in questions[i].answers) {

            // ...add an html radio button
            answers.push(
                '<ul class="nobull">'
                + '<li><label>'
                + '<input type="radio" name="question' + i + '" value="' + letter + '">'
                + '<input name="answer' + i + '" type="text" value="'
                + questions[i].answers[letter]
                + '">'
                + '</label></li>'
                + '</ul>'
            );
        }

        // add this question and its answers to the output
        output.push(
            '<div id="question' + i + '" contenteditable="true">'
            + questions[i].question + '</div></br>'
            + '<div class="answers">' + answers.join('') + '</div>'
            + '<div id="correctAnswer' + i + '" contenteditable="true">'
            + questions[i].correctAnswer + '</div></br>'
        );
    }

    output.push(
        '<div id="addons"></div>'
    )
    // finally combine our output list into one string of html and put it on the page
    quizContainer.innerHTML = output.join('');
}

addButton.onclick = function () {
    var add = document.getElementById("addons");

    output.push(
        '<div id="addquestion' + counter + '" contenteditable="true">New Question</div></br>'
        + '<div class="addanswers' + counter + '">'
        + '<ul class="nobull">'
        + '<li><label>'
        + '<input type="radio">'
        + '<input name="addanswer" type="text" value="answer">'
        + '</label></li>'
        + '</ul>'
        + '<ul class="nobull">'
        + '<li><label>'
        + '<input type="radio">'
        + '<input name="addanswer" type="text" value="answer">'
        + '</label></li>'
        + '</ul>'
        + '<ul class="nobull">'
        + '<li><label>'
        + '<input type="radio">'
        + '<input name="addanswer" type="text" value="answer">'
        + '</label></li>'
        + '</ul>'
        + '<ul class="nobull">'
        + '<li><label>'
        + '<input type="radio">'
        + '<input name="addanswer" type="text" value="answer">'
        + '</label></li>'
        + '</ul>'
        + '</div>'
        + '<div id="addcorrectAnswer' + counter + '" contenteditable="true">Correct Answer</div></br>');
    counter++;
    add.innerHTML = output.join('');
}

function saveQuiz() {
    fixedQuestions = [];
    newQuestions = [];
    console.log(myQuestions.length);
    for (var i = 0; i < myQuestions.length; i++) {
        var questionIdConst = "question" + i;
        var answerClassNameConst = "answer" + i;
        var correctAnswerIdConst = "correctAnswer" + i;

        console.log(questionIdConst);
        var questionConst = document.getElementById(questionIdConst).textContent;
        var answersAConst = document.getElementsByName(answerClassNameConst)[0].value;
        var answersBConst = document.getElementsByName(answerClassNameConst)[1].value;
        var answersCConst = document.getElementsByName(answerClassNameConst)[2].value;
        var answersDConst = document.getElementsByName(answerClassNameConst)[3].value;
        var correctanswerConst = document.getElementById(correctAnswerIdConst).textContent;
        fixedQuestions.push({
            question: questionConst
            , answers: {
                a: answersAConst,
                b: answersBConst,
                c: answersCConst,
                d: answersDConst
            }
            , correctAnswer: correctanswerConst
        });

        newQuestions.push(fixedQuestions[i]);
    }

    for (var j = 0; j < counter; j++) {
        var questionId = "addquestion" + j;
        var answerClassName = "addanswer";
        var correctAnswerId = "addcorrectAnswer" + j;

        var question = document.getElementById(questionId).textContent;
        var answersA = document.getElementsByName(answerClassName)[0].value;
        var answersB = document.getElementsByName(answerClassName)[1].value;
        var answersC = document.getElementsByName(answerClassName)[2].value;
        var answersD = document.getElementsByName(answerClassName)[3].value;
        var correctanswer = document.getElementById(correctAnswerId).textContent;

        newQuestions.push({
            question: question
            , answers: {
                a: answersA,
                b: answersB,
                c: answersC,
                d: answersD
            }
            , correctAnswer: correctanswer
        });
    }

    //  This gives you a string in JSON syntax of the object above that you can 
    // send with XMLHttpRequest.
    var json = JSON.stringify(newQuestions);
    localStorage.setItem('v', json);
    writeUserData(json);
    console.log(json);
}

function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {

	// show the questions
	viewQuestions(questions, quizContainer);

	// when user clicks submit, show results
	saveButton.onclick = function(){
        saveQuiz();    
    }
}
generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);