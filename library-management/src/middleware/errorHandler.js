const errorHandler = (err, req, res, next) => {
    console.error(err); // Hatanın konsola yazdırılması
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
  };
  
  module.exports = errorHandler;
  