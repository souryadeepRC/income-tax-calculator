// library
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
// store
import { selectUserName } from "src/store/auth/auth-selectors";
// styles
import classes from "./AppIntro.module.scss";

const AppIntro: React.FC = () => {
  const username = useSelector(selectUserName);
  const navigate = useNavigate();
  const onStarted = () => {
    navigate("/income");
  };
  return (
    <section className={classes.intro__container}>
      <div className={classes.intro__content}>
        <h1>Calculate Your Taxes Effortlessly</h1>
        <p>
          Use our intuitive tax calculator to easily calculate your tax
          obligations and make informed financial decisions. This is
          specifically for Salaried individuals of India.
        </p>
        {username && (
          <button onClick={onStarted}>Let&apos;s Get Started</button>
        )}
      </div>
    </section>
  );
};

export default AppIntro;
