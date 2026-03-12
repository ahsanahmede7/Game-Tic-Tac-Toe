let button = document.querySelectorAll(".btn")
let msg = document.getElementById("message")
let restart = document.getElementById("restart")
let flag = true
let player_button = document.querySelectorAll('.player')
let player;
player_button.forEach(btn=>btn.addEventListener("click",function(e){
    if(e.target.innerText=="Human"){
        player=false
        player_button[1].style.display = 'none'
    }else{
        player = true
        player_button[0].style.display = 'none'
    }

}))




let space_chk = ['','','','','','','','','']
let currentplayer = "X"
let Active = true


let pattern = [[0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6] ]
function win(e){

    if(player === undefined){
        msg.textContent = "Please select Human or Bot first"
        return
    }
    let box = e.target
    let box1 = box.getAttribute("data-index")

    if (space_chk[box1]!==''|| !Active) return;
    space_chk[box1]=currentplayer;
    box.textContent = currentplayer
    // console.log(box1,box)
    checkwin()
    if(Active&&player){
        
         setTimeout(botMove,500)
    }
    

}
function botMove(){

    let empty = []

    for(let i=0;i<space_chk.length;i++){
        if(space_chk[i] === ""){
            empty.push(i)
        }
    }

    if(empty.length === 0) return

    let randomIndex = empty[Math.floor(Math.random()*empty.length)]

    space_chk[randomIndex] = "O"

    button[randomIndex].textContent = "O"

    checkwin()

}
function checkwin(){
    let win =false
for(let i= 0;i<pattern.length;i++){
    let[a,b,c] = pattern[i]

    if (space_chk[a]&&space_chk[a]==space_chk[b]&&space_chk[a]==space_chk[c]){
        
        win = true
        showWinningLine(a,b,c)
        break
    }
}
if(win){
    message.style.display = 'block'
        message.textContent = `Player ${currentplayer} is win`
        Active = false
        restart.style.display = "block"
}
   if(Active){
        currentplayer = currentplayer === "X" ? "O" : "X";
        message.textContent = `Player ${currentplayer} is Your Turn`
    }
    if(!space_chk.includes("")&&!win){
        Active = false
        msg.textContent = 'Draw'
    }
}
function restartGame(){
    space_chk = ['','','','','','','','','']
    Active = true
    currentplayer = "X"
    message.textContent = `Player ${currentplayer}'s turn`;
    button.forEach(btn=> btn.textContent = '');
     winLine.style.display = "none"


}


button.forEach(btn=>{
    btn.addEventListener('click',win)
})
restart.addEventListener('click',restartGame)


function showWinningLine(a, b, c) {
    winLine.style.display = 'block';
    winLine.style.width = '300px'; // 3 cells * 100px
    winLine.style.height = '4px';
    
    // Horizontal win
    if (a === 0 && b === 1 && c === 2) { // Top row
          winLine.style.top = '70px';
        winLine.style.left = '10%';
        winLine.style.height = '6px';
        winLine.style.width = '300px';
        winLine.style.transform = 'rotate(0deg)'
        winLine.style.animationName = 'line-width'
    } else if (a === 3 && b === 4 && c === 5) { // Middle row
        winLine.style.top = '180px';
        winLine.style.left = '10%';
        winLine.style.height = '6px';
        winLine.style.width = '300px';
        winLine.style.animationName = 'line-width'
        winLine.style.transform = 'rotate(0deg)';
    } else if (a === 6 && b === 7 && c === 8) { // Bottom row
        winLine.style.top = '310px';
        winLine.style.left = '10%';
        winLine.style.height = '6px';
        winLine.style.width = '300px';
        winLine.style.animationName = 'line-width';
        winLine.style.transform = 'rotate(0deg)';
    }

    // Vertical win
    else if (a === 0 && b === 3 && c === 6) { // Left column
         winLine.style.top = '35px';
        winLine.style.left = '15%';
        winLine.style.height = '300px';
        winLine.style.width = '6px';
        winLine.style.animationName = 'line-height'
        winLine.style.transform = 'rotate(0deg)';
    } else if (a === 1 && b === 4 && c === 7) { // Middle column
          winLine.style.top = '35px';
        winLine.style.left = "50%";
        winLine.style.height = '300px';
        winLine.style.width = '6px';
        winLine.style.transform = 'rotate(0deg)';
        winLine.style.animationName = 'line-height'

    } else if (a === 2 && b === 5 && c === 8) { // Right column
        winLine.style.top = '40px';
        winLine.style.left = '315px';
        winLine.style.height = '300px';
        winLine.style.width = '6px';
        winLine.style.transform = 'rotate(0deg)';
        winLine.style.animationName = 'line-height'

    }

    // Diagonal win

    else if (a === 0 && b === 4 && c === 8) { // Top-left to bottom-right
        winLine.style.top = '10%';
        winLine.style.left = '10%';
        winLine.style.width = '470px';
        winLine.style.height = '4px';
        winLine.style.transform = 'rotate(45deg)';
        winLine.style.animationName = 'line-width'

    } else if (a === 2 && b === 4 && c === 6) { // Top-right to bottom-left
        winLine.style.top = '85%';
        winLine.style.left = '15%';
        winLine.style.width = '470px';
        winLine.style.height = '4px';
        winLine.style.animationName = 'line-width'
        winLine.style.transform = 'rotate(-45deg)';
    }
}
