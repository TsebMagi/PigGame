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
var scores, roundScore, activePlayer, dice, lastDice, activeGame, doublePenalty;
init();
document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(!activeGame){ return; }
    //generate random number
    lastDice = dice;
    dice = Math.floor(Math.random()*6)+1;
    //display roll result
    var diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = 'dice-'+dice+'.png';
    // update current or move to next player
    if(dice !== 1){
        if(dice === 6 && lastDice === dice){
            scores[activePlayer] = 0;
            document.querySelector('#score-'+activePlayer).textContent = 0;
            nextPlayer();
        } else {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
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
    if(scores[activePlayer] >= 100){
        document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        activeGame = false;
    } else{
        nextPlayer();
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer(){
    //tiddy up current players score and UI
    roundScore = 0;
    dice = 0;
    document.querySelector('#current-'+activePlayer).textContent = roundScore;
    document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
    //move to new active player
    activePlayer =  (activePlayer+1)%2;
    //update new players UI
    document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
};

function init(){
    //initialize to base states
    activeGame = true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    dice = 0;
    lastDice = 0;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    document.querySelector('.player-0-panel').classList.add('active');
}
  