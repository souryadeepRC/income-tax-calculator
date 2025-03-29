import "./InfiniteProgressBar.css";

interface InfiniteProgressBarProps {
  isLoading: boolean;
}

const InfiniteProgressBar: React.FC<InfiniteProgressBarProps> = ({
  isLoading,
}) => {
  if (!isLoading) return <></>;
  return (
    <div className="progress__container">
      <span className="progress__content"></span>
    </div>
  );
};

export default InfiniteProgressBar;
