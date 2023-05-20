// components
import { IncomeItem } from "../common/income-item/IncomeItem"

export const IncomeDetails = () => {
    return <div>
        <IncomeItem
            label='Salary Income'
            subLabel=' (excluding Provident Fund)'
            amount='10000000'
        />
    </div>
}