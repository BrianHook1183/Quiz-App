const STORE = [
    //1
    {
      question: "What is a prime lens?",
      options: [
        {option: "The first lens you buy", isAnswer: false}, 
        {option: "A fixed focal length lens", isAnswer: true}, 
        {option: "The lens that originally comes with a camera body as part of a kit", isAnswer: false}, 
        {option: "A zoom lens that only covers the most used focal lengths", isAnswer: false}
      ],
    },
    //2
    {
      question: "Which of these is not a common f-number?",
      options: [
        {option: "2", isAnswer: false}, 
        {option: "2.8", isAnswer: false}, 
        {option: "6", isAnswer: true}, 
        {option: "8", isAnswer: false}
      ],
    },
    //3
    {
      question: "What is the Sunny 16 Rule?",
      options: [
        {option: "A method of estimating correct daylight exposures", isAnswer: true},
        {option: "A method to determine the hours of usable daylight left", isAnswer: false}, 
        {option: "A method to measure focal length by using a sundial", isAnswer: false}, 
        {option: "A reminder to take at least 16 pictures when shooting towards harsh sunlight", isAnswer: false}, 
      ],
    },
    //4
    {
      question: "What does ISO stand for?",
      options: [
        {option: "Intentional Saturation Overexposure", isAnswer: false}, 
        {option: "Image Shutter Open", isAnswer: false}, 
        {option: "International Sensitivity Omnipotence", isAnswer: false}, 
        {option: "None of the above", isAnswer: true}
      ],
    },
    //5
    {
      question: "What period of daytime is best described by 'golden hour'?",
      options: [
        {option: "The time right after sunrise", isAnswer: false}, 
        {option: "The time right before sunset", isAnswer: false}, 
        {option: "The time right around midday", isAnswer: false},
        {option: "Both A and B", isAnswer: true}
      ],
    },
];

// Global variables
const totalQuestions = STORE?.length; //new syntax for "optional chaining"
let realAnswerIndex;
// for counting:
let score = 0;
let currentQuestionIndex = 0;

// runs all listeners
function initiateQuizApp() {
  // listen to "start" and "restart" buttons being clicked
  // ES6 arrow notation is not being used uniformally here as a reminder of different syntax
  $('body').on('click','.start-button', function(event) {
    startNewQuiz();
  });
  $('main').on('click', '.js-next-question', event => {
    nextPage();
  });
  $('main').on('click', '.js-submit-answer', event => {
      handleSubmitButton(event);
  });
}

// runs on start and restart button
function startNewQuiz() {
  clearCounterVariables();
  renderQuestionPageHtml();
  renderNextQuestion();
}

function clearCounterVariables() {
  score = 0;
  currentQuestionIndex = 0;
}

function renderQuestionPageHtml() {
  const questionHtml = $(
  `<section class="question-page">
    <div class="top-part centered js-feedback">
    </div>
    <div class="js-stats stats">
      <span>Question:  ${currentQuestionIndex+1} / ${totalQuestions}</span>
      <span>Score:  ${score}</span>
    </div>
    <div class="q-a-box">
    </div>
  </section>`
  );
  $("main").html(questionHtml);
}

function renderNextQuestion() {
  const question= STORE[currentQuestionIndex].question;
  const formAndQuestion = $(`
  <form>
  <fieldset>
      <legend>${question}</legend>
      <div class="js-options">
      </div>
      <button type = "submit" class="js-submit-answer">Submit</button>
      <button type = "button" class="js-next-question">Next</button>
  </fieldset>
  </form>`);
  $(".q-a-box").html(formAndQuestion);
  $(".js-next-question").addClass('hide'); // hides next button
  renderOptions();
}

function renderOptions() {
  const choices= STORE[currentQuestionIndex].options;
  choices.forEach((choice, i) => {
    $('.js-options').append(`
    <label data-index-number=${i}>
    <input type = "radio" name="options" value= "${choice.option}" data-index-number=${i} tabindex ="${i+1}" required> <span>${choice.option}</span>
    </label><br/>
    `);
    // finds the index of the correct answer
    if (choice.isAnswer === true) {
      realAnswerIndex = i;
    };
  });
}

function handleSubmitButton(event) {
  const userAnswerIndex = $("input[name=options]:checked").data("index-number");
  const userAnswerBool = STORE[currentQuestionIndex].options[userAnswerIndex].isAnswer;
  const userAnswer = $("input[name=options]:checked").val();
  const realAnswer = STORE[currentQuestionIndex].options[realAnswerIndex].option;
  event.preventDefault();
  $(".js-next-question").show();
  $(".js-submit-answer").addClass('hide');
    if (userAnswerBool){
      answerIsCorrect (userAnswer);
    } else {
      answerIsWrong(userAnswerIndex, realAnswer);
      }
  // disables radio buttons after user submits answer
  $("input[type=radio]").attr('disabled', true);
}

function answerIsCorrect(userAnswer){
  score++;
  // make text green for correct answer by inserting class
  $('label:contains(' +  userAnswer + ')').addClass('correct-answer');
  // show Correct! message
  $('.js-feedback').html(`<h2>That is Correct!</h2>`);
  // update score if correct to get instant feedback
  $('.js-stats').html(`
    <span>Question:  ${currentQuestionIndex+1} / ${totalQuestions}</span>
    <span>Score:  ${score}</span>`
    );
}

function answerIsWrong(userAnswerIndex, realAnswer){
  // make selected wrong answer red
  $('label[data-index-number=' + userAnswerIndex +']').addClass('wrong-answer');
  $('label[data-index-number=' + realAnswerIndex +']').addClass('correct-answer');
  // show "wrong" message" and correct answer
  $('.js-feedback').html(`<h2>Incorrect</h2><p>the answer is "${realAnswer}"</p>`);
  // to do: image of lens shattering
}

// Decides between displaying next question or Results page
function nextPage() { 
  currentQuestionIndex++;
  if (currentQuestionIndex < totalQuestions) {
    renderQuestionPageHtml();
    renderNextQuestion();
  } else {
    renderResultsPageHtml();
  }
}

function renderResultsPageHtml() {
  scorePercent = Math.round(score/(totalQuestions)*100);
  const resultsHtml = $(`
  <section class="results-page">
    <div class="top-part centered">
      <h2>Results:</h2>
      <p>${score}/${totalQuestions} Correct=  ${scorePercent}%</p>
      <p>Would you like to try again?</p>
    </div>
    <div class="centered">
      <button class="start-button">Restart</button>
    </div>
  </section>`
  );
  $("main").html(resultsHtml);
}


$(initiateQuizApp);