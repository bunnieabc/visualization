var ctx; //= new AudioContext();
var audio; //= document.getElementById('myAudio');
var audioSrc; //= ctx.createMediaElementSource(audio);
var analyser; //= ctx.createAnalyser();
var frequencyData;

$(document).ready(function() {
  //loading
  //audio.play();
  $(window).load(function() {
    //audio.play();
    // we have to connect the MediaElementSource with the analyser 
    ctx = new AudioContext(); console.log(ctx)
    audio = document.getElementById('myAudio');
    audioSrc = ctx.createMediaElementSource(audio);
    audioSrc.connect(ctx.destination);
    analyser = ctx.createAnalyser();
    audioSrc.connect(analyser);
    // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
   
    // frequencyBinCount tells you how many values you'll receive from the analyser
    frequencyData = new Uint8Array(analyser.frequencyBinCount);
    // we're ready to receive some data!
    // loop
    audio.play();
    renderFrame();

  });
});
function renderFrame() {
   requestAnimationFrame(renderFrame);
   // update data in frequencyData
   analyser.getByteFrequencyData(frequencyData);
   $(".chart").empty()

   for(var i = 0 ; i<analyser.frequencyBinCount/4; i++){
    var $newbar = $( "<div class='bar' style='height:"+ (frequencyData[i]*1.5) +"px'></div>" )
    $(".chart").append($newbar)
   }
   // render frame based on values in frequencyData
   console.log(frequencyData)
}




