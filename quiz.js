// User needs to be able to click start button to initiate quiz.

// quiz view needs to initially show that user is on 1 / x questions, and their score so far is 0. 

// user needs to be able to choose one option only, and then click submit.

// on submit, apropriate message of "correct" or "wrong" needs to be displayed on the same page

// still on same page, correct answer should be changed to green text, and if a wrong answer was submitted, that needs to be changed to red text color . 

// still on same page, aggregate score should be updated, and question number should remain the same

// still on same page, Submit button needs to change into a Next button

// on Next click, next question needs to populate with the correct question number/progress, as well as reset result message od correct/wrong

// on submitting the last question, user needs to be led to results view, whiich shows total number correct out of total questions, with percentage correct. Button should be to restart which is indentical to the start button.

const STORE = [
    //1
    {
      question: "What is a prime lens?",
      options: [
        "The first lens you buy", 
        "A fixed focal length lens", 
        "the lens that originally comes with a camera body as part of a kit", 
        "a zoom lens that only covers the most used focal lengths"
      ],
      answer: "A fixed focal length lens"
    },
    //2
    {
      question: "Which of these is not a common f-number?",
      options: [
        "2",
        "2.8", 
        "6",
        "8"
      ],
      answer: "6"
    },
    //3
    {
      question: "What is the Sunny 16 Rule?",
      options: [
        "a method to determine the hours of usable daylight left", 
        "a method to measure focal length by using a sundial", 
        "a reminder to take at least 16 pictures when shooting towards harsh sunlight", 
        "a method of estimating correct daylight exposures"
      ],
      answer: "a method of estimating correct daylight exposures"
    },
    //4
    {
      question: "What does ISO stand for?", 
      options: [
      "Intentional Saturation Overexposure", 
      "Image Shutter Open", 
      "International Sensitivity Omnipotence", 
      "None of the above"],
      answer: "None of the above"
    },
    //5
    {
      question: "What period of daytime is best described by 'golden hour'?",
      options: [
        "a) The time right after sunrise", 
        "b) The time right before sunset", 
        "c) The time right around midday", 
        "d) Both A and B"
      ],
      answer: "d) Both A and B"
    },
];

// Counting variables to loop through STORE.questions and keep track of current user score
let score = 0;
let currentQuestion = 0;







// listens to "start" and "restart" buttons being clicked
function handleStartClick() {
  $('.start-button').on('click', (event) => {
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
  const questionHtml = $(`
  <section class="question-page">
  <div class="top-part centered">
      <h2>Correct! / Wrong</h2>
      <p>(image will go here)<p><!-- replace with image -->
  </div>
  <div class="stats">
      <span>Question:  ${currentQuestion+1} / ${STORE.length}</span>
      <span>Score:  ${score}</span>
  </div>
  <div class="q-a-box">
  </div>
  <div class="centered">
      <br>
      <span>...Progress Bar...</span><!-- replace with css widths and div color -->
  </div>
</section>`);
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
  </fieldset>
  </form>`);
  $(".q-a-box").html(formAndQuestion);
  renderOptions();
}

function renderOptions() {
  let question= STORE[currentQuestion];
  for(let i=0; i < question.options.length; i++)
  {
    $('.js-options').append(`
        <input type = "radio" name="options" id="option${i+1}" value= "${question.options[i]}" tabindex ="${i+1}"> 
        <label for="option${i+1}"> ${question.options[i]}</label><br/>`
    );
  }
}










function handleSubmitButton() {
  $('main').on('click', '.js-submit-answer', event => {
    event.preventDefault();
    console.log('handleSubmitButton ran');
    let userAnswer = $("input[name=options]:checked").val();
    console.log('the users answer is '+userAnswer);
    // if (!userAnswer) {
    //   alert("Choose an option");
    //   return;
    // }
    if (userAnswer === STORE[currentQuestion].answer){
      correctAnswer();
    } else {
      wrongAnswer();
    }
  })
}

function correctAnswer() {
  console.log('correctAnswer ran');
}


function wrongAnswer() {
  console.log('wrongAnswer ran');
}














// runs all listener functions
function initiateQuizApp() {
  console.log('initiateQuiz ran');
  handleStartClick();
  //
  //
  //
}

$(initiateQuizApp);