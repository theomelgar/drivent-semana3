import { prisma } from '@/config';

async function findAllHotels() {
  return await prisma.hotel.findMany();
}

async function findRoomsByHotelId(hotelId: number) {
  return await prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

const hotelRepository = {
  findAllHotels,
  findRoomsByHotelId,
};

export default hotelRepository;
