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

        if (!response.ok) {
            throw new Error(`GitHub API error (GET): ${response.status} ${response.statusText}`);
        }

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

        if (!updateResponse.ok) {
            throw new Error(`GitHub API error (PUT): ${updateResponse.status} ${updateResponse.statusText}`);
        }

        const result = await updateResponse.json();

        res.status(200).json({ message: 'Archivo JSON actualizado con éxito.', result });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
};
