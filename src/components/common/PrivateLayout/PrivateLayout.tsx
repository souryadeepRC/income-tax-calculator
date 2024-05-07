// components
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";

export const PrivateLayout = ({ children }: any) => {
  useMediaQuery();
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
