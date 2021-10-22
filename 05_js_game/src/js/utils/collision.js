const collision = (objOne, objOneThis, objTwo, objTwoThis, num) => {
  if (
    objOne.xPos + objOneThis.img.width > objTwo.pos[num].x &&
    objOne.xPos < objTwo.pos[num].x + objTwoThis.img.width &&
    objOne.yPos < objTwo.pos[num].y + objTwoThis.img.height &&
    objOne.yPos + objOneThis.img.height > objTwo.pos[num].y
  ) {
    return true;
  } else {
    return false;
  }
}

export default collision;