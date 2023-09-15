import {songList} from '/data.js'
import {startAnimation, pauseAnimation} from '/utils.js'

//storing every button in the DOM to a variable
let playBtn = document.getElementById('playBtn')
let pauseBtn = document.getElementById('pauseBtn')
let nextBtn = document.getElementById('next')
let prevBtn = document.getElementById('prev')
let animationContainer = document.getElementById("animationContainer")
let loadContainer = document.getElementById("loadContainer")
let progressBar = document.getElementById("progressBar")
const timeInMin = document.getElementById('timeInMin')
const timeInSec = document.getElementById("timeInSec")

const finalTimeInMin = document.getElementById('finalTimeInMin')
const finalTmeInSec = document.getElementById("finalTimeInSec")
const title = document.getElementById("songName")
const progressContainer = document.getElementById("progress-container")

//creating the audio element
let playingTrack = document.createElement('audio')

progressContainer.addEventListener('click', setProgress);

let songIndex = 0



let downloadBtn = document.getElementById('link')

downloadBtn.href = songList[songIndex].sourceFile

playingTrack.src = songList[songIndex].sourceFile
playingTrack.load()

playBtn.addEventListener('click', playEvent)

function playEvent(){
 startAnimation()
 playingTrack.play()
 pauseBtn.style.display = 'inline'
 playBtn.style.display = 'none'
 setInterval(function(){
    let currentSec = Math.floor(playingTrack.currentTime)
    let currentSecInPercent = (currentSec / playingTrack.duration)*100
    if(currentSec != Math.floor(playingTrack.duration)){
    progressBar.style.width = `${currentSecInPercent}%`
    }
    let initialMinute = Math.floor( currentSec / 60 )
let initialSeconds =   currentSec % 60
timeInMin.textContent = timeFunc(initialMinute)
timeInSec.textContent = timeFunc(initialSeconds)
 }, 1000)
}

pauseBtn.addEventListener('click', pauseEvent)

function pauseEvent(){
 pauseAnimation()
 playingTrack.pause()
 pauseBtn.style.display = 'none'
 playBtn.style.display = 'inline'
}

playingTrack.addEventListener('ended', nextEvent)

nextBtn.addEventListener("click", nextEvent)

function nextEvent(){
  playingTrack.onloadeddata = function(){startAnimation()}
pauseAnimation()
songIndex++
prevBtn.disabled = false
if(songIndex == songList.length){songIndex = 0}
title.textContent = songList[songIndex].songTitle
playingTrack.src = songList[songIndex].sourceFile
playingTrack.load()
playingTrack.autoplay = true
downloadBtn.href = songList[songIndex].sourceFile
playingTrack.onloadeddata = function(){
let songDuration = Math.floor(playingTrack.duration)
let minute = Math.floor( songDuration / 60 )
let seconds =   songDuration % 60
finalTimeInMin.textContent = timeFunc(minute)
finalTimeInSec.textContent = timeFunc(seconds)
title.textContent = songList[songIndex].songTitle
animationContainer.style.display = 'flex'
loadContainer.style.display = 'none'
displayFunction()
startAnimation()
}
}

prevBtn.addEventListener('click', prevEvent)

function prevEvent(){
  playingTrack.onloadeddata = function(){startAnimation()}
pauseAnimation()
songIndex--
if(songIndex == 0){
  prevBtn.disabled = true
}
title.textContent = songList[songIndex].songTitle
if(songIndex == songList.length){songIndex = 0}
playingTrack.src = songList[songIndex].sourceFile
playingTrack.load()
playingTrack.autoplay = true
downloadBtn.href = songList[songIndex].sourceFile
playingTrack.onloadeddata = function(){
let songDuration = Math.floor(playingTrack.duration)
let minute = Math.floor( songDuration / 60 )
let seconds =   songDuration % 60
finalTimeInMin.textContent = timeFunc(minute)
finalTimeInSec.textContent = timeFunc(seconds)
title.textContent = songList[songIndex].songTitle
animationContainer.style.display = 'flex'
loadContainer.style.display = 'none'
displayFunction()
startAnimation()
}
}
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = playingTrack.duration;
  playingTrack.currentTime = (clickX / width) * duration;
}

function timeFunc(time){
  if(time < 10){return `0${time}`}else{return time}
}

playingTrack.onloadeddata = function(){
let songDuration = Math.floor(playingTrack.duration)
let minute = Math.floor( songDuration / 60 )
let seconds =   songDuration % 60
finalTimeInMin.textContent = timeFunc(minute)
finalTimeInSec.textContent = timeFunc(seconds)
title.textContent = songList[songIndex].songTitle
 animationContainer.style.display = 'flex'
 loadContainer.style.display = 'none'
}

function displayFunction(){
  pauseBtn.style.display = 'inline'
  playBtn.style.display = 'none'
}

function playPause() { 
    if (playingTrack.paused) {
     playEvent()
        }else{ pauseEvent() }
} 

document.onkeydown = (e) => {
  e = e || window.event;
  if (e.keyCode === 38) {
    console.log("up arrow pressed");
  } else if (e.keyCode === 40) {
    console.log("down arrow pressed");
  } else if (e.keyCode === 37) {
    if(songIndex != 0 || songIndex < 0){
     prevEvent()
    }
  } else if (e.keyCode === 39) {
    nextEvent()
  }
 switch (e.keyCode) {
       
       case 32:
            e.preventDefault();
            playPause();
          break;
       
    }
};


