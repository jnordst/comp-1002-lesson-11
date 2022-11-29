const synth = new Tone.Synth().toDestination();
 
function playTone (note) {
  synth.triggerAttackRelease(note, "8n");
  Tone.start();
}
 
function randomArrayElement (array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  const randomValue = array[randomIndex];
 
  return randomValue;
}
 
const tones = ["D5", "A4", "B4", "G4"];
 
const cells = document.querySelectorAll(".cell");
 
const keys = ["KeyA", "KeyS", "KeyD", "KeyF"];
 
const gameState = {
  patternState: [],
  playerState: [],
};
 
function cellActivated (event) {
  const currentCell = event.target;
  const index = currentCell.dataset.index;
 
  gameState.playerState.push(index);
 
  playTone(tones[index]);
 
  // Check if patternState and playerState are the same length
  if (gameState.patternState.length === gameState.playerState.length) {
    if (gameState.patternState.join(",") === gameState.playerState.join(",")) {
      gameState.playerState = [];
 
      selectRandomToneAndPlay();
 
      return true;
    }
 
    alert("GAME OVER");
  }
}
 
function selectRandomToneAndPlay () {
  const cell = randomArrayElement(Array.from(cells));
  const index = cell.dataset.index;
 
  gameState.patternState.push(index);
 
  const clonedPattern = gameState.patternState.slice(0);
 
  const patternInterval = setInterval(function () {
    const i = clonedPattern.shift();
 
    cells[i].classList.toggle("on");
 
    setTimeout(function () {
      cells[i].classList.toggle("on");
    }, 500);
 
    playTone(tones[i]);
 
    if (clonedPattern.length === 0) {
      clearInterval(patternInterval);
    }
  }, 800);
}

cells.forEach(function (cell, index) {
    cell.dataset.index = index;
    cell.addEventListener("click", cellActivated);
})

document.onkeydown = function (event) {
    const index = keys.indexOf(event.code);

    if (index !== -1){
        cells[index].click();
        cells[index].classList.toggle("on");
    }
}

document.querySelector("button").onclick = function(){
    gameState.playerState = [];
    gameState.patternState = [];

    selectRandomToneAndPlay();
}