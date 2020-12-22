window.onload = () => {
  let gameIsRunning = false;

  document.getElementById("start-btn").onclick = () => {
    if (gameIsRunning === false) {
      document.querySelector(".modal").style.visibility = "visible";
      document.querySelector(".instructions").style.display = "none";
      document.querySelector(".modal audio").volume = 0.3;
      document.querySelector(".modal audio").play();
    }
  };
  document.getElementById("inigoStory").onclick = () => {
    if (gameIsRunning === false) {
      document.querySelector(".modal").style.visibility = "hidden";
      document.querySelector(".instructions").style.display = "block";
      crabCookApp.init();
      document.querySelector(".game-board").style.display = "block";
      document.querySelector("#start-btn").style.display = "none";
      document.querySelector(".modal audio").pause();

      gameIsRunning = true;
    }
  };
};
