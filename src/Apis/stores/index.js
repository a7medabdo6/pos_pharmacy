import { useMutation, useQuery, useQueryClient } from 'react-query';
import { api } from '../axios';
import qs from 'qs';
import toast from 'react-hot-toast';

const getAllStores = async (data, search, filters) => {
  const queryString = qs.stringify({ ...filters });

  return await api.get(
    `stores/?${queryString}`.concat(search ? `find=${search}&` : ``),
    data && {
      headers: {
        'Accept-Language': data,
      },
    }
  );
};

const getOneStore = async (data, search, filters) => {
  return await api.get(
    `stores/${filters?.id}?`.concat(search ? `find=${search}&` : ``),
    data && {
      headers: {
        'Accept-Language': data,
      },
    }
  );
};
const CreateStore = async (data) => {
  return await api.patch(`stores/create`, data);
};

const DeleteStore = async (data) => {
  return await api.delete(`stores/${data.id}`);
};

const useGetAllStoressHook = (search, filters) => {
  return useQuery(
    ['Stores', search, filters],
    () => getAllStores(search, filters),

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

const useGetOneStoresHook = (search, filters) => {
  return useQuery(
    ['oneStore', search, filters],
    () => getOneStore(search, filters),

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

const useCreateStoreHook = () => {
  return useMutation(CreateStore, {
    onSuccess: (res) => {
      const result = {
        status: res.status + '-' + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      toast.success('Store successfully created');
      return result.data;
    },
    onError: (err) => {
      console.log(err);
      toast.error(`${err.message}`);
    },
  });
};
const useDeleteStoreHook = () => {
  const QueryClient = useQueryClient();
  return useMutation(DeleteStore, {
    onSuccess: (res) => {
      const result = {
        status: res.status + '-' + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      QueryClient.invalidateQueries('Stores');
      return result.data;
    },
    onError: (err) => {},
  });
};

export {
  useGetAllStoressHook,
  useCreateStoreHook,
  useDeleteStoreHook,
  useGetOneStoresHook,
};
