import { Buffer } from 'node:buffer';

export function base64() {
  return { result: Buffer.from('hello', 'utf8').toString('base64') };
}
