import dynamic from "next/dynamic";
import { ComponentType, SVGProps, useMemo } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  src: string;
}

const iconCache: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {};

export default function SvgIcon({ src, ...props }: Props) {
  const IconComp = useMemo(() => {
    if (iconCache[src]) {
      return iconCache[src];
    }

    const Comp = dynamic(
      () =>
        import(`@/../public${src}`).then((comp) => {
          iconCache[src] = comp.default;
          return comp.default;
        }),
      { ssr: false },
    );

    return Comp;
  }, [src]);

  return <IconComp {...props} />;
}
