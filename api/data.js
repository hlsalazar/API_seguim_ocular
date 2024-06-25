module.exports = (req, res) => {
    res.status(200).json({
      message: 'Hello from the API!',
      data: [1, 2, 3, 4, 5]
    });
  };
  