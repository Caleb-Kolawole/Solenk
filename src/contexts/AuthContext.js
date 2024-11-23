import { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        
          onSnapshot(
            doc(db, "users", user.uid),
            (snap) =>  {
              setUserProfile(snap.data());
              user.getIdTokenResult().then((idTokenResult) => {
                // console.log(idTokenResult.claims)
                if (idTokenResult.claims.admin === true) {
                  setUserProfile((previousState) => {
                    return {
                      ...previousState,
                      role: "admin",
                    };
                  });
                } else if (idTokenResult.claims.employee === true) {
                  setUserProfile((previousState) => {
                    return {
                      ...previousState,
                      role: "employee",
                    };
                  });
                } else {
                  setUserProfile((previousState) => {
                    return {
                      ...previousState,
                      role: "customer",
                    };
                  });
                }
              });
            }
          );
      
       
      } else {
        // User is signed out
        console.log("User is signed out");
        setUser(null);
        setUserProfile(null);
      }
    });
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, userProfile, setUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}
