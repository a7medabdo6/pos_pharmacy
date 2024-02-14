'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { SubmitHandler, Controller } from 'react-hook-form';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text, Title } from '@/components/ui/text';
import { Form } from '@/components/ui/form';
import cn from '@/utils/class-names';
import { CategoryFormInput } from '@/utils/validators/create-category.schema';
import UploadZone from '@/components/ui/file-upload/upload-zone';
import { useCreateUnitHook } from '@/Apis/Unites/index';
import {
  UnitFormInput,
  unitFormSchema,
} from '@/utils/validators/create-unit.schema';
import toast from 'react-hot-toast';
const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[168px]" />,
});

// Parent category option
const parentCategoryOption = [
  {
    value: 'fruits',
    name: 'Fruits',
  },
  {
    value: 'grocery',
    name: 'Grocery',
  },
  {
    value: 'meat',
    name: 'Meat',
  },
  {
    value: 'cat food',
    name: 'Cat Food',
  },
];

// Type option
const typeOption = [
  {
    value: 'fresh vegetables',
    name: 'Fresh Vegetables',
  },
  {
    value: 'diet foods',
    name: 'Diet Foods',
  },
  {
    value: 'green vegetables',
    name: 'Green Vegetables',
  },
];

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

// main category form component for create and update category
export default function CreateUnit({
  id,
  category,
  isModalView = true,
}: {
  id?: string;
  isModalView?: boolean;
  category?: UnitFormInput;
}) {
  const [reset, setReset] = useState({});
  const { mutate: Create, isLoading } = useCreateUnitHook();
  const onSubmit: SubmitHandler<UnitFormInput> = (data) => {
    Create(data);
    // setTimeout(() => {
    //   console.log('createCategory data ->', data);
    //   setReset({
    //     nameEn: '',
    //     nameAr: '',
    //     type: '',
    //   });
    // }, 600);
  };

  return (
    <Form<UnitFormInput>
      validationSchema={unitFormSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        mode: 'onChange',
        defaultValues: category,
      }}
      className="isomorphic-form flex flex-grow flex-col @container"
    >
      {({ register, control, getValues, setValue, formState: { errors } }) => (
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
                title={'Add new Unit:'}
                description={'Edit your Unit information from here'}
                isModalView={isModalView}
              >
                <div style={{ marginBlock: '10px' }}>
                  <Input
                    label="unit Name english"
                    placeholder="unit Name english"
                    {...register('nameEn')}
                    error={errors.nameEn?.message}
                  />
                </div>
                <div style={{ marginBlock: '10px' }}>
                  <Input
                    label="unit Name arabic"
                    placeholder="unit Name arabic"
                    {...register('nameAr')}
                    error={errors.nameAr?.message}
                  />
                </div>
                <div style={{ marginBlock: '10px' }}>
                  <Input
                    label="Type"
                    placeholder="Type"
                    {...register('type')}
                    error={errors.type?.message}
                  />
                </div>
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
              {id ? 'Update' : 'Create'} Unit
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
