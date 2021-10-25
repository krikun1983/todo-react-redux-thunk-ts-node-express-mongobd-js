const randoms = (min, max) => {
  let rand = Math.floor(Math.random() * (max - min + 1)) + min;
  return Math.floor(rand);
}

export default randoms;