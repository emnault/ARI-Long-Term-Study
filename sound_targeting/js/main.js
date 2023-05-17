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
                text: "<mark name='doTrick trickName=alive_2'/>Press the blue button to begin playing!", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });

        return;
    }
    async finishFrase() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "<mark name='doTrick trickName=alive_1'/>All done! Press next to see how you did.", 
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
var playSound;
var randSound;
var pressed = 0; //Indicates if initial press of button has occurred




$(document).ready(function() {

    var startTimerDate = new Date();
    var startTimer = startTimerDate.getTime();
    var endTimerDate = new Date();
    var endTimer = endTimerDate.getTime();
    var time = 0;
    var i = 0;

    default_web.firstFrase();
    var birds = document.getElementById('birds');
    birds.setAttribute('src', 'audio-files/birds.mp3');   
    var book = document.getElementById('book');
    book.setAttribute('src', 'audio-files/book.mp3');   
    var carHorn = document.getElementById('carHorn');
    carHorn.setAttribute('src', 'audio-files/car-horn.mp3');
    var chaChing = document.getElementById('chaChing');
    chaChing.setAttribute('src', 'audio-files/cha-ching.mp3');
    var door = document.getElementById('door');
    door.setAttribute('src', 'audio-files/door.mp3');
    var doorbell = document.getElementById('doorbell');
    doorbell.setAttribute('src', 'audio-files/doorbell.mp3');
    var pen = document.getElementById('pen');
    pen.setAttribute('src', 'audio-files/pen.mp3');
    var phone = document.getElementById('phone');
    phone.setAttribute('src', 'audio-files/phone.mp3');
    var robot = document.getElementById('robot');
    robot.setAttribute('src', 'audio-files/robot.mp3');
    var shh = document.getElementById('shh');
    shh.setAttribute('src', 'audio-files/shhh.mp3');
    var typewriter = document.getElementById('typewriter');
    typewriter.setAttribute('src', 'audio-files/typewriter.mp3');
    var water = document.getElementById('water');
    water.setAttribute('src', 'audio-files/water.mp3');
    var whoosh = document.getElementById('whoosh');
    whoosh.setAttribute('src', 'audio-files/whoosh.mp3'); 

    // Load audio files
    var buttonPress = new Audio('audio-files/button-sound.mp3');
    buttonPress.preload="auto";

    $("#button").on("touchstart", function(){
        if(pressed == 0){
            pressed = 1;
            playSound();
        }
        document.getElementById("button").src="button-images/button-pressed.png";
        buttonPress.play();
    });

    $("#button").on("touchend", function(){
        document.getElementById("button").src="button-images/button-unpressed.png";
    });
    
    $("#next").on("touchend", function(){
        window.alert("Next pressed");
   // parent.switchConfig("memory_game");
    // window.open("../customisation_category/index.html", "_self");
    });


    sleep = function(ms){
        return new Promise(resolve => setTimeout(resolve, ms)); 
    }

    playSound = function(){

        sleep(5000).then(() => {
            console.log("doorbell");
            i++;
            if(i<5){
                randSound();
                // doorbell.play();
                playSound();
            }
            else{
                default_web.finishFrase();
            }
        });
        

    }

    randSound = function(){
            var idx = Math.floor(Math.random() * 13);
            if (idx == 0){birds.play();}
            else if (idx == 1){book.play();}
            else if (idx == 2){carHorn.play();}
            else if (idx == 3){chaChing.play();}
            else if (idx == 4){door.play();}
            else if (idx == 5){doorbell.play();}
            else if (idx == 6){pen.play();}
            else if (idx == 7){phone.play();}
            else if (idx == 8){robot.play();}
            else if (idx == 9){shh.play();}
            else if (idx == 10){typewriter.play();}
            else if (idx == 11){water.play();}
            else{ //idx = 12
                whoosh.play();
            }
    }
    
});

// (function(){    
    // //3 minute timer vars
    // var startTimerDate = new Date();
    // var startTimer = startTimerDate.getTime();
    // var endTimerDate = new Date();
    // var endTimer = endTimerDate.getTime();

    // var birds = new Audio('audio-files/birds.mp3');
    // birds.preload="auto";
    // var book = new Audio('audio-files/book.mp3');
    // book.preload="auto";
    // var carHorn = new Audio('audio-files/car-horn.mp3');
    // carHorn.preload="auto";
    // var chaChing = new Audio('audio-files/cha-ching.mp3');
    // chaChing.preload="auto";
    // var door = new Audio('audio-files/door.mp3');
    // door.preload="auto";
    // var doorbell = new Audio('audio-files/doorbell.mp3');
    // doorbell.preload="auto";
    // var pen = new Audio('audio-files/pen.mp3');
    // pen.preload="auto";
    // var phone = new Audio('audio-files/phone.mp3');
    // phone.preload="auto";
    // var robot = new Audio('audio-files/robot.mp3');
    // robot.preload="auto";
    // var shh = new Audio('audio-files/shhh.mp3');
    // shh.preload="auto";
    // var typewriter = new Audio('audio-files/typewriter.mp3');
    // typewriter.preload="auto";
    // var water = new Audio('audio-files/water.mp3');
    // water.preload="auto";
    // var whoosh = new Audio('audio-files/whoosh.mp3');
    // whoosh.preload="auto";


        // init: function(){

            // if (window.firstPress == false){
            //     this.sleep(2000).then(() => {
            //         // console.log("Waiting");
            //         console.log("firstPress: " + firstPress);
            //         Memory.init();
            //     });
            // }
            // else{
                // console.log("Rand sound playing");
                // birds.play();
            // this.sleep(5000).then(() => {
            //     var time = endTimer-startTimer;
            //     console.log("Time: " + time);
            //     while(time < 15000){ //while x ms hasn't passed
            //         // this.sleep(2000).then(() => {
            //             // this.nextSound();
            //             endTimerDate = new Date();
            //             endTimer = endTimerDate.getTime();
            //             var time = endTimer-startTimer;
            //             console.log("Time 2: " + time);
            //         // });
            //     }
            //     // this.finalSound();
            //     console.log("DONE");
            // });
                


            // }
            // var _ = Memory;
            // while(endTimer-startTimer < 30000){ //while x ms hasn't passed
                // this.sleep(2000).then(() => {
                    // this.sleep(5000).then(() => {
                    // this.randSound();
                    // });
                    // birds.play();
                    // endTimerDate = new Date();
                    // endTimer = endTimerDate.getTime();
                // });
            // }
            // this.nextSound();
        // },

    //     nextSound: function(){
    //             doorbell.play();
            
    //     },

    //     finalSound: function(){
    //             book.play();
    //     },

    

        // randSound: function(){
        //     var idx = Math.floor(Math.random() * 13);
        //     if (idx == 0){birds.play();}
        //     else if (idx == 1){book.play();}
        //     else if (idx == 2){carHorn.play();}
        //     else if (idx == 3){chaChing.play();}
        //     else if (idx == 4){door.play();}
        //     else if (idx == 5){doorbell.play();}
        //     else if (idx == 6){pen.play();}
        //     else if (idx == 7){phone.play();}
        //     else if (idx == 8){robot.play();}
        //     else if (idx == 9){shh.play();}
        //     else if (idx == 10){typewriter.play();}
        //     else if (idx == 11){water.play();}
        //     else{ //idx = 12
        //         whoosh.play();
        //     }
        // },

    //     sleep: function(ms) {
    //         return new Promise(resolve => setTimeout(resolve, ms));
    //     }

    // };



