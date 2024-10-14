import Header from "./Header";
import HeaderContainer from "./Header/HeaderContainer";
import LinksView from "./LinksView";

export default function LinksPreview() {
  return (
    <main className="bg-white md:bg-transparent">
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <LinksView />
    </main>
  );
}
