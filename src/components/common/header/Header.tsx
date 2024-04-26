// components
import { CurrencyRupeeIcon } from "../../../icons"
// styles
import './Header.scss'

export const Header = () => {
    // render fns
    return <header className="header__container">
        <CurrencyRupeeIcon className='app-logo' />
        <h1 className="header__text">Income Tax Calculator</h1>
    </header>
}