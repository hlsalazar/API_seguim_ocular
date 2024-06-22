export default async (req, res) => {
    if (req.method === 'POST') {
      const encodedData = req.body.data;
      console.log('Received data:', encodedData);
  
      // Puedes almacenar los datos en una base de datos, en memoria, o en un archivo
  
      // Por simplicidad, vamos a almacenar los datos en una variable global
      global.receivedData = encodedData;
  
      res.status(200).json({ message: 'Datos recibidos correctamente' });
    } else if (req.method === 'GET') {
      // Devuelve los datos almacenados
      res.status(200).json({ data: global.receivedData });
    } else {
      res.status(405).json({ message: 'Método no permitido' });
    }
  };
  