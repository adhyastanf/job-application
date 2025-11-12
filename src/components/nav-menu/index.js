'use client';

import { LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import React from 'react';

export default function Navmenu() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut();
    router.refresh();
  };

  const hiddenPaths = ['/sign-in', '/sign-up'];

  const isJobDetailPage = pathname?.startsWith('/applicant/jobs/') && pathname !== '/applicant/jobs';

  if (hiddenPaths.includes(pathname) || isJobDetailPage) {
    return null;
  }

  return (
    <nav className='border-b h-[52px] px-6 py-3 flex justify-between items-center bg-white/80 backdrop-blur-md'>
      <BreadcrumbComponent />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='cursor-pointer hover:opacity-90'>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg' align='end' sideOffset={4}>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='cursor-pointer text-red-600 focus:text-red-700' onClick={handleLogout}>
            <LogOut className='mr-2 h-4 w-4' />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}

function BreadcrumbComponent() {
  const breadcrumbs = useBreadcrumbs();

  if (!breadcrumbs?.length) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <React.Fragment key={crumb.link}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className='rounded-md py-1 px-2 bg-neutral/10 border-neutral/40 border text-neutral text-sm'>{crumb.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.link} className='rounded-md py-1 px-2 border-neutral/40 border text-neutral text-sm'>
                      {crumb.title}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
