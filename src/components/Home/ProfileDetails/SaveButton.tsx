"use client";

import useUser from "@/hooks/auth/useUser";
import { responses } from "@/libs/api";
import { updateUserSession } from "@/libs/auth/client";
import { urlToFile } from "@/libs/file";
import { prepareFormData } from "@/libs/utils";
import { useUpdateUserMutation } from "@/redux/features/user/userApiSlice";
import { AppState } from "@/redux/store";
import { UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { z } from "zod";
import BottomSticky from "../Layouts/BottomSticky";
import SubmitButton from "../Layouts/SubmitButton";
import formSchema from "./FormFields/formSchema";

interface Props {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export default function SaveButton({ form }: Props) {
  const { profile } = useSelector((state: AppState) => state.user);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { session, updateSession } = useUser();

  async function onSubmit() {
    if (!isLoading) {
      try {
        const { email, username, firstName, lastName, image, imageFileName } =
          profile;

        const imageFile = image.startsWith("blob:")
          ? await urlToFile(image, imageFileName)
          : null;

        const body = {
          email,
          username,
          firstName,
          lastName,
          image: imageFile,
        };
        const formData = prepareFormData(body);
        const res = await updateUser(formData).unwrap();
        const { message } = res;
        toast.success(message);
        // update user
        await updateUserSession({ session, updateSession });
      } catch (error) {
        const err = error as ApiResponseError;
        const errPayload = err?.data?.payload as {
          errors?: { username: boolean; email: boolean };
        };

        if (errPayload?.errors?.username) {
          form.setError("username", { message: err?.data?.message });
        } else if (errPayload?.errors?.email) {
          form.setError("email", { message: err?.data?.message });
        } else {
          responses.catchError(error);
        }
      }
    }
  }

  const handleSubmit = () => {
    form.handleSubmit(onSubmit)();
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
