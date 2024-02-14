import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from '@/utils/validators/common-rules';

// form zod validation schema
export const storeFormSchema = z.object({
  nameEn: z.string().min(1, { message: messages.catNameIsRequired }),
  nameAr: z.string().min(1, { message: messages.catNameIsRequired }),
  type: z.string().min(1, { message: messages.catNameIsRequired }),

  description: z.string().optional(),
  managers: z.array(z.string()),
});

// generate form types from zod validation schema
export type StoreFormInput = z.infer<typeof storeFormSchema>;
