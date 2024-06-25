import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const filePath = path.join(process.cwd(), 'data.json');

        fs.readFile(filePath, 'utf8', (err, fileData) => {
            if (err && err.code !== 'ENOENT') {
                res.status(500).json({ message: 'Error al leer el archivo' });
                return;
            }

            let jsonData = [];
            if (fileData) {
                jsonData = JSON.parse(fileData);
            }

            jsonData.push(data);

            fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
                if (err) {
                    res.status(500).json({ message: 'Error al guardar el archivo' });
                    return;
                }
                res.status(200).json({ message: 'Datos guardados' });
            });
        });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
