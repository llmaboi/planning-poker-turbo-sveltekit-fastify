import { z } from 'zod';
import { ZodRoom, ZodRoomMapClient, ZodRoomMapServer } from './room.zod';

export type Room = z.infer<typeof ZodRoom>;
export type RoomMapClient = z.infer<typeof ZodRoomMapClient>;
export type RoomMapServer = z.infer<typeof ZodRoomMapServer>;
