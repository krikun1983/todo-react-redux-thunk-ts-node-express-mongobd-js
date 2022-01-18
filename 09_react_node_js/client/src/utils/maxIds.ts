const maxIds = (arr: number[]): number => {
  let max = 0;
  arr.forEach(num => {
    if (num > max) max = num;
  });
  return max + 1;
};

export default maxIds;
