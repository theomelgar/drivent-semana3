import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotel-service';

export async function getHotels(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as { userId: number };

  try {
    const { hotels } = await hotelsService.getHotels(userId);

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === 'InvalidDataError') return res.status(httpStatus.BAD_REQUEST).send(error.message);

    next(error);
  }
}

export async function getRoomsByHotelId(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { hotelId } = req.params;
  const { userId } = req as { userId: number };

  try {
    const { rooms } = await hotelsService.getRoomsByHotelId(Number(hotelId), userId);

    return res.status(httpStatus.OK).send(rooms);
  } catch (error) {
    if (error.name === 'InvalidDataError') return res.status(httpStatus.BAD_REQUEST).send(error.message);

    next(error);
  }
}
