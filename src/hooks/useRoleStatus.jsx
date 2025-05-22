import React from 'react';
import useAuth from './useAuth';
import useTanstackGetRequest from './useTanstackGetRequest';

const useRoleStatus = () => {
    const {user}= useAuth()
    const {data}=useTanstackGetRequest(`user/${user?.email}`,'user',`${user?.email}`,true)
    return {userRole:data?.role,userStatus:data?.status,name:data?.name,photo:data?.image}
};

export default useRoleStatus;