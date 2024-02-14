'use client';
import PageHeader from '@/app/shared/page-header';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { metaObject } from '@/config/site.config';
import CreateStore from '@/app/shared/settings/stores/create-store';
import Createusers from '@/app/shared/settings/users/create-user';
import CreateUnit from '@/app/shared/settings/unites/create-unit';
import CreateSupplier from '@/app/shared/settings/suppliers/create-supplier';
import { useRouter } from 'next/navigation';
import { useGetOnesuppliersHook } from '@/Apis/suppliers';

const pageHeader = {
  title: 'Edit A Supplier',
  breadcrumb: [
    {
      name: 'Settings',
    },
    {
      href: routes.eCommerce.suppliers,
      name: 'supplierer',
    },
    {
      name: 'Edit',
    },
  ],
};

export default function CreateCategoryPage({ params }: any) {
  const { id } = params;
  const { data, isLoading: isLoadingSupplier } = id
    ? useGetOnesuppliersHook(id)
    : { data: null, isLoading: false };
  console.log(data?.data);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.eCommerce.suppliers}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button tag="span" className="w-full @lg:w-auto" variant="outline">
            Cancel
          </Button>
        </Link>
      </PageHeader>
      {isLoadingSupplier ? (
        <div></div>
      ) : (
        <CreateSupplier type="edit" id={id} Supplier={data?.data} />
      )}
    </>
  );
}
