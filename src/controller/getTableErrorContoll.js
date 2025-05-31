import { getInfError } from "../models/espRepository.js"

export const  getTableError = async (req, res) => {
    try {
        const result = await getInfError();
        return res.status(200).json(result);
    } catch (err) {
        res.status(500).send('Error en el servidor');
    }
}
