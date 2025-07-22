const questions = [
  {
    question: "What is the capital of France?",
    options: ["Madrid", "Berlin", "Paris", "Rome"],
    answer: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Colorful Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What does HTML stand for?",
    options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Markdown Language", "None"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which one is a JavaScript framework?",
    options: ["Django", "React", "Laravel", "Flask"],
    answer: "React"
  },
  {
    question: "What is the extension of JavaScript files?",
    options: [".java", ".xml", ".js", ".html"],
    answer: ".js"
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Mozilla", "Netscape", "Google", "Microsoft"],
    answer: "Netscape"
  },
  {
    question: "Which tag is used to include JavaScript in HTML?",
    options: ["<js>", "<javascript>", "<script>", "<code>"],
    answer: "<script>"
  },
  {
    question: "Which of the following is NOT a data type in JavaScript?",
    options: ["Boolean", "Undefined", "Float", "String"],
    answer: "Float"
  },
  {
    question: "Which function is used to display output in the console?",
    options: ["console.output()", "log.console()", "console.log()", "display()"],
    answer: "console.log()"
  }
];

let currentQuestion = 0;
let score = 0;
let userName = "";

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const resultEl = document.getElementById('result');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');

function startQuiz() {
  const nameInput = document.getElementById('username');
  if (nameInput.value.trim() === "") {
    alert("Please enter your name");
    return;
  }
  userName = nameInput.value.trim();
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('quizScreen').style.display = 'block';
  loadQuestion();
}

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';
  feedbackEl.textContent = '';
  resultEl.style.display = 'none';
  nextBtn.style.display = 'none';

  document.getElementById('questionNumber').textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  document.getElementById('liveScore').textContent = `Score: ${score}`;

  q.options.forEach(opt => {
    const btn = document.createElement('div');
    btn.className = 'option';
    btn.textContent = opt;
    btn.onclick = () => selectOption(btn, q.answer);
    optionsEl.appendChild(btn);
  });
}

function selectOption(selected, correctAnswer) {
  const options = document.querySelectorAll('.option');
  options.forEach(opt => opt.onclick = null);

  if (selected.textContent === correctAnswer) {
    selected.classList.add('correct');
    feedbackEl.textContent = "Correct!";
    score++;
  } else {
    selected.classList.add('incorrect');
    feedbackEl.textContent = `Wrong! Correct answer is: ${correctAnswer}`;
    options.forEach(opt => {
      if (opt.textContent === correctAnswer) {
        opt.classList.add('correct');
      }
    });
  }

  nextBtn.style.display = 'inline-block';
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showFinalScore();
  }
};

restartBtn.onclick = () => {
  currentQuestion = 0;
  score = 0;
  restartBtn.style.display = 'none';
  resultEl.style.display = 'none';
  document.getElementById('quizScreen').style.display = 'none';
  document.getElementById('startScreen').style.display = 'block';
  document.getElementById('username').value = "";
};

function showFinalScore() {
  questionEl.textContent = "Quiz Completed!";
  optionsEl.innerHTML = '';
  feedbackEl.textContent = '';

  resultEl.innerHTML = `🎉 Well done, ${userName}!<br>Your Score: ${score} / ${questions.length}`;
  resultEl.style.display = 'block';

  nextBtn.style.display = 'none';
  nextBtn.disabled = true;

  restartBtn.style.display = 'inline-block';
  restartBtn.disabled = false;

  document.getElementById('questionNumber').textContent = '';
  document.getElementById('liveScore').textContent = '';

  saveToLeaderboard(userName, score);

  setTimeout(() => {
    document.getElementById('quizScreen').style.display = 'none';
    document.getElementById('leaderboardScreen').style.display = 'block';
    showLeaderboard();
  }, 2500);
}

function saveToLeaderboard(name, score) {
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 5);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function showLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  const list = document.getElementById('leaderboardList');
  list.innerHTML = '';

  leaderboard.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.name} - ${entry.score}`;
    list.appendChild(li);
  });
}

function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById('leaderboardScreen').style.display = 'none';
  document.getElementById('startScreen').style.display = 'block';
  document.getElementById('username').value = '';
}
