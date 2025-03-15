import "./ErrorMessage.scss";

interface ErrorMessageProps {
  message?: string;
}
const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  const { message = "Oops! Something went wrong. Please try again." } =
    props || {};
  return <span className="error_message__text">{message}</span>;
};

export default ErrorMessage;
