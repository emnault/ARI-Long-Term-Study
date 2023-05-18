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
var avgRT;
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
            img: "Cues/Highland_Cow.jpg",
            id: "Animals",
        },
        
        {
            img: "Cues/Quiche.jpg",
            id: "Food",
        },

        {
            img: "Cues/Horse.png",
            id: "Animals",
        },

        {
            img: "Cues/USA.png",
            id: "Countries",
        },

        {
            img: "Cues/Sushi.jpeg",
            id: "Food",
        },

        {
            img: "Cues/Puppy.jpg",
            id: "Animals",
        },

        {
            img: "Cues/Japan.png",
            id: "Countries",
        },

        {
            img: "Cues/Burger.jpg",
            id: "Food",
        },

        {
            img: "Cues/Germany.jpeg",
            id: "Countries",
        },

        {
            img: "Cues/Elephant.jpg",
            id: "Animals",
        },

        // {
        //     img: "Cues/Fish.jpg",
        //     id: "Animals",
        // },

        // {
        //     img: "Cues/Breakfast.jpg",
        //     id: "Food",
        // },

        // {
        //     img: "Cues/Tiger.jpg",
        //     id: "Animals",
        // },

        // {
        //     img: "Cues/Cupcake.jpg",
        //     id: "Food",
        // },

        // {
        //     img: "Cues/France.png",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Spain.png",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Italy.jpeg",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/UK.jpeg",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Soup.jpeg",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Salad.jpeg",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Risotto.jpeg",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Pasta.jpeg",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/India.png",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Bear.jpeg",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/Cat.jpeg",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/Koala.jpeg",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/Otter.jpeg",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/Avocado.jpg",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Belgium.png",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Bobcat.jpg",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/Brazil.png",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Brocolli.jpg",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Bulgaria.jpeg",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Canada.jpg",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Carrots.png",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Chameleon.png",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/Cheese.jpg",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Chicken.jpeg",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Chile.png",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/China.png",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Chocolate.png",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Cookies.jpg",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Donuts.jpg",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Dragonfly.jpeg",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/Duck.jpg",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/Egypt.jpg",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Flamingo.jpeg",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/Fried_Rice.jpeg",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Frog.PNG",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/Giraffe.jpeg",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/Granola_Bar.jpeg",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Grasshopper.png",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/Haggis.png",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Hedgehog.png",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/Hot_Dog.jpeg",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Hummingbird.jpg",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/Hungary.jpeg",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Iceland.jpg",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Ireland.jpg",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Jellyfish.jpg",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/Kenya.png",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Korea.png",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Lemur.jpg",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/Lion.jpeg",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/Madagascar.png",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Malaysia.jpg",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Mexico.jpeg",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Monkey.png",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/New_Zealand.jpeg",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Owl.jpg",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/Pancakes.jpeg",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Parrot.jpg",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/Pig.png",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/Pizza.jpg",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Poland.png",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Red_Panda.jpeg",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/Russia.png",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Sandwich.jpeg",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Sausage.jpg",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Scottish_Breakfast.png",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Snail.jpg",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/Snake.jpg",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/South_Africa.jpeg",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Souvlaki.jpg",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Spinach.jpg",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Steak.jpeg",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Stew.jpg",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Swan.jpg",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/Sweden.jpeg",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Switzerland.jpeg",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Thailand.jpg",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Toast.jpeg",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Turkey.jpeg",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Ukraine.jpg",
        //     id: "Countries",
        // },
        // {
        //     img: "Cues/Walnuts.jpg",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Yogurt.jpg",
        //     id: "Food",
        // },
        // {
        //     img: "Cues/Zebra.jpeg",
        //     id: "Animals",
        // },
        // {
        //     img: "Cues/Zucchini.jpg",
        //     id: "Food",
        // },


        ];
//  shapes_demo.init();
  localStorage.clear();
  default_web.firstFrase();
  

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
      // endTime = new Date();
      // var timeDiff = endTime - startTime; //in ms
      // strip the ms
      // timeDiff /= 1000;

      // get seconds 
      // var seconds = Math.round(timeDiff);
      // console.log("Elapsed Time: " + seconds + " seconds");

      // localStorage.setItem('time', seconds);


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

    }

  var cues = shuffle(cues_pre_shuffle); //Shuffle cues
  var firstImage = cues[0].img;
  document.getElementById("Cue").src=firstImage;

  //hide finish button until game is completed

  // Add event listeners
  $("#next").on("touchend", function(){
    // win();
   // parent.switchConfig("memory_game");
   window.open("../scores_category_checker/index.html", "_self");
  });

  $("#Animals").on("touchend", function(ev){
      ev.preventDefault(); 
        // if (cueIdx ==0){
        //     startTime = new Date();
        // }
        if(cues[cueIdx].id==="Animals"){
            reacTime();
            audio.currentTime = 0;
            audio.play();
        }
        else{
            reacTime();
            window.numErrors++;
            return;
        }        
        
        cueIdx++;
        if(cueIdx==cues.length-1){
            default_web.finish();
            win();
        }
        else{
            document.getElementById("Cue").src=cues[cueIdx].img;
            document.getElementById("Cue").style.top=60 + "%"; 
        }
        if( (cueIdx==8) | (cueIdx==16)){
            randFeed();
        }
        else if (cueIdx==82){
            default_web.almostThere();
        }
        else if (cueIdx==95){
            default_web.aFewLeft();
        }
  	   
  	});

    $("#Food").on("touchend", function(ev){
      ev.preventDefault(); 
        // if (cueIdx ==0){
        //     startTime = new Date();
        // }
        if(cues[cueIdx].id==="Food"){
            reacTime();
            audio.currentTime = 0;
            audio.play();
        }
        else{
            reacTime(); //reaction time for selecting incorrect answer
            window.numErrors++;
            return;
        }
        
        
        cueIdx++;
        if(cueIdx==cues.length-1){
            default_web.finish();
            win();
        }
        else{
            document.getElementById("Cue").src=cues[cueIdx].img;
            document.getElementById("Cue").style.top=60 + "%";  
        }
        if( (cueIdx==8) | (cueIdx==16)){
            randFeed();
        }
       
    });

    $("#Countries").on("touchend", function(ev){
      ev.preventDefault(); 
        // if (cueIdx ==0){
        //     startTime = new Date();
        // }
        if(cues[cueIdx].id==="Countries"){
            reacTime();
            audio.currentTime = 0;
            audio.play();
        }
        else{
            reacTime();
            window.numErrors++;
            return;
        }
        
        
        cueIdx++;
        if(cueIdx==cues.length-1){
            default_web.finish();
            win();
        }
        else{
            
            document.getElementById("Cue").src=cues[cueIdx].img;
            document.getElementById("Cue").style.top=60 + "%";  
        }
        if( (cueIdx==8) | (cueIdx==16)){
            randFeed();
        }
       
    });

});
