import Text from "@/components/Common/Text";
import Title from "@/components/Common/Title";
import HeaderSticky from "@/components/Home/Layouts/HeaderSticky";
import AddNewLink from "./AddNewLink";

export default function Header() {
  return (
    <HeaderSticky>
      <Title className="mb-2">Customize your links</Title>
      <Text>
        Add/edit/remove links below and then share all your profiles with the
        world!
      </Text>

      <div className="mt-8">
        <AddNewLink />
      </div>
    </HeaderSticky>
  );
}
