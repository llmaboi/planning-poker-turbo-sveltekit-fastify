import { FastifyPluginAsync, RequestGenericInterface } from 'fastify';
import { getRoomMap } from '../methods/roomStore';
import { addOrUpdateDisplay } from '../methods/socketActions';

// TODO: Zodify params
interface CreateDisplayParams extends RequestGenericInterface {
  Body: {
    roomId: string;
    name: string;
    cardValue: number;
    isHost: boolean;
  };
}

const displayRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post<CreateDisplayParams>('/displays', async (request, reply) => {
    const { roomId, name, cardValue, isHost } = request.body;
    const roomMap = getRoomMap();

    try {
      return addOrUpdateDisplay(roomId, {
        cardValue,
        isHost,
        name,
      });
    } catch (err) {
      console.error(err);
      return reply.code(500).send(JSON.stringify(err));
    }
  });
};

export default displayRoutes;
