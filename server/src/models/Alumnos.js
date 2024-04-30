// models/Alumno.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Alumno', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    generación: {
      type: DataTypes.STRING,
    },
    estado_civil: {
      type: DataTypes.STRING,
    },
    ubicacion_laboral: {
      type: DataTypes.STRING,
    },


    trabajo: {
      type: DataTypes.STRING,
    },
    puesto: {
      type: DataTypes.STRING,
    },

  

    telefono: {
      type: DataTypes.STRING,
    },

    correo: {
      type: DataTypes.STRING,
    },
    año: {
      type: DataTypes.STRING,
    },


    estado: {
      type: DataTypes.STRING,
    },

  });
};
