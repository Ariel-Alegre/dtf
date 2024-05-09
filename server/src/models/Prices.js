const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Prices', {
    id: {
      type:DataTypes.INTEGER, 
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    Design: {
        type: DataTypes.DECIMAL(10, 2), // 10 dígitos en total, 2 decimales
    },
    Impression: {
        type: DataTypes.DECIMAL(10, 2), // 10 dígitos en total, 2 decimales
    },

  }, { timestamps: false } );
};
