const { Prices } = require('../db');

module.exports = {
  updatePrices: async (req, res) => {
    try {
      const { designPrice, impressionPrice } = req.body;

      if (!designPrice || !impressionPrice) {
        console.log("Se requieren los precios de diseño e impresión")
        return res.status(400).json({ error: 'Se requieren los precios de diseño e impresión' });
      }

      const prices = await Prices.findOne(); // Buscar el registro existente

      if (!prices) {
        // Si no existe, crear un nuevo registro
        await Prices.create({ Design: designPrice, Impression: impressionPrice });
      } else {
        // Si existe, actualizar los precios
        await prices.update({ Design: designPrice, Impression: impressionPrice });
      }
   console.log('Precios actualizados correctamente')
      res.status(200).json({ success: true, message: 'Precios actualizados correctamente' });
    } catch (error) {
      console.error('Error al actualizar precios:', error);
      res.status(500).json({ error: 'Error al actualizar precios' });
    }
  }
};
