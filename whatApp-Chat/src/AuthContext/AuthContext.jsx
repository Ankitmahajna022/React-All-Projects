// import { createContext, useContext, useEffect, useState } from "react"
// import { onAuthStateChanged } from "firebase/auth"
// import { auth } from "../firebase/firebase"


// const AuthContext = createContext()


// export function AuthProvider({ childer }) {
//     const [user, setUser] = useState(null);
//     const [loding, setLoding] = useState(true);


//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             setUser(user)
//             setLoding(false)
//         })
//         return () => unsubscribe();

//     }, [])

//     return (
//         <AuthContext.Provider value={{ user }}>
//             {!loding && childer}
//         </AuthContext.Provider>
//     )
// }

// export default useAuth = () => useContext(AuthContext);

