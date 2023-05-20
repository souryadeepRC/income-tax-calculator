// components
import { Footer } from "../footer/Footer"
import { Header } from "../header/Header"

export const PrivateLayout = ({ children }: any) => {
    return (<>
        <Header />
        {children}
        <Footer />
    </>)
}