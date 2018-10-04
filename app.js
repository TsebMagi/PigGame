/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
CHALLENGE 1
- A player loses all points if 2 sixes are rolled in a row

CHALLENGE 2
- Players can input the winning score

CHALLENGE 3
- Players roll 2 dice and lose if either rolls a 1.
*/

// game vars
var scores, roundScore, activePlayer, activeGame, winScore;
init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    // if no game do nothing
    if(!activeGame){ return; }
    //disable the final score option and update as needed.
    //get winning score before game begins to prevent players adjusting as it goes.
    if(document.querySelector('.final-score').disabled === false){
        var input = document.querySelector('.final-score').value;
        if(!input){
            winScore = 100;
            document.querySelector('.final-score').value = 100;
        } else {
            winScore = input;
        }
        document.querySelector('.final-score').disabled = true;
    }
    //generate random number
    var dice1 = Math.floor(Math.random()*6)+1;
    var dice2 = Math.floor(Math.random()*6)+1;
    //display roll result
    var dice1Dom = document.getElementById('dice-1');
    dice1Dom.style.display = 'block';
    dice1Dom.src = 'dice-'+dice1+'.png';
    var dice2Dom = document.getElementById('dice-2');
    dice2Dom.style.display = 'block';
    dice2Dom.src = 'dice-'+dice2+'.png';

    // update current or move to next player
    if(dice1 === 6 && dice2 === 6){
        scores[activePlayer] = 0;
        document.querySelector('#score-'+activePlayer).textContent = 0;
        nextPlayer();
    } else if(dice1 !== 1 && dice2 !== 1){
            //Add score
            roundScore += dice1 +dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(!activeGame){ return; }
    //update players score
    scores[activePlayer]+=roundScore;
    //update UI
    document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
    //check for win condition
    if(scores[activePlayer] >= winScore){
        document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
        turnOffDice();
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        document.querySelector('.final-score').disabled = false;
        activeGame = false;
    } else{
        nextPlayer();
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer(){
    //tiddy up current players score and UI
    roundScore = 0;
    document.querySelector('#current-'+activePlayer).textContent = roundScore;
    document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
    turnOffDice();
    //move to new active player
    activePlayer =  (activePlayer+1)%2;
    //update new players UI
    document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
};

function turnOffDice(){
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

function init(){
    //initialize to base states
    activeGame = true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    //turn off the dice
    turnOffDice();
    //set display elements to default values
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    // remove any winner states
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    // reset who is active player
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
  