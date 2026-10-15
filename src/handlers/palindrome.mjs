export function palindrome() {
  const input = 'racecar';

  return { result: input === input.split('').reverse().join('') };
}
