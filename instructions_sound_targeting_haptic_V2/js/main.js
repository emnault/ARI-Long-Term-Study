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
                text: "<mark name='doTrick trickName=alive_7'/>You will hear a selection of noises in no particular order over the course of 3 minutes. <mark name='doTrick trickName=alive_2'/>You should listen for either this sound", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });

        return;
    }
    async secondFrase() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "or this sound", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });

        return;
    }
    async thirdFrase() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "<mark name='doTrick trickName=alive_5'/>Every time you hear either of these sounds, I want you to press the blue button on the tablet. <mark name='doTrick trickName=alive_3'/>If it is one of the correct sounds, you will feel a vibration on your wrist. Press replay to hear these instructions again. <mark name='doTrick trickName=show_left'/>To just hear the target sounds, press the play target sounds button. Lastly, to begin the training session, press next.", 
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

$(document).ready(function() {
//  shapes_demo.init();

    sleep = function(ms){
        return new Promise(resolve => setTimeout(resolve, ms)); 
    }

    var book = document.getElementById('book');
    book.setAttribute('src', 'audio-files/book.mp3'); 
    var carHorn = document.getElementById('car-horn');  
    carHorn.setAttribute('src', 'audio-files/car-horn.mp3');

    var video = document.getElementById('video');
    video.setAttribute('src', 'Intro.mp4'); 
    video.play();

    default_web.firstFrase();

    sleep(7500).then(() => {
      book.play();
      sleep(1500).then(() => {
        default_web.secondFrase();

          sleep(1500).then(() => {
             carHorn.play();

             sleep(1500).then(() => {
              default_web.thirdFrase();

              });
          });
      

      }); 

    }); 

    
    

    

  // Add event listeners
    $("#replay").on("touchend", function(){
   // parent.switchConfig("memory_game");
    window.open("../instructions_cat_check/index.html", "_self");
  });
    $("#sounds").on("touchend", function(){
      book.play();
      sleep(1500).then(() => {
        carHorn.play();
      }); 
   });
    $("#next").on("touchend", function(){
   // parent.switchConfig("memory_game");
    window.open("../training/index.html", "_self");
  });

    

});

