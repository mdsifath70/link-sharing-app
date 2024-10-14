export const platformLinks: {
  [key in PlatformNames]: {
    name: string;
    bgColor: string;
    textColor?: string;
  };
} = {
  website: {
    name: "Website",
    bgColor: "#1A1A1A",
  },
  github: {
    name: "GitHub",
    bgColor: "#1A1A1A",
  },
  gitlab: {
    name: "GitLab",
    bgColor: "#EB4925",
  },
  "frontend-mentor": {
    name: "Frontend Mentor",
    bgColor: "#FFFFFF",
    textColor: "#1A1A1A",
  },
  devto: {
    name: "Dev.to",
    bgColor: "#333333",
  },
  "stack-overflow": {
    name: "Stack Overflow",
    bgColor: "#EC7100",
  },
  freecodecamp: {
    name: "freeCodeCamp",
    bgColor: "#302267",
  },
  hashnode: {
    name: "Hashnode",
    bgColor: "#0330D1",
  },
  codewars: {
    name: "Codewars",
    bgColor: "#8A1A50",
  },
  codepen: {
    name: "CodePen",
    bgColor: "#000000",
  },
  linkedin: {
    name: "LinkedIn",
    bgColor: "#2D68FF",
  },
  twitter: {
    name: "Twitter",
    bgColor: "#43B7E9",
  },
  youtube: {
    name: "YouTube",
    bgColor: "#EE3939",
  },
  twitch: {
    name: "Twitch",
    bgColor: "#EE3FC8",
  },
  facebook: {
    name: "Facebook",
    bgColor: "#2442AC",
  },
};
