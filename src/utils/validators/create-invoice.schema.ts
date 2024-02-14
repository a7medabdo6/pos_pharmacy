import { z } from 'zod';
import { messages } from '@/config/messages';

export const invoiceFormSchema = z.object({
  // serial: z.string().min(1, { message: messages.nameIsRequired }),
  sale_point_id: z.string().min(1, { message: messages.nameIsRequired }),
  bill_number: z.string().min(1, { message: messages.nameIsRequired }),
  bill_date: z.string().min(1, { message: messages.nameIsRequired }),
  supplier_serial: z.string().min(1, { message: messages.nameIsRequired }),
  supplier_id: z.string().min(1, { message: messages.nameIsRequired }),
  tax: z.string().min(1, { message: messages.nameIsRequired }),
  what_paid: z.string().min(1, { message: messages.nameIsRequired }),
  expenses: z.string().min(1, { message: messages.nameIsRequired }),
  descount_percentage: z.string().min(1, { message: messages.nameIsRequired }),
  notes: z.string().min(1, { message: messages.nameIsRequired }),

  // fromAddress: z.string().min(1, { message: messages.addressIsRequired }),
  // fromPhone: z.string().optional(),
  // toName: z.string().min(1, { message: messages.nameIsRequired }),
  // toAddress: z.string().min(1, { message: messages.addressIsRequired }),
  // toPhone: z.string().optional(),
  // invoiceNumber: z.string({
  //   required_error: 'This field is required',
  // }),
  // createDate: z.date({
  //   required_error: messages.createDateIsRequired,
  // }),
  // dueDate: z.date({
  //   required_error: messages.dueDateIsRequired,
  // }),
  // status: z.string({
  //   required_error: messages.statusIsRequired,
  // }),
  // shipping: z.coerce
  //   .number()
  //   .min(1, { message: messages.shippingPriceIsRequired }),
  // discount: z.coerce.number().min(1, { message: messages.discountIsRequired }),
  // taxes: z.coerce.number().min(1, { message: messages.taxIsRequired }),
  items: z.array(
    z.object({
      //total: z.string().min(1, { message: messages.itemNameIsRequired }),
      // code: z.string().min(1, { message: messages.itemNameIsRequired }),
      // name: z.string().min(1, { message: messages.itemNameIsRequired }),
      // unit: z.string().min(1, { message: messages.itemNameIsRequired }),
      // qty: z.string().min(1, { message: messages.itemNameIsRequired }),
      // expire_date: z.string().min(1, { message: messages.itemNameIsRequired }),
      // bouns: z.string().min(1, { message: messages.itemNameIsRequired }),
      // current_qty: z.string().min(1, { message: messages.itemNameIsRequired }),
      // sale_price: z.string().min(1, { message: messages.itemNameIsRequired }),
      // discount: z.string().min(1, { message: messages.itemNameIsRequired }),
      // tax: z.string().min(1, { message: messages.itemNameIsRequired }),
      // buy_price: z.string().min(1, { message: messages.itemNameIsRequired }),
      // description: z.string().min(1, { message: messages.itemDescIsRequired }),
      // quantity: z.coerce
      //   .number()
      //   .min(1, { message: messages.itemQtyIsRequired }),
      // price: z.coerce
      //   .number()
      //   .min(1, { message: messages.itemPriceIsRequired }),
    })
  ),
});

// generate form types from zod validation schema
export type InvoiceFormInput = z.infer<typeof invoiceFormSchema>;
