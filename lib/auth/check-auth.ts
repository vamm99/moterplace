import { cookies } from 'next/headers';

export async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  return !!token;
}

export async function getAuthToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  return token?.value;
}
