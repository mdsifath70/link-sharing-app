import SvgIcon from "@/components/Common/SvgIcon";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { platformLinks } from "@/configs/platformLinks";
import { linksActions } from "@/redux/features/links/linksSlice";
import { useDispatch } from "react-redux";

interface Props {
  index: number;
  linkItem: LinkItemType;
}

export default function SelectPlatform({ index, linkItem }: Props) {
  const dispatch = useDispatch();

  const handleChange = (value: string) => {
    dispatch(
      linksActions.handleChangeLink({
        index,
        name: "platformName",
        value,
      }),
    );
  };

  // destructure
  const { platformName } = linkItem;

  return (
    <div className="space-y-1.5">
      <Label>Platform</Label>
      <Select onValueChange={handleChange} value={platformName}>
        <SelectTrigger
          iconLeft={
            <SvgIcon src={`/icons/${platformName}.svg`} className="h-5 w-5" />
          }
        >
          <SelectValue placeholder="Select Platform" />
        </SelectTrigger>

        <SelectContent>
          {Object.keys(platformLinks).map((key, i) => {
            const platformName = key as PlatformNames;

            return (
              <SelectItem key={i} value={platformName}>
                {platformLinks[platformName].name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
