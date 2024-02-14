'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text, Title } from '@/components/ui/text';
import { Form } from '@/components/ui/form';
import cn from '@/utils/class-names';
import UploadZone from '@/components/ui/file-upload/upload-zone';
import { useCreateUnitHook } from '@/Apis/Unites/index';

import toast from 'react-hot-toast';
import {
  SupplierFormInput,
  supplierFormSchema,
} from '@/utils/validators/create-supplier.schema';
import {
  useCreatesupplierHook,
  useEditupplierHook,
  useGetOnesuppliersHook,
} from '@/Apis/suppliers';
const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[168px]" />,
});

// a reusable form wrapper component
function HorizontalFormBlockWrapper({
  title,
  description,
  children,
  className,
  isModalView = true,
}: React.PropsWithChildren<{
  title: string;
  description?: string;
  className?: string;
  isModalView?: boolean;
}>) {
  return (
    <div
      className={cn(
        className,
        isModalView ? '@5xl:grid @5xl:grid-cols-6' : ' '
      )}
    >
      {isModalView && (
        <div className="col-span-2 mb-6 pe-4 @5xl:mb-0">
          <Title as="h6" className="font-semibold">
            {title}
          </Title>
          <Text className="mt-1 text-sm text-gray-500">{description}</Text>
        </div>
      )}

      <div
        className={cn(
          'col-span-4 mb-6 pe-4 @5xl:mb-0',
          isModalView ? 'col-span-4' : ' '
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default function CreateSupplier({
  id,
  Supplier,
  isModalView = true,
  type = 'create',
}: {
  id?: any;
  isModalView?: boolean;
  Supplier: any;
  type?: string;
}) {
  const [reset, setReset] = useState({});
  const { mutate: Create, isLoading } = useCreatesupplierHook();
  const { mutate: update } = useEditupplierHook();

  const onSubmit: SubmitHandler<SupplierFormInput> = (data) => {
    if (id) {
      update({ ...data, id });
      return;
    }
    Create(data);
  };

  return (
    <Form<SupplierFormInput>
      validationSchema={supplierFormSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        mode: 'onChange',
        defaultValues: Supplier,
      }}
      className="isomorphic-form flex flex-grow flex-col @container"
    >
      {({
        register,
        control,
        getValues,
        setValue,
        formState: { errors, defaultValues },
      }) => {
        return (
          <>
            <div className="flex-grow pb-10">
              <div
                className={cn(
                  'grid grid-cols-1 ',
                  isModalView
                    ? 'grid grid-cols-1 gap-8 divide-y divide-dashed  divide-gray-200 @2xl:gap-10 @3xl:gap-12 [&>div]:pt-7 first:[&>div]:pt-0 @2xl:[&>div]:pt-9 @3xl:[&>div]:pt-11'
                    : 'gap-5'
                )}
              >
                <HorizontalFormBlockWrapper
                  title={'Add new Supplier:'}
                  description={'Edit your Supplier information from here'}
                  isModalView={isModalView}
                >
                  <div style={{ marginBlock: '10px' }}>
                    <Input
                      label="Supplier Name english"
                      placeholder="Supplier Name english"
                      {...register('nameEn')}
                      error={errors.nameEn?.message}
                    />
                  </div>
                  <div style={{ marginBlock: '10px' }}>
                    <Input
                      label="Supplier Name arabic"
                      placeholder="Supplier Name arabic"
                      {...register('nameAr')}
                      defaultValue={defaultValues?.nameAr}
                      error={errors.nameAr?.message}
                    />
                  </div>
                  {/* <div style={{ marginBlock: '10px' }}>
                      <Input
                        label="Code"
                        placeholder="Code"
                        {...register('code')}
                        error={errors.code?.message}
                      />
                    </div> */}
                  <div className="col-span-2">
                    <Controller
                      control={control}
                      name="description"
                      render={({ field: { onChange, value } }) => (
                        <QuillEditor
                          value={value}
                          onChange={onChange}
                          label="Description"
                          className="[&>.ql-container_.ql-editor]:min-h-[100px]"
                          labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                        />
                      )}
                    />
                  </div>
                </HorizontalFormBlockWrapper>
              </div>
            </div>

            <div
              className={cn(
                'sticky bottom-0 z-40 flex items-center justify-end gap-3 bg-gray-0/10 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col',
                isModalView ? '-mx-10 -mb-7 px-10 py-5' : 'py-1'
              )}
            >
              <Button variant="outline" className="w-full @xl:w-auto">
                Save as Draft
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
              >
                {id ? 'Update' : 'Create'} Supplier
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
