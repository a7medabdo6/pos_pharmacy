import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from '@/utils/validators/common-rules';

// form zod validation schema
export const salePointFormSchema = z.object({
  name: z.string().min(1, { message: messages.catNameIsRequired }),
  address: z.string().min(1, { message: messages.catNameIsRequired }),
  balance: z.string().min(1, { message: messages.catNameIsRequired }),
  description: z.string().optional(),
});

// generate form types from zod validation schema
export type SalePointFormInput = z.infer<typeof salePointFormSchema>;
