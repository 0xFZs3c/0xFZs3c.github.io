const screens = {
  start: document.getElementById("start"),
  yay: document.getElementById("yay"),
  quiz: document.getElementById("quiz"),
  win: document.getElementById("win"),
  lose: document.getElementById("lose")
};

function show(screen) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

// YES / NO LOGIC
let yesScale = 1;
const noBtn = document.getElementById("noBtn");

noBtn.addEventListener("mouseenter", () => {
  const x = Math.random() * 240 - 120;
  const y = Math.random() * 240 - 120;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

noBtn.onclick = () => {
  yesScale += 0.25;
  document.getElementById("yesBtn").style.transform = `scale(${yesScale})`;
};

document.getElementById("yesBtn").onclick = () => {
  show(screens.yay);
};

document.getElementById("startQuiz").onclick = () => {
  show(screens.quiz);
  loadQuestion();
};

// QUIZ DATA (update dates/numbers to real ones!)
const quiz = [
  {
    q: "When did I propose to you?",
    options: ["Oct 28", "Oct 29", "Oct 30"],
    answer: "Oct 28"
  },
  {
    q: "When did we first kiss?",
    options: ["Dec 14", "Dec 24", "Dec 15"],
    answer: "Dec 24"
  },
  {
    q: "What's my favorite number?",
    options: ["10", "7", "9"],
    answer: "7"
  }
];

let index = 0;
let points = 0;

const optionsDiv = document.getElementById("options");
const pointsEl = document.getElementById("points");

function loadQuestion() {
  if (index >= quiz.length) {
    if (points === 3) {
      show(screens.win);
      setTimeout(() => {
        document.getElementById("envelope").classList.add("open");
      }, 800);
    } else {
      show(screens.lose);
    }
    return;
  }

  document.getElementById("question").innerText = quiz[index].q;
  optionsDiv.innerHTML = "";

  quiz[index].options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.className = "option-btn";
    btn.onclick = () => {
      if (opt === quiz[index].answer) {
        btn.classList.add("correct");
        points++;
        pointsEl.innerText = points;
      } else {
        btn.classList.add("wrong");
      }

      setTimeout(() => {
        index++;
        loadQuestion();
      }, 900);
    };
    optionsDiv.appendChild(btn);
  });
}

// ENVELOPE CLICK (optional fallback)
const envelope = document.getElementById("envelope");
if (envelope) {
  envelope.addEventListener("click", () => {
    envelope.classList.toggle("open");
  });
}
