import React from 'react';
import useRoleStatus from '../hooks/useRoleStatus';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loading from './Loading';

const AdminOrVolunteerPrivateRoute = ({children}) => {
    const {userStatus, userRole} = useRoleStatus()
    const {loading,user}=useAuth()
    
    if(loading){
        return <Loading></Loading>
    }
    if(!user){
        return <Navigate to='/sign-in' ></Navigate>
    }
    if(userRole!=='volunteer' && userRole!=='admin')
    {
        return <Navigate to='/dashboard' ></Navigate>
    }
    return (
        <div>
            {
                children
            }
        </div>
    );
};

    


export default AdminOrVolunteerPrivateRoute;