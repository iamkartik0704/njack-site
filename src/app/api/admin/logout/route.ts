import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminTokenName } from '@/lib/auth';

export async function POST() {
  const cookieStore = cookies();
  cookieStore.delete(getAdminTokenName());
  return NextResponse.json({ success: true, message: 'Logged out successfully' });
}
