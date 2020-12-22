//        ----  GAME ENVIRONMENT  ----

const crabCookApp = {
  name: "Crab'n'Cook",
  description:
    "When a crab humilliates your father, there's only one possible path... revenge! Space Invaders Style, but in a beach with crabs and seagulls.",
  version: "1.0.0",
  author: "Jose A. Casado & Lara Lorenzo",
  license: undefined,
  canvasTag: undefined,
  ctx: undefined,
  canvasSize: {
    w: undefined,
    h: undefined,
  },
  frames: 0,
  FPS: 60,
  map: undefined,
  player: undefined,
  obstacles: [],
  enemies: [],
  seagulls: [],
  score: 0,
  lives: 3,
  keys: {
    left: "ArrowLeft",
    right: "ArrowRight",
    up: "ArrowUp",
    down: "ArrowDown",
    shoot: "s",
    reset: "Enter",
  },
  direcction: undefined,
  //    SOUNDS
  bgMusicSound: undefined,
  // Player
  playerWalkSound: undefined,
  playerThrowSound: undefined,
  playerDamageSound: undefined,
  rockImpactSound: undefined,
  // Crab
  crabWalkSound: undefined,
  crabDieSound: undefined,
  crabThrowSound: undefined,
  knifeImpactSound: undefined,
  // Seagull
  seagullSound: undefined,
  seagullDieSound: undefined,
  // End Game
  playerLoseSound: undefined,
  playerWinSound: undefined,

  init() {
    this.canvasTag = document.getElementById("my-canvas");
    this.ctx = this.canvasTag.getContext("2d");
    this.setDimensions();
    this.setEventListeners();
    this.preloadSounds();
    this.start();
  },

  setDimensions() {
    this.canvasSize = {
      w: window.innerWidth * 0.5,
      h: window.innerHeight,
    };
    this.canvasTag.setAttribute("width", this.canvasSize.w);
    this.canvasTag.setAttribute("height", this.canvasSize.h);
  },

  setEventListeners() {
    document.onkeydown = (e) => {
      if (e.key === this.keys.left) {
        this.player.move("left");
        this.direcction = "left";
        this.playerWalkSound.play();
      }
      if (e.key === this.keys.right) {
        this.player.move("right");
        this.direcction = "right";
        this.playerWalkSound.play();
      }
      if (e.key === this.keys.up) {
        this.player.move("up");
        this.direcction = "up";
        this.playerWalkSound.play();
      }
      if (e.key === this.keys.down) {
        this.player.move("down");
        this.direcction = "down";
        this.playerWalkSound.play();
      }
      if (e.key === this.keys.shoot) {
        this.player.shoot();
        this.playerThrowSound.play();
      }
    };
  },

  preloadSounds() {
    this.bgMusicSound = new Audio("Sounds/backMusic.mp3");
    this.bgMusicSound.volume = 0.7;

    this.playerWalkSound = new Audio("Sounds/player-walk.mp3");
    this.playerWalkSound.volume = 0.3;
    this.playerDamageSound = new Audio("Sounds/player-damage.mp3");
    this.playerThrowSound = new Audio("Sounds/player-throw.mp3");
    this.playerThrowSound.volume = 0.3;
    this.rockImpactSound = new Audio("Sounds/rock-impact.mp3");
    this.rockImpactSound.volume = 0.1;

    this.crabWalkSound = new Audio("Sounds/crab-walk.mp3");
    this.crabWalkSound.volume = 0.3;
    this.crabDieSound = new Audio("Sounds/crab-die.mp3");
    this.crabDieSound.volume = 0.3;
    this.crabThrowSound = new Audio("Sounds/knife-throw.mp3");
    this.knifeImpactSound = new Audio("Sounds/knife-impact.mp3");
    this.knifeImpactSound.volume = 0.2;

    this.seagullSound = new Audio("Sounds/seagull.mp3");
    this.seagullDieSound = new Audio("Sounds/seagull-die.mp3");

    this.playerLoseSound = new Audio("Sounds/death.mp3");
    this.playerLoseSound.volume = 0.5;
    this.playerWinSound = new Audio("Sounds/win.mp3");
    this.playerWinSound.volume = 0.3;
  },

  //        ----  START LOOP  ----

  start() {
    this.reset();

    this.interval = setInterval(() => {
      this.clear();

      this.generateEnemies();
      this.generateObstacles();

      this.drawAll();

      this.updatePlayerStatus();

      this.clearAll();

      this.frames > 5000 ? this.frames = 0 : this.frames++;

      this.isCollisionAll();

      this.lives < 0 && this.gameOver();

      this.score === 30 && this.youWin();
      
    }, 1000 / this.FPS);
  },

  //        ----  METHODS  ----

  reset() {
    this.map = new Map(this.ctx, this.canvasSize, "superbeach.png");
    this.player = new Player(
      this.ctx,
      this.canvasSize,
      this.canvasSize.w / 2 - 100,
      this.canvasSize.h - 150,
      85,
      140,
      this.frames,
      this.keys,
      "player.png"
    );
    this.enemies = [];
    this.obstacles = [];

    this.bgMusicSound.play();
  },

  clear() {
    this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
  },

  drawAll() {
    this.map.draw();
    this.player.draw();
    this.enemies.forEach((enemy) => enemy.draw());
    this.seagulls.forEach((seagull) => seagull.draw(this.frames));
    this.obstacles.forEach((obs) => obs.draw());
  },

  generateEnemies() {
    const crab1 = new Enemy(
      this.ctx,
      this.canvasSize,
      this.frames,
      this.canvasSize.w / 5 - 50,
      0,
      45,
      45,
      0.5,
      "crab.png"
    );
    const crab2 = new Enemy(
      this.ctx,
      this.canvasSize,
      this.frames,
      this.canvasSize.w / 5 - 50 + 100,
      0,
      45,
      45,
      0.5,
      "crab.png"
    );
    const crab3 = new Enemy(
      this.ctx,
      this.canvasSize,
      this.frames,
      this.canvasSize.w / 5 - 50 + 200,
      0,
      45,
      45,
      0.5,
      "crab.png"
    );
    const crab4 = new Enemy(
      this.ctx,
      this.canvasSize,
      this.frames,
      this.canvasSize.w / 5 - 50 + 300,
      0,
      45,
      45,
      0.5,
      "crab.png"
    );
    const crab5 = new Enemy(
      this.ctx,
      this.canvasSize,
      this.frames,
      this.canvasSize.w / 5 - 50 + 400,
      0,
      45,
      45,
      0.5,
      "crab.png"
    );
    const crab6 = new Enemy(
      this.ctx,
      this.canvasSize,
      this.frames,
      this.canvasSize.w / 5 - 50 + 500,
      0,
      45,
      45,
      0.5,
      "crab.png"
    );

    if (this.frames % 700 === 0) {
      this.enemies.push(crab1, crab2, crab3, crab4, crab5, crab6);
      this.crabWalkSound.play();
    }

    const randomX1 =
      Math.floor(Math.random() * (this.canvasSize.w - 30 - 30)) + 30;
    const seagull1 = new Seagull(
      this.ctx,
      this.canvasSize,
      this.frames,
      randomX1,
      0,
      90,
      90,
      "seagull_sprites.png"
    );
    this.frames % 800 === 0 ? this.seagulls.push(seagull1) : null;
  },

  generateObstacles() {
    const rockObstacle = new Obstacle(
      this.ctx,
      this.canvasSize,
      this.frames,
      500,
      300,
      130,
      130,
      "Bigrock.png"
    );
    const castleObstacle = new Obstacle(
      this.ctx,
      this.canvasSize,
      this.frames,
      0,
      580,
      150,
      65,
      "Sandcastle.png"
    );
    const bigRockObstacle = new Obstacle(
      this.ctx,
      this.canvasSize,
      this.frames,
      50,
      50,
      130,
      130,
      "Bigrock.png"
    );

    this.frames % 1000 === 0 && this.obstacles.length < 1
      ? this.obstacles.push(rockObstacle, castleObstacle, bigRockObstacle)
      : null;
  },

  updatePlayerStatus() {
    this.updateScore();
    this.updateLives();
  },

  updateScore() {
    this.ctx.fillStyle = "black";
    this.ctx.font = "20px sans-serif";
    this.ctx.fillText(`Score: ${this.score}`, 20, this.canvasSize.h - 20);
  },

  updateLives() {
    this.ctx.fillStyle = "black";
    this.ctx.font = "20px sans-serif";
    this.ctx.fillText(`Lives: ${this.lives}`, 20, this.canvasSize.h - 40);
  },

  clearAll() {
    this.player.clearBullets();
    this.enemies.forEach((enemy) => enemy.clearBullets());
    this.enemies = this.enemies.filter(
      (enemy) => enemy.enemyPos.y < this.canvasSize.h
    );
    this.seagulls = this.seagulls.filter(
      (seagull) => seagull.seagullPos.y < this.canvasSize.h
    );
  },

  isCollisionAll() {
    this.isCollision();
    this.isImpactAll();
  },

  isCollision() {
    //        Player vs Crab
    this.enemies.forEach((enemy) => {
      if (
        this.player.playerPos.x + this.player.playerSize.w > enemy.enemyPos.x &&
        this.player.playerPos.y + this.player.playerSize.h > enemy.enemyPos.y &&
        this.player.playerPos.x < enemy.enemyPos.x + enemy.enemySize.w &&
        this.player.playerPos.y < enemy.enemyPos.y + enemy.enemySize.h
      ) {
        this.enemies = this.enemies.filter((elm) => elm !== enemy);
        this.lives -= 1;
        this.playerDamageSound.play();
        this.crabDieSound.play();
      }
    });
    //        Player vs Seagull
    this.seagulls.forEach((seagull) => {
      if (
        this.player.playerPos.x + this.player.playerSize.w >
          seagull.seagullPos.x &&
        this.player.playerPos.y + this.player.playerSize.h >
          seagull.seagullPos.y &&
        this.player.playerPos.x <
          seagull.seagullPos.x + seagull.seagullSize.w &&
        this.player.playerPos.y < seagull.seagullPos.y + seagull.seagullSize.h
      ) {
        this.seagulls = this.seagulls.filter((elm) => elm !== seagull);
        this.lives -= 1;
        this.playerDamageSound.play();
        this.seagullDieSound.play();
      }
    });

    //     Obstacle vs Player
    this.obstacles.forEach((obst) => {
      if (
        this.player.playerPos.x + this.player.playerSize.w >=
          obst.obstaclePos.x &&
        this.player.playerPos.y + this.player.playerSize.h >=
          obst.obstaclePos.y &&
        this.player.playerPos.x < obst.obstaclePos.x + obst.obstacleSize.w &&
        this.player.playerPos.y < obst.obstaclePos.y + obst.obstacleSize.h
      ) {
        switch (this.direcction) {
          case "left":
            this.player.move("right") ||
              this.player.move("up") ||
              this.player.move("down");
            break;

          case "right":
            this.player.move("left") ||
              this.player.move("up") ||
              this.player.move("down");
            break;

          case "up":
            this.player.move("left") ||
              this.player.move("right") ||
              this.player.move("down");
            break;

          case "down":
            this.player.move("left") ||
              this.player.move("right") ||
              this.player.move("up");
            break;
        }
      }
    });
  },

  isImpactAll() {
    //      Rock vs Crab

    this.enemies.forEach((enemy) => {
      this.player.bullets.forEach((bullet) => {
        if (
          bullet.bulletsPos.x + bullet.bulletsSize.w > enemy.enemyPos.x &&
          bullet.bulletsPos.y + bullet.bulletsSize.h > enemy.enemyPos.y &&
          bullet.bulletsPos.x < enemy.enemyPos.x + enemy.enemySize.w &&
          bullet.bulletsPos.y < enemy.enemyPos.y + enemy.enemySize.h
        ) {
          this.enemies = this.enemies.filter((elm) => elm !== enemy);
          this.player.bullets = this.player.bullets.filter(
            (elm) => elm !== bullet
          );
          this.score += 1;
          this.rockImpactSound.play();
          this.crabDieSound.play();
        }
      });
    });

    //      Rock vs Seagull

    this.seagulls.forEach((seagull) => {
      this.player.bullets.forEach((bullet) => {
        if (
          bullet.bulletsPos.x + bullet.bulletsSize.w > seagull.seagullPos.x &&
          bullet.bulletsPos.y + bullet.bulletsSize.h > seagull.seagullPos.y &&
          bullet.bulletsPos.x < seagull.seagullPos.x + seagull.seagullSize.w &&
          bullet.bulletsPos.y < seagull.seagullPos.y + seagull.seagullSize.h
        ) {
          seagull.lives -= 1;
          this.rockImpactSound.play();
          this.seagulls.forEach((elm) => {
            if (elm.lives === 0) {
              this.seagulls = this.seagulls.filter((elm) => elm !== seagull);
              this.score += 2;
              this.rockImpactSound.play();
              this.seagullDieSound.play();
            }
          });
          this.player.bullets = this.player.bullets.filter(
            (elm) => elm !== bullet
          );
        }
      });
    });

    //      Rock vs Obstacle

    this.obstacles.forEach((obst) => {
      this.player.bullets.forEach((bullet) => {
        if (
          bullet.bulletsPos.x + bullet.bulletsSize.w > obst.obstaclePos.x &&
          bullet.bulletsPos.y + bullet.bulletsSize.h > obst.obstaclePos.y &&
          bullet.bulletsPos.x < obst.obstaclePos.x + obst.obstacleSize.w &&
          bullet.bulletsPos.y < obst.obstaclePos.y + obst.obstacleSize.h
        ) {
          obst.lives -= 1;
          this.rockImpactSound.play();
          this.obstacles.forEach((elm) => {
            if (elm.lives === 0) {
              this.obstacles = this.obstacles.filter((elm) => elm !== obst);
            }
          });
          this.player.bullets = this.player.bullets.filter(
            (elm) => elm !== bullet
          );
        }
      });
    });

    //      Knife vs Player

    this.enemies.forEach((enemy) => {
      enemy.bullets.forEach((knife) => {
        if (
          knife.bulletsPos.x + knife.bulletsSize.w > this.player.playerPos.x &&
          knife.bulletsPos.y + knife.bulletsSize.h > this.player.playerPos.y &&
          knife.bulletsPos.x <
            this.player.playerPos.x + this.player.playerSize.w &&
          knife.bulletsPos.y <
            this.player.playerPos.y + this.player.playerSize.h
        ) {
          enemy.bullets = enemy.bullets.filter((elm) => elm !== knife);
          this.lives -= 1;
          this.playerDamageSound.play();
        }
      });
    });

    //      Knife vs Obstacle

    this.obstacles.forEach((obst) => {
      this.enemies.forEach((enemy) => {
        enemy.bullets.forEach((knife) => {
          if (
            knife.bulletsPos.x + knife.bulletsSize.w > obst.obstaclePos.x &&
            knife.bulletsPos.y + knife.bulletsSize.h > obst.obstaclePos.y &&
            knife.bulletsPos.x < obst.obstaclePos.x + obst.obstacleSize.w &&
            knife.bulletsPos.y < obst.obstaclePos.y + obst.obstacleSize.h
          ) {
            enemy.bullets = enemy.bullets.filter((elm) => elm !== knife);
            this.knifeImpactSound.play();
          }
        });
      });
    });
  },

  gameOver() {
    document.onkeydown = (e) => {
      e.key === this.keys.reset ? location.reload() : null;
    };
    clearInterval(this.interval);

    this.gameOverImage = new Image();
    this.gameOverImage.src = "images/YouLose.png";
    this.ctx.drawImage(
      this.gameOverImage,
      0,
      0,
      this.canvasSize.w,
      this.canvasSize.h
    );

    this.ctx.font = "50px Ranchers";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("GAME OVER!", this.canvasSize.w / 2 - 120, 100);
    this.ctx.fillText(
      "Your Score: " + this.score,
      this.canvasSize.w / 2 - 120,
      200
    );
    this.ctx.fillStyle = "white";
    this.ctx.fillText(
      "Press enter to reload",
      this.canvasSize.w / 2 - 200,
      this.canvasSize.h - 80
    );

    this.bgMusicSound.pause();
    this.crabWalkSound.pause();
    this.playerLoseSound.play();
  },

  youWin() {
    document.onkeydown = (e) => {
      e.key === this.keys.reset ? location.reload() : null;
    };
    clearInterval(this.interval);

    this.youWinImage = new Image();
    this.youWinImage.src = "images/YouWin.png";
    this.ctx.drawImage(
      this.youWinImage,
      0,
      0,
      this.canvasSize.w,
      this.canvasSize.h
    );

    this.ctx.font = "50px Ranchers";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("You Win!", this.canvasSize.w / 2 - 80, 100);
    this.ctx.fillText(
      "Your Score: " + this.score,
      this.canvasSize.w / 2 - 110,
      200
    );
    this.ctx.fillText(
      "Press enter to reload",
      this.canvasSize.w / 2 - 200,
      this.canvasSize.h - 80
    );

    this.bgMusicSound.pause();
    this.crabWalkSound.pause();
    this.playerWinSound.play();
  },
};
