'use client';

import { BillItems } from '@/app/shared/bill/bill-items';
import PageHeader from '@/app/shared/page-header';

import { useState } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Title, Text } from '@/components/ui/text';

import FormFooter from '@/components/form-footer';
import { toast } from 'react-hot-toast';
import {
  InvoiceFormInput,
  invoiceFormSchema,
} from '@/utils/validators/create-invoice.schema';

const invoiceItems = [
  {
    code: '',
    total: '',
    qty: '',
    name: '',
    unit: '',
    expire_date: '',
    bouns: '',
    current_qty: '',
    sale_price: '',
    discount: '',
    tax: '',
    buy_price: '',
  },
];
const pageHeader = {
  title: 'Bill page',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'bill',
    },
  ],
};

export default function BillPage({
  id,
  record,
}: {
  id?: string;
  record?: InvoiceFormInput;
}) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<InvoiceFormInput> = (data) => {
    toast.success(
      <Text as="b">Invoice successfully {id ? 'updated' : 'created'}</Text>
    );
    console.log(data, 'data');

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('createInvoice data ->', data);
      setReset({
        fromName: '',
        fromAddress: '',
        fromPhone: '',
        toName: '',
        toAddress: '',
        toPhone: '',
        shipping: '',
        discount: '',
        taxes: '',
        createDate: new Date(),
        status: 'draft',
        items: invoiceItems,
      });
    }, 600);
  };

  const newItems = record?.items
    ? record.items.map((item) => ({
        ...item,
      }))
    : invoiceItems;

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <Form<InvoiceFormInput>
        validationSchema={invoiceFormSchema}
        // resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: {
            ...record,
            // status: 'draft',
            items: newItems,
          },
        }}
        className="flex flex-grow flex-col @container [&_label]:font-medium"
      >
        {({ register, control, watch, setValue, formState: { errors } }) => (
          <>
            <div className="flex-grow pb-10">
              <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
                <BillItems
                  watch={watch}
                  control={control}
                  register={register}
                  // errors={errors}
                  setValue={setValue}
                />
              </div>
            </div>

            <FormFooter
              isLoading={isLoading}
              submitBtnText={id ? 'Update Invoice' : 'Create Invoice'}
            />
          </>
        )}
      </Form>
    </>
  );
}
