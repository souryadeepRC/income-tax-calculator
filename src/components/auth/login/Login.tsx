import { useEffect, useState } from "react";
// library
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { TUITextField } from "triva-ui";
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
  const { mutate, isPending, data, isError, error } = useMutation({
    mutationFn: (loginInfo: any) => authService.login(loginInfo),
  });

  const [loginData, setLoginData] = useState({
    email: "test@mail.com",
    password: "Test@1234",
  });

  useEffect(() => {
    if (isPending || !data || isError) return;
    const { email = "", name = "" } = data || {};
    dispatch(createUser({ email, name }));
  }, [data, isPending, isError]);

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData(setFormData("email", event.target.value));
  };
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData(setFormData("password", event.target.value));
  };
  const onSubmit = () => {
    mutate(loginData);
  };
  const { email, password } = loginData;

  return (
    <div>
      <InfiniteProgressBar isLoading={isPending} />
      <h2>Login</h2>
      {isError && (
        <span className={classes.error__message}>{getErrorMessage(error)}</span>
      )}
      <form className={classes.auth__form}>
        <TUITextField
          fullWidth
          label="Email"
          value={email}
          onChange={onEmailChange}
          errorMessage=""
        />
        <TUITextField
          fullWidth
          label="Password"
          value={password}
          onChange={onPasswordChange}
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
