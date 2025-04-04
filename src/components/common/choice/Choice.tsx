// styles
import "./Choice.scss";

type Option = {
  label: string;
  value: string;
  isDisabled?: boolean;
};
interface ChoiceProps {
  options: Option[];
  selectedOption: string;
  onChoice: (selectedValue: string) => void;
}

const Choice: React.FC<ChoiceProps> = (props) => {
  const { options, selectedOption, onChoice } = props;

  const onOptionClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    onChoice((event.target as HTMLElement).id);
  };

  return (
    <div className="form_group__container">
      <h4 className="group__header">Income Group</h4>
      <div className="group__options">
        {options.map((option: Option) => {
          const isSelected: boolean = option.value === selectedOption;
          return (
            <button
              key={option.value}
              tabIndex={0}
              id={option.value}
              disabled={option?.isDisabled}
              className={`group__option ${isSelected ? "selected" : ""}`}
              onClick={onOptionClick}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default Choice;
