var incMainBtn = document.getElementById("incMain");
var decMainBtn = document.getElementById("decMain");
var mainTimerVal = document.getElementById("mainTimerVal");
var mainTimer = 25;
var incBreakBtn = document.getElementById("incBreak");
var decBreakBtn = document.getElementById("decBreak");
var breakTimerVal = document.getElementById("breakTimerVal");
var breakTimer = 10;
var timerBtn = document.getElementById("timer");
var progressBar = document.getElementById("progressBar");
var timerVal = document.getElementById("timerVal");
var timerRunning = false;
var curMainTimerVal = mainTimer * 60;
var curBreakTimerVal = breakTimer * 60;
var progress = progressBar.style["stroke-dashoffset"];
var progressBarEmpty = 659;


incMainBtn.addEventListener("click", function(event){
    mainTimer++;
    if(mainTimer > 60) mainTimer = 60;
    timerObj.setClock(mainTimer*60);
    mainTimerVal.innerText = mainTimer;
}, false);
decMainBtn.addEventListener("click", function(event){
    mainTimer--;
    if(mainTimer < 1) mainTimer = 1;
    timerObj.setClock(mainTimer*60);
    mainTimerVal.innerText = mainTimer;
},false);
incBreakBtn.addEventListener("click", function(event){
    breakTimer++;
    if(breakTimer > 30)breakTimer = 30;
    breakTimerVal.innerText = breakTimer;
},false);
decBreakBtn.addEventListener("click", function(event){
    breakTimer--;
    if(breakTimer < 1)breakTimer = 1;
    breakTimerVal.innerText = breakTimer;
},false);
timerBtn.addEventListener("click", function( event ){
    curMainTimerVal = mainTimer * 60;
    curBreakTimerVal = breakTimer * 60;
    timerObj.startTimer(curMainTimerVal);
}, false);

var runner;
var timerObj = {
    startTimer: function(startTime){
        if(!timerRunning){
            timerRunning = true;
            var curTime = startTime;
            runner = setInterval(frame, 1000);
            function frame(){
                if(curTime > 0){
                    curTime--;
                    progressBar.style["stroke-dashoffset"] = timerObj.progressBarLength(startTime, curTime);
                    timerObj.setClock(curTime);
                }else{
                    clearInterval(runner);
                    timerRunning = false;
                    var sound = new Howl({
                        src:'foghorn-daniel_simon.mp3',
                        autoplay:true,
                        loop:false
                    });
                    sound.play();
                    timerObj.startBreak(curBreakTimerVal);
                }
            }
        }else{
            clearInterval(runner);
            timerRunning = false;
            timerObj.startTimer(curMainTimerVal);
        }
    },
    startBreak: function(endTime){
        if(!timerRunning){
            timerRunning = true;
            var curTime = 0;
            runner = window.setInterval(frame, 1000);
            function frame(){
                if(curTime < curBreakTimerVal){
                    curTime++;
                    progressBar.style["stroke-dashoffset"] = timerObj.progressBarLength(endTime,curTime);
                    timerObj.setClock(curBreakTimerVal - curTime);
                }else{
                    window.clearInterval(runner);
                    timerRunning = false;
                    var sound = new Howl({
                        src:'foghorn-daniel_simon.mp3',
                        autoplay:true,
                        loop:false
                    });
                    sound.play();
                }
            }
        }else{
            clearInterval(runner);
            timerRunning = false;
            timerObj.startTimer(curMainTimerVal);
        }
    },
    progressBarLength: function(startTime, curTime){
        return 659/(startTime/curTime);
    },
    setClock: function(seconds){
        var minutes = Math.floor(seconds/60);
        var seconds = seconds - (minutes*60);
        if(seconds > 9){
            timerVal.innerHTML = minutes + "<span>:</span>" + seconds;
        }else{
            timerVal.innerHTML = minutes + "<span>:</span>0" + seconds;
        }
    }
}
