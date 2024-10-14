interface Props {
  message: string | null | undefined;
}

export default function ErrorMessage({ message }: Props) {
  if (message)
    return <p className="text-xs font-medium text-destructive">{message}</p>;

  return null;
}
