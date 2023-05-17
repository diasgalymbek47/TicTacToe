const body = document.querySelector("body");
const grid = document.querySelector(".grid");
const cells = document.querySelectorAll(".cell");
const startBtn = document.querySelector(".start");
const counterX = document.querySelector(".counter-x");
const counterO = document.querySelector(".counter-o");
const draw = document.querySelector(".draw");

let start = false;

let matrix = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let step = 0;

let pointsX = 0;
let pointsO = 0;
let _draw = 0;

document.addEventListener("DOMContentLoaded", () => {
  body.classList.add("loaded");
});

renderPoints();

startBtn.onclick = () => {
  if (!start) {
    start = true;

    startBtn.textContent = "Начался";
    body.style.backgroundColor = "rgb(201, 235, 201)";

    timer = setTimeout(() => {
      startBtn.textContent = "Завершить";
    }, 1000);
  } else {
    gameReset();
  }
};

cells.forEach((cell) => {
  cell.onclick = () => {
    if (start) {
      if (!cell.classList.contains("checked")) {
        step++;
        cell.classList.add("checked", 'cross');

        check(cell.dataset.id);

        stepAI()
      }
    }
  };
});

function gameReset() {
  start = false;
  matrix = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  step = 0;

  startBtn.style.pointerEvents = "";
  grid.style.pointerEvents = "";

  clearTimeout(timer);
  startBtn.textContent = "Начать игру";
  body.style.backgroundColor = "#fff";

  cells.forEach((cell) => {
    cell.classList.remove("cross", "circle", "checked");
  });
}

function check(i) {
  if (cells[i].classList.contains("cross")) matrix[i] = 1;
  if (cells[i].classList.contains("circle")) matrix[i] = -1;

  if (step === 9) {
    isVictory("Ничья", "draw");
  }

  if (matrix[0] + matrix[1] + matrix[2] === 3) isVictory("крестик", "win");
  if (matrix[3] + matrix[4] + matrix[5] === 3) isVictory("крестик", "win");
  if (matrix[6] + matrix[7] + matrix[8] === 3) isVictory("крестик", "win");
  if (matrix[0] + matrix[3] + matrix[6] === 3) isVictory("крестик", "win");
  if (matrix[1] + matrix[4] + matrix[7] === 3) isVictory("крестик", "win");
  if (matrix[2] + matrix[5] + matrix[8] === 3) isVictory("крестик", "win");
  if (matrix[0] + matrix[4] + matrix[8] === 3) isVictory("крестик", "win");
  if (matrix[2] + matrix[4] + matrix[6] === 3) isVictory("крестик", "win");

  if (matrix[0] + matrix[1] + matrix[2] === -3) isVictory("нолик", "win");
  if (matrix[3] + matrix[4] + matrix[5] === -3) isVictory("нолик", "win");
  if (matrix[6] + matrix[7] + matrix[8] === -3) isVictory("нолик", "win");
  if (matrix[0] + matrix[3] + matrix[6] === -3) isVictory("нолик", "win");
  if (matrix[1] + matrix[4] + matrix[7] === -3) isVictory("нолик", "win");
  if (matrix[2] + matrix[5] + matrix[8] === -3) isVictory("нолик", "win");
  if (matrix[0] + matrix[4] + matrix[8] === -3) isVictory("нолик", "win");
  if (matrix[2] + matrix[4] + matrix[6] === -3) isVictory("нолик", "win");

  console.log(step);
}

function isVictory(winner, res) {
  grid.style.pointerEvents = "none";
  startBtn.style.pointerEvents = "none";

  if (winner == "нолик") pointsO++;
  if (winner == "крестик") pointsX++;
  if (winner == "Ничья") _draw++;

  if (res == "win") {
    let HTML = `
  	<div class="finish-table modal">
		<button class="close" onclick="closeModal(this)">Закрыть</button>
 		<div class="winner">Выйграл ${winner}</div>
	</div>
  `;

    if (body.querySelector(".modal")) {
      body.querySelector(".modal").remove();
    }

    body.insertAdjacentHTML("beforeend", HTML);
  } else {
    let HTML = `
  	<div class="finish-table modal">
		<button class="close" onclick="closeModal(this)">Закрыть</button>
 		<div class="winner">${winner}</div>
	</div>
  `;

    body.insertAdjacentHTML("beforeend", HTML);
  }

  counterX.textContent = "Крестик = " + pointsX;
  counterO.textContent = "Нолик = " + pointsO;
  draw.textContent = "Ничья = " + _draw;

  localStorage.setItem("O", pointsO);
  localStorage.setItem("X", pointsX);
  localStorage.setItem("draw", _draw);
}

function closeModal(btn) {
  const parent = btn.closest(".modal");
  parent.remove();

  gameReset();
}

function renderPoints() {
  pointsO = localStorage.getItem("O") ?? 0;
  pointsX = localStorage.getItem("X") ?? 0;
  _draw = localStorage.getItem("draw") ?? 0;

  counterX.textContent = "Крестик = " + pointsX;
  counterO.textContent = "Нолик = " + pointsO;
  draw.textContent = "Ничья = " + _draw;
}

function stepAI() {
  let stepAI = Math.round(Math.random() * 8);

  for (let i = 0; i < cells.length; i++) {
    if (!cells[stepAI].classList.contains('checked')) {
      setTimeout(() => {
        cells[stepAI].classList.add('checked', 'circle');
        step++;
        check(cells[stepAI].dataset.id);
      }, stepAI * 100);

      return;
    } else {
      stepAI = Math.round(Math.random() * 8);
    }
  }
}

