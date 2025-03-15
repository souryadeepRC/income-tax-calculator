import { useState, useEffect } from "react";
// library
import { useDispatch } from "react-redux";
import { TUITextField } from "triva-ui";
import { useMutation } from "@tanstack/react-query";
// components
import { Button, InfiniteProgressBar } from "src/components/common/CommonComponents";
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
  if (errorMessage.includes("already exists")) {
    return "This email is already in use. Please try another one.";
  }
  return "We couldn't complete your signup. Please try again.";
};

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (signupInfo: any) => authService.createUser(signupInfo),
  });
  const [signupData, setSignupData] = useState({
    name: "Sourya",
    email: "tester@mail.com",
    password: "Test@1234",
  });

  useEffect(() => {
    if (isPending || !isSuccess || isError) return;
    dispatch(createUser({ email, name }));
  }, [isSuccess, isPending, isError]);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData(setFormData("name", event.target.value));
  };
  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData(setFormData("email", event.target.value));
  };
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData(setFormData("password", event.target.value));
  };
  const onSubmit = () => {
    mutate(signupData);
  };
  const { name, email, password } = signupData;
  return (
    <div>
      <InfiniteProgressBar isLoading={isPending} />
      <h2>Join with us</h2>
      {isError && (
        <span className={classes.error__message}>{getErrorMessage(error)}</span>
      )}
      <form className={classes.auth__form}>
        <TUITextField
          fullWidth
          label="Username"
          value={name}
          onChange={onNameChange}
          errorMessage=""
        />
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
        <Button variant="contained" border="round" onClick={onSubmit}>
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
