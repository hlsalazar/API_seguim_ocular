const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const url = 'https://api.github.com/repos/hlsalazar/API_seguim_ocular/contents/data/data.json';
    const token = process.env.OCULAR_API_KEY;
    const newContent = req.body;

    try {
        // Obtener el archivo actual para recuperar el SHA
        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${token}`
            }
        });

        const fileData = await response.json();

        // Codificar el nuevo contenido en base64
        const updatedContent = Buffer.from(JSON.stringify(newContent)).toString('base64');

        // Preparar el payload para la actualización
        const updatePayload = {
            message: 'Actualizar archivo JSON',
            content: updatedContent,
            sha: fileData.sha
        };

        // Actualizar el archivo en GitHub
        const updateResponse = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatePayload)
        });

        if (updateResponse.ok) {
            res.status(200).json({ message: 'Archivo JSON actualizado con éxito.' });
        } else {
            res.status(updateResponse.status).json({ error: updateResponse.statusText });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el archivo JSON' });
    }
};
