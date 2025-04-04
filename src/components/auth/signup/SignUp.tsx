import { useState, useEffect, useRef, useCallback } from "react";
// library
import { useDispatch } from "react-redux";
import { TUITextField, TUIPassword } from "triva-ui";
import { useMutation } from "@tanstack/react-query";
// components
import { Button, InfiniteProgressBar } from "src/components/common";
// service
import authService from "src/service/Auth";
// store
import { createUser } from "src/store/auth/auth-reducer";
// utils
import { setFormData } from "../Auth";
import { updateState } from "src/utils/common-utils";
// constants
import { EMAIL_REGEX } from "src/constants/common-constants";
import { SignUpPasswordRules } from "src/constants/auth-constants";
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
  const {
    mutate,
    isPending,
    isSuccess,
    isError,
    error: errorResponse,
  } = useMutation({
    mutationFn: (signupInfo: any) => authService.createUser(signupInfo),
  });
  const isSubmitClicked = useRef<boolean>(false);
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleValidity = useCallback((isValid: boolean) => {
    setError((error) => {
      return {
        ...error,
        password: isValid,
      };
    });
  }, []);

  useEffect(() => {
    if (isPending || !isSuccess || isError) return;
    dispatch(createUser({ email, name }));
  }, [isSuccess, isPending, isError]);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(updateState("name", event.target.value === ""));
    setSignupData(setFormData("name", event.target.value));
  };
  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isSubmitClicked.current) {
      setError(updateState("email", !EMAIL_REGEX.test(event.target.value)));
    }
    setSignupData(setFormData("email", event.target.value));
  };
  const onPasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSignupData(setFormData("password", event.target.value));
    },
    []
  );
  const onSubmit = () => {
    isSubmitClicked.current = true;
    if (error.email || error.password || error.name) return;

    const isInvalidName = signupData.name === "";
    const isInvalidEmail = !EMAIL_REGEX.test(signupData.email);
    if (isInvalidName || isInvalidEmail) {
      setError({
        name: isInvalidName,
        email: isInvalidEmail,
        password: error.password,
      });
      return;
    }

    const { name, email, password } = signupData;
    mutate({
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
    });
  };
  const { name, email, password } = signupData;
  return (
    <div>
      <InfiniteProgressBar isLoading={isPending} />
      <div className={classes.auth__header}>
        <h2>Optimize your finance</h2>
        <p>
          Gain access to personalized tool to handle estimates, deductions, and
          tax breakup.
        </p>
      </div>
      {isError && (
        <span className={classes.error__message}>
          {getErrorMessage(errorResponse)}
        </span>
      )}
      <form className={classes.auth__form}>
        <TUITextField
          fullWidth
          isRequired
          label="Username"
          value={name}
          onChange={onNameChange}
          errorMessage={error.name ? "Username is required" : ""}
        />
        <TUITextField
          fullWidth
          isRequired
          label="Email"
          value={email}
          onChange={onEmailChange}
          errorMessage={error.email ? "Please enter a valid email" : ""}
        />
        <TUIPassword
          fullWidth
          isRequired
          label="Password"
          value={password}
          onChange={onPasswordChange}
          rules={SignUpPasswordRules}
          handleValidity={handleValidity}
        />
        <Button variant="contained" border="round" onClick={onSubmit}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
