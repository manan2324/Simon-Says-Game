let gameSeq = [];
let userSeq = [];

let isStart = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let btns = document.querySelectorAll(".btn");

document.body.addEventListener("keypress", () => {
    if (isStart == false) {
        console.log("game starts");
        isStart = true;
        levelUp();
    }
});

const gameFlash = (btn) => {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 200);
}

const userFlash = (btn) => {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 200);
}

const levelUp = () => {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randBtn = btns[randIdx];
    gameSeq.push(randIdx);
    gameFlash(randBtn);
}

const reset = () => {
    isStart = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
        document.body.style.backgroundColor = "white";
    }, 150);
}

const checkAns = (idx) => {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        highScore = Math.max(highScore, level-1);
        h2.innerHTML = `Game Over! Your score is ${level-1} | Highest Score : ${highScore}<br/> Press any key to start game`;
        reset();
    }
}

function btnPress () {
    let btn = this;
    userFlash(btn);
    let userIdx = Number.parseInt(btn.getAttribute("id"));
    userSeq.push(userIdx);
    checkAns(userSeq.length-1);
}

for (const element of btns) {
    element.addEventListener("click", btnPress);
}