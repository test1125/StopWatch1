const startButton = document.querySelector('.stop-watch__start-and-stop-button');
const time = document.querySelector('.stop-watch__time');
const resetButton = document.querySelector('.stop-watch__reset-button');
const screenLockStatus = document.querySelector('.screen-lock__status');
const seceenLockCheckBox = document.querySelector('.screen-lock__check-box');
let stopTime = 0;
let run = false;
let screenLock = true;

if ('wakeLock' in navigator) {
    isSupported = true;
    screenLockStatus.textContent = '利用できます';
    seceenLockCheckBox.checked = true;
  } else {
    screenLockStatus.textContent = '利用できません';
    seceenLockCheckBox.disabled = true;
  }

function getElapsedTime() {
    const elapsedTime = Date.now() -startTime + stopTime
    const h = String(Math.floor(elapsedTime / (60*60*1000))).padStart(2, '0');
    const m = String(Math.floor(elapsedTime % (60*60*1000) /(60*1000))).padStart(2, '0');
    const s = String(Math.floor(elapsedTime % (60*1000) / 1000)).padStart(2, '0');

    time.textContent = `${h}:${m}:${s}`;
    timeoutID = setTimeout(getElapsedTime, 10);
}

// startButton.addEventListener('mousedown', () => {
//     // alert('button clicked');
//     startTime = Date.now();
//     getElapsedTime();
// })

//スタート/ストップ牡丹の挙動
startButton.addEventListener('mousedown', () => {
    // alert('button clicked');
    if(run==false) {
        startTime = Date.now();
        startButton.textContent = "stop";
        run = true;
        getElapsedTime();
    }   
    else {
        clearTimeout(timeoutID);
        stopTime += (Date.now() - startTime);
        startButton.textContent = "start";
        run = false;
    }
})

//リセットボタンの挙動
resetButton.addEventListener('mousedown', () => {
    clearTimeout(timeoutID);
    startTime = 0;
    stopTime = 0;
    time.textContent = "00:00:00";
    startButton.textContent = "start";
    run = false;
})

// document.addEventListener('visibilitychange', () => {
//     if(screenLock == true){
//         wakeLock = navigator.wakeLock.request('screen');
//         screenLockStatus.insertAdjacentText("afterbegin", "active");
        
//     }
// })