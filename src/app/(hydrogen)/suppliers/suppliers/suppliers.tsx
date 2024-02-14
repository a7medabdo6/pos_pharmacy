'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Title, Text } from '@/components/ui/text';
import { Tooltip } from '@/components/ui/tooltip';
import { ActionIcon } from '@/components/ui/action-icon';
import { routes } from '@/config/routes';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import TableAvatar from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';

function getStatusBadge(status: string) {
  switch (status?.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'completed':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    case 'cancelled':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">{status}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

type Columns = {
  sortConfig?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
};

export const getColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
}: Columns) => [
  {
    title: (
      <HeaderCell title="Order ID" className="ps-4 [&>div]:whitespace-nowrap" />
    ),
    dataIndex: 'id',
    key: 'id',
    width: 90,
    render: (value: string, row: any) => (
      <Link
        href={routes.eCommerce.editOrder(row.id)}
        className="ps-4 hover:text-gray-900 hover:underline"
      >
        #{value}
      </Link>
    ),
  },
  {
    title: <HeaderCell title="Name Ar" />,
    dataIndex: 'nameAr',
    key: 'nameAr',
    width: 300,
    hidden: 'nameAr',
    render: (_: any, row: any) => (
      <TableAvatar
        src={row?.avatar}
        name={row.nameAr}
        description={row?.email?.toLowerCase()}
      />
    ),
  },
  {
    title: <HeaderCell title="name En" />,
    dataIndex: 'nameEn',
    key: 'nameEn',
    width: 150,
    render: (_: any, row: any) => (
      <Text className="font-medium text-gray-700">{row.nameEn}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Code"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'code'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('code'),
    dataIndex: 'code',
    key: 'code',
    width: 150,
    render: (_: any, row: any) => (
      <Text className="font-medium text-gray-700">{row.code}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Charge"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'charge'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('charge'),
    dataIndex: 'charge',
    key: 'charge',
    width: 150,
    render: (_: any, row: any) => (
      <Text className="font-medium text-gray-700">{row.charge}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="phone"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'phone'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('phone'),
    dataIndex: 'phone',
    key: 'phone',
    width: 200,
    render: (_: any, row: any) => (
      <Text className="font-medium text-gray-700">{row.phone}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="address"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'address'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('address'),
    dataIndex: 'address',
    key: 'address',
    width: 200,
    render: (_: any, row: any) => (
      <Text className="font-medium text-gray-700">{row.address}</Text>
    ),
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'state',
    key: 'state',
    width: 140,
    render: (_: any, row: any) => getStatusBadge(row.state),
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={() => 'Edit Order'}
          placement="top"
          color="invert"
        >
          <Link href={routes.eCommerce.editOrder(row.id)}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              className="hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={() => 'View Order'}
          placement="top"
          color="invert"
        >
          <Link href={routes.eCommerce.orderDetails(row.id)}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              className="hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the order`}
          description={`Are you sure you want to delete this #${row.id} order?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];

export const getWidgetColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
}: Columns) => [
  {
    title: (
      <HeaderCell title="Order ID" className="ps-4 [&>div]:whitespace-nowrap" />
    ),
    dataIndex: 'id',
    key: 'id',
    width: 90,
    render: (value: string, row: any) => (
      <Link
        href={routes.eCommerce.editOrder(row.id)}
        className="ps-4 hover:text-gray-900 hover:underline"
      >
        #{value}
      </Link>
    ),
  },
  {
    title: <HeaderCell title="Name Ar" />,
    dataIndex: 'nameAr',
    key: 'nameAr',
    width: 300,
    hidden: 'nameAr',
    render: (_: any, row: any) => (
      <TableAvatar
        src={row.avatar}
        name={row.nameAr}
        description={row.email.toLowerCase()}
      />
    ),
  },
  {
    title: <HeaderCell title="nameEn" />,
    dataIndex: 'nameEn',
    key: 'nameEn',
    width: 150,
    render: (row: any) => (
      <Text className="font-medium text-gray-700">{row.nameEn}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Charge"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'charge'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('charge'),
    dataIndex: 'charge',
    key: 'charge',
    width: 150,
    render: (_: any, row: any) => (
      <Text className="font-medium text-gray-700">${row.charge}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="phone"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'phone'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('phone'),
    dataIndex: 'phone',
    key: 'phone',
    width: 200,
    render: (_: any, row: any) => (
      <Text className="font-medium text-gray-700">${row.phone}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="address"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'address'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('address'),
    dataIndex: 'address',
    key: 'address',
    width: 200,
    render: (_: any, row: any) => (
      <Text className="font-medium text-gray-700">${row.address}</Text>
    ),
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'state',
    key: 'state',
    width: 140,
    render: (_: any, row: any) => getStatusBadge(row.state),
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={() => 'Edit Order'}
          placement="top"
          color="invert"
        >
          <Link href={routes.eCommerce.editOrder(row.id)}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              aria-label={'Edit Order'}
              className="hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={() => 'View Order'}
          placement="top"
          color="invert"
        >
          <Link href={routes.eCommerce.orderDetails(row.id)}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              aria-label={'View Order'}
              className="hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the order`}
          description={`Are you sure you want to delete this #${row.id} order?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];
