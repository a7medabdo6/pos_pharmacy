'use client';

import { Title, Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useFieldArray, Controller } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ActionIcon } from '@/components/ui/action-icon';
import { calculateTotalPrice } from '@/utils/calculate-total-price';
import { PiMinusBold, PiPlusBold, PiTrashBold } from 'react-icons/pi';
import { FormBlockWrapper } from '../invoice/form-utils';
import dynamic from 'next/dynamic';
import Spinner from '@/components/ui/spinner';
import { countries } from '@/data/forms/my-details';

// quantity component for invoice
const SelectBox = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Spinner />
    </div>
  ),
});
// multiple invoice items generate component
export function BillItems({
  watch,
  register,
  control,
  setValue: setValueInput,
  errors,
}: any) {
  const [value, setValue] = useState<any>({});

  function handleIncrement(id: any) {
    setValue((old: any) => {
      return { ...old, [`${id}`]: old?.[`${id}`] ? +old[`${id}`] + 1 : 2 };
    });

    // setValue(value[`${id}`]);
    // onChange && onChange(newValue);
  }

  function handleDecrement(id: any) {
    if (value?.[`${id}`] > 1) {
      setValue((old: any) => {
        return { ...old, [`${id}`]: old?.[`${id}`] ? +old[`${id}`] - 1 : 1 };
      });
    } else {
      setValue((old: any) => {
        return { ...old, [`${id}`]: 1 };
      });
    }
  }

  function handleOnChange(inputValue: number) {
    setValue(Number(inputValue));
    // onChange && onChange(inputValue);
  }

  useEffect(() => {
    setValue(1);
    // onChange && onChange(defaultValue ?? 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });
  const shippingCost = watch('shipping') as number;
  const discount = watch('discount') as number;
  const taxes = watch('taxes') as number;

  function calculateSubTotal(): number {
    let subTotal = 0;
    fields.forEach((_, index) => {
      const itemPrice = watch(`items.${index}.price` ?? 0) as number;
      const itemQuantity = watch(`items.${index}.quantity` ?? 1) as number;
      subTotal += itemPrice * itemQuantity;
    });
    return subTotal as number;
  }
  const [inputGroups, setInputGroups] = useState([0]);
  const [focusedGroup, setFocusedGroup] = useState({
    groupIndex: 0,
    inputIndex: 0,
  });

  // const inputRefs = Array.from({ length: 15 }, () =>
  //   Array.from({ length: 15 }, () => useRef<any>(null))
  // );
  interface InputRefs {
    code: React.MutableRefObject<any>;
    total: React.MutableRefObject<any>;
    qty: React.MutableRefObject<any>;
    name: React.MutableRefObject<any>;
    unit: React.MutableRefObject<any>;
    expire_date: React.MutableRefObject<any>;
    bouns: React.MutableRefObject<any>;
    current_qty: React.MutableRefObject<any>;
    sale_price: React.MutableRefObject<any>;
    discount: React.MutableRefObject<any>;
    tax: React.MutableRefObject<any>;
    buy_price: React.MutableRefObject<any>;
  }

  const inputRefs: InputRefs[] = Array.from({ length: 15 }, () => ({
    code: useRef<any>(null),
    total: useRef<any>(null),
    qty: useRef<any>(null),
    name: useRef<any>(null),
    unit: useRef<any>(null),
    expire_date: useRef<any>(null),
    bouns: useRef<any>(null),
    current_qty: useRef<any>(null),
    sale_price: useRef<any>(null),
    discount: useRef<any>(null),
    tax: useRef<any>(null),
    buy_price: useRef<any>(null),
  }));
  // const inputRefs = Array.from({ length: 15 }, () => useRef<any>(null));
  // useEffect(() => {
  //   inputRefs.forEach((ref, index) => {
  //     inputRefs[index].current = ref.current; // Set up the correct ref in the array
  //   });
  // }, [fields]);

  const handleKeyDown = (event: any, index: any, sub: keyof InputRefs) => {
    if (event.key === 'Tab') {
      event.preventDefault(); //Prevent the default tab behavior

      inputRefs[index][sub]?.current && inputRefs[index][sub]?.current.focus();
    }
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default tab behavior

      append({
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
      });
      setTimeout(() => {
        console.log(index + 1, 'fields.length - 1');

        // inputRefs[index + 1][0]?.current.focus();
      }, 1000);
    }
  };

  return (
    <FormBlockWrapper
      title={'Item Details:'}
      description={'Add one or multiple item'}
      className=" "
    >
      <div className="col-span-2 @container">
        <div className="card mb-3 p-2 " style={{ overflow: 'hidden' }}>
          <div className="row  mb-2 mt-2">
            <div className="col-2">
              {/* 

$table->string("number_of_products")->nullable();
$table->string("type_of_bill")->nullable();
$table->string("total_price_of_buy")->nullable();
$table->string("total_price_of_sell")->nullable();
$table->string("what_remainning")->nullable();
$table->unsignedBigInteger('user_id');
$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
$table->unsignedBigInteger('store_id');
$table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
$table->unsignedBigInteger('tenant_id');
$table->foreign('tenant_id')->references('id')->on('tenants')->onDelete('cascade'); */}

              <Input
                label="serial"
                className={'custom-sm-input'}
                placeholder="serial"
                disabled={true}
                value={'F0-45'}
                {...register('serial')}
              />
            </div>

            <div className="col-2">
              <Input
                type="number"
                label="Sale point "
                className={'custom-sm-input'}
                placeholder="sale point "
                {...register('sale_point_id')}
                onChange={(e) => setValueInput(`sale_point_id`, e.target.value)}
              />
            </div>
            <div className="col-2">
              <Input
                label="Bill Number"
                className={'custom-sm-input'}
                placeholder="Bill Number"
                {...register('bill_number')}
              />
            </div>

            <div className="col-2">
              <Input
                type="date"
                label="Bill Date "
                className={'custom-sm-input'}
                placeholder="Bill Date"
                {...register('bill_date')}
              />
            </div>
            {/* <div className="col-2"></div>
          <div className="col-2"></div> */}

            <div className="col-2">
              <Input
                label="supplier code"
                className={'custom-sm-input'}
                placeholder="supplier code"
                {...register('supplier_serial')}
              />
            </div>
            <div className="col-2">
              <Controller
                control={control}
                name="country"
                render={({ field: { onChange, value } }) => (
                  <SelectBox
                    placeholder="Select Country"
                    options={countries}
                    label="supplier name"
                    value={value}
                    className="col-span-full"
                    getOptionValue={(option) => option.value}
                    displayValue={(selected) =>
                      countries?.find((con) => con.value === selected)?.name ??
                      ''
                    }
                    onChange={(e: any) => {
                      onChange(e);
                      console.log(e);

                      setValueInput(`supplier_id`, e);
                    }}
                    // {...register('supplier_id')}
                    error={errors?.country?.message as string}
                  />
                )}
              />
              {/* <Input
              // label="supplier name"
              // className={'custom-sm-input'}
              // placeholder="supplier name"
              // {...register('supplier_id')}
              /> */}
            </div>

            <hr className="m-2" />
            <div className="col-2">
              <Input
                type="number"
                label="Tax"
                className={'custom-sm-input'}
                placeholder="Tax "
                {...register('tax')}
              />
            </div>
            <div className="col-2">
              <Input
                type="number"
                label="What paid"
                className={'custom-sm-input'}
                placeholder="What paid"
                {...register('what_paid')}
              />
            </div>

            <div className="col-2">
              <Input
                type="number"
                label="Expenses"
                className={'custom-sm-input'}
                placeholder="Expenses"
                {...register('expenses')}
              />
            </div>
            <div className="col-2">
              <Input
                type="number"
                label="Descount percentage"
                className={'custom-sm-input'}
                placeholder="Discount percentage"
                {...register('descount_percentage')}
              />
            </div>
            <div className="col-2">
              <Input
                type="number"
                label="Notes"
                className={'custom-sm-input'}
                placeholder="Notes"
                {...register('notes')}
              />
            </div>
          </div>
        </div>

        <div
          style={{ overflow: 'scroll', minHeight: '400px', display: 'block' }}
          className="mb-8 grid grid-cols-1 items-start rounded-lg border border-gray-200 p-4 shadow @md:p-5 @xl:p-6"
        >
          <h4>Items</h4>
          {fields.map((field: any, index) => {
            const priceValue = watch(
              `items.${index}.price`,
              field.price ?? 0
            ) as number;

            const quantityValue = watch(
              `items.${index}.quantity`,
              field.quantity ?? 1
            ) as number;

            return (
              <div key={field.id}>
                <div
                  className="d-flex "
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: index > 0 ? '50px' : '75px',
                  }}
                >
                  <p style={{ marginTop: index == 0 ? '27px' : 'unset' }}>
                    {index + 1}
                  </p>

                  <Input
                    onKeyDown={(e) => handleKeyDown(e, index, 'name')}
                    {...register(`items.${index}.code`)}
                    // ref={inputRefs[index]['code']}
                    ref={(el) => {
                      inputRefs[index]['code'].current = el;
                    }}
                    onChange={(e) =>
                      setValueInput(`items.${index}.code`, e.target.value)
                    }
                    label="Code"
                    className={
                      index > 0
                        ? 'no-label custom-sm-input'
                        : ' custom-sm-input'
                    }
                    variant="active"
                    placeholder="Code"
                  />

                  <Input
                    label="Item Name"
                    onKeyDown={(e) => handleKeyDown(e, index, 'qty')}
                    {...register(`items.${index}.name`)}
                    ref={(el) => {
                      inputRefs[index]['name'].current = el;
                    }}
                    onChange={(e) =>
                      setValueInput(`items.${index}.name`, e.target.value)
                    }
                    className={
                      index > 0
                        ? 'no-label custom-sm-input'
                        : ' custom-sm-input'
                    }
                    defaultValue={field.name}
                    placeholder="Enter item name"
                  />
                  <Controller
                    control={control}
                    name="unit"
                    render={({ field: { onChange, value } }) => (
                      <SelectBox
                        className={
                          index > 0
                            ? 'no-label custom-sm-input select col-span-full'
                            : ' custom-sm-input col-span-full'
                        }
                        options={countries}
                        label="Unit"
                        value={value}
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          countries?.find((con) => con.value === selected)
                            ?.name ?? ''
                        }
                        onChange={(e: any) => {
                          onChange(e);

                          setValueInput(`unit`, e);
                        }}
                        // {...register('supplier_id')}
                        ref={(el) => {
                          inputRefs[index]['unit'].current = el;
                        }}
                        error={errors?.country?.message as string}
                      />
                    )}
                  />
                  {/* <Input
                    label="Unit"
                    onKeyDown={(e) => handleKeyDown(e, index, 'qty')}
                    {...register(`items.${index}.unit`)}
                    ref={(el) => {
                      inputRefs[index]['unit'].current = el;
                    }}
                    onChange={(e) =>
                      setValueInput(`items.${index}.unit`, e.target.value)
                    }
                    className={
                      index > 0
                        ? 'no-label custom-sm-input'
                        : ' custom-sm-input'
                    }
                    placeholder="Unit "
                  /> */}
                  <Input
                    label="Quantity"
                    type="number"
                    // ref={inputRefs[index]['qty']}
                    className={
                      index > 0
                        ? 'no-label custom-sm-input'
                        : ' custom-sm-input'
                    }
                    min={1}
                    onKeyDown={(e: any) => handleKeyDown(e, index, 'bouns')}
                    {...register(`items.${index}.qty`)}
                    ref={(el) => {
                      inputRefs[index]['qty'].current = el;
                    }}
                    onChange={(e) => {
                      setValueInput(`items.${index}.qty`, e.target.value);
                      setValue((old: any) => {
                        return {
                          ...old,
                          [`items.${index}.qty`]: +e.target.value,
                        };
                      });
                    }}
                    value={value[`items.${index}.qty`]}
                    placeholder="1"
                    suffix={
                      <>
                        <ActionIcon
                          title="Decrement"
                          size="sm"
                          variant="outline"
                          className="scale-90 shadow-sm"
                          onClick={() => handleDecrement(`items.${index}.qty`)}
                        >
                          <PiMinusBold
                            className="h-3.5 w-3.5"
                            strokeWidth={2}
                          />
                        </ActionIcon>
                        <ActionIcon
                          title="Increment"
                          size="sm"
                          variant="outline"
                          className="scale-90 shadow-sm"
                          onClick={() => handleIncrement(`items.${index}.qty`)}
                        >
                          <PiPlusBold className="h-3.5 w-3.5" strokeWidth={2} />
                        </ActionIcon>
                      </>
                    }
                    suffixClassName="flex gap-1 items-center -me-2"
                    // error={error}
                  />

                  <Input
                    onKeyDown={(e) => handleKeyDown(e, index, 'expire_date')}
                    {...register(`items.${index}.bouns`)}
                    ref={(el) => {
                      inputRefs[index]['bouns'].current = el;
                    }}
                    onChange={(e) =>
                      setValueInput(`items.${index}.bouns`, e.target.value)
                    }
                    label="Bouns"
                    type="number"
                    className={
                      index > 0
                        ? 'no-label custom-sm-input'
                        : ' custom-sm-input'
                    }
                    placeholder="Bouns "
                  />
                  <Input
                    // ref={inputRefs[index]['expire_date']}
                    onKeyDown={(e) => handleKeyDown(e, index, 'buy_price')}
                    {...register(`items.${index}.expire_date`)}
                    ref={(el) => {
                      inputRefs[index]['expire_date'].current = el;
                    }}
                    onChange={(e) =>
                      setValueInput(
                        `items.${index}.expire_date`,
                        e.target.value
                      )
                    }
                    label="Expire Date"
                    type="date"
                    className={
                      index > 0
                        ? 'no-label custom-sm-input'
                        : ' custom-sm-input'
                    }
                    placeholder="Expire "
                  />

                  <Input
                    label="Buy Price"
                    // ref={inputRefs[index]['buy_price']}
                    onKeyDown={(e) => handleKeyDown(e, index, 'discount')}
                    className={
                      index > 0
                        ? 'no-label custom-sm-input'
                        : ' custom-sm-input'
                    }
                    placeholder="Buy Price "
                    {...register(`items.${index}.buy_price`)}
                    ref={(el) => {
                      inputRefs[index]['buy_price'].current = el;
                    }}
                    onChange={(e) =>
                      setValueInput(`items.${index}.buy_price`, e.target.value)
                    }
                  />
                  <Input
                    // ref={inputRefs[index]['discount']}
                    onKeyDown={(e) => handleKeyDown(e, index, 'current_qty')}
                    type="number"
                    label="Discount"
                    className={
                      index > 0
                        ? 'no-label custom-sm-input'
                        : ' custom-sm-input'
                    }
                    prefix={'$'}
                    placeholder="50"
                    {...register(`items.${index}.discount`)}
                    ref={(el) => {
                      inputRefs[index]['discount'].current = el;
                    }}
                    onChange={(e) =>
                      setValueInput(`items.${index}.discount`, e.target.value)
                    }
                  />
                  <Input
                    // ref={inputRefs[index]['current_qty']}
                    onKeyDown={(e) => handleKeyDown(e, index, 'sale_price')}
                    label="Current qty"
                    className={
                      index > 0
                        ? 'no-label custom-sm-input'
                        : ' custom-sm-input'
                    }
                    placeholder="Current qty "
                    {...register(`items.${index}.current_qty`)}
                    ref={(el) => {
                      inputRefs[index]['current_qty'].current = el;
                    }}
                    onChange={(e) =>
                      setValueInput(
                        `items.${index}.current_qty`,
                        e.target.value
                      )
                    }
                  />
                  <Input
                    // ref={inputRefs[index]['sale_price']}
                    onKeyDown={(e) => handleKeyDown(e, index, 'tax')}
                    label="Sell Price"
                    className={
                      index > 0
                        ? 'no-label custom-sm-input'
                        : ' custom-sm-input'
                    }
                    placeholder="Sell Price "
                    {...register(`items.${index}.sale_price`)}
                    ref={(el) => {
                      inputRefs[index]['sale_price'].current = el;
                    }}
                    onChange={(e) =>
                      setValueInput(`items.${index}.sale_price`, e.target.value)
                    }
                  />

                  <Input
                    // ref={inputRefs[index]['tax']}
                    onKeyDown={(e) => handleKeyDown(e, index, 'total')}
                    type="number"
                    label="Taxes"
                    suffix={'%'}
                    className={
                      index > 0
                        ? 'no-label custom-sm-input'
                        : ' custom-sm-input'
                    }
                    // placeholder="15"
                    {...register(`items.${index}.tax`)}
                    ref={(el) => {
                      inputRefs[index]['tax'].current = el;
                    }}
                    onChange={(e) =>
                      setValueInput(`items.${index}.tax`, e.target.value)
                    }
                  />

                  <Input
                    label="Total"
                    // ref={inputRefs[index]['total']}
                    // onKeyDown={(e) => handleKeyDown(e, index, 11)}
                    className={
                      index > 0
                        ? 'no-label custom-sm-input'
                        : ' custom-sm-input'
                    }
                    placeholder="Total "
                    {...register(`items.${index}.total`)}
                    ref={(el) => {
                      inputRefs[index]['total'].current = el;
                    }}
                    onChange={(e) =>
                      setValueInput(`items.${index}.total`, e.target.value)
                    }
                  />
                  {/* <div className="flex items-start @xl:col-span-2 @2xl:col-span-1">
                    <Input
                      label="Price"
                      type="number"
                      prefix={'$'}
                      placeholder="100"
                      {...register(`items.${index}.price`)}
                      defaultValue={field.price}
                      error={errors?.items?.[index]?.price?.message}
                      className={
                        index > 0
                          ? 'no-label custom-sm-input'
                          : ' custom-sm-input'
                      }
                    />

                    <div className="ms-3 mt-9 flex items-start text-sm">
                      <Text className="me-1 text-gray-500">Total:</Text>
                      <Text as="b" className="font-medium">
                        ${priceValue * quantityValue}
                      </Text>
                    </div>
                  </div> */}
                  {/* <Textarea
                  label="Description"
                  placeholder="Enter item description"
                  {...register(`items.${index}.description`)}
                  defaultValue={field.description}
                  error={errors?.items?.[index]?.description?.message}
                  className="row-start-2 @md:col-span-2 @xl:col-span-3 @xl:row-start-2 @4xl:col-span-4"
                  textareaClassName="h-20"
                /> */}
                </div>
                {/* <Button
                  variant="text"
                  color="danger"
                  onClick={() => remove(index)}
                  className="-mx-2 -mb-1 ms-auto mt-5 h-auto px-2 py-1 font-semibold"
                >
                  <PiTrashBold className="me-1 h-[18px] w-[18px]" /> Remove
                </Button> */}
              </div>
            );
          })}
        </div>

        <div className="flex w-full flex-col items-start justify-between @4xl:flex-row @4xl:pt-6">
          <Button
            onClick={() =>
              append({
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
              })
            }
            variant="flat"
            className="-mt-2 mb-7 w-full @4xl:mb-0 @4xl:mt-0 @4xl:w-auto"
          >
            <PiPlusBold className="me-1.5 h-4 w-4" /> Add Item
          </Button>

          <div className="grid w-full gap-2 @4xl:w-auto">
            <div className="ms-auto mt-6 grid w-full gap-3.5 text-sm text-gray-600 @xl:max-w-xs">
              <Text className="flex items-center justify-between">
                Total price of buy:{' '}
                <Text as="span" className="font-medium text-gray-700">
                  {calculateSubTotal()}
                </Text>
              </Text>
              <Text className="flex items-center justify-between">
                Total price of sell:{' '}
                <Text as="span" className="font-medium text-red">
                  {shippingCost ? `$${shippingCost}` : '--'}
                </Text>
              </Text>
              {/* <Text className="flex items-center justify-between">
                What remainning:{' '}
                <Text as="span" className="font-medium text-gray-700">
                  {discount ? `$${discount}` : '--'}
                </Text>
              </Text> */}
              {/* <Text className="flex items-center justify-between">
                Taxes:{' '}
                <Text as="span" className="font-medium text-red">
                  {taxes ? `${taxes}%` : '--'}
                </Text>
              </Text> */}
              <Text className="flex items-center justify-between text-base font-semibold text-gray-900">
                What remainning:{' '}
                <Text as="span">
                  $
                  {calculateTotalPrice(
                    calculateSubTotal(),
                    shippingCost,
                    discount,
                    taxes
                  ) ?? '--'}
                </Text>
              </Text>
            </div>
          </div>
        </div>
      </div>
    </FormBlockWrapper>
  );
}
