const chicken = document.getElementById("chicken");
const egg = document.getElementById("egg");
const bike = document.getElementById("bike");
const scoreDisplay = document.getElementById("score");
let score = 0;
let chickenPosition = 125; // Starting position of the chicken
let gameInterval;
let gameSpeed = 5; // Speed of object movement
let goutUp = 480;
let gameRunning = false;

document.addEventListener("keydown", (event) => {
  if (event.key === " " || event.key === "Enter") {
    gameRunning = !gameRunning;
    if (gameRunning) {
      console.log("game started");
      startGame();
    } else {
      stopGame();
    }
  }
  if (event.key === "ArrowLeft" && chickenPosition > 0) {
    chickenPosition -= 20;
  } else if (event.key === "ArrowRight" && chickenPosition < 250) {
    chickenPosition += 20;
  }
  if (event.key === "ArrowUp" && goutUp > 50) {
    goutUp -= 20;
  }
  if (event.key === "ArrowDown" && goutUp < 480) {
    goutUp += 20;
  }
  chicken.style.left = `${chickenPosition}px`;
  chicken.style.top = `${goutUp}px`;
});

const startGame = () => {
  resetObject(egg, "egg");
  resetObject(bike, "bike");

  gameInterval = setInterval(() => {
    moveObject(egg, "egg");
    moveObject(bike, "bike");
    checkCollision();
  }, 20);
};

const stopGame = () => {
  alert("Game Stoped!!");
};

function resetObject(object, type){
  object.style.top = "50px";
  object.style.left = `${Math.floor(Math.random() * 270)}px`;
};

const moveObject = (object, type) => {
  let objectTop = parseInt(
    window.getComputedStyle(object).getPropertyValue("top")
  );
  if (objectTop >= 600) {
    // If object goes off the screen, reset it
    resetObject(object, type);
  } else {
    object.style.top = `${objectTop + gameSpeed}px`;
  }
};

function checkCollision() {
  let chickenRect = chicken.getBoundingClientRect();
  let eggRect = egg.getBoundingClientRect();
  let bikeRect = bike.getBoundingClientRect();

  // Check collision with egg
  if (
    chickenRect.left < eggRect.right &&
    chickenRect.right > eggRect.left &&
    chickenRect.top < eggRect.bottom &&
    chickenRect.bottom > eggRect.top
  ) {
    score++;
    if (score % 10 === 0 && score > 0) {
      gameSpeed += 2;
    }
    console.log(gameSpeed);
    
    scoreDisplay.textContent = score;
    resetObject(egg, "egg");
  }

  // Check collision with bike
  if (
    chickenRect.left < bikeRect.right &&
    chickenRect.right > bikeRect.left &&
    chickenRect.top < bikeRect.bottom &&
    chickenRect.bottom > bikeRect.top
  ) {
    clearInterval(gameInterval);
    gameRunning = false;
    alert("Game Over! Your Score: " + score);
    window.location.reload();
  }
}
