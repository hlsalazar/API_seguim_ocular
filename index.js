const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.post('/saveData', (req, res) => {
    const data = req.body;
    const filePath = path.join(__dirname, 'data.json');

    fs.readFile(filePath, 'utf8', (err, fileData) => {
        if (err && err.code !== 'ENOENT') {
            res.status(500).send({ message: 'Error al leer el archivo' });
            return;
        }

        let jsonData = [];
        if (fileData) {
            jsonData = JSON.parse(fileData);
        }

        jsonData.push(data);

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                res.status(500).send({ message: 'Error al guardar el archivo' });
                return;
            }
            res.send({ message: 'Datos guardados' });
        });
    });
});

app.get('/data', (req, res) => {
    const filePath = path.join(__dirname, 'data.json');

    fs.readFile(filePath, 'utf8', (err, fileData) => {
        if (err) {
            res.status(500).send({ message: 'Error al leer el archivo' });
            return;
        }

        res.send(fileData);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
