import Text from "@/components/Common/Text";
import Title from "@/components/Common/Title";
import HeaderSticky from "@/components/Home/Layouts/HeaderSticky";

export default function Header() {
  return (
    <HeaderSticky>
      <Title className="mb-2">Profile Details</Title>
      <Text>
        Add your details to create a personal touch to your profile. Profile
        picture
      </Text>
    </HeaderSticky>
  );
}
