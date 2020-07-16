
// quiz view needs to initially show that user is on 1 / x questions, and their score so far is 0. 

// on submit, apropriate message of "correct" or "wrong" needs to be displayed on the same page
// still on same page, correct answer should be changed to green text, and if a wrong answer was submitted, that needs to be changed to red text color . 
// still on same page, aggregate score should be updated, and question number should remain the same
// still on same page, Submit button needs to change into a Next button

// on Next click, next question needs to populate with the correct question number/progress, as well as reset result message od correct/wrong

// on submitting the last question, user needs to be led to results view, whiich shows total number correct out of total questions, with percentage correct. Button should be to restart which is indentical to the start button.

//  Bonus features:
// 1) Add incorrect questions to an array and then output a study guide on results page.
// 2) make radio toggles easier to click https://uxmovement.com/forms/ways-to-make-checkboxes-radio-buttons-easier-to-click/
// 3) add text enter at start for name. store variable and add to messages

//TO DO: 
// 1) consolidate STORE.lenghth into a global variable at top that is reused later on
// 2) figure out better way of not-rerendering html after each question
// 3) score++ should happen as an independent function so it updates on stats bar before moving to next questions
// 4) bug on 2nd time through quiz. no userAnswers are stored. 


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
        "The time right after sunrise", 
        "The time right before sunset", 
        "The time right around midday", 
        "Both A and B"
      ],
      answer: "d) Both A and B"
    },
];

// Counting variables to loop through STORE.questions and keep track of current user score
let score = 0;
let currentQuestion = 0;




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
  handleNextButton();
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
      <span>Question:  ${currentQuestion+1} / ${STORE.length}</span>
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
    const userAnswer = $("input[name=options]:checked").val();
    const realAnswer = STORE[currentQuestion].answer;
    console.log('the users answer is '+userAnswer);
    $(".js-next-question").show();
    $(".js-submit-answer").hide();
    if (!userAnswer) {
      alert("You must select your best guess before moving on!");
      return;
    }
    if (userAnswer === realAnswer){
      // correctAnswer(); // this function used to be seperate. included here because of variable difficulty. can still move back outside later
      console.log('correctAnswer ran and the userAnswer was ' + userAnswer);
      score++; // should probably move this into its own updateScore function so it happens live on submit instead of waiting until next screen
      // make text green for correct answer by inserting class
      $('label:contains(' +  userAnswer + ')').addClass('correct-answer')
      // show Correct! message
      $('.js-feedback').html(`<h2>That is Correct!</h2>`);
      // to do: image
      
    } else {
      // wrongAnswer(); // this function used to be seperate. included here because of variable difficulty. can still move back outside later
      console.log('wrongAnswer ran');
      // make selected wrong answer red
      $('label:contains(' +  userAnswer + ')').addClass('wrong-answer')
      $('label:contains(' +  realAnswer + ')').addClass('correct-answer')
      // show "wrong" message" and correct answer
      $('.js-feedback').html(`
        <h2>Wronggggg</h2>
        <p>the answer is "${realAnswer}"<p>
      `);
      // to do: image
    }
  })
}

function handleNextButton() {
  $('main').on('click', '.js-next-question', event => {
    console.log('next button clicked');
    nextStep();
  });
}







// temporary while i figure out submit/next button
function nextStep() { 
  currentQuestion++;
  if (currentQuestion < STORE.length) {
    renderQuestionPageHtml(); // It would be more efficient if I did not run this each time, but for the moment it is necessary to get stats to update. I can pull those out and have them rendered on their own or with renderNextQuestion
    renderNextQuestion();
    // if currentQuestion = STORE.length, then renderQuestionPageHtml()
  } else {
    renderResultsPageHtml();
    }

}


function renderResultsPageHtml() {
  scorePercent = Math.round(score/(STORE.length)*100);
  const resultsHtml = $(`
  <section class="results-page">
    <div class="top-part centered">
      <h2>Results:</h2>
      <p>${score}/${STORE.length} Correct=  ${scorePercent}%</p>
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
  handleStartClick();
}

$(initiateQuizApp);