import PageHeader from '@/app/shared/page-header';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { metaObject } from '@/config/site.config';
import CreateStore from '@/app/shared/settings/stores/create-store';
import Createusers from '@/app/shared/settings/users/create-user';
import CreateUnit from '@/app/shared/settings/unites/create-unit';
import CreateSupplier from '@/app/shared/settings/suppliers/create-supplier';
import Createsalepoint from '@/app/shared/settings/sale-points/create-salePoint';

export const metadata = {
  ...metaObject('Create a Store'),
};

const pageHeader = {
  title: 'Create A sale point',
  breadcrumb: [
    {
      name: 'Settings',
    },
    {
      href: routes.eCommerce.salePoint,
      name: 'sale points',
    },
    {
      name: 'Create',
    },
  ],
};

export default function CreateCategoryPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.eCommerce.salePoint}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button tag="span" className="w-full @lg:w-auto" variant="outline">
            Cancel
          </Button>
        </Link>
      </PageHeader>
      <Createsalepoint />
    </>
  );
}
