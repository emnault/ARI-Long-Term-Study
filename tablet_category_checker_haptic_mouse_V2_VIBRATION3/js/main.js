import * as RRLIB from '../../js/modules/rrlib.js'
// import interact from 'interactjs'
// import fs from 'fs';

// const fs = require('fs');

// fs.appendFile('message.txt', 'data to append', function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// });


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
                text: "<mark name='doTrick trickName=nod'/>Let's start playing!", 
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
                text: "<mark name='doTrick trickName=alive_6'/>Keep going!", 
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
                text: "<mark name='doTrick trickName=alive_5'/>Great work!", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });
    }
    youCanDoIt() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "<mark name='doTrick trickName=nod'/>You can do it!", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });
    }
    almostThere() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "<mark name='doTrick trickName=alive_2'/>Almost there!", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });
    }

    aFewLeft() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "<mark name='doTrick trickName=alive_6'/>Only a few left!", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });
    }

    finish() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "<mark name='doTrick trickName=show_right'/>All done! Press next to continue.", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });
    }
}

let default_web = new DefaultWeb();
let moving = null;
var shuffle;
var randFeed;
var win;
var reacTime;
var restartTimer;
var avgRT;
var hapticFeed;
var sleep;
var fillImgArray;
var preloadImage;
var clothingTouched;
var furnitureTouched;
var sportsTouched;
var cues_imgs = [];
window.finalAvgRT = 0;
window.numErrors = 0;
window.secs = 0;
window.mins = 0;

