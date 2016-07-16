document.addEventListener("DOMContentLoaded" , musicPlayer ,false);

var audio , playbtn , mutebtn , seekslider, volumeslider, seeking=false, seekto ,
curtimetext, durtimetext;
function musicPlayer() {


   audio = new Audio();

   audio.src = "audio/50 Cent - No Romeo No Juliet ft. Chris Brown (Official Music Video).mp3"
   audio.loop = true;
   audio.play();
   // set object ref

   playbtn = document.getElementById("playpausebtn");
   mutebtn = document.getElementById("mutebtn");
   seekslider = document.getElementById("seekslider");
	volumeslider = document.getElementById("volumeslider");

   // add event listeners

   playbtn.addEventListener('click',playPause,false);
   mutebtn.addEventListener('click',mute,false);
   seekslider.addEventListener("mousedown", function(event){ seeking=true; seek(event); });
	seekslider.addEventListener("mousemove", function(event){ seek(event); });
	seekslider.addEventListener("mouseup",function(){ seeking=false; });
	volumeslider.addEventListener("mousemove", setvolume);

   //functions

   function playPause() {
      if(audio.paused){
         audio.play();
         playbtn.style.background = "url(img/play.png) no-repeat";
      } else {
         audio.pause();
         playbtn.style.background = "url(img/pause.png) no-repeat";
      }
   }

   function mute(){
		if(audio.muted){
		    audio.muted = false;
		    mutebtn.style.background = "url(img/volume.png) no-repeat";
	    } else {
		    audio.muted = true;
		    mutebtn.style.background = "url(img/mute.png) no-repeat";
	    }
	}

   function seek(event){
	    if(seeking){
		    seekslider.value = event.clientX - seekslider.offsetLeft;
	        seekto = audio.duration * (seekslider.value / 100);
	        audio.currentTime = seekto;
	    }
    }

	function setvolume(){
	    audio.volume = volumeslider.value / 100;
    }

}
