// components
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { Header, Footer } from "src/components/common/CommonComponents";
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
