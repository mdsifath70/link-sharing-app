import Container from "@/components/Common/Container";
import Logo from "@/components/Common/Logo";
import Actions from "./Actions";
import Menus from "./Menus";

export default function Header() {
  return (
    <header className="pt-8">
      <Container>
        <nav className="flex items-center justify-between gap-4 rounded-xl bg-white px-4 py-6 sm:px-6 md:px-8">
          <Logo />
          <Menus />
          <Actions />
        </nav>
      </Container>
    </header>
  );
}
