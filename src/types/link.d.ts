type PlatformNames =
  | "website"
  | "github"
  | "gitlab"
  | "frontend-mentor"
  | "devto"
  | "stack-overflow"
  | "freecodecamp"
  | "hashnode"
  | "codewars"
  | "codepen"
  | "linkedin"
  | "twitter"
  | "youtube"
  | "twitch"
  | "facebook";

interface LinkItemType {
  id: string;
  platformName: PlatformNames;
  url: string;
}
