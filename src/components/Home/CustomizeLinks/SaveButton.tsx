"use client";

import useUser from "@/hooks/auth/useUser";
import { responses } from "@/libs/api";
import { isValidUrl } from "@/libs/utils";
import { useSaveLinksMutation } from "@/redux/features/links/linksApiSlice";
import { linksActions } from "@/redux/features/links/linksSlice";
import { AppState } from "@/redux/store";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import BottomSticky from "../Layouts/BottomSticky";
import SubmitButton from "../Layouts/SubmitButton";

export default function SaveButton() {
  const { links } = useSelector((state: AppState) => state.links);
  const dispatch = useDispatch();
  const [saveLinks, { isLoading }] = useSaveLinksMutation();
  const { user } = useUser();

  const handleSubmit = async () => {
    if (!isLoading) {
      try {
        // validations::Start
        const invalidLinksIds: string[] = [];
        for (const link of links) {
          if (!isValidUrl(link.url)) {
            invalidLinksIds.push(link.id);
          }
        }

        const getInputElement = (id: string) => {
          return document.querySelector(
            `input[name="url"][data-id="${id}"]`,
          ) as HTMLInputElement | null;
        };
        const setError = (id: string, msg: string) => {
          dispatch(linksActions.setError({ name: `url-${id}`, message: msg }));
        };

        if (invalidLinksIds.length > 0) {
          invalidLinksIds.forEach((id) => {
            const inputElement = getInputElement(id);
            if (inputElement?.value) {
              setError(id, "Invalid url");
            } else {
              setError(id, "Url is required");
            }
          });

          // Scroll to first invalid input
          const firstInputElement = getInputElement(invalidLinksIds[0]);
          if (firstInputElement) {
            firstInputElement.scrollIntoView({
              block: "center",
              inline: "center",
            });
            firstInputElement?.focus();
          }

          return;
        }
        // validations::End

        const body = { username: user!.username, links };
        const res = await saveLinks(body).unwrap();
        const { message } = res;
        toast.success(message);
      } catch (error) {
        responses.catchError(error);
      }
    }
  };

  return (
    <BottomSticky>
      <SubmitButton
        onClick={handleSubmit}
        disabled={isLoading}
        isLoading={isLoading}
        loadingText="Saving"
      >
        Save
      </SubmitButton>
    </BottomSticky>
  );
}
