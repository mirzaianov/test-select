import { User } from '../types/types';
import Arrow from './Arrow';
import styles from './Button.module.css';

type ButtonProps = {
  selected: User | null;
  onClick: () => void;
};

export default function Button({ selected, onClick }: ButtonProps) {
  return (
    <div
      className={styles.button}
      onClick={onClick}
    >
      {selected
        ? `${selected.last_name} ${selected.first_name}, ${selected.job}`
        : 'LastName First Name, jobTitle'}
      <Arrow />
    </div>
  );
}
