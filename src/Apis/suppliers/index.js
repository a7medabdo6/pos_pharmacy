import { useMutation, useQuery, useQueryClient } from 'react-query';
import { api } from '../axios';
import qs from 'qs';
import toast from 'react-hot-toast';

const getAllsuppliers = async (data, search, filters) => {
  const queryString = qs.stringify({ ...filters });

  return await api.get(
    `suppliers/?${queryString}`.concat(search ? `find=${search}&` : ``),
    data && {
      headers: {
        'Accept-Language': data,
      },
    }
  );
};

const getOnesupplier = async (data, search, filters) => {
  console.log(data);
  return await api.get(
    `suppliers/${data}`,
    data && {
      headers: {
        'Accept-Language': data,
      },
    }
  );
};
const Createsupplier = async (data) => {
  return await api.post(`suppliers/create`, data);
};
const Updatedsupplier = async (data) => {
  return await api.put(`suppliers/${data?.id}`, data);
};

const Deletesupplier = async (data) => {
  return await api.delete(`suppliers/${data.id}`);
};

const useGetAllSupplierssHook = (search, filters) => {
  return useQuery(
    ['suppliers', search, filters],
    () => getAllsuppliers(search, filters),

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

const useGetOnesuppliersHook = (search, filters) => {
  return useQuery(
    ['onesupplier', search, filters],
    () => getOnesupplier(search, filters),

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

const useCreatesupplierHook = () => {
  return useMutation(Createsupplier, {
    onSuccess: (res) => {
      const result = {
        status: res.status + '-' + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      toast.success('supplier successfully created');
      return result.data;
    },
    onError: (err) => {
      console.log(err);
      toast.error(`${err.message}`);
    },
  });
};
const useEditupplierHook = () => {
  return useMutation(Updatedsupplier, {
    onSuccess: (res) => {
      const result = {
        status: res.status + '-' + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      toast.success('supplier successfully Updated');
      return result.data;
    },
    onError: (err) => {
      console.log(err);
      toast.error(`${err.message}`);
    },
  });
};
const useDeletesupplierHook = () => {
  const QueryClient = useQueryClient();
  return useMutation(Deletesupplier, {
    onSuccess: (res) => {
      const result = {
        status: res.status + '-' + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      QueryClient.invalidateQueries('suppliers');
      return result.data;
    },
    onError: (err) => {},
  });
};

export {
  useGetAllSupplierssHook,
  useCreatesupplierHook,
  useDeletesupplierHook,
  useGetOnesuppliersHook,
  useEditupplierHook,
};
