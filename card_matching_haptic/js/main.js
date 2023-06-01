import * as RRLIB from '../../js/modules/rrlib.js'


// RRLIB speech for the games

class DefaultWeb {
    constructor() {
        this.ros = new RRLIB.Ros({
            host: 'http://' + window.location.hostname
        });
        this.tts_action = new RRLIB.ActionClient({
            ros: this.ros,
            name: 'tts'
        });
    }

    init() {
        let param = new RRLIB.Param({
            ros: this.ros,
            name: 'robot_info'
        });
    }
    firstFrase() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "<mark name='doTrick trickName=show_right'/>Let's begin! You go first.",
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });
    }
    secondFrase() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "<break time='500ms'/><mark name='doTrick trickName=nod'/> Yes!", //<break time='500ms'/>
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });
    }
    woohooFrase() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "<break time='500ms'/><mark name='doTrick trickName=alive_6'/> Woo hoo!", //<break time='500ms'/>
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });
    }
    thirdFrase() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "<mark name='doTrick trickName=alive_1'/>Good one.",
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });

    }
    keepGoing() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "<mark name='doTrick trickName=alive_5'/>Keep going!", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });
    }
    greatWork() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "<mark name='doTrick trickName=alive_7'/>Great work!", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });
    }
    goAgain() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "<mark name='doTrick trickName=alive_6'/>Nice, go again!", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });
    }
    
    winFrase() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "<mark name='doTrick trickName=alive_5'/> We have completed the deck! <mark name='doTrick trickName=alive_6'/> Press next to continue.",
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });
        
    }
}

let default_web = new DefaultWeb();
window.ariNumPairs = 0;
window.userNumPairs = 0;
window.reacTime = 0; //reaction time - time it takes to select the pair of cards
// window.duration = 0;
window.secs = 0;
window.mins = 0;
var startTimer = 0;


// Add event listeners
$(document).ready(function() {
  var startTimerDate = new Date();
  startTimer = startTimerDate.getTime();
  default_web.firstFrase();

  var flip1 = document.getElementById('flip1');
  flip1.setAttribute('src', 'flip-card-1.mp3'); 
  var flip2 = document.getElementById('flip2');
  flip2.setAttribute('src', 'flip-card-2.mp3'); 
  var flipBack = document.getElementById('flipBack');
  flipBack.setAttribute('src', 'flip-card-back.mp3'); 

  


  // $("#back").on("touchend", function(){
  //   window.open("../pre_ratings_mem_game/index.html", "_self");
  // });
  
  $("#next").on("touchend", function(){
    window.open("../scores_card_matching/index.html", "_self");

  });
});


