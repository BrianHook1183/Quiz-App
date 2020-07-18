//  Bonus features:
// 1) Add incorrect questions to an array and then output a study guide on results page.
// 2) make radio toggles easier to click https://uxmovement.com/forms/ways-to-make-checkboxes-radio-buttons-easier-to-click/
// 3) Progress bar
// 4) add text enter at start for name. store variable and add to messages
// 5) deactivate radio buttons after submit

//TO DO: 
// 2) figure out better way of not-rerendering html after each question
// 3) score++ should happen as an independent function so it updates on stats bar before moving to next questions
// 5) when f/2 is selected, 2 and 2.8 both get highlighted as ther wrong answer. Its because i'm using .contains(). need to find alternative. i think its .filter
// 6) implement A11y, (tab is not working to go through options)


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

// tip from a.byrd, make sure this only runs once, assign all listeners. Get in practice of doing this, if you only want a listener to run once, then it can't be embedded in functions that run multiple times. Or else my "next" button will have to listeners on it after quiz restart and questions start getting skipped. 
// listens to "start" and "restart" buttons being clicked, listens to next button also. 
function registerEvents() {
  $('body').on('click','.start-button', function(event) {
    startNewQuiz();
  });
  $('main').on('click', '.js-next-question', event => {
    console.log('next button clicked');
    nextStep();
  })
}



// listens to "start" and "restart" buttons being clicked
function handleStartClick() {
  $('body').on('click','.start-button', (event) => {
    startNewQuiz();
  });
  console.log('handleStartClick ran');
}

function startNewQuiz() {
  console.log('startNewQuiz ran');
  clearCounterVariables();
  renderQuestionPageHtml();
  renderNextQuestion();
  handleSubmitButton();
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
      <span>...Progress Bar...</span>
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
        <input type = "radio" name="options" id="option${i+1}" value= "${question.options[i].option}" data-index-number=${i} tabindex ="${i+1}"> 
        <label data-index-number=${i} for="option${i+1}"> ${question.options[i].option}</label><br/>`
    );
    // finds the index of the correct answer
    if (question.options[i].isAnswer === true) {
      realAnswerIndex = i;
    }
  }
}

function handleSubmitButton() {
  $('main').on('click', '.js-submit-answer', event => {
    event.preventDefault();
    console.log('handleSubmitButton ran');
    const userAnswerIndex = $("input[name=options]:checked").data("index-number");
    const userAnswerBool = STORE[currentQuestion].options[userAnswerIndex].isAnswer;
    const userAnswer = $("input[name=options]:checked").val();
    console.log('the users answer is '+ userAnswerBool);
    $(".js-next-question").show(); // show next button only after if alert has been satisfied
    $(".js-submit-answer").hide();
        if (!userAnswer) {
          alert("You must select your best guess before moving on!");
          return;
        }
    if (userAnswerBool){
      // correctAnswer(); // this function used to be seperate. included here because of variable difficulty. can still move back outside later
      console.log('correctAnswer ran');
      score++; // should probably move this into its own updateScore function so it happens live on submit instead of waiting until next screen
      // make text green for correct answer by inserting class
      $('label:contains(' +  userAnswer + ')').addClass('correct-answer');
      // show Correct! message
      $('.js-feedback').html(`<h2>That is Correct!</h2>`);
      // to do: image
    } else {
      // wrongAnswer(); // this function used to be seperate. included here because of variable difficulty. can still move back outside later
      console.log('wrongAnswer ran. and the correct answer index is: ' + realAnswerIndex);
      // make selected wrong answer red
      $('label:contains(' +  userAnswer + ')').addClass('wrong-answer')
      $('label[data-index-number=' + realAnswerIndex +']').addClass('correct-answer');
      // show "wrong" message" and correct answer
      $('.js-feedback').html(`
        <h2>Wronggggg</h2>
        <p>the answer is ""<p>
      `);
      // to do: image
    }
  })
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








// runs all listener functions
function initiateQuizApp() {
  console.log('initiateQuiz ran');
  registerEvents(); // contains listeners so they only run once
}

$(initiateQuizApp);