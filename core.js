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