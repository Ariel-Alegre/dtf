const { Materia, Alumno } = require('../db');

module.exports = {
  notasAlumnos: async (req, res) => {
    const { alumnoId, materiaId } = req.params;
    const { nota1, nota2, nota3 } = req.body;

    try {
      // Obtener la materia por su ID
      const alumno  = await Alumno.findByPk(alumnoId);


      // Actualizar las notas de la materia
  const materia  = await Materia.findByPk(materiaId);
await materia.update({
  nota1,
  nota2,
  nota3,
}),



console.log('Notas de los alumnos actualizadas correctamente');
res.json({ materia });

      // Respond with success
    } catch (error) {
      console.error('Error al poner las notas de los alumnos:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
