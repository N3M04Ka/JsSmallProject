let display=document.getElementById('display');
let timer=null;
let start_time=0;
let elapse_time=0
let is_running=false;
function StartF(){
    if(!is_running){
        is_running=true;
        start_time=Date.now()-elapse_time;
        timer=setInterval(update,10);
    }
}

function StopF(){
    if(is_running){
        clearInterval(timer)
        elapse_time=Date.now()-start_time;
        is_running=false;
    }
}
function ResetF(){
    clearInterval(timer);
    timer=null;
    elapse_time=0;
    start_time=0;
    is_running=false;
    display.textContent='00:00:00:00';
}
function update(){
        let cur_time=Date.now();
        elapse_time=cur_time-start_time;
        let hours=Math.floor(elapse_time/(1000*60*60)).toString().padStart(2,0);
        let minutes=Math.floor((elapse_time/(1000*60))%60).toString().padStart(2,0);
        let sec=Math.floor(elapse_time/1000%60).toString().padStart(2,0);
        let milsec=Math.floor(elapse_time%1000/10).toString().padStart(2,0);
        display.textContent=hours+":"+minutes+":"+sec+":"+milsec;
}