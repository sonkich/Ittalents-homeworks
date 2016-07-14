document.addEventListener("DOMContentLoaded" ,function () {
   var targetPosition = {
      top: 0,
      left: 0
   }

   var shipPosition = {
      top: 0,
      left: 0,
      bot: -580
   }
   var speed = 5;
   var isMovingRight = false;

   var isShipMovingRight = false;
	var isShipMovingLeft = false;

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

		var ship = document.getElementById('ship');
		ship.style.left = shipPosition.left + 'px';
   }

   function shoot(){}

   function gameLoop() {


      targetMove();
      shipMove();


      requestAnimationFrame(gameLoop);
   }

   requestAnimationFrame(gameLoop);

   document.addEventListener('keydown', function(e) {
      console.log(shipPosition);
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
