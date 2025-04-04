import { useSelector } from "react-redux";
// components
import AppIntro from "./components/AppIntro";
import Features from "./components/Features";
import Footer from "src/components/footer/Footer";
import { Modal } from "src/components/common";
// store
import {
  selectIsDataLoading,
  selectUserName,
} from "src/store/auth/auth-selectors";
// style
import classes from "./LandingPage.module.scss";

const WelcomeModal = () => {
  const username: string = useSelector(selectUserName);
  if (!username) return <></>;
  return (
    <Modal onClose={() => {}}>
      <div className={classes.welcome__container}>
        <h2>Welcome, {username}!</h2>
        <p>We are glad to have you here. Let&apos;s get started.</p>
      </div>
    </Modal>
  );
};
const LandingPage: React.FC = () => {
  const isUserDataLoading: boolean = useSelector(selectIsDataLoading);
  return (
    <>
      {isUserDataLoading && <WelcomeModal />}
      <AppIntro />
      <Features />
      <Footer />
    </>
  );
};

export default LandingPage;
