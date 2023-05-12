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
                text: "<mark name='doTrick trickName=alive_7'/>Touch the category from the top row that corresponds to the image at the bottom of the screen. If you select correctly, <mark name='doTrick trickName=alive_1'/>you will hear a ding sound, and the bottom image will change. If you get it wrong, you can try again until you categorise it correctly. The goal is to complete the task both quickly and accurately.", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });

        return;
    }

    
}

let default_web = new DefaultWeb();
// window.alert("STARTING");

$(document).ready(function() {
    // window.alert("RUNNINGGG");
//  shapes_demo.init();

    // default_web.firstFrase();

  

    // document.getElementById(button).ontouchstart = function (event) {
    //     document.getElementById("button").src="button-images/button-pressed.png";

    // }

    // document.getElementById(button).ontouchend = function (event) {
    //     document.getElementById("button").src="button-images/button-unpressed.png";

    // }



    $("#button").on("touchstart", function(){
        // window.alert("Pressed");
        //ev.preventDefault(); 
        document.getElementById("button").src="button-images/button-pressed.png";
    });

    $("#button").on("touchend", function(){
        // window.alert("Unpressed");
        //ev.preventDefault(); 
        document.getElementById("button").src="button-images/button-unpressed.png";
        
    });


    
  // Add event listeners
    $("#next").on("touchend", function(){
        window.alert("Next pressed");
   // parent.switchConfig("memory_game");
    // window.open("../customisation_category/index.html", "_self");
  });

});

