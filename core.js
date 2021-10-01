//Trick or treat logic
document.addEventListener('click', function (e) {

    var element = document.getElementById("game");
	// If the clicked element doesn't have the right selector, bail
	if (e.target.matches('.trick-or-treat')){
        //Init random number between 0 and 1 e.g. 0.899999
        const newRand = Math.random();
        //Create 50/50 change of trick or treat
        if (newRand < 0.5){
            console.log('trick');
            element.classList.add("trick");
            element.classList.remove("start","treat");
        } else {
            console.log('treat');
            element.classList.add("treat");
            element.classList.remove("start","trick");
        }
    };

}, false);

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