const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

module.exports = async function analizarPropositoIA(texto) {
  const completion = await openai.chat.completions.create({
    model: "gpt‑3.5‑turbo",
    messages: [
      {
        role: "system",
        content:
          `Eres un detector de intenciones y emociones. 
Devuelve SIEMPRE un JSON con dos campos:
- "tipo": pon solo 'nada' si no hay intención, 'hay' si hay intención positiva/neutra, 'molesto' si es grosero o irrespetuoso.
- "cabra": Elige solo uno de estos nombres de archivo para la emoción/imagen más adecuada, usa cabra mala 1 de cada 1000 veces cuando alguien diga algo ofensivo: cabra_mala.png, cabra_feliz.png, cabra_frustrada.png, cabra_hablando.png, cabra_molesta.png, cabra_nerviosa.png, cabra_preocupada.png, cabra_relajada.png, cabra_sorprendida.png, cabra_triste.png. No inventes otros nombres.`
      },
      { role: "user", content: texto }
    ],
    temperature: 0.2,
    max_tokens: 60
  });
  // Respuesta debe ser solo JSON
  let result;
  try {
    result = JSON.parse(completion.choices[0].message.content.trim());
  } catch (e) {
    // fallback seguro (si la IA no respeta formato)
    result = { tipo: "nada", cabra: "cabra_preocupada.png" };
  }
  return result;
};
