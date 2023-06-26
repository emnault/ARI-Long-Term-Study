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
    async niceFrase() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "<mark name='doTrick trickName=nod'/>Nice!", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });

        return;
    }
    async correctFrase() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "<mark name='doTrick trickName=nod'/> Correct!",
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
var nextSound;
var playSound;
var reacTime;
var avgRT;
var hapticFeed;
var shuffle;

var index = -1; //Index of current sound (start with index < num sounds so don't count as correct)
var pressed = 0; //Indicates if initial press of button has occurred
window.numCorrect = 0; //number of times button is pressed when target sound is correctly identified
window.totalTargetSounds = 0; //number of times the target sound is played in the game
window.numErrors = 0; //Num times user presses the button when the wrong sound has been played




$(document).ready(function() {

    var startTimerDate = new Date();
    var startTimer = startTimerDate.getTime();
    var endTimerDate = new Date();
    var endTimer = endTimerDate.getTime();
    var time = 0;
    var i = 0;

    //Array of ints representing diff sounds
    var origSounds = [0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9,10,10,10,11,11,11,12,12,12];
    // var origSounds = [0,1,2,3,4,5,6,7,8,9,10,11,12]; //short version of array for testing purposes
    var sounds;

    //RT variables
    var rt_list = [];
    var initRT;
    var start = new Date();
    var end = new Date();
    var rt1 = start.getTime();
    var rt2 = 0;

    // default_web.firstFrase();
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
        document.getElementById("button").src="button-images/button-pressed.png";
        buttonPress.play();
        
        // document.getElementById("title").innerHTML = sounds;

        if(pressed == 0){ //Don't start playing sounds until button has been pressed (otherwise get error)
            document.getElementById("instructions_text").innerHTML = " ";
            sounds = shuffle(origSounds);
            pressed = 1;
            nextSound(200);
        }
        else if(index == 5){ //if target sound is current sound, increase score
            reacTime();
            window.numCorrect++;
            hapticFeed();
            // default_web.correctFrase();
        }
        else if(index == 10){
            reacTime();
            window.numCorrect++;
            hapticFeed();
            // default_web.niceFrase();

        }
        else if ((index != 5) || (index != 10)){
            reacTime();
            window.numErrors++;
            // document.getElementById("title").innerHTML = "numErrors++";
        }     
    });

    $("#button").on("touchend", function(){
        document.getElementById("button").src="button-images/button-unpressed.png";
    });
    
    $("#next").on("touchend", function(){
        window.open("../tablet_scores_sound_targeting/index.html", "_self");
    });

    sleep = function(ms){
        return new Promise(resolve => setTimeout(resolve, ms)); 
    }

    // Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
    shuffle = function(array){
        var counter = array.length, temp, arrIndex;
        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            arrIndex = Math.floor(Math.random() * counter);
            // Decrease counter by 1
            counter--;
            // And swap the last element with it
            temp = array[counter];
            array[counter] = array[arrIndex];
            array[arrIndex] = temp;
            }
            return array;
    }

    nextSound = function(ms){

        sleep(ms).then(() => {
            i++;
            if(i<sounds.length){
                // document.getElementById("title").innerHTML = sounds[i];
                playSound(sounds[i]);
                nextSound(5000);
            }
            else{
                // default_web.finishFrase();
                document.getElementById("instructions_text").innerHTML = "All done! Press next to see how you did.";
                avgRT();
                localStorage.setItem('numCorrect', numCorrect);
                localStorage.setItem('totalTargetSounds', totalTargetSounds);
                localStorage.setItem('numErrors', numErrors);
            }
        }); 
    }

    playSound = function(idx){
        // var idx = Math.floor(Math.random() * 13);
        index = idx;
        //Reset start time to calc next reaction time.
        start = new Date();
        rt1 = start.getTime();
        if (idx == 0){birds.play();}
        else if (idx == 1){book.play();}
        else if (idx == 2){carHorn.play();}
        else if (idx == 3){chaChing.play();}
        else if (idx == 4){door.play();}
        else if (idx == 5){
            window.totalTargetSounds++;
            doorbell.play();}
        else if (idx == 6){pen.play();}
        else if (idx == 7){phone.play();}
        else if (idx == 8){robot.play();}
        else if (idx == 9){shh.play();}
        else if (idx == 10){
            window.totalTargetSounds++;
            typewriter.play();}
        else if (idx == 11){water.play();}
        else{ //idx = 12
            whoosh.play();
        }

    }

    hapticFeed = function(){

        const req = new XMLHttpRequest();
        req.open("POST", "http://192.168.1.3:2000/50AA100");
        req.timeout = 1000;
        req.ontimeout = (e) => {
            console.log("Timeout");
            // document.getElementById("title").innerHTML = "Timeout";
        };
        req.send();

    }

    reacTime = function(){
        end = new Date();
        rt2 = end.getTime();
        initRT = rt2-rt1;
        rt_list.push(initRT);
        console.log("RT List: " + rt_list);
    }

    avgRT = function(){
        var averageRT = rt_list.reduce((a, b) => a + b, 0) / rt_list.length;
        averageRT = averageRT/1000; //convert ms to seconds
        window.finalAvgRT = averageRT.toFixed(2); //cut to 2 decimal places
        localStorage.setItem('reacTime', finalAvgRT);
    }     
    
});