import Container from "@/components/Common/Container";
import MobileView from "./MobileView";
import Presence from "./Presence";

export default function Home() {
  return (
    <main className="my-8">
      <Container>
        <section className="flex flex-col gap-8 lg:flex-row">
          <div className="lg:w-5/12">
            <MobileView />
          </div>
          <div className="order-first flex-grow lg:order-none">
            <Presence />
          </div>
        </section>
      </Container>
    </main>
  );
}
