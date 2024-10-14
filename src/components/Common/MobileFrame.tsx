import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function MobileFrame({ children }: Props) {
  return (
    <div className="relative h-full max-h-[720px] w-[350px] bg-white">
      {/* frame */}
      <div className="pointer-events-none absolute inset-0 rounded-[56px] border-2 border-border" />
      <div className="pointer-events-none absolute -inset-[14px] rounded-[64px] border-2 border-border" />

      {/* Notch */}
      <div className="absolute left-1/2 top-0 z-10 h-[35px] w-2/5 -translate-x-1/2 transform">
        <div className="absolute inset-0 top-0 rounded-b-[20px] border-2 border-t-0 bg-white">
          <div className="absolute left-0 top-0 h-[16px] w-[16px] -translate-x-full rounded-tr-[15px] border-r-2 border-t-2 bg-white shadow-[4px_-4px_0_#fff]" />
          <div className="absolute right-0 top-0 h-[16px] w-[16px] translate-x-full rounded-tl-[15px] border-l-2 border-t-2 bg-white shadow-[-4px_-4px_0_#fff]" />
        </div>
      </div>

      {/* Contents */}
      <div className="scrollbar absolute bottom-6 left-6 right-3 top-9 overflow-y-auto pr-3">
        {children}
      </div>
    </div>
  );
}
