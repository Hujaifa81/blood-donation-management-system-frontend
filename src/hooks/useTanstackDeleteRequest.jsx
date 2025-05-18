import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import toast from 'react-hot-toast';

const useTanstackDeleteRequest = (invalidateQueryKey) => {
  const axiosPrivate = useAxiosSecure();
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (url) =>
      axiosPrivate.delete(url).then(res => res.data),
    onSuccess: () => {
      toast.success('Deleted successfully!');
      queryClient.invalidateQueries([invalidateQueryKey]);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  return { mutate, isPending, isSuccess, isError, error };
};

export default useTanstackDeleteRequest;
