import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export default function TableSkeleton({ columnCount = 6, rowCount = 6 }) {
  return (
    <div className='relative flex flex-1 h-full'>
      <div className='absolute inset-0 flex overflow-hidden'>
        <div className='h-full min-w-full'>
          <Table className='h-full'>
            <TableHeader className='bg-neutral/10'>
              <TableRow>
                {[...Array(columnCount)].map((_, i) => (
                  <TableHead key={i}>
                    <Skeleton className='h-5 w-[100px]' />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {[...Array(rowCount)].map((_, rowIdx) => (
                <TableRow key={rowIdx}>
                  {[...Array(columnCount)].map((_, colIdx) => (
                    <TableCell key={colIdx}>
                      <Skeleton className='h-5 w-[120px]' />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
