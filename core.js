//Trick or treat logic
document.addEventListener('click', function (e) {

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

