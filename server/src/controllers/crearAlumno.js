const { Alumno, Materia } = require('../db');

module.exports = {
  crearAlumno: async (req, res) => {
    const {
      nombre,
      generación,
      estado_civil,
      ubicacion_laboral,
      trabajo,
      puesto,
      telefono,
      correo,
      estado,
      año
    } = req.body;

    try {
      // Crear un nuevo alumno o encontrar un alumno existente
      const alumno = await Alumno.create({
        nombre,
        generación,
        estado_civil,
        ubicacion_laboral,
        trabajo,
        puesto,
        telefono,
        correo,
        estado,
        año
      });

      // Obtener todas las materias
      const todasLasMaterias = await Materia.findAll();

      // Asociar todas las materias al alumno (ya sea creado o existente)
      await Promise.all(
        todasLasMaterias.map((materia) => {
          return alumno.addMateria(materia);
        })
      );

      console.log('Alumno creado o existente con todas las materias asociadas');
      res.status(200).send(alumno);
    } catch (error) {
      console.error('Error al crear/al asociar alumno:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
