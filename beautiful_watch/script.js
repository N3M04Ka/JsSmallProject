
function updateClock() {
    let now = new Date();
    let hour = now.getHours().toString().padStart(2, 0);
    let minutes = now.getMinutes().toString().padStart(2, 0);
    let sec = now.getSeconds().toString().padStart(2, 0);
    let meridium = hour >= 12 ? 'PM' : 'AM';
    if (hour >= 12)
        hour -= 12;
    let timeString = hour + ":" + minutes + ":" + sec + " " + meridium;
    document.getElementById('clock').textContent = timeString;
}
updateClock();
setInterval(updateClock, 1000)