const { Alumno, Materia } = require('../db');

module.exports = {
    detailsAlumnos: async (req, res) => {
        const {alumnoId} = req.params;
        try {
            // Obtener todos los alumnos con sus materias asociadas
            const detailAlumnos = await Alumno.findByPk(alumnoId,{
                include: [{
                    model: Materia,
                }],
            });

            console.log('Detalles del alumno');

            res.json(detailAlumnos);
        } catch (error) {
            console.error('Error al mostrar detalles los alumnos:', error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    }
};
