const collision = (objOne, objTwo) => {
  if (
    objOne.x + objOne.width > objTwo.x &&
    objOne.x < objTwo.x + objTwo.width &&
    objOne.y < objTwo.y + objTwo.height &&
    objOne.y + objOne.height > objTwo.y
  ) {
    return true;
  } else {
    return false;
  }
}

export default collision;