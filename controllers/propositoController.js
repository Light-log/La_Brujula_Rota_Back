const intencionRespuestas = require('../responses/intencion');
const nadaRespuestas = require('../responses/nada');
const molestoRespuestas = require('../responses/molesto');
const analizarPropositoIA = require('../services/analizarPropositoIA');

// Ahora reemplazamos el placeholder ${texto} por el texto real del usuario
function getRandomRespuesta(arr, textoUsuario) {
  const plantilla = arr[Math.floor(Math.random() * arr.length)];
  return plantilla.replace(/\$\{texto\}/g, textoUsuario);
}

exports.crearProposito = async (req, res) => {
  const { texto } = req.body;
  if (!texto) return res.status(400).json({ error: "Falta texto" });

  // Recibe JSON: { tipo: '...', cabra: '...' }
  const analisis = await analizarPropositoIA(texto);

  let respuesta;
  if (analisis.tipo === 'nada') {
    respuesta = getRandomRespuesta(nadaRespuestas, texto);
  } else if (analisis.tipo === 'molesto') {
    respuesta = getRandomRespuesta(molestoRespuestas, texto);
  } else if (analisis.tipo === 'hay') {
    respuesta = getRandomRespuesta(intencionRespuestas, texto);
  } else {
    respuesta = "No pude analizar tu propósito.";
  }

  res.json({ tipo: analisis.tipo, respuesta, cabra: analisis.cabra });
};
