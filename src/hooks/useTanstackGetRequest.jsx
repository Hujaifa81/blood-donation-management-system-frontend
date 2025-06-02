import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { useAxios } from './useAxios';

const useTanstackGetRequest = (url, queryKey, dependency = false, privateAxios = false) => {
  
  const axiosPublic = useAxios();
  
  const axiosPrivate = useAxiosSecure();

  const axiosInstance = privateAxios ? axiosPrivate : axiosPublic;

  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
  
    queryKey: dependency ? [queryKey, dependency] : [queryKey],
    queryFn: async () => {
      const res = await axiosInstance.get(url);
      return res.data;
    },
    enabled: dependency !== false,
  });

  return { data, isLoading, isError, error, refetch };
};

export default useTanstackGetRequest;
