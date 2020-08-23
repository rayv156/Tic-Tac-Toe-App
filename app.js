//////////////////////
//////CONSTANTS
///////////////////////

let boxID = 0;
let turn = 0;
let win = false;
let board = null;
let winningNumbers = null;
let idArray = null;

//===USER INFO============

const user = {
    name: "Tic Tac Toe Master",
    icon: null,
    choices: [],
}

//====CPU INFO==============

const cpu = {
    name: "CPU",
    icon: null,
    choices: [],
}

//======WINNING ARRAY==========


winningNumbers = [[1,2,3], [1,4,7], [7,8,9], [2,5,8], [3,6,9], [3,5,7], [4,5,6], [1,5,9]];


idArray = [1,2,3,4,5,6,7,8,9];


//////////////////////////
///FUNCTIONS
///////////////////////////


//========Adds X on click==============

const addX = (event) => {
    console.log(idArray)
    $(event.currentTarget).children().attr('name', 'close-outline')
    boxID = Number($(event.currentTarget).attr('id'))
    user.choices.push(boxID)
    user.choices.sort(function(a,b) {return a-b})
   
    let index = idArray.findIndex(num=> num==boxID)
    idArray.splice(index, 1);
    $(`#${boxID}`).off('click')
    return user.choices

}

//========Adds O at random==============

const addO = () => {
    let newID = idArray[Math.floor(Math.random()*idArray.length)]
    $(`#${newID}`).children().attr('name', 'radio-button-off-outline')
    cpu.choices.push(newID)
    cpu.choices.sort(function(a,b) {return a-b})
    let index = idArray.findIndex(num=> num==newID)
    idArray.splice(index, 1);
    $(`#${newID}`).off('click')
    return cpu.choices
}

//=========Checks on Winner==================

const checkWin = (player1, player2) => {
    if (player1.length>=board && player2.length>=board){
        
        for (const element of winningNumbers) {
            let playerMatch = element.every(num=> player1.includes(num))
            let cpuMatch = element.every(num=> player2.includes(num))
            console.log(playerMatch)
            console.log(cpuMatch)
            if (playerMatch) {
                setTimeout(() => {alert('You Win!')},50)
                $('.box').off('click')
                win = true
                return playerMatch && win
            } else if (cpuMatch){
                setTimeout(()=>{alert(`CPU Wins! You're a loser!`)}, 50)
                $('.box').off('click')
                win = true
                return cpuMatch && win
            } else {
                
            }
        }
} else {
}

}

//==========Welcome && Create Board==========
alert(`Welcome ${user.name}! The ${cpu.name} wants to play tic tac toe!`)
board = Number(prompt(`Would you like to play 3x3, 4x4, or 5x5?`, `Enter (3), (4), or (5)`))
const welcome = () => {
if (board === 3){
    $('#container').css('height', '310px')
    $('#container').css('width', '310px')
    winningNumbers = [[1,2,3], [1,4,7], [7,8,9], [2,5,8], [3,6,9], [3,5,7], [4,5,6], [1,5,9]];
    idArray = [1,2,3,4,5,6,7,8,9];
} else if (board === 4){
    $('#container').css('height', '415px')
    $('#container').css('width', '415px')
    winningNumbers = [[1,2,3,4], [1,5,9,13], [13,14,15,16], [2,6,10,14], [3,7,11,15], [4,8,12,16], [5,6,7,8], [9,10,11,12], [1,6,11,16],[4,7,10,13]];
    idArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
} else if (board === 5){
    $('#container').css('height', '520px')
    $('#container').css('width', '520px')
    winningNumbers = [[1,2,3,4,5], [6,7,8,9,10], [11,12,13,14,15], [16,17,18,19,20], [21,22,23,24,25], [1,6,11,16,21], [2,7,12,17,22], [3,8,13,18,23], [4,9,14,19,24], [5,10,15,20,15], [1,7,13,19,25], [5,9,13,17,21]];
    idArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
}
for (let i=1; i<=board*board; i++){
    let $newDiv = $(`<div class="box" id="${i}">`)
    $('#container').append($newDiv)
    let $newIcon = $('<ion-icon name="">')
    $newDiv.append($newIcon)
}
}

//////////////////////////
////GAME LOGIC
//////////////////////////

const tictactoe = (event) => {

    if (turn < (Math.ceil(board*board/2))-1) {
        addX(event)
        addO()
        checkWin(user.choices, cpu.choices)
        
    } else if (turn === (Math.ceil(board*board/2))-1){
        addX(event)
        checkWin(user.choices, cpu.choices)
        if (win){
        }
        else {
        setTimeout(()=>{alert(`It's a Tie!`)}, 50)
    }
    } else {
    }
    turn++
}
welcome()
$('.box').on('click', tictactoe)
