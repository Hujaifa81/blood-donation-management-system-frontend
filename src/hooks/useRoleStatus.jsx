import React, { useEffect, useState } from 'react';
import useAuth from './useAuth';
import useTanstackGetRequest from './useTanstackGetRequest';

const useRoleStatus = () => {
  const { user, loading } = useAuth();
  const [roleLoading, setRoleLoading] = useState(true);

  const {
    data,
    isLoading: roleDataLoading,
  } = useTanstackGetRequest(
    user?.email ? `user/${user?.email}` : '',
    'user',
    user?.email,
    true
  );

  useEffect(() => {
    // Only stop loading once both auth and role are ready
    if (!loading && !roleDataLoading) {
      setRoleLoading(false);
    }
  }, [loading, roleDataLoading]);

  return {
    userRole: data?.role,
    userStatus: data?.status,
    name: data?.name,
    photo: data?.image,
    roleLoading,
  };
};

export default useRoleStatus;