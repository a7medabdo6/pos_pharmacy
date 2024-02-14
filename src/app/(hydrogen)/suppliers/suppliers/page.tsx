'use client';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import React from 'react';
import { Button } from 'rizzui';
import Link from 'next/link';
import OrdersTable from './table';
import ExportButton from '@/app/shared/export-button';
import { orderData } from '@/data/order-data';
import { PiPlusBold } from 'react-icons/pi';
import { useGetAllSupplierssHook } from '@/Apis/suppliers';
const pageHeader = {
  title: 'Supplier',
  breadcrumb: [
    {
      name: 'Supplieres',
    },
  ],
};
export function Stores() {
  const { data, isLoading } = useGetAllSupplierssHook();
  console.log(data, 'data');

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={orderData}
            fileName="order_data"
            header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
          />
          <Link
            href={routes.eCommerce.suppliersCreate}
            className="w-full @lg:w-auto"
          >
            <Button
              tag="span"
              className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Supplier
            </Button>
          </Link>
        </div>
      </PageHeader>
      {!isLoading && <OrdersTable data={data?.data} />}
    </>
  );
}

export default Stores;
