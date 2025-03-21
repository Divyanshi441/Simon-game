let gameSeq=[];
let userSeq=[];
let btns=["yellow","red","purple","green"];
let h2 = document.querySelector("h2");

let started = false;
document.addEventListener("keypress",function(){
    if(started == false){
        console.log("game is started");
        started = true;
        levelUp();
    }
});
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}

let level =0;
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`;
    let ranIdx = Math.floor(Math.random()*3); 
    let ranColor = btns[ranIdx];
    let ranBtn = document.querySelector(`.${ranColor}`);
    gameSeq.push(ranColor);
    console.log(gameSeq);
    gameFlash(ranBtn);
}

function checkAns(idx){
    // console.log("curr level:",level);
    // let idx = level-1;

    if(userSeq[idx]===gameSeq[idx]){
        if (userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
        console.log("same value");
    }else{
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start`;
        highScore();
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

let score=[];
function highScore(){
    score.push(level);
    console.log(score);
    let max = score[0];
    for (let i = 1; i < score.length; i++) {
        if (score[i] > max) {
          max = score[i];
        }
      }
      h2.innerHTML = `Game Over! Your Highest score was <b>${max}</b> <br> Press any key to start`;
      console.log(max);
}

function reset(){
    started = false;
    gameSeq=[];
    userSeq=[];
    level =0 ;
}