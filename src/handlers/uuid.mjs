import crypto from 'node:crypto';

export function uuid() {
  return { result: crypto.randomUUID() };
}
