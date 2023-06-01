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
                text: "<mark name='doTrick trickName=alive_4'/>You may now practice the activity. Once you feel <mark name='doTrick trickName=alive_2'/>comfortable with how to play, please tell me and we will move on <mark name='doTrick trickName=alive_5'/>to the official round. Are you ready? ", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });

        return;
    }

    
}

let default_web = new DefaultWeb();

$(document).ready(function() {
//  shapes_demo.init();

    default_web.firstFrase();

    var video = document.getElementById('video');
    video.setAttribute('src', 'Intro.mp4'); 
    video.play();

  //   $("#back").on("touchend", function(){
  //  parent.switchConfig("activity_choice_slideshow");
  //   // window.open("../post_ratings_cat_check/index.html", "_self");
  // });

    
  // Add event listeners
  $("#replay").on("touchend", function(){
   // parent.switchConfig("memory_game");
    window.open("../instructions_cat_check_haptic/index.html", "_self");
  });
    $("#next").on("touchend", function(){
   // parent.switchConfig("memory_game");
    window.open("../training/index.html", "_self");
  });

});

