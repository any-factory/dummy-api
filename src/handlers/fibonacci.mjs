export function fibonacci() {
  let current = 0;
  let next = 1;

  for (let index = 0; index < 7; index += 1) {
    [current, next] = [next, current + next];
  }

  return { result: current };
}
