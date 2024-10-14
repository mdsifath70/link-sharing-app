import ErrorMessage from "@/components/Common/ErrorMessage";
import { Label } from "@/components/ui/label";
import { validateImageFile } from "@/libs/file";
import { cn } from "@/libs/utils";
import { userActions } from "@/redux/features/user/userSlice";
import { AppState } from "@/redux/store";
import { ImageIcon, Plus } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
  const { profile } = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChangeProfileImage = async (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);

    const file = e.target?.files?.[0];
    if (file) {
      const res = await validateImageFile(file, undefined, 1024);
      if (res?.errorMessage) {
        setErrorMessage(res.errorMessage);
        return;
      }

      dispatch(
        userActions.handleChangeProfile({
          image: URL.createObjectURL(file),
          imageFileName: file.name,
        }),
      );
    }
  };
  // destructure
  const { firstName, lastName, image } = profile || {};
  const fullName = firstName ? `${firstName} ${lastName}` : "";

  return (
    <div className="rounded-lg bg-background p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
        <div className="md:w-2/5">
          <Label>Profile Picture</Label>
        </div>

        <div className="flex flex-wrap items-center gap-4 md:w-3/5 md:gap-5">
          <div className="relative h-[10.125rem] w-[10.125rem] overflow-hidden rounded-lg">
            {image && (
              <Image
                src={image}
                alt={fullName || "Profile"}
                fill
                className="shrink-0 object-cover"
              />
            )}

            <div className="absolute inset-0 z-[1]">
              <label
                className={cn(
                  "flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-dark/50 text-white",
                  !image && "bg-primary/20 text-primary",
                )}
              >
                <ImageIcon className="h-10 w-10" />
                <p className="flex items-center justify-center gap-1 text-sm">
                  {image ? (
                    "Change Image"
                  ) : (
                    <>
                      <Plus className="h-3 w-3" /> Upload Image
                    </>
                  )}
                </p>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/bmp"
                  className="hidden"
                  hidden
                  onChange={handleChangeProfileImage}
                />
              </label>
            </div>
          </div>
          <p className="text-sm">
            Image must be below 1024x1024px. <br />
            Use PNG, JPG or BMP format.
          </p>

          <ErrorMessage message={errorMessage} />
        </div>
      </div>
    </div>
  );
}
