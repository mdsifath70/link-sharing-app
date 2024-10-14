import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function getFonts() {
  const fonts = {
    variables: [poppins.variable].join(" "),
  };
  return fonts;
}
