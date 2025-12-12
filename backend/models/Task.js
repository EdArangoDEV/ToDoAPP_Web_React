const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  tipo: { type: String, enum: ['trabajo', 'casa', 'negocios'], required: true },
  completada: { type: Boolean, default: false },
  fechaCreacion: { type: Date, default: Date.now },
  fechaCompletada: { type: Date }
});

module.exports = mongoose.model('Task', taskSchema);
