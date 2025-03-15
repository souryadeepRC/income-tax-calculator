// components
import AppIntro from "../landing/components/AppIntro";
import Features from "../landing/components/Features";
// styles
import classes from "./FallbackPage.module.scss";

const FallbackPage: React.FC = () => {
  return (
    <>
      <header className={classes.fallback__header}>
        <span>TAX CALCULATOR</span>
      </header>
      <AppIntro />
      <Features />
    </>
  );
};
export default FallbackPage;
