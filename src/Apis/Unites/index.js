import { useMutation, useQuery, useQueryClient } from 'react-query';
import { api } from '../axios';
import qs from 'qs';
import toast from 'react-hot-toast';

const getAllUnites = async (data, search, filters) => {
  const queryString = qs.stringify({ ...filters });

  return await api.get(
    `units/?${queryString}`.concat(search ? `find=${search}&` : ``),
    data && {
      headers: {
        'Accept-Language': data,
      },
    }
  );
};
const getAllReportsactivity = async (data, search, filters) => {
  const queryString = qs.stringify(filters);

  return await api.get(
    `reports/orders-activity/?${queryString}`.concat(
      search ? `find=${search}&` : ``
    ),
    data && {
      headers: {
        'Accept-Language': data,
      },
    }
  );
};
const gettopproducts = async (data, search, filters) => {
  return await api.get(
    `reports/top-products/?`.concat(
      search ? `find=${search}&` : ``,
      filters?.create_at_before
        ? `create_at_before=${filters?.create_at_before}&`
        : ``,
      filters?.create_at_after
        ? `create_at_after=${filters?.create_at_after}&`
        : ``,
      filters?.active == 'true' ? `is_closed=${false}&` : ``,
      filters?.active == 'false' ? `is_closed=${true}&` : ``,
      filters?.active == 'all' ? `` : ``,

      filters?.branch ? `branch_id=${filters?.branch}&` : ``,
      filters?.table ? `table_id=${filters?.table}&` : ``,
      filters?.page ? `page=${filters?.page}&` : ``,
      filters?.interval ? `interval=${filters?.interval}&` : ``,

      filters?.page_size ? `page_size=${filters?.page_size}&` : ``
    ),
    data && {
      headers: {
        'Accept-Language': data,
      },
    }
  );
};
const gettoptables = async (data, search, filters) => {
  const queryString = qs.stringify(filters);

  return await api.get(
    `reports/top-tables/?${queryString}`.concat(
      search ? `find=${search}&` : ``
    ),
    data && {
      headers: {
        'Accept-Language': data,
      },
    }
  );
};
const gettopareas = async (data, search, filters) => {
  return await api.get(
    `reports/top-areas/?`.concat(
      search ? `find=${search}&` : ``,
      filters?.create_at_before
        ? `create_at_before=${filters?.create_at_before}&`
        : ``,
      filters?.create_at_after
        ? `create_at_after=${filters?.create_at_after}&`
        : ``,
      filters?.active == 'true' ? `is_closed=${false}&` : ``,
      filters?.active == 'false' ? `is_closed=${true}&` : ``,
      filters?.active == 'all' ? `` : ``,

      filters?.branch ? `branch_id=${filters?.branch}&` : ``,
      filters?.table ? `table_id=${filters?.table}&` : ``,
      filters?.page ? `page=${filters?.page}&` : ``,
      filters?.interval ? `interval=${filters?.interval}&` : ``,

      filters?.page_size ? `page_size=${filters?.page_size}&` : ``
    ),
    data && {
      headers: {
        'Accept-Language': data,
      },
    }
  );
};

const getAllReportsdeliveryFees = async (data, search, filters) => {
  const queryString = qs.stringify(filters);

  return await api.get(
    `reports/delivery-fees/?${queryString}`.concat(
      search ? `find=${search}&` : ``
    ),
    data && {
      headers: {
        'Accept-Language': data,
      },
    }
  );
};

