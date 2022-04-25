import { Router } from 'express';
import getPolicies from './controllers';
const router = Router();

router.get("/policies", getPolicies)

export default router