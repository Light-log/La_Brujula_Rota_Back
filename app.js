const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const propositoRoutes = require('./routes/propositoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URL || 'mongodb://localhost:27017/labrujularota';
mongoose.connect(mongoUri)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error(err));

app.use('/api/propositos', propositoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
