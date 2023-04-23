import { RoomMapServer } from 'planning-poker-types';

let roomMap: Map<string, RoomMapServer> | undefined;

/**
 * ttl is milliseconds left for this item to live.
 * Defaults to 24 hours.
 */
export function getRoomMap() {
  if (typeof roomMap === 'undefined') {
    roomMap = new Map<string, RoomMapServer>();
  }

  cleanupRoomMap(roomMap);

  return roomMap;
}

function cleanupRoomMap(roomMap: Map<string, RoomMapServer>) {
  const items = Array.from(roomMap.values());
  const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;

  items.forEach((item) => {
    if (item.ttl < twentyFourHoursAgo) {
      roomMap.delete(item.id);
    }
  });
}
