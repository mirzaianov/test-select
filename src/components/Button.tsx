import { User } from '../types/types';
import Arrow from './Arrow';
import styles from './Button.module.css';

type ButtonProps = {
  selected: User | null;
  isActive: boolean;
  onClick: () => void;
};

export default function Button({ selected, isActive, onClick }: ButtonProps) {
  return (
    <div
      className={`${styles.button} ${isActive ? styles.buttonActive : ''}`}
      onClick={onClick}
    >
      {selected
        ? `${selected.last_name} ${selected.first_name}, ${selected.job}`
        : 'LastName FirstName, jobTitle'}
      <Arrow />
    </div>
  );
}
