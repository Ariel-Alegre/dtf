const { Alumno, Materia } = require('../db');

module.exports = {
  UpdateAlumno: async (req, res) => {
    const {alumnoId} = req.params
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
    } = req.body;

    try {
        const alumno= await Alumno.findByPk(alumnoId);
    

      if (nombre) alumno.nombre = nombre;
      if (generación) alumno.generación = generación;
      if (estado_civil) alumno.estado_civil = estado_civil;
      if (ubicacion_laboral) alumno.ubicacion_laboral = ubicacion_laboral;
      if (trabajo) alumno.trabajo = trabajo;
      if (puesto) alumno.puesto = puesto;
      if (telefono) alumno.telefono = telefono;
      if (correo) alumno.correo = correo;
      if (estado) alumno.estado = estado;
     
      // Guardar los cambios en la base de datos sin cambiar la posición
      await alumno.save();

      console.log('Alumno Actualizado');
      res.status(200).send(alumno);
    } catch (error) {
      console.error('Error al actualizar alumno:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
