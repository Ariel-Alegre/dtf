const { Alumno, Materia } = require('../db');

module.exports = {
  DeleteAlumno: async (req, res) => {
    const {alumnoId} = req.params
  

    try {
        const alumno = await Alumno.findByPk(alumnoId);

        await alumno.destroy();
        res.status(200).send(alumno)
        console.log('Alumno eliminada exitosamente');
    } catch (error) {
      console.error('Error al actualizar alumno:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
