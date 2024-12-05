import { Response } from '../types/types';

export async function fetchUserList(
  page: number,
  limit: number,
): Promise<Response> {
  const response = await fetch(
    `https://frontend-test-middle.vercel.app/api/users?page=${page}&limit=${limit}`,
  );

  return await response.json();
}
