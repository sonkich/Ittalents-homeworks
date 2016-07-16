document.addEventListener("DOMContentLoaded" , musicPlayer ,false);

var audio , playbtn , mutebtn , seekslider, volumeslider, seeking=false, seekto ,
curtimetext, durtimetext ,playlist_status, dir, playlist, ext;
function musicPlayer() {




   dir = "audio/";
   ext = ".mp3";
   playlist = [
      "50 Cent",
      "ONE SHOT"];
	playlist_index = 0;

   // set object ref

   playbtn = document.getElementById("playpausebtn");
   mutebtn = document.getElementById("mutebtn");
   seekslider = document.getElementById("seekslider");
   volumeslider = document.getElementById("volumeslider");
   curtimetext = document.getElementById("curtimetext");
   durtimetext = document.getElementById("durtimetext");
   playlist_status = document.getElementById("playlist_status");
   select = document.querySelector("select");
   // audio object

   audio = new Audio();

   audio.src = dir+playlist[0]+ext;
   audio.loop = false;

   playlist_status.innerHTML = (playlist_index+1)+".  "+ playlist[playlist_index]+ext;



   // add event listeners

   playbtn.addEventListener('click',playPause,false);
   mutebtn.addEventListener('click',mute,false);
   seekslider.addEventListener("mousedown", function(event){ seeking=true; seek(event); });
	seekslider.addEventListener("mousemove", function(event){ seek(event); });
	seekslider.addEventListener("mouseup",function(){ seeking=false; });
	volumeslider.addEventListener("mousemove", setvolume);
   audio.addEventListener("timeupdate", function(){ seektimeupdate(); });
   audio.addEventListener("ended", function(){ switching(); });
   select.addEventListener("change",function(event){switchingSelection();});
   //functions

   function switchingSelection(){
      var index = select.value;

      switchTrack(index);

      if(index == (playlist.length - 1)){
			index = 0;
		} else {
		    index++;
		}
   }
   function switching(){
      if(playlist_index == (playlist.length - 1)){
			playlist_index = 0;
		} else {
		    playlist_index++;
		}

      switchTrack(playlist_index);
   }
   function playPause() {
      if(audio.paused){
         audio.play();

         playbtn.style.background = "url(img/pause.png) no-repeat";
      } else {
         audio.pause();
         playbtn.style.background = "url(img/play.png) no-repeat";
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

    function seektimeupdate(){
		var nt = audio.currentTime * (100 / audio.duration);
		seekslider.value = nt;
		var curmins = Math.floor(audio.currentTime / 60);
	    var cursecs = Math.floor(audio.currentTime - curmins * 60);
	    var durmins = Math.floor(audio.duration / 60);
	    var dursecs = Math.floor(audio.duration - durmins * 60);
		if(cursecs < 10){ cursecs = "0"+cursecs; }
	    if(dursecs < 10){ dursecs = "0"+dursecs; }
	    if(curmins < 10){ curmins = "0"+curmins; }
	    if(durmins < 10){ durmins = "0"+durmins; }
		curtimetext.innerHTML = curmins+":"+cursecs;
	    durtimetext.innerHTML = durmins+":"+dursecs;
	}

   function switchTrack(index){
      console.log(parseInt(index+1));
		playlist_status.innerHTML = "Track "+(parseInt(index+1))+" - "+ playlist[index]+ext;
		audio.src = dir+playlist[index]+ext;
	    audio.play();
	}

}
