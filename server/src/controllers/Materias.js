const { Alumno, Materia } = require('../db');

module.exports = {
    Materias: async (req, res) => {
        try {
            // Obtener todos los alumnos con sus materias asociadas
            const materias = await Materia.findAll({
                order: [['createdAt', 'ASC']]

            });

            console.log('Todos las materias');

            res.json(materias);
        } catch (error) {
            console.error('Error al mostrar las materias:', error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    }
};
