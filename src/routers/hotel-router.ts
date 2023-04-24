import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getHotels, getRoomsByHotelId } from '@/controllers';

const hotelRouter = Router();

hotelRouter.all('/*', authenticateToken).get('/', getHotels).get('/:hotelId', getRoomsByHotelId);

export { hotelRouter };
