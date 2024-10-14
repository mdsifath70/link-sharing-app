import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="relative">
      <Link href="/" className="inline-flex items-center gap-2">
        <span className="rounded-lg bg-primary px-1.5 py-1 text-primary-foreground">
          <LinkIcon className="h-5 w-5 rotate-45 lg:h-6 lg:w-6" />
        </span>
        <h4 className="hidden text-2xl font-semibold text-dark md:block lg:text-[2rem]">
          devlinks
        </h4>
      </Link>
    </div>
  );
}
