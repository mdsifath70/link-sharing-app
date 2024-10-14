import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isValidUrl } from "@/libs/utils";
import { linksActions } from "@/redux/features/links/linksSlice";
import { AppState } from "@/redux/store";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Equal, Link } from "lucide-react";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectPlatform from "./SelectPlatform";

interface Props {
  index: number;
  linkItem: LinkItemType;
}

export default function LinkItem({ index, linkItem }: Props) {
  const { errors } = useSelector((state: AppState) => state.links);
  const dispatch = useDispatch();

  // constants
  const { id, url } = linkItem;
  const error = errors?.[`url-${id}`];

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name: targetName, value } = e.target;

    dispatch(
      linksActions.handleChangeLink({
        index,
        name: targetName as keyof typeof linkItem,
        value,
      }),
    );

    // validations
    if (targetName === "url") {
      if (error) {
        const setError = (msg: string) => {
          dispatch(linksActions.setError({ name: `url-${id}`, message: msg }));
        };

        if (value) {
          if (!isValidUrl(value)) {
            setError("Invalid url");
          } else {
            dispatch(linksActions.removeError({ name: `url-${id}` }));
          }
        } else {
          setError("Url is required");
        }
      }
    }
  };

  const handleRemove = () => {
    dispatch(linksActions.removeLink({ id }));
    dispatch(linksActions.removeError({ name: `url-${id}` }));
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} className="touch-none" style={style}>
      <div className="rounded-lg bg-background p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              type="button"
              {...attributes}
              {...listeners}
              className="cursor-grab"
            >
              <Equal />
            </button>
            <h4 className="text-lg font-semibold">Link #{index + 1}</h4>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="underline-offset-2 hover:underline"
          >
            Remove
          </button>
        </div>

        <div className="space-y-5">
          <SelectPlatform index={index} linkItem={linkItem} />
          <div className="space-y-1.5">
            <Label>Link</Label>
            <Input
              name="url"
              placeholder="https://"
              required
              iconLeft={<Link className="h-5 w-5" />}
              data-id={id}
              errorMessage={error?.message}
              value={url}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
