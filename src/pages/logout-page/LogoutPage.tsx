import { useEffect } from "react";
// library
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
// components
import {
  Modal,
  Button,
  InfiniteProgressBar,
  ErrorMessage,
} from "src/components/common";
// service
import authService from "src/service/Auth";
// store
import { logoutUser, setLogoutActive } from "src/store/auth/auth-reducer";
import { selectIsLogoutActive } from "src/store/auth/auth-selectors";
// styles
import classes from "./LogoutPage.module.scss";

const LogoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const isLogoutActive: boolean = useSelector(selectIsLogoutActive);
  const { mutate, isSuccess, isPending, isError } = useMutation({
    mutationFn: () => authService.logout(),
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(logoutUser());
    }
  }, [isSuccess, isPending]);
  const onCancel = () => {
    dispatch(setLogoutActive(false));
  };

  const onLogout = () => {
    mutate();
  };
  if (!isLogoutActive) return <></>;
  return (
    <Modal onClose={onCancel}>
      <div className={classes.logout__container}>
        <InfiniteProgressBar isLoading={isPending} />
        {isError && <ErrorMessage />}
        <div className={classes.logout__message}>
          <h1>Are you sure you want to logout?</h1>
        </div>
        <div className={classes.action__buttons}>
          <Button
            variant="contained"
            border="round"
            className="btn-home"
            onClick={onLogout}
          >
            Yes,&nbsp;Logout
          </Button>
          <Button variant="text" className="btn-login" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default LogoutPage;
