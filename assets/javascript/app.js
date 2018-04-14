
var panel = $('#trivia');
var countStartNumber = 30;

//CLICK EVENTS

$(document).on('click', '#start-over', function(event) {
    game.reset();
  });
  
  $(document).on('click', '.answer-button', function(event) {
    game.clicked(event);
  });
  
  $(document).on('click', '#start', function(event) {
    $('#container').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
    game.loadQuestion();
  });
  
  
  //QUESTIONS & ANSWERS


  var questions = [{
    question: "Which princess has the ability to heal?",
    
    answers: ["Jasmine", "Rapunzel", "Pocahontas", "Megara"],
    
    correctAnswer: "Rapunzel",
   
    image:"assets/images/rapunzel.gif"
  },
  {
    
    question: "Which Disney princess is Scottish?",
    
    answers: ["Merida", "Megara", "Jasmine", "Mulan"],
    
    correctAnswer: "Merida",
   
    image:"assets/images/merida.gif"
      
  },
  {
    question: "Which princess sings the song entitled Part of this World?",
    
    answers: ["Tiana", "Belle", "Ariel", "Pocahontas"],
    
    correctAnswer: "Ariel",
   
    image:"assets/images/ariel.gif"
  },
 {
    question: "Which princess wears a green dress?",
    
    answers: ["Cinderella", "Tiana", "Aurora", "Belle"],
    
    correctAnswer: "Tiana",
   
    image:"assets/images/tiana.gif"
},
{
    question: "Who is the daughter of King Stefan and Queen Leah?",
    
    answers: ["Adrina", "Dot", "Aurora", "Eden"],
    
    correctAnswer: "Aurora",
   
    image:"assets/images/aurora.gif"

},
{
    question: "Which princess is asked to pour tea for the matchmaker?",
    
    answers: ["Mulan", "Pocahontas", "Ariel", "Belle"],
    
    correctAnswer: "Mulan",
   
    image:"assets/images/mulan.gif"
},
{
    question: "Which princess lives in Agrahba?",
      
    answers: ["Jasmine", "Belle", "Anna", "Rapunzel"],
    
    correctAnswer: "Jasmine",
  
    image:"assets/images/jasmine.gif"
      
}];

////////////////////////////////////////////////////////////////////////////////////////


var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>Game is over! This is how you did:</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(event) {
    clearInterval(timer);

    if ($(event.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>WRONG!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Good job!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};
