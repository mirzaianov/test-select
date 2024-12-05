import { useCallback, useEffect, useState } from 'react';
import { User, UserList } from '../types/types';
import Button from './Button';
import Item from './Item';
import Dropdown from './Dropdown';
import { fetchUserList } from '../api/fetchUserList';
import styles from './Select.module.css';
import useOnClickOutside from '../hooks/useOnClickOutside';

const ITEM_LIMIT = 50;

export default function Select() {
  const [users, setUsers] = useState<UserList>([]);
  const [selected, setSelected] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // UserList Pagination
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMorePage, setHasMorePage] = useState(true);

  // Fetch users
  const fetchUsers = useCallback(async () => {
    if (isLoading || !hasMorePage) return;

    setIsLoading(true);

    const response = await fetchUserList(page, ITEM_LIMIT);

    if (response.data.length) {
      setUsers((prevState) => [...prevState, ...response.data]);
      setPage((prevPage) => prevPage + 1);
    }

    if (response.meta.to >= response.meta.total) {
      setHasMorePage(false);
    }

    setIsLoading(false);
  }, [isLoading, hasMorePage, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDropdownItemClick = (user: User) => {
    setSelected(user);
    setIsDropdownOpen(false);
  };

  // Close dropdown on click outside
  const outsideClickRef = useOnClickOutside<HTMLDivElement>(() =>
    setIsDropdownOpen(false),
  );

  return (
    <div
      className={styles.container}
      ref={outsideClickRef}
    >
      <span className={styles.heading}>Users</span>
      <Button
        selected={selected}
        onClick={() => setIsDropdownOpen((prevState) => !prevState)}
      />
      {isDropdownOpen && (
        <Dropdown onReachBottom={fetchUsers}>
          {users.map((user) => (
            <Item
              key={user.id}
              user={user}
              onClick={() => handleDropdownItemClick(user)}
            />
          ))}
        </Dropdown>
      )}
    </div>
  );
}
