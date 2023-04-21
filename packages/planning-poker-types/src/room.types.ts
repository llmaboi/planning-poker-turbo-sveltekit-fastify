import { z } from 'zod';
import { ZodRoom } from './room.zod';

export type Room = z.infer<typeof ZodRoom>;
