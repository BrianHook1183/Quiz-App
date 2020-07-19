//TO DO: 
// high priority: implement A11y
// med priority:  score++ should happen as an independent function so it updates on stats bar before moving to next questions
// low priority:  empty form submit is bringing up required warning on form but is causing a js error in console.
// low priority:  figure out better way of not-rerendering html after each question
// low priority:  clear up "question" variable and STORE parameter confusion
// low priority:  make radio toggles easier to click https://uxmovement.com/forms/ways-to-make-checkboxes-radio-buttons-easier-to-click/

//BONUS FEATURES:
// deactivate radio buttons after submit
// Add incorrect questions to an array and then output a study guide on results page.
// Progress bar
// add text form at start for name. store variable and add to messages



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
      // answer: "A fixed focal length lens"
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
      // answer: "6"
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
      // answer: "A method of estimating correct daylight exposures"
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
      // answer: "None of the above",
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
      // answer: "Both A and B"
    },
];

// Global variables
// dynamic:
let score = 0;
let currentQuestion = 0;
// static:
let totalQuestions = STORE.length;


// runs all listeners
function initiateQuizApp() {
  console.log('initiateQuizApp ran');
  // listen to "start" and "restart" buttons being clicked
  $('body').on('click','.start-button', function(event) {
    console.log('Start button clicked and startNewQuiz ran');
    startNewQuiz();
  });
  $('main').on('click', '.js-next-question', event => {
    console.log('next button clicked and nextStep ran');
    nextStep();
  });
  $('main').on('click', '.js-submit-answer', event => {
    console.log('submit button clicked and handleSubmitButton ran');
      handleSubmitButton();
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
  currentQuestion = 0;
  console.log('clearCounterVariables ran');
}

function renderQuestionPageHtml() {
  console.log('renderQuestionPageHtml ran');
  const questionHtml = $(
  `<section class="question-page">
    <div class="top-part centered js-feedback">
    </div>
    <div class="stats">
      <span>Question:  ${currentQuestion+1} / ${totalQuestions}</span>
      <span>Score:  ${score}</span>
    </div>
    <div class="q-a-box">
    </div>
    <div class="centered">
      <br>
      <!--<span>...Progress Bar...</span>-->
    </div>
  </section>`
  );
  $("main").html(questionHtml);
}

function renderNextQuestion() {
  console.log('renderNextQuestion ran');
  let question= STORE[currentQuestion].question;
  const formAndQuestion = $(`
  <form>
  <fieldset>
      <legend>${question}</legend>
      <div class="js-options">
      </div>
      <button type = "submit" class="js-submit-answer">Submit</button>
      <button type = "button" class="js-next-question">Next ~~></button>
  </fieldset>
  </form>`);
  $(".q-a-box").html(formAndQuestion);
  $(".js-next-question").hide(); // hides next button
  renderOptions();
}

function renderOptions() {
  let question= STORE[currentQuestion];
  for (let i=0; i < question.options.length; i++)
  {
    $('.js-options').append(`
        <input type = "radio" name="options" id="option${i+1}" value= "${question.options[i].option}" data-index-number=${i} tabindex ="${i+1}" required> 
        <label data-index-number=${i} for="option${i+1}"> ${question.options[i].option}</label><br/>`
    );
    // finds the index of the correct answer
    if (question.options[i].isAnswer === true) {
      realAnswerIndex = i;
    }
  }
}

function handleSubmitButton() {
  const userAnswerIndex = $("input[name=options]:checked").data("index-number");
  const userAnswerBool = STORE[currentQuestion].options[userAnswerIndex].isAnswer;
  const userAnswer = $("input[name=options]:checked").val();
  const realAnswer = STORE[currentQuestion].options[realAnswerIndex].option;
  event.preventDefault();
    $(".js-next-question").show(); // show next button only after if alert has been satisfied
    $(".js-submit-answer").hide();
    if (userAnswerBool){
      answerIsCorrect (userAnswer);
    } else {
      answerIsWrong(userAnswerIndex, realAnswer);
      }
}

function answerIsCorrect(userAnswer){
  console.log('correctAnswer ran');
  score++; // should probably move this into its own updateScore function so it happens live on submit instead of waiting until next screen
  // make text green for correct answer by inserting class
  $('label:contains(' +  userAnswer + ')').addClass('correct-answer');
  // show Correct! message
  $('.js-feedback').html(`<h2>That is Correct!</h2>`);
  // to do: image
}

function answerIsWrong(userAnswerIndex, realAnswer){
  // variable difficulty. can still move back outside later
  console.log('wrongAnswer ran');
  // make selected wrong answer red
  $('label[data-index-number=' + userAnswerIndex +']').addClass('wrong-answer')
  $('label[data-index-number=' + realAnswerIndex +']').addClass('correct-answer');
  // show "wrong" message" and correct answer
  $('.js-feedback').html(`
    <h2>Wronggggg</h2>
    <p>the answer is "${realAnswer}"<p>
  `);
  // to do: image
}


function nextStep() { 
  currentQuestion++;
  if (currentQuestion < totalQuestions) {
    renderQuestionPageHtml(); // It would be more efficient if I did not run this each time, but for the moment it is necessary to get stats to update. I can pull those out and have them rendered on their own or with renderNextQuestion
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