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
                text: "<mark name='doTrick trickName=show_right'/>Great job! Here is some data on your performance.", 
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
                text: "<mark name='doTrick trickName=bow'/>Great game! I enjoyed playing with you, and I hope you had fun too!", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });
    }
}

let default_web = new DefaultWeb();

$(document).ready(function() {
//  shapes_demo.init();
  default_web.firstFrase();

  // document.getElementById("time").innerHTML = "Time: " + localStorage.getItem('time') + " seconds.";
  document.getElementById("errors").innerHTML = "Errors: " + localStorage.getItem('numErrors');
  document.getElementById("reac-time").innerHTML = "Average reaction time: " + localStorage.getItem('reacTime') + " seconds.";

  (function(){  
 

    var Memory = {

      

      init: function(){
        this.$modal = $(".modal");
        this.$overlay = $(".modal-overlay");
        this.win();
      },


      win: function(){
        setTimeout(function(){
          //default_web.secondFrase();
          Memory.showModal();
          //Memory.$game.fadeOut();
        }, 1000);
      },

      showModal: function(){
        this.$overlay.show();
        this.$modal.fadeIn("slow");
        localStorage.clear();
      },

      hideModal: function(){
        this.$overlay.hide();
        this.$modal.hide();
      }

    }; //close of Memory variable

    Memory.init();

  })();


});

