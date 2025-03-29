import { useEffect } from "react";
// library
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAppTheme } from "react-web-theme";
// hooks
import { useMediaQuery } from "src/hooks";

interface AppDependencyProps {
  children: React.ReactElement;
}
const AppDependency: React.FC<AppDependencyProps> = ({ children }) => {
  const queryClient = new QueryClient();
  useMediaQuery();
  const appTheme = useAppTheme();
  useEffect(() => {
    if (appTheme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [appTheme]);
  return (
    <QueryClientProvider client={queryClient}>
      <div data-testid="app-container" data-theme={appTheme}>
        {children}
      </div>
    </QueryClientProvider>
  );
};
export default AppDependency;
