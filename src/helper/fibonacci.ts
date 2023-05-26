export const isFibonacci = (number: number): boolean => {
  let prev = 0;
  let curr = 1;

  for (let i = 0; i < 1000; i++) {
    if (curr === number) {
      return true;
    }

    const next = prev + curr;
    prev = curr;
    curr = next;
  }

  return false;
};
