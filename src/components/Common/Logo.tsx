import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="relative flex">
      <Link href="/" className="inline-flex items-center gap-2">
        <span className="rounded-lg bg-primary px-1.5 py-1 text-primary-foreground">
          <LinkIcon className="h-6 w-6 rotate-45" />
        </span>
        <h4 className="hidden text-2xl font-semibold text-dark md:block lg:text-[2rem]">
          devlinks
        </h4>
      </Link>
    </div>
  );
}
