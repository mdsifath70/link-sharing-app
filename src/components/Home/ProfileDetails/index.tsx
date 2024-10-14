"use client";

import { AppState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";
import BoxContainer from "../Layouts/BoxContainer";
import FormFields from "./FormFields";
import formSchema from "./FormFields/formSchema";
import Header from "./Header";
import SaveButton from "./SaveButton";

export default function ProfileDetails() {
  const { profile } = useSelector((state: AppState) => state.user);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...profile },
  });

  return (
    <BoxContainer pyDisabled>
      <div className="flex h-full w-full flex-col justify-between">
        <div>
          <Header />
          <FormFields form={form} />
        </div>
        <SaveButton form={form} />
      </div>
    </BoxContainer>
  );
}
