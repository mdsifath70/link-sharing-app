import BoxContainer from "../Layouts/BoxContainer";
import Header from "./Header";
import Links from "./Links";
import SaveButton from "./SaveButton";

export default function CustomizeLinks() {
  return (
    <BoxContainer pyDisabled>
      <div className="flex h-full w-full flex-col justify-between">
        <div>
          <Header />
          <Links />
        </div>
        <SaveButton />
      </div>
    </BoxContainer>
  );
}
