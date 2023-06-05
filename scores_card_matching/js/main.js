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
                text: "<mark name='doTrick trickName=show_right'/>Here is our performance scores.", 
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
                text: "<mark name='doTrick trickName=bow'/>Great game! I enjoyed playing with you, and I hope you had fun too! <mark name='doTrick trickName=show_right'/>Here is our performance scores.", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });
    }
}

let default_web = new DefaultWeb();

$(document).ready(function() {
  default_web.secondFrase();

  document.getElementById("duration").innerHTML = "Time: " + localStorage.getItem('mins') + " min " + localStorage.getItem('secs') + " secs.";
  document.getElementById("ari-score").innerHTML = "ARI: " + localStorage.getItem('ariNumPairs') + " pairs.";
  document.getElementById("user-score").innerHTML = "You: " + localStorage.getItem('userNumPairs') + " pairs.";
  document.getElementById("reac-time").innerHTML = " Your average reaction time: " + localStorage.getItem('reacTime') + " seconds.";

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
        // console.log("IN SHOW MODAL");
        // default_web.secondFrase();
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

  // Add event listeners
  // $("#next").on("touchend", function(){
   // parent.switchConfig("memory_game");
   //window.open("../playing_cards_mem_game/index.html", "_self");


   /*
----------------- POP-UP FUNCTION ------------------
  */
   


  // }); 

  // $("#back").on("touchend", function(){
  //  // parent.switchConfig("memory_game");
  //  window.open("../playing_cards_mem_game/index.html", "_self");
  // });
});

