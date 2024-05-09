const { Prices } = require('../db');

module.exports = {
  AllPrices: async (req, res) => {
    try {


      const prices = await Prices.findAll(); // Buscar el registro existente

      if (!prices) {
   console.log('No existen los precios')
   return res.status(200).json({ success: false, message: 'No existen los precios' });
     
      } 
   console.log('Precios actualizados correctamente')
      return  res.status(200).json({ success: true, data: prices });
    } catch (error) {
      console.error('Error al actualizar precios:', error);
      res.status(500).json({ error: 'Error al actualizar precios' });
    }
  }
};
