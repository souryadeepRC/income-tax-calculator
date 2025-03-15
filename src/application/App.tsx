// components
import {
  Footer,
  Header,
  ScrollToTop,
} from "src/components/common/CommonComponents";
import AppContent from "./AppContent";
import { LogoutPage, FallbackPage } from "src/pages";
// hooks
import { useUserExistence } from "src/hooks";
// styles
import "./App.scss";

const App: React.FC = () => {
  const { isLoading } = useUserExistence();
  if (isLoading) return <FallbackPage />;
  return (
    <>
      <ScrollToTop />
      <LogoutPage />
      <Header />
      <AppContent />
      <Footer />
    </>
  );
};

export default App;
