// library
import { Toaster } from "sonner";
// components
import { ScrollToTop } from "src/components/common";
import Header from "src/components/header/Header";
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
      <Toaster position="top-right" richColors />
      <ScrollToTop />
      <LogoutPage />
      <Header />
      <AppContent />
    </>
  );
};

export default App;
