const express = require('express');
const cors = require('cors');
const propositoRoutes = require('./routes/propositoRoutes');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URL;
mongoose.connect(mongoUri)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error(err));

app.use('/api/propositos', propositoRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
