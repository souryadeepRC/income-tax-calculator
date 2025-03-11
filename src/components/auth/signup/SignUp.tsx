import { useState } from "react";
import { Button } from "src/components/common/CommonComponents";
import { TUITextField } from "triva-ui";
import classes from "../Auth.module.scss";
import { setFormData } from "../Auth";

const SignUp: React.FC = () => {
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData(setFormData("username", event.target.value));
  };
  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData(setFormData("email", event.target.value));
  };
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData(setFormData("password", event.target.value));
  };
  const onSubmit = () => {
    console.log(signupData);
  };
  const { username, email, password } = signupData;
  return (
    <div>
      <h2>Join with us</h2>
      <form className={classes.auth__form}>
        <TUITextField
          fullWidth
          label="Username"
          value={username}
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
