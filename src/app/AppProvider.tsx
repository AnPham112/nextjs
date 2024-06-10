"use client";

import { clientSessionToken } from "@/lib/http";
import { useState } from "react";

// import { ReactNode, createContext, useContext, useState } from "react";

// const AppContext = createContext({
//   sessionToken: '',
//   setSessionToken: (sessionToken: string) => {}
// })

// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if(!context) {
//     throw new Error('useAppContext must be used within an AppProvider')
//   }
//   return context
// }

// export default function AppProvider({children, initialSessionToken = ''}: {children: ReactNode, initialSessionToken?: string}) {
//   const [sessionToken, setSessionToken] = useState(initialSessionToken);
//   return (
//     <AppContext.Provider value={{sessionToken, setSessionToken}}>
//       {children}
//     </AppContext.Provider>
//   )
// }

export default function AppProvider({
  children,
  initialSessionToken = "",
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
}) {
  // useLayoutEffect(() => {
  //   clientSessionToken.value = initialSessionToken
  // }, [initialSessionToken])

  useState(() => {
    if(typeof window !== "undefined") {
      clientSessionToken.value = initialSessionToken
    }
  })

  return <>{children}</>;
}
