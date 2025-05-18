import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import toast from 'react-hot-toast';

const useTanstackPatch = (invalidateQueryKey) => {
  const axiosPrivate = useAxiosSecure();
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async ({ url, data }) => {
      const res = await axiosPrivate.patch(url, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Data updated successfully!');
      queryClient.invalidateQueries([invalidateQueryKey]);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  return { mutate, isPending, isSuccess, isError, error };
};

export default useTanstackPatch;
