import { z } from 'zod';
import { ZodDisplay } from './display.zod';

export const ZodRoom = z.object({
  id: z.string(),
  label: z.string(),
  name: z.string(),
  showVotes: z.boolean(),
});

export const ZodRoomMapClient = ZodRoom.and(
  z.object({
    displays: ZodDisplay.array(),
  })
);
export const ZodRoomMapServer = ZodRoomMapClient.and(
  z.object({
    ttl: z.number(),
  })
);
