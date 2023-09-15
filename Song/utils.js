

function startAnimation(){
 document.getElementById('one').style.animationName = 'animation'
 document.getElementById('two').style.animationName = 'animation'
 document.getElementById('three').style.animationName = 'animation'
 document.getElementById('four').style.animationName = 'animation'
 document.getElementById('five').style.animationName = 'animation'
 document.getElementById('six').style.animationName = 'animation'
 document.getElementById('seven').style.animationName = 'animation'
}
function pauseAnimation(){
 document.getElementById('one').style.animationName = 'none'
 document.getElementById('two').style.animationName = 'none'
 document.getElementById('three').style.animationName = 'none'
 document.getElementById('four').style.animationName = 'none'
 document.getElementById('five').style.animationName = 'none'
 document.getElementById('six').style.animationName = 'none'
 document.getElementById('seven').style.animationName = 'none'
}

export {startAnimation, pauseAnimation}