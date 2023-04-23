import { FastifyPluginAsync, RequestGenericInterface } from 'fastify';
import { Room, RoomMapClient } from 'planning-poker-types';
import {
  addRoomDisplay,
  getAllRooms,
  getRoomById,
  registerRoom,
  removeRoomDisplaySocket,
  resetRoomCards,
  updateRoom,
} from '../methods/socketActions';
import { kebabStyle } from '../methods/kebabStyle';

// TODO: Zodify params
interface RoomParams extends RequestGenericInterface {
  Params: {
    id: string;
  };
}

interface RoomCreate extends RequestGenericInterface {
  Body: Omit<Room, 'id'>;
}

interface RoomUpdate extends RoomParams {
  Body: Room;
}

interface SocketRoomParams extends RequestGenericInterface {
  Params: {
    id: string;
    displayId: string;
  };
}

const roomRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get<SocketRoomParams>(
    '/rooms/:id/:displayId/socket',
    { websocket: true },
    (connection, request) => {
      console.log('connected to socket');
      addRoomDisplay(
        request.params.id,
        request.params.displayId,
        connection.socket
      );

      connection.socket.on('close', () => {
        removeRoomDisplaySocket(request.params.id, request.params.displayId);
        console.log('disconnected from socket');
      });
    }
  );

  fastify.get<RoomParams>('/rooms/:id', async (request, reply) => {
    const { id } = request.params;

    try {
      return getRoomById(id);
    } catch (err) {
      return reply.code(500).send(JSON.stringify(err));
    }
  });

  fastify.get('/rooms', async (request, reply) => {
    try {
      return getAllRooms();
    } catch (err) {
      return reply.code(500).send(JSON.stringify(err));
    }
  });

  fastify.patch<RoomUpdate>('/rooms/:id', async (request, reply) => {
    const { id } = request.params;
    const { label, name, showVotes } = request.body;

    try {
      return updateRoom(id, {
        id,
        label,
        name,
        showVotes,
      });
    } catch (err) {
      console.error(err);
      return reply.code(500).send(JSON.stringify(err));
    }
  });

  fastify.post<RoomCreate>('/rooms', async (request, reply) => {
    const { showVotes, label, name } = request.body;

    try {
      return registerRoom({
        label,
        name,
        showVotes,
      });
    } catch (err) {
      console.error(err);
      return reply.code(500).send(JSON.stringify(err));
    }
  });

  fastify.patch<RoomParams>('/rooms/:id/card-reset', async (request, reply) => {
    const { id } = request.params;
    try {
      return resetRoomCards(id);
    } catch (err) {
      return reply.code(500).send(JSON.stringify(err));
    }
  });
};

export default roomRoutes;
