'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const routeMapping = {
  // '/admin': [{ title: 'Admin', link: '/admin' }],
  '/admin/jobs': [
    // { title: 'Admin', link: '/admin' },
    { title: 'Job List', link: '/admin/jobs' },
  ],
  '/applicant': [{ title: 'Applicant', link: '/applicant' }],
  '/applicant/jobs': [
    // { title: 'Applicant', link: '/applicant' },
    { title: 'Job List', link: '/applicant/jobs' },
  ],
};

export function useBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    if (routeMapping[pathname]) {
      return routeMapping[pathname];
    }

    const segments = pathname.split('/').filter(Boolean);
    const crumbs = [];

    segments.forEach((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;

      if (routeMapping[path]) {
        crumbs.push(...routeMapping[path].filter((c) => !crumbs.some((cc) => cc.link === c.link)));
      } else {
        const isDynamic = segment.startsWith('[') && segment.endsWith(']');
        const title = isDynamic ? 'Detail' : segment.charAt(0).toUpperCase() + segment.slice(1);

        crumbs.push({ title, link: path });
      }
    });

    return crumbs;
  }, [pathname]);

  return breadcrumbs;
}
