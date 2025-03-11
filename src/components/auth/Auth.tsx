import { useToggle } from "triva-ui";
import Login from "src/components/auth/login/Login";
import SignUp from "src/components/auth/signup/SignUp";
import { Button } from "src/components/common/CommonComponents";
import classes from "./Auth.module.scss";

export const setFormData = (field: string, value: string) => (data: any) => {
  return {
    ...data,
    [field]: value,
  };
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
