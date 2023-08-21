import { FastifyPluginAsync, RequestGenericInterface } from 'fastify';
import { getRoomMap } from '../methods/roomStore';
import {
  addOrUpdateDisplay,
  updateDisplayCardValue,
} from '../methods/socketActions';

// TODO: Zodify params
interface CreateDisplayParams extends RequestGenericInterface {
  Body: {
    roomId: string;
    name: string;
    cardValue: number;
    isHost: boolean;
  };
}

interface SetDisplayCardValueParams extends RequestGenericInterface {
  Body: {
    roomId: string;
    cardValue: string;
  };
  Params: {
    displayName: string;
  };
}

const displayRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post<CreateDisplayParams>('/displays', async (request, reply) => {
    const { roomId, name, cardValue, isHost } = request.body;
    // const roomMap = getRoomMap();

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

  fastify.put<SetDisplayCardValueParams>(
    '/displays/:displayName',
    async (request, reply) => {
      const { displayName } = request.params;
      const { roomId, cardValue } = request.body;

      const maybeNumber = Number(cardValue);
      if (isNaN(maybeNumber)) {
        throw new Error('Invalid cardValue must be a valid card number.');
      }

      try {
        return updateDisplayCardValue(roomId, {
          cardValue: maybeNumber,
          name: displayName,
        });
      } catch (err) {
        console.error(err);
        return reply.code(500).send(JSON.stringify(err));
      }
    }
  );
};

export default displayRoutes;
