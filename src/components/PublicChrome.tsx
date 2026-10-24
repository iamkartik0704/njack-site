'use client';

import { usePathname } from 'next/navigation';

/**
 * Hides the public site chrome (navbar, footer, 3D canvas, command palette)
 * on admin routes, which render their own full-screen shell.
 */
export default function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/council-terminal')) return null;
  return <>{children}</>;
}
