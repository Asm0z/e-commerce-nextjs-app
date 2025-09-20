'use client'
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { getCartCount } from "./app/CartActions/AddToCard.action";

export const countContext = createContext<{count:number; setCount: Dispatch<SetStateAction<number>>}>({count: 0, setCount: () => {},})

export default function CountProvider({children}:{children: React.ReactNode}){

    const [count, setCount] = useState(0)
    async function getCount(){
        try{
            const totalCount = await getCartCount();
            setCount(totalCount ?? 0);
        } catch(err){
            console.log("counter error",err)
        }
    }
    useEffect(() => {getCount()},[])
    return <countContext.Provider value={{count, setCount}}>
        {children}
    </countContext.Provider>
}
