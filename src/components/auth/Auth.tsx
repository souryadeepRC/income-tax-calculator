import { useEffect, useState } from "react";
// library
import { useDispatch } from "react-redux";
import { useToggle } from "triva-ui";
// components
import Login from "src/components/auth/login/Login";
import SignUp from "src/components/auth/signup/SignUp";
import { Button } from "src/components/common/CommonComponents";
// store
import { createUser, loginUser } from "src/store/auth/auth-actions";
// types
import { AuthUserType } from "src/types/auth-types";
// style
import classes from "./Auth.module.scss";

export const setFormData = (field: string, value: string) => (data: any) => {
  return {
    ...data,
    [field]: value,
  };
};
interface AuthWelcomePageProps {
  user: AuthUserType;
}
export const AuthWelcomePage: React.FC<AuthWelcomePageProps> = ({ user }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(createUser(user));
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className={classes.auth_welcome__container}>
      <h2>Welcome, {user.name}!</h2>
      <p>We are glad to have you here. Let&apos;s get started.</p>
    </div>
  );
};
const Auth: React.FC = () => {
  const [isLogin, toggleLogin] = useToggle(true);
  return (
    <div className={classes.auth__container}>
      {isLogin ? <Login /> : <SignUp />}
      <div className={classes.auth__option}>
        {isLogin ? (
          <>
            Don&apos;t have an account?&nbsp;
            <Button variant="text" onClick={toggleLogin}>
              Join us
            </Button>
          </>
        ) : (
          <>
            Already have an account?&nbsp;
            <Button variant="text" onClick={toggleLogin}>
              Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
export default Auth;
