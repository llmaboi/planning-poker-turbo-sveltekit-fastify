import { Display, Room, RoomMapClient } from 'planning-poker-types';
import { kebabStyle } from './kebabStyle';
import { getRoomMap } from './roomStore';
import WebSocket from 'ws';

// TODO: maybe add an "auth ctx" for a room && display? hiding those routes?

/**
 * key is `roomId`.
 */
let roomSockets: Map<string, Map<string, WebSocket>> | undefined;

export function getRoomSockets() {
  if (!roomSockets) {
    roomSockets = new Map<string, Map<string, WebSocket>>();
  }

  return roomSockets;
}

export function addRoomDisplay(
  id: string,
  displayId: string,
  roomDisplaySocket: WebSocket
) {
  const kebabId = kebabStyle(id);
  const kebabDisplayId = kebabStyle(displayId);
  const sockets = getRoomSockets();

  const foundSocket = sockets.get(kebabId);

  if (typeof foundSocket === 'undefined') {
    const displayMap = new Map();
    displayMap.set(kebabDisplayId, roomDisplaySocket);
    sockets.set(kebabId, displayMap);
  } else {
    const displayMap = new Map();
    Array.from(foundSocket.entries()).forEach(([key, socket]) => {
      displayMap.set(key, socket);
    });

    displayMap.set(kebabDisplayId, roomDisplaySocket);

    sockets.set(kebabId, displayMap);
  }
}

export function removeRoomDisplaySocket(id: string, displayId: string) {
  const kebabId = kebabStyle(id.trim());
  const sockets = getRoomSockets();

  const foundSocket = sockets.get(kebabId);

  if (typeof foundSocket !== 'undefined') {
    foundSocket.delete(displayId);
  }
}

//

export function registerRoom({ label, name, showVotes }: Omit<Room, 'id'>) {
  const id = kebabStyle(name);
  const roomMap = getRoomMap();

  roomMap.set(id, {
    displays: [],
    id,
    label,
    showVotes,
    name,
    ttl: Date.now(),
  });

  const newRoom = roomMap.get(id);

  if (typeof newRoom === 'undefined')
    throw new Error('room not found -- registerRoom');

  return newRoom;
}

export function getAllRooms() {
  const roomMap = getRoomMap();
  return Array.from(roomMap.values());
}

export function getRoomByName(roomName: string) {
  const id = kebabStyle(roomName);
  const roomMap = getRoomMap();
  const maybeRoom = roomMap.get(id);

  if (typeof maybeRoom === 'undefined')
    throw new Error('room not found -- getAllRooms');

  const displays = Array.from(maybeRoom.displays.values());
  return { ...maybeRoom, displays };
}

export function getRoomById(roomId: string) {
  const roomMap = getRoomMap();
  const maybeRoom = roomMap.get(roomId);

  if (typeof maybeRoom === 'undefined')
    throw new Error('room not found -- getRoomById');

  const displays = Array.from(maybeRoom.displays.values());
  return { ...maybeRoom, displays };
}

export function updateRoom(roomId: string, newRoom: Room) {
  const roomMap = getRoomMap();
  const oldRoom = roomMap.get(roomId);

  if (typeof oldRoom === 'undefined')
    throw new Error('room not found -- updateRoom');

  const combinedRoom = {
    ...oldRoom,
    ...newRoom,
  };

  roomMap.set(combinedRoom.id, combinedRoom);

  const updatedRoom = roomMap.get(roomId);

  if (typeof updatedRoom === 'undefined')
    throw new Error('updatedRoom not found -- updateRoom');

  const sockets = getRoomSockets();

  const foundSocket = sockets.get(roomId);
  if (typeof foundSocket !== 'undefined') {
    Array.from(foundSocket.values()).forEach((socket) => {
      socket.send(JSON.stringify(updatedRoom));
    });
  }

  return updatedRoom;
}

