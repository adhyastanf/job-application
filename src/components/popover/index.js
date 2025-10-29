import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function PopoverComponent({
    trigger,
    children,
    className,
    side = "bottom",
    align = "start",
  }) {
    return (
      <Popover>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent
          className={className}
          side={side}
          align={align}
        >
          {children}
        </PopoverContent>
      </Popover>
    )
  }