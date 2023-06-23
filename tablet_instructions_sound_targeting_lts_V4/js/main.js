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
    async firstFrase() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "<mark name='doTrick trickName=alive_7'/>Touch the category from the top row that corresponds to the image at the bottom of the screen. If you select correctly, <mark name='doTrick trickName=alive_1'/>you will hear a ding sound, and the bottom image will change. If you get it wrong, you can try again until you categorise it correctly. <mark name='doTrick trickName=show_right'/>The goal is to complete the task both quickly and accurately. Press replay to hear these instructions again, or press next to move on to the training.", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });

        return;
    }

    
}

let default_web = new DefaultWeb();
var sleep;
var training = false; //sets to true when next button is pressed, so when pressed second time will go to training

$(document).ready(function() {

    sleep = function(ms){
        return new Promise(resolve => setTimeout(resolve, ms)); 
    }

    var chaChing = document.getElementById('chaChing');
    chaChing.setAttribute('src', 'audio-files/cha-ching.mp3');
    var whoosh = document.getElementById('whoosh');
    whoosh.setAttribute('src', 'audio-files/whoosh.mp3'); 

  // Add event listeners
    $("#back").on("touchend", function(){
      document.getElementById('image').src = 'instructions_1.png';
      var instructions_text = document.getElementById('instructions_text');
      instructions_text.innerHTML = "You will hear a selection of noises in no particular order over the course of 3 minutes. You should listen for either of the sounds that play when touching the Target Sounds button.";
      training = false;
    });
    $("#next").on("touchend", function(){
   // parent.switchConfig("memory_game");
        if (training == true){
          window.open("../tablet_training/index.html", "_self");
        }
        else if(training == false){
          document.getElementById('image').src = 'instructions_2.png';
          var instructions_text = document.getElementById('instructions_text');
          instructions_text.innerHTML = "Every time you hear either of these sounds, press the blue button on the tablet. Press next to move onto the training.";
          training = true;
        }

    });

    $("#sounds").on("touchend", function(){
        chaChing.play();
        sleep(1500).then(() => {
          whoosh.play();
        }); 
    });

    // $("#back").on("touchend", function(){
    //   document.getElementById('image').src = 'instructions_1.png';
    //   var instructions_text = document.getElementById('instructions_text');
    //   instructions_text.innerHTML = "Touch the category from the top row that corresponds to the image at the bottom of the screen. If you select correctly, you will hear a ding sound, and the bottom image will change.";
    
    // });
    // $("#next").on("touchend", function(){
    //   document.getElementById('image').src = 'instructions_2.png';
    //   var instructions_text = document.getElementById('instructions_text');
    //   instructions_text.innerHTML = "If you get it wrong, you can try again until you categorise it correctly. The goal is to complete the task both quickly and accurately. Press start training to move onto the training.";
    // });
    // $("#finish").on("touchend", function(){
    //   window.open("../training/index.html", "_self");
    // });

});

