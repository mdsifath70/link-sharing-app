"use client";

import useUser from "@/hooks/auth/useUser";
import { authActions } from "@/redux/features/auth/authSlice";
import { userActions } from "@/redux/features/user/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function SetData() {
  const dispatch = useDispatch();
  const { user } = useUser();

  // set auth
  useEffect(() => {
    if (user?.id) {
      dispatch(authActions.setUser(user));
    }
  }, [dispatch, user]);

  // set profile details
  const { email, firstName, lastName, image, username } = user || {};
  useEffect(() => {
    if (user?.id) {
      dispatch(
        userActions.handleChangeProfile({
          email,
          username,
          firstName: firstName || "",
          lastName: lastName || "",
          image: image || "",
        }),
      );
    }
  }, [dispatch, user?.id, email, firstName, image, lastName, username]);

  return null;
}
