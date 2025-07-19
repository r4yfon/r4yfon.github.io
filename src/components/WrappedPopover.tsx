import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface WrappedPopoverProps {
  children: React.ReactNode;
}

export default function WrappedPopover({ children }: WrappedPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger className="hover:bg-gray-200 p-1 rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
          <line x1="4" y1="7" x2="24" y2="7"></line>
          <line x1="4" y1="14" x2="24" y2="14"></line>
          <line x1="4" y1="21" x2="24" y2="21"></line>
        </svg>
      </PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  );
}
