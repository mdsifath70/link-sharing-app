import { useProfileLinksQuery } from "@/redux/features/profile/profileApiSlice";
import { useParams } from "next/navigation";

export default function useProfileLinksData() {
  const params = useParams();
  const username = params.username as string | null;
  const res = useProfileLinksQuery(
    { username: username! },
    { skip: !username, refetchOnMountOrArgChange: true },
  );
  return res;
}
