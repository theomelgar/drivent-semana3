import hotelRepository from '@/repositories/hotel-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import { invalidDataError, notFoundError, paymentRequiredError } from '@/errors';

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByUserId(userId);

  if (!ticket) throw notFoundError();

  if (ticket.status === 'RESERVED') throw paymentRequiredError();

  const hotels = await hotelRepository.findAllHotels();

  if (!hotels) throw notFoundError();

  return { hotels };
}

async function getRoomsByHotelId(hotelId: number, userId: number) {
  if (!hotelId) throw invalidDataError(['hotel ID must be provided']);

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByUserId(userId);

  if (!ticket) throw notFoundError();

  if (ticket.status === 'RESERVED') throw paymentRequiredError();

  const rooms = await hotelRepository.findRoomsByHotelId(hotelId);

  return { rooms };
}

const hotelsService = {
  getHotels,
  getRoomsByHotelId,
};

export default hotelsService;
