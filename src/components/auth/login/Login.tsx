import { useEffect, useState } from "react";
// library
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { TUITextField, TUIPassword } from "triva-ui";
// components
import {
  Button,
  InfiniteProgressBar,
} from "src/components/common/CommonComponents";
// service
import authService from "src/service/Auth";
// store
import { createUser } from "src/store/auth/auth-actions";
// utils
import { setFormData } from "../Auth";
import { updateState } from "src/utils/common-utils";
// styles
import classes from "../Auth.module.scss";

const getErrorMessage = (error: any): string => {
  const errorMessage = error?.response?.message || "";
  if (errorMessage.includes("Invalid credentials")) {
    return "The email or password you entered does not exist.";
  }
  return "Not able to Login. Please try again.";
};

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const {
    mutate,
    isPending,
    data,
    isError,
    error: errorResponse,
  } = useMutation({
    mutationFn: (loginInfo: any) => authService.login(loginInfo),
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: false,
    password: false,
  });

  useEffect(() => {
    if (isPending || !data || isError) return;
    const { email = "", name = "" } = data || {};
    dispatch(createUser({ email, name }));
  }, [data, isPending, isError]);

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(updateState("email", event.target.value === ""));
    setLoginData(setFormData("email", event.target.value));
  };
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(updateState("password", event.target.value === ""));
    setLoginData(setFormData("password", event.target.value));
  };
  const onSubmit = () => {
    if (error.email || error.password) return;
    const isInvalidEmail = loginData.email === "";
    const isInvalidPassword = loginData.password === "";

    if (isInvalidEmail || isInvalidPassword) {
      setError({
        email: isInvalidEmail,
        password: isInvalidPassword,
      });
      return;
    }

    mutate(loginData);
  };
  const { email, password } = loginData;

  return (
    <div>
      <InfiniteProgressBar isLoading={isPending} />
      <h2>Login</h2>
      {isError && (
        <span className={classes.error__message}>
          {getErrorMessage(errorResponse)}
        </span>
      )}
      <form className={classes.auth__form}>
        <TUITextField
          fullWidth
          isRequired
          label="Email"
          value={email}
          onChange={onEmailChange}
          errorMessage={error.email ? "Email is required" : ""}
        />

        <TUIPassword
          fullWidth
          label="Password "
          value={password}
          onChange={onPasswordChange}
          errorMessage={error.password ? "Password is required" : ""}
        />
        <Button
          disabled={isPending}
          variant="contained"
          border="round"
          onClick={onSubmit}
        >
          Log In
        </Button>
      </form>
    </div>
  );
};
export default Login;
