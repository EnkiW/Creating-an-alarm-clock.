const selectAlarm = document.querySelectorAll('select');
const currentTime = document.querySelector('h1');
const btn = document.querySelector('button')
const Settings = document.querySelector('.clock-settings')

let alarmTime;
let ring = new Audio("./audio/old.mp3")
let alarmSet = false;
console.log(selectAlarm);

for (let i = 12; i > 0; i--) {
    i = i < 10 ? '0' + i : i;
    let option = `<option value="${i}">${i}</option>`
    selectAlarm[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? '0' + i : i;
    let option = `<option value="${i}">${i}</option>`
    selectAlarm[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 2; i > 0; i--) {
    let timeDay = i === 1 ? 'AM' : 'PM';
    let option = `<option value="${timeDay}">${timeDay}</option>`
    selectAlarm[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
    let timeClock = new Date(),
        h = timeClock.getHours(),
        m = timeClock.getMinutes(),
        s = timeClock.getSeconds(),
        halfDay = 'AM';
    if (h > 12) {
        h -= 12;
        halfDay = 'PM'
    }
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;


    currentTime.innerText = `${h}:${m}:${s} ${halfDay}`;

    if (alarmTime == `${h}:${m} ${halfDay}`){
        console.log('Alarm!');
        ring.play();
        ring.loop = true;
    }
}, 1000)

function setAlarm() {
    if (alarmSet){
        alarmTime = '';
        ring.pause();
        Settings.classList.remove("disable");
        btn.innerText = "Turn on the alarm clock";
        return alarmSet = false;
    }
    let time = `${selectAlarm[0].value}:${selectAlarm[1].value} ${selectAlarm[2].value}`;


    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert('Choose your alarm options');
    }
    alarmSet = true;
    alarmTime = time;
    Settings.classList.add('disable')
    btn.innerText = 'Turn off';
}

btn.addEventListener('click', setAlarm);