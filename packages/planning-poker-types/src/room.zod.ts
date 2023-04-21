import { z } from 'zod';

export const ZodRoom = z.object({
  id: z.string(),
  label: z.string(),
  name: z.string(),
  showVotes: z.boolean(),
});
