import React, {useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({Children}) => {
    const[test, setTest] = useState('Test value');
    return(
       <AuthContext.Provider value={{test}}>
        {Children}
        </AuthContext.Provider>
    );
}