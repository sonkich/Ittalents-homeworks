document.addEventListener("DOMContentLoaded" ,function () {
   var targetPosition = {
      top: 0,
      left: 0
   }

   var shipPosition = {
      top: 580,
      left: 0,
   }
   var speed = 5;
   var isMovingRight = false;

   var isShipMovingRight = false;
	var isShipMovingLeft = false;

   var ship = document.getElementById('ship');

   function targetMove() {
      if(targetPosition.left == 550){
         isMovingRight = false;
      }

      if(targetPosition.left == 0){
         isMovingRight = true;
      }

      if (isMovingRight) {
			targetPosition.left += speed;
		}else{
         targetPosition.left -= speed;
      }

      var target = document.getElementById("target");
      target.style.left = targetPosition.left + 'px';
   }

   function shipMove() {
      if (isShipMovingRight && shipPosition.left < 590) {
			shipPosition.left += speed
		}

		if (isShipMovingLeft && shipPosition.left > 0) {
			shipPosition.left -= speed
		}


		ship.style.left = shipPosition.left + 'px';
   }

   function booletMove(){
      var boolets = document.getElementsByClassName('bul');

      for(var i = 0; i < boolets.length ; i++){
         boolets[i].style.bottom = (parseInt(boolets[i].style.bottom)+10) + 'px';
         if(parseInt(boolets[i].style.bottom) == 290){
            var targetLeft = parseInt(document.getElementById("target").style.left);
            var booletLeft = parseInt(boolets[i].style.left)-3;
            if(booletLeft>targetLeft && booletLeft<(targetLeft+50)){
               var numb = parseInt(document.getElementById("points").innerHTML);
               numb++;
               document.getElementById("points").innerHTML = numb.toString();
            }
            boolets[i].parentNode.removeChild(boolets[i]);
         }
      }
   }

   function shoot(){

      var numberOfBullets = parseInt(document.getElementById("bulletsDigits").innerHTML);
      if(numberOfBullets >= 0){

         numberOfBullets--;

         document.getElementById("bulletsDigits").innerHTML = numberOfBullets.toString();


         var bullet =  document.createElement('div');
         bullet.className = "bul";
         bullet.style.bottom = 20 + 'px';
         bullet.style.left = (shipPosition.left+3) + 'px';
         console.log(numberOfBullets);
         if(numberOfBullets == -1){
            bullet.className += " lastBul";
         }
         document.getElementById('wrapper').appendChild(bullet);
      }
   }

   function gameLoop() {


      targetMove();
      shipMove();
      booletMove();

      if((parseInt(document.getElementById("bulletsDigits").innerHTML)) == -1){
         var check = parseInt(document.getElementsByClassName("lastBul")[0].style.bottom);
         console.log(parseInt(document.getElementsByClassName("lastBul")[0].style.bottom) + "last bullet");
         if(check >= 280){
            if(parseInt(document.getElementById("points").innerHTML) > 5){
               alert("You win !")

            }else{
               alert("haha you lose !")

            }
         }
      }
      requestAnimationFrame(gameLoop);
   }

   requestAnimationFrame(gameLoop);

   document.addEventListener('keydown', function(e) {

		if (e.keyCode == 32) {
			shoot();
		}


	}, false);


   document.addEventListener('keydown', function(e) {

		if (e.keyCode == 39 && (shipPosition.left < 550)) {
			isShipMovingRight = true;
		}

		if (e.keyCode == 37) {
			isShipMovingLeft = true;
		}
	}, false);

	document.addEventListener('keyup', function(e) {
		if (e.keyCode == 39) {
			isShipMovingRight = false;
		}

		if (e.keyCode == 37) {
			isShipMovingLeft = false;
		}
	}, false);
},false);
