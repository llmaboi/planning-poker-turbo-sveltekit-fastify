import { z } from 'zod';

export const ZodDisplay = z.object({
  name: z.string(),
  cardValue: z.number(),
  isHost: z.boolean(),
});
