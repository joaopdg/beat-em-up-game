document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowLeft":
      playerWalking();
      if (player.x > 0) {
        player.x -= 3;
      }
      break;
    case "ArrowRight":
      scrollVal += 1.5;
      playerWalking();
      if (player.x + player.width < cWidth) {
        player.x += 3;
      }
      break;
    case "ArrowUp":
      playerWalking();
      if (player.y > background.roadHeight) {
        player.y -= 2.5;
      }
      break;
    case "ArrowDown":
      playerWalking();
      if (player.y + player.height < cHeight) {
        player.y += 2.5;
      }
      break;
    case "Space":
      player.width = player.withPunching;
      playerImage.src = playerPunch.src;
      break;
  }
});

document.addEventListener("keyup", (e) => {
  player.width = player.widthStopped;
  playerImage.src = playerStopped.src;
});
