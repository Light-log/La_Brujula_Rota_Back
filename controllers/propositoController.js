const PropositoAnalized = require('../models/PropositoAnalized');

// Groserías y lógica simple de emoción
const groserias = [
  "mierda", "joder", "puta", "imbécil", "tonto",
  "coño", "gilipollas", "estúpido", "pendejo", "idiota"
];

function analizarSentimiento(texto) {
  const lower = texto.toLowerCase();

  if (groserias.some(g => lower.includes(g))) {
    return { tipo: "groseria", emocion: "molesta" };
  }

  // Ejemplo simple de emociones:
  if (lower.includes("feliz") || lower.includes("lograr") || lower.includes("sueño")) return { tipo: "ok", emocion: "feliz" };
  if (lower.includes("triste") || lower.includes("fracaso")) return { tipo: "ok", emocion: "triste" };
  if (lower.includes("nervioso") || lower.includes("ansioso")) return { tipo: "ok", emocion: "nerviosa" };
  if (lower.includes("molesto") || lower.includes("enojo") || lower.includes("rabia")) return { tipo: "ok", emocion: "molesta" };
  if (lower.includes("relajar") || lower.includes("descansar")) return { tipo: "ok", emocion: "relajada" };
  if (lower.includes("sorprendido") || lower.includes("sorprender")) return { tipo: "ok", emocion: "sorprendida" };
  if (lower.includes("preocupado") || lower.includes("preocupar")) return { tipo: "ok", emocion: "preocupada" };
  if (lower.includes("frustrado") || lower.includes("frustrar")) return { tipo: "ok", emocion: "frustrada" };
  if (lower.includes("hablar") || lower.includes("decir")) return { tipo: "ok", emocion: "hablando" };
  return { tipo: "ok", emocion: "feliz" };
}

exports.crearProposito = async (req, res) => {
  const { texto } = req.body;
  if (!texto) return res.status(400).json({ error: "Falta texto" });

  const analisis = analizarSentimiento(texto);

  // Guarda en la base de datos
  const proposito = new PropositoAnalized({
    texto,
    emocion: analisis.emocion,
    tipo: analisis.tipo
  });

  await proposito.save();

  res.json({
    ...analisis,
    mensaje: analisis.tipo === "groseria"
      ? "Por favor, responde de forma respetuosa."
      : "Propósito recibido",
    propositoId: proposito._id
  });
};

// Consultar historial
exports.obtenerPropositos = async (req, res) => {
  const lista = await PropositoAnalized.find().sort({ fecha: -1 }).limit(30);
  res.json(lista);
};
