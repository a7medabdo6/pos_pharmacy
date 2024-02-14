'use client';

import PageHeader from '@/app/shared/page-header';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { metaObject } from '@/config/site.config';
import CreateStore from '@/app/shared/settings/stores/create-store';
import Createusers from '@/app/shared/settings/users/create-user';
import CreateUnit from '@/app/shared/settings/unites/create-unit';

const pageHeader = {
  title: 'Create A Unit',
  breadcrumb: [
    {
      name: 'Settings',
    },
    {
      href: routes.eCommerce.unit,
      name: 'Unites',
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
          href={routes.eCommerce.unit}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button tag="span" className="w-full @lg:w-auto" variant="outline">
            Cancel
          </Button>
        </Link>
      </PageHeader>
      <CreateUnit />
    </>
  );
}
