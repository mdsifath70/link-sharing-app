interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  name: string | null;
  image: string | null;
}

interface ProfileLinks {
  profile: UserProfile;
  links: LinkItemType[];
}
