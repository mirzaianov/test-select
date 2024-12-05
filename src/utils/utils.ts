import { type UIEvent } from 'react';

export function throttle(
  fn: (e: UIEvent<HTMLDivElement>) => void,
  delay: number = 0,
  options: { leading?: boolean } = { leading: true },
) {
  let timeout: null | number = null;

  return (e: UIEvent<HTMLDivElement>): void => {
    if (timeout) return;

    if (options.leading) fn(e);

    timeout = setTimeout(() => {
      if (!options.leading) fn(e);

      timeout = null;
    }, delay);
  };
}
