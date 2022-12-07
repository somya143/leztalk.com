import React from 'react';
import { useSelector} from "react-redux";
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
const auth = useSelector((store) => store.auth);


if(auth){
    return children;
}else{
    return (
        <Navigate to="/login" />
    )
}

}

export default PrivateRoute