let inputdir={x: 0, y: 0}
let foodSound=new Audio("./aset/eat_food.mp3");
let ganeOverSound=new Audio("./aset/game_over.mp3");
let backgroundSound=new Audio("./aset/background_sound.mp3");
let lpt=0;
let speed=4;
let snakeArr=[{x:1, y: 1}]
let food={x:2, y:2}
let score=0;
 
let box=document.getElementById("box");
 
function main(ct) {
  window.requestAnimationFrame(main);
  if((ct-lpt)/1000<1/speed) return;
  lpt = ct;
  gameLogic(); 
}

function iscolide(s) { 
  for (let i = 1; i < s.length; i++) {
    if (s[i].x==s[0].x && s[i].y==s[0].y) return true;
  }
  if(s[0].x>28 || s[0].x<=0 || s[0].y>28 ||s[0].y<=0) return true;
} 

function gameLogic(){
  if(iscolide(snakeArr)){
    backgroundSound.pause();
    ganeOverSound.play();
    alert("Game Over!!");
    snakeArr=[{x:1, y: 1}];
    inputdir={x:0, y:0};
    score=0;
    scorebox.innerHTML='Score: '+score;
  }

  if(snakeArr[0].x==food.x && snakeArr[0].y==food.y){
    snakeArr.unshift({x:snakeArr[0].x+inputdir.x,y:snakeArr[0].y+inputdir.y});
    score++;
    scorebox.innerHTML='Score: '+score
    foodSound.play();
    food={x:1+(Math.floor(Math.random()*28)), y:1+(Math.floor(Math.random()*28))}
  }
//Move the snake
for (let i = snakeArr.length-2; i >=0; i--) {
  snakeArr[i+1] = {...snakeArr[i]};
}
snakeArr[0].x+=inputdir.x;
snakeArr[0].y+=inputdir.y;

  box.innerHTML = '';
  snakeArr.forEach((e, i) =>{
    sElement=document.createElement("div");
    sElement.style.gridRowStart=e.y;
    sElement.style.gridColumnStart=e.x;
    if(i==0) sElement.classList.add("snake_head");
    else sElement.classList.add('snake');
    box.appendChild(sElement);
  })
  fElement=document.createElement("div");
  fElement.style.gridRowStart=food.y;
  fElement.style.gridColumnStart=food.x;
  fElement.classList.add('food');
  box.appendChild(fElement);
}

window.requestAnimationFrame(main);

 
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  Down.addEventListener('click', function() {
    backgroundSound.play();
    inputdir.y=1;
    inputdir.x=0;
  })
  Up.addEventListener('click', function() {
    backgroundSound.play();
    inputdir.y=-1;
    inputdir.x=0;
  })
  Left.addEventListener('click', function() {
    backgroundSound.play();
    inputdir.y=0;
    inputdir.x=-1;
  })
  Right.addEventListener('click', function() {
    backgroundSound.play();
    inputdir.y=0;
    inputdir.x=1;
  })
  console.log('Mobile device detected');
}else{
  window.addEventListener('keydown',e=>{
    inputdir={x:1,y:0};
    backgroundSound.play();
    backgroundSound.addEventListener('ended', function() {
    this.currentTime = 0; // Reset the audio to the beginning
    this.play(); // Replay the audio
  });
    switch(e.key){
      case 'ArrowDown':
        inputdir.y=1;
        inputdir.x=0;
        break;
      case 'ArrowUp':
        inputdir.y=-1;
        inputdir.x=0;
        break;
      case 'ArrowLeft':
        inputdir.y=0;
        inputdir.x=-1;
        break;
      case 'ArrowRight':
        inputdir.y=0;
        inputdir.x=1;
        break;
    }
  })
  console.log("not mobile device");
}
