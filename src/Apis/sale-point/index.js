import { useMutation, useQuery, useQueryClient } from 'react-query';
import { api } from '../axios';
import qs from 'qs';
import toast from 'react-hot-toast';

const getAllSalepoints = async (data, search, filters) => {
  const queryString = qs.stringify({ ...filters });

  return await api.get(
    `sale-point/?${queryString}`.concat(search ? `find=${search}&` : ``),
    data && {
      headers: {
        'Accept-Language': data,
      },
    }
  );
};

const getOneSalepoint = async (data, search, filters) => {
  return await api.get(
    `sale-point/${filters?.id}?`.concat(search ? `find=${search}&` : ``),
    data && {
      headers: {
        'Accept-Language': data,
      },
    }
  );
};
const CreateSalepoint = async (data) => {
  return await api.patch(`sale-point/create`, data);
};

const DeleteSalepoint = async (data) => {
  return await api.delete(`sale-point/${data.id}`);
};

const useGetAllSalepointssHook = (search, filters) => {
  return useQuery(
    ['Salepointes', search, filters],
    () => getAllSalepoints(search, filters),

    {
      // staleTime: Infinity,
      onSuccess: (res) => {
        const result = {
          status: res.status + '-' + res.statusText,
          headers: res.headers,
          data: res.data,
        };
      },
      onError: (err) => {},
    }
  );
};

const useGetOneSalepointsHook = (search, filters) => {
  return useQuery(
    ['onesalepoint', search, filters],
    () => getOneSalepoint(search, filters),

    {
      // staleTime: Infinity,
      onSuccess: (res) => {
        const result = {
          status: res.status + '-' + res.statusText,
          headers: res.headers,
          data: res.data,
        };
      },
      onError: (err) => {},
    }
  );
};

const useCreateSalepointHook = () => {
  return useMutation(CreateSalepoint, {
    onSuccess: (res) => {
      const result = {
        status: res.status + '-' + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      toast.success('Salepoint successfully created');
      return result.data;
    },
    onError: (err) => {
      console.log(err);
      toast.error(`${err.message}`);
    },
  });
};
const useDeleteSalepointHook = () => {
  const QueryClient = useQueryClient();
  return useMutation(DeleteSalepoint, {
    onSuccess: (res) => {
      const result = {
        status: res.status + '-' + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      QueryClient.invalidateQueries('Salepointes');
      return result.data;
    },
    onError: (err) => {},
  });
};

export {
  useGetAllSalepointssHook,
  useCreateSalepointHook,
  useDeleteSalepointHook,
  useGetOneSalepointsHook,
};
