import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from '@/utils/validators/common-rules';

// form zod validation schema
export const usersFormSchema = z.object({
  name: z.string().min(1, { message: messages.catNameIsRequired }),
  email: z.string().min(1, { message: messages.catNameIsRequired }),
  password: z.string().min(1, { message: messages.catNameIsRequired }),
  description: z.string().optional(),
  role: z.array(z.string()),
});

// generate form types from zod validation schema
export type UsersFormInput = z.infer<typeof usersFormSchema>;
