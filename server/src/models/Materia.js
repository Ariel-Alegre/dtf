// models/Materia.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Materia', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nota1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nota2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nota3: {
      type: DataTypes.STRING,
      allowNull: true,
    },

  
    
    
  });
};
