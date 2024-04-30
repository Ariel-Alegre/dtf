const { Alumno, Materia } = require('../db');

module.exports = {
    Alumnos: async (req, res) => {
        try {
            // Obtener todos los alumnos con sus materias asociadas
            const Alumnos = await Alumno.findAll({
                include: [{
                    model: Materia,
                

                },
            
            ],
            order: [['createdAt', 'ASC']]
            });

            console.log('Todos los alumnos con sus materias');

            res.json(Alumnos);
        } catch (error) {
            console.error('Error al mostrar todos los alumnos:', error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    }
};
