// library
import { useToggle } from "triva-ui";
// components
import { Button, Modal } from "src/components/common";
// constants
import { TAX_SLAB } from "src/constants/tax-constants";
// types
import { TaxSlabType } from "src/types/tax-types";
// style
import classes from "./TaxRegimeBreakup.module.scss";

interface TaxSlabViewProps {
  type: string;
}
const TaxSlabView: React.FC<TaxSlabViewProps> = ({ type }) => {
  const [isVisible, toggleVisibility] = useToggle(false);
  const taxSlab: TaxSlabType[] = TAX_SLAB[type];
  return (
    <div className={classes.tax_slab__container}>
      {isVisible && (
        <Modal onClose={toggleVisibility}>
          <div className={classes.tax_slab_item__container}>
            <h4>Income Tax Slabs for {type} Tax Regime </h4>
            <ul>
              {taxSlab?.map((slab, index) => (
                <li key={index}>
                  <span>{slab.label}</span>
                  <span>{slab.taxRate}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      )}
      <Button variant="text" border="oval" onClick={toggleVisibility}>
        Show SLAB
      </Button>
    </div>
  );
};
export default TaxSlabView;
