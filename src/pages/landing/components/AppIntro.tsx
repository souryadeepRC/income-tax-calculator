// library
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
// component
import { Button } from "src/components/common";
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
          <Button
            whileHover={{
              scale: 1.12,
            }}
            variant="contained"
            onClick={onStarted}
          >
            Let&apos;s Get Started
          </Button>
        )}
      </div>
    </section>
  );
};

export default AppIntro;
