//Burada  aEPETE EKLE DEDİKTENSONRA AÇILACAK EKRANLAR BURADAN AYARLANACAK
import { createContext, useState } from "react";

export const UIContext = createContext();

export function UIContextProvider({children}) {

    const [uiProgress, setUIProgress] = useState("")

    const showCart = () => {
        setUIProgress("cart")
    }

    const hideCart = () => {
        setUIProgress("")
    }
    const showCheckout = () => {
        setUIProgress("checkout")
    }

    const hideCheckout = () => {
        setUIProgress("")
    }

    const uiProgressContext = {
        uiProgress, showCart, hideCart, showCheckout, hideCheckout
    }

    return(
        <UIContext.Provider value = {uiProgressContext}>
            {children}
        </UIContext.Provider>
    )
}