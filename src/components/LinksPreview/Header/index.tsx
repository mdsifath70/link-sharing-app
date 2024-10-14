import Container from "@/components/Common/Container";
import ActionsLeft from "./ActionsLeft";
import ShareLink from "./ShareLink";

export default function Header() {
  return (
    <header>
      <Container>
        <nav className="xsm:px-5 flex items-center justify-between rounded-lg bg-white px-0 py-4">
          <ActionsLeft />
          <ShareLink />
        </nav>
      </Container>
    </header>
  );
}
