// hooks/useUpazilaDistrict.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useUpazilaDistrict = () => {
  const { data: upazilas = [] } = useQuery({
    queryKey: ['upazilas'],
    queryFn: async () => {
      const res = await axios.get('/upazilas.json');
      return res.data;
    }
  });

  const { data: districts = [] } = useQuery({
    queryKey: ['districts'],
    queryFn: async () => {
      const res = await axios.get('/districts.json');
      return res.data;
    }
  });

  return { upazilas, districts };
};

export default useUpazilaDistrict;
