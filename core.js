//Trick or treat logic

//Create query Selector for the button Click Event
const trickOrTreat = document.querySelector(".trick-or-treat")

trickOrTreat.addEventListener('click', function (e) {

    var element = document.getElementById("game");
	// If the clicked element doesn't have the right selector, bail
	if (e.target.matches('.trick-or-treat')){
        //Init random number between 0 and 1 e.g. 0.899999
        const newRand = Math.random();
        //Create 50/50 change of trick or treat
        if (newRand < 0.5){
            if(newRand>0.02)
             {
             console.log('trick');
             element.classList.add("trick");
             element.classList.remove("start","treat","dftrick");
               }else {
                 console.log('deep fried trick ');
                 element.classList.add("dftrick");
                 element.classList.remove("start","treat","trick");
 
 
             }
         } else {
             console.log('treat');
             element.classList.add("treat");
             element.classList.remove("start","trick","dftrick");
         }
    };

}, false);

//Secret code messages
$(document).ready(function(){
    //set secret words
    var secrets = {
        'SPOOKY':'mNFx28NGLfI',
        'BEANS':'cf65-4A4xRQ',
        'HACKTOBER':'JZeHxbLm_IQ',
        'POTION':'R_FQU4KzN7A',
        'HELLOTHERE':'rEq1Z0bjdwc'
    };
    //set typed var
    var typed = '';
    $('body').on('keyup', function(e) {
        //get last typed character
        var char = String.fromCharCode(e.keyCode) || String.fromCharCode(e.which);
        //add to variable
        typed += char;
        //loop secret words
        $.each(secrets, function(secretWord,secretLink){

            //get last typed word from length of secret word
            var wordToCheck = typed.substring(typed.length - secretWord.length);
            //check if typed word matches secret word
            if(wordToCheck == secretWord){
                console.log('You found a secret!');
                typed = '';
                //add youtube iframe
                $("#secret-content iframe").remove();
                $('<iframe width="100%" height="95%" frameborder="0" allowfullscreen></iframe>')
                .attr('src', 'https://www.youtube.com/embed/' + secretLink + '?autoplay=0')
                .appendTo('#secret-content');
                //show secret modal
                $('#secret-modal').css('display','block');
            }

        });
    });
    
    //hide video on click off
    $('body').click(function() {
        if ($('#secret-modal').is(':visible')) {
            $('#secret-modal').hide();
            $("#secret-content iframe").remove();
        }
    });
});

(function newFact() {
    var facts = ['Where does a ghost go on vacation? Mali-boo.',
     'What is in a ghost’s nose? Boo-gers.',
      'Why did the headless horseman go into business? He wanted to get ahead in life.',
      'What’s it like to be kissed by a vampire? It’s a pain in the neck.',
      'What do you call a cleaning skeleton? The grim sweeper.',
      'What do birds say on Halloween? "Trick or tweet!".'];
    var randomFact = Math.floor(Math.random() * facts.length);
    document.getElementById('spookyjokes').innerHTML = facts[randomFact];
  })();


// Find the witch

const witch = document.querySelector('.the-witch');
const btnReward = document.querySelector('.button--reward');
const section2 = document.querySelector('.section--2');

witch.addEventListener('click', function(){
    btnReward.classList.remove('hidden');
    section2.scrollIntoView({
        behavior: 'smooth',
    });
})

// Card Game 
class AudioController {
    constructor() {
        this.bgMusic = new Audio('https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/creepy.mp3');
        this.flipSound = new Audio('https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/flip.wav');
        this.matchSound = new Audio('https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/match.wav');
        this.victorySound = new Audio('https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/victory.wav');
        this.gameOverSound = new Audio('Assets/Audio/gameOver.wav');
        this.bgMusic.volume = 0.5;
        this.bgMusic.loop = true;
    }
    startMusic() {
        this.bgMusic.play();
    }
    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }
    flip() {
        this.flipSound.play();
    }
    match() {
        this.matchSound.play();
    }
    victory() {
        this.stopMusic();
        this.victorySound.play();
    }
    gameOver() {
        this.stopMusic();
        this.gameOverSound.play();
    }
}

class MixOrMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining')
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }

    startGame() {
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.audioController.startMusic();
            this.shuffleCards(this.cardsArray);
            this.countdown = this.startCountdown();
            this.busy = false;
        }, 500)
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }
    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }
    gameOver() {
        clearInterval(this.countdown);
        this.audioController.gameOver();
        document.getElementById('game-over-text').classList.add('visible');
    }
    victory() {
        clearInterval(this.countdown);
        this.audioController.victory();
        document.getElementById('victory-text').classList.add('visible');
    }
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }
    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            if(this.cardToCheck) {
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
            }
        }
    }
    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else 
            this.cardMismatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.audioController.match();
        if(this.matchedCards.length === this.cardsArray.length)
            this.victory();
    }
    cardMismatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }
    shuffleCards(cardsArray) {
        for (let i = cardsArray.length - 1; i > 0; i--) {
            const randIndex = Math.floor(Math.random() * (i + 1));
            [cardsArray[i], cardsArray[randIndex]] = [cardsArray[randIndex], cardsArray[i]];
        }
        cardsArray = cardsArray.map((card, index) => {
            card.style.order = index;
        });
    }
    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].src;
    }
    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(100, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}
// Card Game End 