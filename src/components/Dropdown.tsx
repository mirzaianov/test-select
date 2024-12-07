import {
  useState,
  useMemo,
  type UIEvent,
  type ReactElement,
  cloneElement,
} from 'react';
import useElementSize from '../hooks/useElementSize';
import { throttle } from '../utils/utils';
import styles from './Dropdown.module.css';

// TODO: Correct types
type DropdownProps = {
  children: Array<ReactElement>;
  isActive: boolean;
  onReachBottom: () => any | (() => Promise<any>);
};

const BUFFERED_ITEMS = 50;
const ROW_HEIGHT = 32;
const GAP = 4;

export default function Dropdown({
  children,
  isActive,
  onReachBottom,
}: DropdownProps) {
  const [containerRef, { height: containerHeight }] =
    useElementSize<HTMLDivElement>();
  const [scrollPosition, setScrollPosition] = useState(0);

  const visibleChildren = useMemo(() => {
    const startIndex = Math.max(
      Math.floor(scrollPosition / ROW_HEIGHT) - BUFFERED_ITEMS,
      0,
    );
    const endIndex = Math.min(
      Math.ceil((scrollPosition + containerHeight) / ROW_HEIGHT - 1) +
        BUFFERED_ITEMS,
      children.length - 1,
    );

    return children.slice(startIndex, endIndex + 1).map((child, index) =>
      cloneElement(child, {
        key: index,
        style: {
          position: 'absolute',
          top: (startIndex + index) * ROW_HEIGHT + GAP,
          height: ROW_HEIGHT,
          left: 0,
          right: 0,
        },
      }),
    );
  }, [children, containerHeight, scrollPosition]);

  const handleScroll = useMemo(
    () =>
      throttle(
        function (e: UIEvent<HTMLDivElement>) {
          const scrollPosition = (e.target as HTMLDivElement).scrollTop;

          if (
            scrollPosition > Math.max(children.length * ROW_HEIGHT - 300, 0)
          ) {
            onReachBottom();
          }

          setScrollPosition(scrollPosition);
        },
        50,
        { leading: false },
      ),
    [children.length, onReachBottom],
  );

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={`${styles.dropdown} ${isActive ? styles.dropdownActive : ''}`}
    >
      {visibleChildren}
    </div>
  );
}
