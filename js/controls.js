document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowLeft":
      playerWalking();
      if (player.x > 0) {
        player.x -= 3;
      }
      break;
    case "ArrowRight":
      playerWalking();
      if (player.x + player.width < cWidth) {
        player.x += 3;
      }
      break;
    case "ArrowUp":
      playerWalking();
      if (player.y > 340) {
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
      player.width = 65;
      playerImage.src = playerPunch.src;
  }
});

document.addEventListener("keyup", (e) => {
  player.width = 40;
  playerImage.src = playerStopped.src;
});