$(document).ready(function() {
    var startTimerDate = new Date();
    var startTimer = startTimerDate.getTime();
    var cueIdx = 0;
    // var startTime;
    // var endTime;
    var audio = new Audio('correct.mp3');
    audio.preload="auto";
    //Variables for calculating avg reaction time
    var rt_list = [];
    var initRT;
    var start = new Date();
    var end = new Date();
    var rt1 = start.getTime();
    var rt2 = 0;

    //98 cues!!
    var cues_pre_shuffle = [
        {
            img: "Cues/archery.jpeg",
            id: "sports",
        },
        
        {
            img: "Cues/armchair.jpeg",
            id: "furniture",
        },

        {
            img: "Cues/badminton.png",
            id: "sports",
        },

        {
            img: "Cues/ballet.jpeg",
            id: "sports",
        },

        {
            img: "Cues/baseball.jpeg",
            id: "sports",
        },

        {
            img: "Cues/bathing-suit.jpeg",
            id: "clothing",
        },

        {
            img: "Cues/beanbag.jpg",
            id: "furniture",
        },

        {
            img: "Cues/bed.png",
            id: "furniture",
        },

        {
            img: "Cues/bookcase.jpeg",
            id: "furniture",
        },

        {
            img: "Cues/bouldering.jpeg",
            id: "sports",
        },

        {
            img: "Cues/bowling.jpeg",
            id: "sports",
        },

        {
            img: "Cues/boxing.jpeg",
            id: "sports",
        },

        {
            img: "Cues/bracelet.jpeg",
            id: "clothing",
        },

        {
            img: "Cues/breakfast-nook.jpeg",
            id: "furniture",
        },

        {
            img: "Cues/camo.jpeg",
            id: "clothing",
        },
        {
            img: "Cues/cardigan.jpeg",
            id: "clothing",
        },
        {
            img: "Cues/chaise-lounge.jpeg",
            id: "furniture",
        },
        {
            img: "Cues/coat-rack.jpeg",
            id: "furniture",
        },
        {
            img: "Cues/coffee-table.jpeg",
            id: "furniture",
        },
        {
            img: "Cues/collared-shirt.jpeg",
            id: "clothing",
        },
        {
            img: "Cues/console.jpeg",
            id: "furniture",
        },
        {
            img: "Cues/couch.png",
            id: "furniture",
        },
        {
            img: "Cues/crib.jpeg",
            id: "furniture",
        },
        {
            img: "Cues/cricket.jpeg",
            id: "sports",
        },
        {
            img: "Cues/cycling.png",
            id: "sports",
        },
        {
            img: "Cues/desk-lamp.jpeg",
            id: "furniture",
        },
        {
            img: "Cues/desk.png",
            id: "furniture",
        },
        {
            img: "Cues/dining-room-table.jpeg",
            id: "furniture",
        },
        {
            img: "Cues/diving.jpeg",
            id: "sports",
        },
        {
            img: "Cues/doc-martins.jpg",
            id: "clothing",
        },
        {
            img: "Cues/earrings.jpeg",
            id: "clothing",
        },
        {
            img: "Cues/fencing.jpeg",
            id: "sports",
        },
        {
            img: "Cues/field-hockey.jpeg",
            id: "sports",
        },
        {
            img: "Cues/fireplace.jpg",
            id: "furniture",
        },
        {
            img: "Cues/flip-flops.jpeg",
            id: "clothing",
        },
        {
            img: "Cues/floor-lamp.jpg",
            id: "furniture",
        },
        {
            img: "Cues/football.jpeg",
            id: "sports",
        },
        {
            img: "Cues/fouton.jpeg",
            id: "furniture",
        },
        {
            img: "Cues/golf.jpeg",
            id: "sports",
        },
        {
            img: "Cues/gymnastics.png",
            id: "sports",
        },
        {
            img: "Cues/hat.jpg",
            id: "clothing",
        },
        {
            img: "Cues/heels.jpeg",
            id: "clothing",
        },
        {
            img: "Cues/hoodie.jpeg",
            id: "clothing",
        },
        {
            img: "Cues/horseback-riding.jpeg",
            id: "sports",
        },
        {
            img: "Cues/hutch.jpeg",
            id: "furniture",
        },
        {
            img: "Cues/ice-hockey.png",
            id: "sports",
        },
        {
            img: "Cues/ice-skating.jpeg",
            id: "sports",
        },
        {
            img: "Cues/island.jpeg",
            id: "furniture",
        },
        {
            img: "Cues/jeans.jpeg",
            id: "clothing",
        },
        {
            img: "Cues/karate.jpeg",
            id: "sports",
        },
        {
            img: "Cues/kilt.png",
            id: "clothing",
        },
        {
            img: "Cues/l-couch.jpeg",
            id: "furniture",
        },
        {
            img: "Cues/lacrosse.jpeg",
            id: "sports",
        },
        {
            img: "Cues/lamp.jpeg",
            id: "furniture",
        },
        {
            img: "Cues/laundry.png",
            id: "furniture",
        },
        {
            img: "Cues/lazy-boy.jpeg",
            id: "furniture",
        },
        {
            img: "Cues/leggings.jpeg",
            id: "clothing",
        },
        {
            img: "Cues/mens-dress-shoes.jpg",
            id: "clothing",
        },
        {
            img: "Cues/mens-trousers.jpeg",
            id: "clothing",
        },
        {
            img: "Cues/necklace.jpeg",
            id: "clothing",
        },
        {
            img: "Cues/nightstand.jpeg",
            id: "furniture",
        },
        {
            img: "Cues/office-chair.jpg",
            id: "furniture",
        },
        {
            img: "Cues/outdoor-chairs.jpeg",
            id: "furniture",
        },
        {
            img: "Cues/paddleboarding.jpeg",
            id: "sports",
        },
        {
            img: "Cues/ping-pong.png",
            id: "sports",
        },
        {
            img: "Cues/puffer-jacket.jpeg",
            id: "clothing",
        },
        {
            img: "Cues/rain-coat.jpg",
            id: "clothing",
        },
        {
            img: "Cues/ring.jpeg",
            id: "clothing",
        },
        {
            img: "Cues/rocking-chair.jpeg",
            id: "furniture",
        },
        {
            img: "Cues/rowing.png",
            id: "sports",
        },
        {
            img: "Cues/rug.jpeg",
            id: "furniture",
        },
        {
            img: "Cues/rugby.jpeg",
            id: "sports",
        },
        {
            img: "Cues/sailing.jpeg",
            id: "sports",
        },
        {
            img: "Cues/sandals.jpeg",
            id: "clothing",
        },
        {
            img: "Cues/scarf.jpg",
            id: "clothing",
        },
        {
            img: "Cues/scottish-hats.jpeg",
            id: "clothing",
        },
        {
            img: "Cues/shawl.jpg",
            id: "clothing",
        },
        {
            img: "Cues/shelves.jpeg",
            id: "furniture",
        },
        {
            img: "Cues/shoe-rack.jpeg",
            id: "furniture",
        },
        {
            img: "Cues/skiing.png",
            id: "sports",
        },
        {
            img: "Cues/skirt.jpeg",
            id: "clothing",
        },
        {
            img: "Cues/snowboarding.jpeg",
            id: "sports",
        },
        {
            img: "Cues/stool.jpeg",
            id: "furniture",
        },
        {
            img: "Cues/suit.jpg",
            id: "clothing",
        },
        {
            img: "Cues/sun-hat.jpeg",
            id: "clothing",
        },
        {
            img: "Cues/sundress.jpeg",
            id: "clothing",
        },
        {
            img: "Cues/sunglasses.png",
            id: "clothing",
        },
        {
            img: "Cues/surfing.png",
            id: "sports",
        },
        {
            img: "Cues/suspenders.jpg",
            id: "clothing",
        },
        {
            img: "Cues/swimming.jpeg",
            id: "sports",
        },
        {
            img: "Cues/tennis.png",
            id: "sports",
        },
        {
            img: "Cues/tie.jpg",
            id: "clothing",
        },
        {
            img: "Cues/turtleneck.jpeg",
            id: "clothing",
        },
        {
            img: "Cues/vanity.jpeg",
            id: "furniture",
        },
        {
            img: "Cues/volleyball.jpeg",
            id: "sports",
        },
        {
            img: "Cues/wardrobe.jpeg",
            id: "furniture",
        },
        {
            img: "Cues/watch.jpeg",
            id: "clothing",
        },
        {
            img: "Cues/wedding-dress.jpeg",
            id: "clothing",
        },


        ];
//  shapes_demo.init();
  localStorage.clear();
  // default_web.firstFrase();
  

  shuffle = function(array){
      let currentIndex = array.length,  randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }

      return array;
  }

  reacTime = function(){
        end = new Date();
        rt2 = end.getTime();
        initRT = rt2-rt1;
        rt_list.push(initRT);
        console.log("RT List: " + rt_list);
        
  }

  restartTimer = function(){
    //Reset start time to calc next reaction time.
        start = new Date();
        rt1 = start.getTime();
  }

  avgRT = function(){
        var averageRT = rt_list.reduce((a, b) => a + b, 0) / rt_list.length;
        averageRT = averageRT/1000; //convert ms to seconds
        window.finalAvgRT = averageRT.toFixed(2); //cut to 2 decimal places
        console.log("Avg RT: " + finalAvgRT + " seconds.");
        localStorage.setItem('reacTime', finalAvgRT);
  }

  //rand feedback during interaction
  randFeed = function(){
    //0 = min, 3 = max
        var idx = Math.floor(Math.random() * 3);
        if (idx == 0){
            default_web.keepGoing();
        }
        else if (idx == 1){
            default_web.greatWork();
        }
        else { //idx = 2
            default_web.youCanDoIt();
        }
    }

    win = function(){
      //Set num errors and avg RT for displaying scores on next screen
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
      localStorage.setItem('numErrors', numErrors);

      avgRT(); 

      document.getElementById("title").innerHTML = "Finished! Press next to continue.";

    }


    hapticFeed = function(){

        // const req = new XMLHttpRequest();
        // req.open("POST", "http://192.168.1.4:2000");
        // console.log("open");
        // req.timeout = 1000;
        // req.ontimeout = (e) => {
        //     console.log("Timeout");
        //     document.getElementById("title").innerHTML = "Timeout";
        // };
        // req.send();
        // console.log("buzz");

        const req = new XMLHttpRequest();
        req.open("POST", "http://192.168.1.3:2000/50AA100");
        req.timeout = 2000;
        req.ontimeout = (e) => {
            console.log("Timeout");
            // document.getElementById("title").innerHTML = "Timeout";
        };
        req.send();
        // return fetch("http://192.168.1.4:2000/50AA100", {method: "POST"})

        


    }

    function fillImgArray()
    {
        for (var i = 0; i < cues.length; i++) {
            preloadImage(cues[i].img, cues[i].id);
        }
    }

    function preloadImage(path, category)
    {
        var img=new Image();
        img.src=path;
        img.id=category;
        cues_imgs.push(img);
    }

  var cues = shuffle(cues_pre_shuffle); //Shuffle cues
  fillImgArray();
  var firstImage = cues[0].img;
  var numCorrect = 0;

  document.getElementById("Cue").src=firstImage;

  //hide finish button until game is completed

  // Add event listeners
  $("#next").on("touchend", function(){
    // win();
   // parent.switchConfig("memory_game");
   window.open("../tablet_scores_category_checker/index.html", "_self");
  });

  document.getElementById("clothing").addEventListener("click", clothingTouched);
  document.getElementById("furniture").addEventListener("click", furnitureTouched);
  document.getElementById("sports").addEventListener("click", sportsTouched);

    function clothingTouched() {
      if(cues[cueIdx].id==="clothing"){
            reacTime();
            audio.currentTime = 0;
            audio.play();
            numCorrect++;
            // document.getElementById("title").innerHTML = "Num Correct: " + numCorrect;
            if(numCorrect>=5){
                hapticFeed();
                numCorrect = 0;
                // document.getElementById("title").innerHTML = "FEEDBACK Num Correct: " + numCorrect;
            }
        }
        else{
            reacTime();
            window.numErrors++;
            numCorrect = 0; //Reset to zero if wrong so only get buzz for every 5 IN A ROW
            // document.getElementById("title").innerHTML = "Num Correct: " + numCorrect;
            return;
        }        
        
        cueIdx++;
        if(cueIdx==cues.length-1){
            // default_web.finish();
            win();
        }
        else{
            
            document.getElementById("Cue").src=cues[cueIdx].img;
            document.getElementById("Cue").style.top=60 + "%"; 
            restartTimer();
        }
        
    }
  

    function furnitureTouched() {
        if(cues[cueIdx].id==="furniture"){
            reacTime();
            audio.currentTime = 0;
            audio.play();
            numCorrect++;
            // document.getElementById("title").innerHTML = "Num Correct: " + numCorrect;
            if(numCorrect>=5){
                hapticFeed();
                numCorrect = 0;
                // document.getElementById("title").innerHTML = "FEEDBACK Num Correct: " + numCorrect;
            }
        }
        else{
            reacTime(); //reaction time for selecting incorrect answer
            window.numErrors++;
            numCorrect = 0; //Reset to zero if wrong so only get buzz for every 5 IN A ROW
            // document.getElementById("title").innerHTML = "Num Correct: " + numCorrect;
            return;
        }
        
        
        cueIdx++;
        if(cueIdx==cues.length-1){
            // default_web.finish();
            win();
        }
        else{
            
            document.getElementById("Cue").src=cues[cueIdx].img;
            document.getElementById("Cue").style.top=60 + "%"; 
            restartTimer(); 
        }
        
    }

    function sportsTouched() {
        if(cues[cueIdx].id==="sports"){
            reacTime();
            audio.currentTime = 0;
            audio.play();
            numCorrect++;
            // document.getElementById("title").innerHTML = "Num Correct: " + numCorrect;
            if(numCorrect>=5){
                hapticFeed();
                
                numCorrect = 0;
                // document.getElementById("title").innerHTML = "FEEDBACK Num Correct: " + numCorrect;
            }
        }
        else{
            reacTime();
            window.numErrors++;
            numCorrect = 0; //Reset to zero if wrong so only get buzz for every 5 IN A ROW
            // document.getElementById("title").innerHTML = "Num Correct: " + numCorrect;
            return;
        }
        
        
        cueIdx++;
        if(cueIdx==cues.length-1){
            // default_web.finish();
            win();
        }
        else{
            
            document.getElementById("Cue").src=cues[cueIdx].img;
            document.getElementById("Cue").style.top=60 + "%"; 
            restartTimer(); 
        }
        
    }

});
