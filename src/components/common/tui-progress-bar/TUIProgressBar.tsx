import "./TUIProgressBar.css";

interface InfiniteProgressBarProps {
  isLoading: boolean;
}

const TUIProgressBar: React.FC<InfiniteProgressBarProps> = ({ isLoading }) => {
  if (!isLoading) return <></>;
  return (
    <div className="TUIProgress__container">
      <span className="TUIProgress__content"></span>
    </div>
  );
};

export default TUIProgressBar;
