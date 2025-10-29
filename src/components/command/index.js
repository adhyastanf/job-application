'use client';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Plus } from 'lucide-react';

export default function CommandComponent({ placeholder = 'Type a command or search...', list = [], className = 'rounded-lg border shadow-md md:min-w-[450px]', onSelect }) {
  return (
    <Command>
      <CommandInput placeholder='Type a command or search...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {list.map((item, idx) => {
            return (
              <CommandItem key={idx} onSelect={() => onSelect(item)} className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <Plus />
                  <p>{item.name}</p>
                </div>
                <p>{item.numberCode}</p>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
