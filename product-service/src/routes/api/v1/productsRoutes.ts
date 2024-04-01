import express from 'express';
const router = express.Router();

import getAll from '../../../controllers/productsController/get-all-controller'
import get from '../../../controllers/productsController/get-controller'
import search from '../../../controllers/productsController/search-controller'

router.get('/', getAll);
router.get('/search', search);
router.get('/:id', get);

export default router