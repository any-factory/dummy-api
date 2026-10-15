import { Buffer } from 'node:buffer';

export function base64() {
  return { base64: Buffer.from('hello', 'utf8').toString('base64') };
}