const getAllReportsLists = async (data, search, filters) => {
  return await api.get(
    `reports/reports-list/?`.concat(
      search ? `find=${search}&` : ``,
      filters?.create_at_before
        ? `create_at_before=${filters?.create_at_before}&`
        : ``,
      filters?.create_at_after
        ? `create_at_after=${filters?.create_at_after}&`
        : ``,
      filters?.active == 'true' ? `is_closed=${false}&` : ``,
      filters?.active == 'false' ? `is_closed=${true}&` : ``,
      filters?.active == 'all' ? `` : ``,
      filters?.interval ? `interval=${filters?.interval}&` : ``,

      filters?.branch ? `branch_id=${filters?.branch}&` : ``,
      filters?.table ? `table_id=${filters?.table}&` : ``,
      filters?.page ? `page=${filters?.page}&` : ``,
      filters?.page_size ? `page_size=${filters?.page_size}&` : ``
    ),
    data && {
      headers: {
        'Accept-Language': data,
      },
    }
  );
};
const getOneReports = async (data, search, filters) => {
  return await api.get(
    `reports/orders/${filters?.id}?`.concat(
      search ? `find=${search}&` : ``,
      filters?.create_at_before
        ? `create_at_before=${filters?.create_at_before}&`
        : ``,
      filters?.create_at_after
        ? `create_at_after=${filters?.create_at_after}&`
        : ``,
      filters?.active == 'true' ? `is_closed=${false}&` : ``,
      filters?.active == 'false' ? `is_closed=${true}&` : ``,
      filters?.active == 'all' ? `` : ``,

      filters?.branch ? `branch_id=${filters?.branch}&` : ``,
      filters?.table ? `table_id=${filters?.table}&` : ``,
      filters?.page ? `page=${filters?.page}&` : ``,
      filters?.page_size ? `page_size=${filters?.page_size}&` : ``
    ),
    data && {
      headers: {
        'Accept-Language': data,
      },
    }
  );
};
const CreateUnit = async (data) => {
  return await api.patch(`units/create`, data);
};
const getKitchenOrders = async (lang) => {
  return await api.get(`tables/orders/kitchen/`, {
    headers: {
      'Accept-Language': lang,
    },
  });
};

const DeleteOrder = async (data) => {
  return await api.delete(`tables/orders/${data.id}`);
};

const useGetAllUnitessHook = (search, filters) => {
  return useQuery(
    ['unites', search, filters],
    () => getAllUnites(search, filters),

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
const useGetAllReportsActivitysHook = (search, filters) => {
  return useQuery(
    ['allReportsactivity', search, filters],
    () => getAllReportsactivity(search, filters),

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
const useGetTopSellingProductsHook = (search, filters) => {
  return useQuery(
    ['allReportssellingactivity', search, filters],
    () => gettopproducts(search, filters),

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
const useGetTopTablesHook = (search, filters) => {
  return useQuery(
    ['getTopTablesHook', search, filters],
    () => gettoptables(search, filters),

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
const useGetTopAreasHook = (search, filters) => {
  return useQuery(
    ['getTopAreasHook', search, filters],
    () => gettopareas(search, filters),

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
const useGetAllReportsDeliveryFeesHook = (search, filters) => {
  return useQuery(
    ['allReportsdeliveryFees', search, filters],
    () => getAllReportsdeliveryFees(search, filters),

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

const useGetAllReportsListsHook = (search, filters) => {
  return useQuery(
    ['allReportslist', search, filters],
    () => getAllReportsLists(search, filters),

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
const useGetOneReportssHook = (search, filters) => {
  return useQuery(
    ['oneReport', search, filters],
    () => getOneReports(search, filters),

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

const useGetKitchenOrders = () => {
  return useQuery(['KitchenOrders'], () => getKitchenOrders());
};

const useCreateUnitHook = () => {
  return useMutation(CreateUnit, {
    onSuccess: (res) => {
      const result = {
        status: res.status + '-' + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      toast.success('Unit successfully created');
      return result.data;
    },
    onError: (err) => {
      console.log(err);
      toast.error(`${err.message}`);
    },
  });
};
const useDeleteOrderHook = () => {
  const QueryClient = useQueryClient();
  return useMutation(DeleteOrder, {
    onSuccess: (res) => {
      const result = {
        status: res.status + '-' + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      QueryClient.invalidateQueries('allOrders');
      return result.data;
    },
    onError: (err) => {},
  });
};

export {
  useGetAllUnitessHook,
  useCreateUnitHook,
  useDeleteOrderHook,
  useGetKitchenOrders,
  useGetOneReportssHook,
  useGetAllReportsListsHook,
  useGetAllReportsActivitysHook,
  useGetAllReportsDeliveryFeesHook,
  useGetTopSellingProductsHook,
  useGetTopTablesHook,
  useGetTopAreasHook,
};
