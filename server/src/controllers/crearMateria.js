const { Materia } = require('../db');

module.exports = {
    crearMateria: async (req, res) => {
        const {name } = req.body
        try {
            const materiaCreado = await Materia.create({
                name
            })

            console.log('materia creado');

            res.send(materiaCreado)
            
        } catch (error) {
            console.error('Error al crear materia:', error);
            res.send({message: 'error en el servidor'})
        }
    }
}