import { useState } from "react";
import { Button } from "src/components/common/CommonComponents";
import { TUITextField } from "triva-ui";
import classes from "../Auth.module.scss";
import { setFormData } from "../Auth";

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData(setFormData("email", event.target.value));
  };
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData(setFormData("password", event.target.value));
  };
  const onSubmit = () => {
    console.log(loginData);
  };
  const { email, password } = loginData;
  return (
    <div>
      <h2>Login</h2>
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
        <Button variant="contained" border="round" onClick={onSubmit}>
          Log In
        </Button>
      </form>
    </div>
  );
};
export default Login;
