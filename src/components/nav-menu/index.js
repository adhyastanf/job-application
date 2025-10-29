'use client';

import { Badge } from '../ui/badge';

export default function Navmenu() {
  return (
    <nav className='border-b h-[52px] px-6 py-3'>
      <Badge className='rounded-md py-1 px-2 bg-neutral/10 border-neutral/40 border text-neutral'>Job List</Badge>
    </nav>
  );
}
