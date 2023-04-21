import { z } from 'zod';
import { ZodDisplay } from './display.zod';

export type Display = z.infer<typeof ZodDisplay>;
