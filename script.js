const questions = [
  {
    question: "¿Qué tamaño de empresa mostró la mayor probabilidad predicha de aumentar el uso de soluciones digitales?",
    options: [
      { text: "Micro empresas", correct: false },
      { text: "Pequeñas empresas", correct: false },
      { text: "Grandes empresas", correct: true }
    ],
    justification: "Las empresas grandes (100+) presentan la mayor probabilidad predicha de aumentar el uso digital."
  },
  {
    question: "¿Cómo se relaciona la inversión y el uso digital con la resiliencia de las ventas durante 2020-22?",
    options: [
      { text: "No hubo una asociación clara", correct: false },
      { text: "Mayor uso digital → menor resiliencia", correct: false },
      { text: "Mayor uso digital → mayor resiliencia", correct: true }
    ],
    justification: "Mayor preparación digital se asocia con ventas más resilientes o incluso positivas."
  },
  {
    question: "¿Cuál es uno de los principales obstáculos para pequeñas empresas en países en desarrollo?",
    options: [
      { text: "Faltan herramientas digitales", correct: false },
      { text: "Carecen de capacidades y aptitudes", correct: true },
      { text: "Mercados locales saturados", correct: false }
    ],
    justification: "Muchos empresarios carecen de habilidades y comprensión para aprovechar lo digital."
  },
  {
    question: "¿Cómo ayudan las plataformas digitales a las mipymes?",
    options: [
      { text: "Incrementan costos y necesidad de equipos", correct: false },
      { text: "Exigen grandes recursos internos", correct: false },
      { text: "Superan obstáculos tradicionales", correct: true }
    ],
    justification: "Ayudan a superar barreras como falta de equipo o conocimientos TI."
  },
  {
    question: "¿Qué sector tradicional se menciona como impactado por la digitalización?",
    options: [
      { text: "Minería", correct: false },
      { text: "Pesca", correct: false },
      { text: "Turismo", correct: true }
    ],
    justification: "Turismo es uno de los sectores impactados, con ejemplos como Airbnb."
  }
];

const container = document.getElementById("quizContainer");

let unlockedIndex = 0;
let attempts = Array(questions.length).fill(0);
let completed = 0;

function showResults() {
  const summary = document.createElement("div");
  summary.className = "result-summary";

  const totalAttempts = attempts.reduce((sum, a) => sum + a, 0);

  summary.innerHTML = `
    <h2>🎉 ¡Quiz completado!</h2>
    <p><strong>Total de intentos:</strong> ${totalAttempts}</p>
    <p><strong>Clasificación:</strong> ${getRank(totalAttempts)}</p>
  `;
  document.body.appendChild(summary);
  summary.style.display = 'block';
}

function getRank(attempts) {
  if (attempts <= questions.length) return "🏆 Oro (Perfecto)";
  if (attempts <= questions.length + 2) return "🥈 Plata";
  return "🥉 Bronce";
}

questions.forEach((q, i) => {
  const card = document.createElement("div");
  card.className = "card";
  if (i > unlockedIndex) card.style.pointerEvents = "none";

  const inner = document.createElement("div");
  inner.className = "card-inner";

  const front = document.createElement("div");
  front.className = "card-front";
  front.innerHTML = `<strong>Pregunta ${i + 1}</strong><br>${q.question}`;

  const optionsDiv = document.createElement("div");
  optionsDiv.className = "options";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = opt.text;
    btn.onclick = () => {
      attempts[i]++;
      if (opt.correct) {
        if (card.classList.contains("flipped")) return;

        card.classList.add("flipped");
        back.classList.add("correct");
        back.innerHTML = `✔ Correcto<br><small>${q.justification}</small>`;

        if (i + 1 < questions.length) {
          container.children[i + 1].style.pointerEvents = "auto";
        }

        completed++;
        if (completed === questions.length) {
          setTimeout(showResults, 1500);
        }
      } else {
        back.classList.add("incorrect");
        back.innerHTML = "✖ Incorrecto<br><small>Intenta de nuevo</small>";
        card.classList.add("flipped");
        setTimeout(() => {
          card.classList.remove("flipped");
          back.classList.remove("incorrect");
          back.innerHTML = "";
        }, 1200);
      }
    };
    optionsDiv.appendChild(btn);
  });

  front.appendChild(optionsDiv);

  const back = document.createElement("div");
  back.className = "card-back";

  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);
  container.appendChild(card);
});
