import { type User } from '../types/types';
import styles from './Item.module.css';

type ItemProps = {
  user: User;
  isSelected: boolean;
  onClick: () => void;
};

export default function Item({
  user,
  isSelected,
  onClick,
  ...props
}: ItemProps) {
  return (
    <div
      className={`${styles.item} ${isSelected ? styles.itemSelected : ''}`}
      onClick={onClick}
      {...props}
    >
      <div className={styles.icon}>{user.last_name[0]}</div>
      <div className={styles.text}>
        {`${user.last_name} ${user.first_name}, ${user.job}`}
      </div>
    </div>
  );
}
