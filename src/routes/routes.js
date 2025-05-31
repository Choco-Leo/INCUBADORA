import { Router } from "express";
import { reportEvent } from "../controller/reportEventControll.js";
import { changeLimits } from "../controller/changeLimitControll.js";
import { getTableError } from "../controller/getTableErrorContoll.js";
import { verifyConnection } from "../controller/authConx.js";

const router = Router();                            

router.post('/ControlESP/ReportarEvento', reportEvent);
router.post('/ControlESP/ObtenerLimites', changeLimits);
router.post('/ControlESP/VerConx', verifyConnection);

router.get('/ControlESP/TableError', getTableError);
router.get('/ControlESP', (req, res) => {
    res.sendFile(process.cwd() + '/pages/statusESP/status.html');
});

export default router;