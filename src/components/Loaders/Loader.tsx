interface Props {
  variant?: "default" | "onlySpinner";
}

export default function Loader({ variant = "default" }: Props) {
  const spinner = (
    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
  );

  switch (variant) {
    case "onlySpinner":
      return spinner;
    default:
      return <div className="flex items-center justify-center">{spinner}</div>;
  }
}
