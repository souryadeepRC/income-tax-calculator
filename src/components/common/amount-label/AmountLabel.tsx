// style
import "./AmountLabel.scss";

interface AmountLabelProps {
  label?: string;
  amount: string;
}
const AmountLabel: React.FC<AmountLabelProps> = ({ label = "Rs.", amount }) => {
  return (
    <div className="amount_label__container">
      <span className="label">{label}</span>
      <span className="amount">{amount}</span>
    </div>
  );
};
export default AmountLabel;
