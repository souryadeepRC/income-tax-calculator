
// components
import { useState } from 'react'
import { EditIcon, SaveIcon } from '../../../../icons'
import { Input } from '../../../../library'
// styles 
import './IncomeItem.scss'
interface IncomeItemProps {
    label: string
    subLabel?: string
    amount: string
}
export const IncomeItem = ({ label, subLabel, amount }: IncomeItemProps) => {

    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [income, setIncome] = useState<string>(amount);

    // event fns
    const onIncomeChange = (e: any) => {
        setIncome(e.target.value)
    }
    return (
        <div className='income-item__container'>
            <div className='income-item__header'>
                <span className='header-text'>{label}</span>
                <span className='header-sub-text'>{subLabel}</span>
            </div>
            <div className='amount__container'>
                <span>Rs.</span>
                {isEditMode ?
                    <div className='amount-edit'>
                        <Input value={income} onChange={onIncomeChange} />
                        <SaveIcon className='save-icon' onClick={() => setIsEditMode(false)} />
                    </div> :
                    <div className='amount-view'>
                        <span>{income}</span>
                        <EditIcon className='edit-icon' onClick={() => setIsEditMode(true)} />
                    </div>
                }


            </div>
        </div>)
}