/*
----------------- GAME FUNCTION ------------------
*/
(function(){	
	var ids = [1,2,3,4,5,6,7,8,9,10,11,22,33,44,55,66,77,88,99,110]; 
	var ariMatch = 0; //add until reach threshold, where ARI will pick a correct pair
	var speakYes = true;
	var ariFeed = 0;
	var speakNiceOne = true;
	//for reaction time calculations
	var rt_list = [];
	var initRT;
	var start = new Date();
	var end = new Date();
	var rt1 = 0;
	var rt2 = 0;
	var feedbackCntr = 0; //counter so ARI will say all phrases of encouragement each round of the game
	var firstCard = false; //first card has been picked
	
	
	var Memory = {

		init: function(cardsHeart,cardsDiamond){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cardsHeart, cardsDiamond);
			this.shuffleCards(this.cardsArray);			
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     		this.guess = null;
			this.binding();
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));

			var str1 = JSON.stringify(this.$memoryCards);
			// console.log(str1);

			//reaction time starting value after ARI speaks
			this.sleep(2500).then(() => { 
				start = new Date();
				rt1 = start.getTime();
			});
		},

		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory; //Why is this here...saving instance of game?
			var $card = $(this);

			// console.log("TESTING");
			var str1 = JSON.stringify($(this).attr("data-id"));
			// console.log("data-id: " + str1);
			var str2 = JSON.stringify($(this));
			// console.log("$card: " + str2);
			// console.log("TESTING FINISHED");

			//If game hasn't been won, it does not have a match, and it hasn't been picked
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				//add picked attribute to card
				$card.find(".inside").addClass("picked");
				if(firstCard == false){
					flip1.play();
					console.log("Flip 1");
					firstCard = true;
				}
				else{
					firstCard = false; //reset for next two cards picked
				}
				
				//If guess hasn't been made yet
				if(!_.guess){
					//add id to the guess variable
					_.guess = parseInt($(this).attr("data-id")); //guess is now an int
				} 
				//If the id matches the guess's id and (the second card?) hasn't been picked yet
				else if((_.guess == parseInt($(this).attr("data-id"))*11 || _.guess == parseInt($(this).attr("data-id"))/11 )&& !$(this).hasClass("picked")){
		

					flip2.play();
					console.log("Flip 2");
					//the card is a match, add match attribute
					$(".picked").addClass("matched");


					//Calc rt for this correct pair and restart timer for next pair
					end = new Date();
					rt2 = end.getTime();
					initRT = rt2-rt1;
					rt_list.push(initRT);
					console.log("RT List: " + rt_list);
					// document.getElementById("title").innerHTML = initRT;


					//Buzz since correct pair
					_.hapticFeed();

					start = new Date();
					rt1 = start.getTime();
					console.log("RT START");

					_.sleep(1000).then(() => { 
					if(speakNiceOne == true){
						_.randFeed();
						speakNiceOne = false;						
					}
					else if(speakNiceOne == false){
						speakNiceOne = true;
					}
					});
					
					ids.splice(ids.indexOf(parseInt($(this).attr("data-id"))), 1);
					ids.splice(ids.indexOf(_.guess), 1);

					//update user's score
					window.userNumPairs++;
					localStorage.setItem('userNumPairs', userNumPairs);

					//and reset guess to null
					_.guess = null;
				} 
				//Otherwise, cards are not a match, so reset & switch player's turn
				else {
					end = new Date();
					rt2 = end.getTime();
					// console.log("rt2 no match: " + rt2);
					initRT = rt2-rt1;
					rt_list.push(initRT);
					console.log("RT List: " + rt_list);
					// document.getElementById("title").innerHTML = initRT;
					console.log("FLIP 2");
					flip2.play();
					_.guess = null;
					_.paused = true;

					_.sleep(1500).then(() => { 
						// Waiting to flip back over
						$(".picked").removeClass("picked");
						flipBack.play();
						Memory.paused = false;
					});

					if(ariMatch < 3){
						_.ariIncorrectPair();
					}
					else{
						_.ariCorrectPair();

					}

					
				}
				//If all cards have been matched, execute win (show trophy page)
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		randFeed: function(){
	    	//0 = min, 3 = max
	        // var idx = Math.floor(Math.random() * 3);
	        if (feedbackCntr == 0){
	        	default_web.goAgain();
	        }
	        else if (feedbackCntr == 1){
	            default_web.greatWork();
	        }
	        else if(feedbackCntr == 2){
	        	default_web.keepGoing();
	        }
	        else { //idx = 3+
	            default_web.thirdFrase();
	        }
	        feedbackCntr++;
	    },

		ariIncorrectPair: function(){

			var _ = Memory;
			var card1;
			var picked1;
			var card2;
			var picked2;

			//If there's only one pair left, have ARI choose that pair (by executing correct pair method)
			if(ids.length == 2){
				_.ariCorrectPair();
				return;
			}

			//Every 3 tries, selects a correct pair (use counter & reset to 0 when executes correct match)

			//Select random index given len of array
			var randIdx1 = _.getRandomIdx(ids.length);
			var randIdx2 = _.getRandomIdx(ids.length);
			
			//use loop to ensure two cards are not a match
			while((ids[randIdx1] == ids[randIdx2]*11) || (ids[randIdx1] == ids[randIdx2]/11) || (ids[randIdx1] == ids[randIdx2])){
				randIdx2 = _.getRandomIdx(ids.length);
			}

			//Make string that looks like: '[data-id="2"]'
			let startStr = '[data-id="';
			let endStr = '"]';
			var card1ToStr = ids[randIdx1].toString();
			var card2ToStr = ids[randIdx2].toString();

			var cardOneStr = startStr.concat(card1ToStr, endStr);
			var cardTwoStr = startStr.concat(card2ToStr, endStr);

			//When card is match
			_.sleep(2000).then(() => { 
				card1 = $(cardOneStr);
				picked1 = card1.find(".inside").addClass("picked");
				flip1.play();

				_.sleep(1000).then(() => { 
					card2 = $(cardTwoStr);
					picked2 = card2.find(".inside").addClass("picked");
					flip2.play();

					_.sleep(1500).then(() => { 
						picked1.removeClass("picked");
						picked2.removeClass("picked");
						flipBack.play();
						start = new Date();
						rt1 = start.getTime();
						console.log("RT START");
					});
				});
			});
			ariMatch ++;
			
		},

		ariCorrectPair: function(){
			var _ = Memory;
			var card1;
			var picked1;
			var card2;
			var picked2;
			var loop = true;

			//ARI will select a correct pair, so update score:
			window.ariNumPairs++;
			localStorage.setItem('ariNumPairs', ariNumPairs);
			

			//Every 3 tries, selects a correct pair (use counter & reset to 0 when executes correct match)

			//Select random index given len of array
			var randIdx1 = _.getRandomIdx(ids.length);
			var randIdx2 = _.getRandomIdx(ids.length);
			
			//use loop to ensure two cards are not a match
			while(loop){
				if((ids[randIdx1] == ids[randIdx2]*11) || (ids[randIdx1] == ids[randIdx2]/11)){
					loop = false;
				}
				else{
					randIdx2 = _.getRandomIdx(ids.length);
				}
				
			}

			//Make string that looks like: '[data-id="2"]'
			let startStr = '[data-id="';
			let endStr = '"]';
			var card1ToStr = ids[randIdx1].toString();
			var card2ToStr = ids[randIdx2].toString();

			var cardOneStr = startStr.concat(card1ToStr, endStr);
			var cardTwoStr = startStr.concat(card2ToStr, endStr);

		
			//When card is match
			_.sleep(2000).then(() => { 
				card1 = $(cardOneStr);
				picked1 = card1.find(".inside").addClass("picked");
				flip1.play();

				_.sleep(1000).then(() => { 
					card2 = $(cardTwoStr);
					picked2 = card2.find(".inside").addClass("picked");
					flip2.play();

					picked1.addClass("matched");
					picked2.addClass("matched");

					ids.splice(ids.indexOf(parseInt(card1.attr("data-id"))), 1);
					ids.splice(ids.indexOf(parseInt(card2.attr("data-id"))), 1);
					
					var str4 = JSON.stringify(ids);


					//ARI got a pair correct, so gets to try again, but will get it incorrect this time
					_.sleep(1000).then(() => { 
						//Just added this if/else, need to check if it works
						if(ids.length == 0){
							_.win();
						}
						else{
							ariMatch = 0;
							_.ariIncorrectPair();
						}
						
					});
				});

			});
			if(speakYes == true){
				_.sleep(3000).then(() => { 
					if (ariFeed == 0){
						default_web.secondFrase();
						ariFeed++;
					}
					else{
						default_web.woohooFrase();
						ariFeed--;
					}
					
					speakYes = false;
				});
				
			}
			else if(speakYes == false){
				speakYes = true;
			}
			

		},

		//Select random index given len of array
		getRandomIdx: function (max) {
			return Math.floor(Math.random() * max);
		},

		sleep: function(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
		},

		hapticFeed: function(){
			// document.getElementById("title").innerHTML = "Feedback";
	        const req = new XMLHttpRequest();
	        req.open("POST", "http://192.168.1.4:2000/50AA100");
	        req.timeout = 2000;
	        req.ontimeout = (e) => {
	            console.log("Timeout");
	            // document.getElementById("title").innerHTML = "Timeout";
	        };
	        req.send();

	    },

		win: function(){
			this.paused = true;
			setTimeout(function(){
				// console.log("ARI's Score: ");
				// var strARI = JSON.stringify(window.ariNumPairs);
				// console.log(strARI);
				// console.log("User's Score: ");
				// var strUser = JSON.stringify(window.userNumPairs);
				// console.log(strUser);
				console.log("IN WIN FXN");

				//Calc total duration of game
				var endTimerDate = new Date();
			    var endTimer = endTimerDate.getTime();
			    var totalSeconds = (endTimer-startTimer)/1000; //total seconds
			    //split total seconds into mins and secs
			    var minutes = Math.floor(totalSeconds / 60);
			    var seconds = totalSeconds - minutes * 60;

			    seconds = seconds.toFixed(0); //cut to 0 decimal places

			    window.mins = minutes;
			    window.secs = seconds;
			    localStorage.setItem('mins', mins);
			    localStorage.setItem('secs', secs);

				//Calculate avg reaction time
				var averageRT = rt_list.reduce((a, b) => a + b, 0) / rt_list.length;
				averageRT = averageRT/1000; //convert ms to seconds
				var finalAvgRT = averageRT.toFixed(2); //cut to 2 decimal places
				console.log("Avg RT: " + finalAvgRT + " seconds.");
				localStorage.setItem('reacTime', finalAvgRT);

				localStorage.setItem('ariNumPairs', ariNumPairs);
				localStorage.setItem('userNumPairs', userNumPairs);

				console.log("SAYING WIN FRASE");
                default_web.winFrase();
				// Memory.showModal();
				// Memory.$game.fadeOut();
			}, 1000);
		},

		// calcAvgRT: function(){
			

		// },

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			localStorage.clear();
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
		   	// While there are elements in the array
		   	while (counter > 0) {
	        	// Pick a random index
	        	index = Math.floor(Math.random() * counter);
	        	// Decrease counter by 1
	        	counter--;
	        	// And swap the last element with it
	        	temp = array[counter];
	        	array[counter] = array[index];
	        	array[index] = temp;
		    	}
		    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="../common_mem_game/images/cards.svg"/></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cardsH = [
		{
			name: "AH",
			img: "images/AH.png",
			id: 1,
		},
		
		{
			name: "2H",
			img: "images/2H.png",
			id: 2,
		},
		
		{
			name: "3H",
			img: "images/3H.png",
			id: 3,
		},
		
		{
			name: "4H",
			img: "images/4H.png",
			id: 4,
		},
		
		{
			name: "5H",
			img: "images/5H.png",
			id: 5,
		},
		
		{
			name: "6H",
			img: "images/6H.png",
			id: 6,
		},
		
		{
			name: "7H",
			img: "images/7H.png",
			id: 7,
		},
		
		{
			name: "8H",
			img: "images/8H.png",
			id: 8,
		},
		
		{
			name: "9H",
			img: "images/9H.png",
			id: 9,
		},
		
		{
			name: "10H",
			img: "images/10H.png",
			id: 10,
		}

	];

	var cardsD = [
		{
			name: "AD",
			img: "images/AD.png",
			id: 11,
		},
		{
			name: "2D",
			img: "images/2D.png",
			id: 22,
		},
		{
			name: "3D",
			img: "images/3D.png",
			id: 33,
		},
		{
			name: "4D",
			img: "images/4D.png",
			id: 44,
		},
		{
			name: "5D",
			img: "images/5D.png",
			id: 55,
		},
		{
			name: "6D",
			img: "images/6D.png",
			id: 66,
		},
		{
			name: "7D",
			img: "images/7D.png",
			id: 77,
		},
		{
			name: "8D",
			img: "images/8D.png",
			id: 88,
		},
		{
			name: "9D",
			img: "images/9D.png",
			id: 99,
		},
		{
			name: "10D",
			img: "images/10D.png",
			id: 110,
		},
		];

    
	Memory.init(cardsH, cardsD);


})();
