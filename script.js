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
};

// QUIZ DATA
const quiz = [
  { q: "When did I propose to you?", a: "oct 28" },
  { q: "When did we first kiss?", a: "dec 24" },
  { q: "What's my favorite number?", a: "7" }
];

let index = 0;
let points = 0;

function loadQuestion() {
  document.getElementById("question").innerText = quiz[index].q;
  document.getElementById("answer").value = "";
}

document.getElementById("submit").onclick = () => {
  const ans = document.getElementById("answer").value.toLowerCase().trim();
  if (ans === quiz[index].a) {
    points++;
    document.getElementById("points").innerText = points;
  }

  index++;

  if (index < quiz.length) {
    loadQuestion();
  } else {
    points === 3 ? show(screens.win) : show(screens.lose);
  }
};

// ENVELOPE OPEN
const envelope = document.getElementById("envelope");
if (envelope) {
  envelope.addEventListener("click", () => {
    envelope.classList.toggle("open");
  });
}


