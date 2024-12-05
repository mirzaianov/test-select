import {
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

type Size = {
  width: number;
  height: number;
};

export default function useElementSize<T extends HTMLElement>(
  element?: RefObject<T>,
): [RefObject<T>, Size] {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  const handleSize = useCallback(() => {
    setSize({
      width: ref.current?.offsetWidth || 0,
      height: ref.current?.offsetHeight || 0,
    });
  }, [ref.current?.offsetHeight, ref.current?.offsetWidth]);

  useEffect(() => {
    const targetElement: T | Window = element?.current || window;
    if (!(targetElement && targetElement.addEventListener)) return;

    targetElement.addEventListener('resize', handleSize);

    return () => {
      targetElement.removeEventListener('resize', handleSize);
    };
  }, []);

  useLayoutEffect(() => {
    handleSize();
  }, [ref.current?.offsetHeight, ref.current?.offsetWidth]);

  return [ref, size];
}
