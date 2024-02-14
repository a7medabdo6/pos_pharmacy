import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from '@/utils/validators/common-rules';

// form zod validation schema
export const unitFormSchema = z.object({
  nameEn: z.string().min(1, { message: messages.catNameIsRequired }),
  nameAr: z.string().min(1, { message: messages.catNameIsRequired }),
  type: z.string().min(1, { message: messages.catNameIsRequired }),
  description: z.string().optional(),
});

// generate form types from zod validation schema
export type UnitFormInput = z.infer<typeof unitFormSchema>;
