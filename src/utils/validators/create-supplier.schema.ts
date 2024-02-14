import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from '@/utils/validators/common-rules';

// form zod validation schema
export const supplierFormSchema = z.object({
  nameEn: z.string().min(1, { message: messages.catNameIsRequired }),
  nameAr: z.string().min(1, { message: messages.catNameIsRequired }),
  code: z.string().min(1, { message: messages.catNameIsRequired }),
  description: z.string().optional(),
});

// generate form types from zod validation schema
export type SupplierFormInput = z.infer<typeof supplierFormSchema>;
