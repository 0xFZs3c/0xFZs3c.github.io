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
document.getElementById("noBtn").onclick = () => {
  yesScale += 0.2;
  document.getElementById("yesBtn").style.transform = `scale(${yesScale})`;
};

document.getElementById("yesBtn").onclick = () => {
  show(screens.yay);
};

document.getElementById("startQuiz").onclick = () => {
  show(screens.quiz);
  loadQuestion();

  const noBtn = document.getElementById("noBtn");

noBtn.addEventListener("mouseenter", () => {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

};

// QUIZ DATA
const optionsDiv = document.getElementById("options");

const quiz = [
  {
    q: "When did I propose to you?",
    options: ["Oct 28", "Nov 1", "Dec 24"],
    answer: "Oct 28"
  },
  {
    q: "When did we first kiss?",
    options: ["Dec 24", "Jan 1", "Feb 14"],
    answer: "Dec 24"
  },
  {
    q: "What's my favorite number?",
    options: ["3", "7", "21"],
    answer: "7"
  }
];

let index = 0;
let points = 0;

function loadQuestion() {
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
        document.getElementById("points").innerText = points;
      } else {
        btn.classList.add("wrong");
      }

      setTimeout(() => {
        index++;
        if (index < quiz.length) {
          loadQuestion();
        } else {
          points === 3 ? show(screens.win) : show(screens.lose);
        }
      }, 800);
    };

    optionsDiv.appendChild(btn);
  });
}


// ENVELOPE OPEN
const envelope = document.getElementById("envelope");
if (envelope) {
  envelope.addEventListener("click", () => {
    envelope.classList.toggle("open");
  });
}