export function resetRoomCards(roomId: string) {
  const roomMap = getRoomMap();
  const maybeRoom = roomMap.get(roomId);

  if (typeof maybeRoom === 'undefined')
    throw new Error('room not found -- resetRoomCards');

  const newDisplays = [...maybeRoom.displays].map((display) => ({
    ...display,
    cardValue: 0,
  }));

  roomMap.set(roomId, { ...maybeRoom, displays: newDisplays });

  const updatedRoom = roomMap.get(maybeRoom.id);

  if (typeof updatedRoom === 'undefined')
    throw new Error('room not found -- resetRoomCards2');

  const sockets = getRoomSockets();

  const foundSocket = sockets.get(roomId);
  if (typeof foundSocket !== 'undefined') {
    Array.from(foundSocket.values()).forEach((socket) => {
      socket.send(JSON.stringify(updatedRoom));
    });
  }

  return updatedRoom;
}

export function removeRoomByName(roomName: string) {
  const roomMap = getRoomMap();
  const id = kebabStyle(roomName);
  roomMap.delete(id);
}

export function removeRoomById(roomId: string) {
  const roomMap = getRoomMap();
  roomMap.delete(roomId);
}

export function getDisplayInRoom(roomId: string, displayName: string) {
  const maybeRoom = getRoomById(roomId);

  if (typeof maybeRoom === 'undefined')
    throw new Error('room not found -- getDisplayInRoom');

  return maybeRoom.displays.find((display) => display.name === displayName);
}

export function addOrUpdateDisplay(roomId: string, display: Display) {
  const roomMap = getRoomMap();
  const oldRoom = roomMap.get(roomId);

  if (typeof oldRoom === 'undefined')
    throw new Error('room not found -- addOrUpdateDisplay');

  const newDisplays = [...oldRoom.displays];

  const foundDisplayIndex = newDisplays.findIndex(
    (newDisplays) => display.name === newDisplays.name
  );

  if (foundDisplayIndex < 0) {
    newDisplays.push(display);
  } else {
    newDisplays.splice(foundDisplayIndex, 1, display);
  }

  roomMap.set(oldRoom.id, { ...oldRoom, displays: newDisplays });

  const updatedRoom = roomMap.get(oldRoom.id);

  if (typeof updatedRoom === 'undefined')
    throw new Error('room not found -- addOrUpdateDisplay2');

  const sockets = getRoomSockets();

  const foundSocket = sockets.get(roomId);
  if (typeof foundSocket !== 'undefined') {
    Array.from(foundSocket.values()).forEach((socket) => {
      socket.send(JSON.stringify(updatedRoom));
    });
  }

  return updatedRoom;
}

export function updateDisplayCardValue(
  roomId: string,
  displayToUpdate: Pick<Display, 'name' | 'cardValue'>
) {
  const roomMap = getRoomMap();
  const oldRoom = roomMap.get(roomId);

  if (typeof oldRoom === 'undefined')
    throw new Error('room not found -- addOrUpdateDisplay');

  const newDisplays = [...oldRoom.displays];

  const foundDisplayIndex = newDisplays.findIndex(
    (newDisplays) => displayToUpdate.name === newDisplays.name
  );

  if (foundDisplayIndex < 0)
    throw new Error('existing display not found -- updateDisplayCardValue');
  const foundDisplay = newDisplays[foundDisplayIndex];

  newDisplays.splice(foundDisplayIndex, 1, {
    ...foundDisplay,
    cardValue: displayToUpdate.cardValue,
  });

  roomMap.set(oldRoom.id, { ...oldRoom, displays: newDisplays });

  const updatedRoom = roomMap.get(oldRoom.id);

  if (typeof updatedRoom === 'undefined')
    throw new Error('room not found -- addOrUpdateDisplay2');

  const sockets = getRoomSockets();

  const foundSocket = sockets.get(roomId);

  if (typeof foundSocket !== 'undefined') {
    Array.from(foundSocket.values()).forEach((socket) => {
      socket.send(JSON.stringify(updatedRoom));
    });
  }

  return updatedRoom;
}
