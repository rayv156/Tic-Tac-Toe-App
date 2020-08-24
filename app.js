//////////////////////
//////CONSTANTS
///////////////////////

let boxID = 0;
let turn = 0;
let win = false;
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

$(()=> {
const addX = (event) => {
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
    if (player1.length>=Math.sqrt($('#container').children().length) && player2.length>=Math.sqrt($('#container').children().length)){
        
        for (const element of winningNumbers) {
            let playerMatch = element.every(num=> player1.includes(num))
            let cpuMatch = element.every(num=> player2.includes(num))
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
//alert(`Welcome ${user.name}! The ${cpu.name} wants to play tic tac toe!`)

const welcome = () => {
    event.preventDefault();
    $('#container').empty()
    let board = Number($('input[type="text"]').val())
if (board === 3){
    if ($(window).width>600){
    $('#container').css('height', '310px')
    $('#container').css('width', '310px')
} else {
    $('#container').css('height', '160px')
    $('#container').css('width', '160px')
}
    winningNumbers = [[1,2,3], [1,4,7], [7,8,9], [2,5,8], [3,6,9], [3,5,7], [4,5,6], [1,5,9]];
    idArray = [1,2,3,4,5,6,7,8,9];
} else if (board === 4){
    if ($(window).width>600){
        $('#container').css('height', '415px')
        $('#container').css('width', '415px')
    } else {
        $('#container').css('height', '215px')
        $('#container').css('width', '215px')
    }
    winningNumbers = [[1,2,3,4], [1,5,9,13], [13,14,15,16], [2,6,10,14], [3,7,11,15], [4,8,12,16], [5,6,7,8], [9,10,11,12], [1,6,11,16],[4,7,10,13]];
    idArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
} else if (board === 5){
    if ($(window).width>600){
        $('#container').css('height', '520px')
        $('#container').css('width', '520px')
    } else {
        $('#container').css('height', '260px')
        $('#container').css('width', '260px')
    }
    winningNumbers = [[1,2,3,4,5], [6,7,8,9,10], [11,12,13,14,15], [16,17,18,19,20], [21,22,23,24,25], [1,6,11,16,21], [2,7,12,17,22], [3,8,13,18,23], [4,9,14,19,24], [5,10,15,20,15], [1,7,13,19,25], [5,9,13,17,21]];
    idArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
}
for (let i=1; i<=board*board; i++){
    let $newDiv = $(`<div class="box" id="${i}">`)
    $('#container').append($newDiv)
    let $newIcon = $('<ion-icon name="">')
    $newDiv.append($newIcon)
}
$('.box').on('click', tictactoe)

}

//////////////////////////
////GAME LOGIC
//////////////////////////

const tictactoe = (event) => {

    if (turn < (Math.ceil($('#container').children().length/2))-1) {
        addX(event)
        addO()
        checkWin(user.choices, cpu.choices)
        
    } else if (turn === (Math.ceil($('#container').children().length/2))-1){
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
$('form').on('submit',welcome)
//$('.box').on('click', tictactoe)

})
