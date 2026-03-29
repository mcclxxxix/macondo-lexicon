import { useState, useEffect, useRef, useCallback } from "react";

// ─── Márquez Lines (English + Spanish pairs) ───
const MARQUEZ_LINES = [
  { en: "He really had been through death, but he had returned because he could not bear the solitude.", es: "Realmente había estado en la muerte, pero había regresado porque no podía soportar la soledad." },
  { en: "It is not true that people stop pursuing dreams because they grow old, they grow old because they stop pursuing dreams.", es: "No es cierto que la gente deja de perseguir sueños porque envejece, envejece porque deja de perseguir sueños." },
  { en: "Nobody deserves your tears, but whoever deserves them will not make you cry.", es: "Nadie merece tus lágrimas, pero quien las merece no te hará llorar." },
  { en: "A person doesn't die when he should but when he can.", es: "Una persona no muere cuando debe sino cuando puede." },
  { en: "The secret of a good old age is simply an honorable pact with solitude.", es: "El secreto de una buena vejez no es otra cosa que un pacto honrado con la soledad." },
  { en: "Wisdom comes to us when it can no longer do any good.", es: "La sabiduría nos llega cuando ya no nos sirve para nada." },
  { en: "Always remember that the most important thing in a good marriage is not happiness, but stability.", es: "Recuerda siempre que lo más importante en un buen matrimonio no es la felicidad, sino la estabilidad." },
  { en: "Human beings are not born once and for all on the day their mothers give birth to them, life obliges them over and over again to give birth to themselves.", es: "Los seres humanos no nacen para siempre el día que sus madres los alumbran, la vida los obliga a parirse a sí mismos una y otra vez." },
  { en: "What matters in life is not what happens to you but what you remember and how you remember it.", es: "Lo que importa en la vida no es lo que te sucede sino lo que recuerdas y cómo lo recuerdas." },
  { en: "The only regret I will have in dying is if it is not for love.", es: "El único arrepentimiento que tendré al morir es si no es por amor." },
  { en: "Nowhere in the world do people age as quickly as in photographs.", es: "En ningún lugar del mundo se envejece tan rápido como en las fotografías." },
  { en: "He who awaits much can expect little.", es: "Quien espera mucho puede esperar poco." },
  { en: "The heart's memory eliminates the bad and magnifies the good.", es: "La memoria del corazón elimina lo malo y magnifica lo bueno." },
  { en: "There is always something left to love.", es: "Siempre hay algo que queda por amar." },
  { en: "No matter what, nobody can take away the dances you've already had.", es: "Pase lo que pase, nadie te puede quitar los bailes que ya tuviste." },
  { en: "All human beings have three lives: public, private, and secret.", es: "Todos los seres humanos tienen tres vidas: pública, privada y secreta." },
  { en: "One minute of reconciliation is worth more than a whole life of friendship.", es: "Un minuto de reconciliación vale más que toda una vida de amistad." },
  { en: "Age has no reality except in the physical world.", es: "La edad no tiene realidad excepto en el mundo físico." },
  { en: "A true friend is the one who holds your hand and touches your heart.", es: "Un verdadero amigo es el que toma tu mano y toca tu corazón." },
  { en: "Memories of the heart eliminate the bad and magnify the good, and thanks to this we manage to bear the burden of the past.", es: "Los recuerdos del corazón eliminan lo malo y magnifican lo bueno, y gracias a eso logramos sobrellevar la carga del pasado." }
];

// ─── Vocabulary (English + Spanish sentences) ───
const VOCAB_LIBRARY = [
  {
    word: "Soledad",
    definition: "Solitude; loneliness — a central theme in One Hundred Years of Solitude",
    sentenceEn: "The Buendía family was cursed with a century of solitude.",
    sentenceEs: "La familia Buendía fue maldecida con un siglo de soledad.",
    difficulty: "intermediate",
    category: "Emotion"
  },
  {
    word: "Mariposa",
    definition: "Butterfly — yellow butterflies follow Mauricio Babilonia everywhere in the novel",
    sentenceEn: "A cloud of yellow butterflies filled the workshop whenever he appeared.",
    sentenceEs: "Una nube de mariposas amarillas llenaba el taller cada vez que él aparecía.",
    difficulty: "beginner",
    category: "Nature"
  },
  {
    word: "Nostalgia",
    definition: "A wistful longing for the past — borrowed into Spanish from Greek",
    sentenceEn: "Colonel Buendía felt an overwhelming nostalgia for the old laboratory.",
    sentenceEs: "El coronel Buendía sintió una nostalgia abrumadora por el viejo laboratorio.",
    difficulty: "beginner",
    category: "Emotion"
  },
  {
    word: "Alquimia",
    definition: "Alchemy — the pursuit of turning base metals into gold, a recurring Buendía obsession",
    sentenceEn: "José Arcadio Buendía spent years locked in his room practicing alchemy.",
    sentenceEs: "José Arcadio Buendía pasó años encerrado en su cuarto practicando alquimia.",
    difficulty: "advanced",
    category: "Science"
  },
  {
    word: "Diluvio",
    definition: "Deluge; flood — the years-long rain that devastates Macondo",
    sentenceEn: "The deluge lasted four years, eleven months, and two days.",
    sentenceEs: "El diluvio duró cuatro años, once meses y dos días.",
    difficulty: "intermediate",
    category: "Nature"
  },
  {
    word: "Pergamino",
    definition: "Parchment — Melquíades writes the Buendía prophecy on ancient parchments",
    sentenceEn: "The final Buendía deciphered the parchments at last.",
    sentenceEs: "El último Buendía descifró los pergaminos por fin.",
    difficulty: "advanced",
    category: "Object"
  },
  {
    word: "Olvido",
    definition: "Oblivion; forgetting — the insomnia plague causes collective memory loss",
    sentenceEn: "The plague of forgetting forced them to label everything in the house.",
    sentenceEs: "La plaga del olvido los obligó a etiquetar todo en la casa.",
    difficulty: "intermediate",
    category: "Emotion"
  },
  {
    word: "Encanto",
    definition: "Enchantment; charm — the magical quality that pervades Macondo",
    sentenceEn: "Remedios the Beauty possessed an irresistible enchantment.",
    sentenceEs: "Remedios la Bella poseía un encanto irresistible.",
    difficulty: "beginner",
    category: "Emotion"
  },
  {
    word: "Fantasma",
    definition: "Ghost; phantom — the dead return as specters throughout the novel",
    sentenceEn: "Prudencio Aguilar appeared as a ghost, lonely and desperate for company.",
    sentenceEs: "Prudencio Aguilar apareció como un fantasma, solitario y desesperado por compañía.",
    difficulty: "beginner",
    category: "Supernatural"
  },
  {
    word: "Laberinto",
    definition: "Labyrinth; maze — echoing the cyclical, inescapable fate of the Buendías",
    sentenceEn: "The general wandered through the labyrinth of his fading memories.",
    sentenceEs: "El general vagaba por el laberinto de sus recuerdos desvanecidos.",
    difficulty: "intermediate",
    category: "Place"
  },
  {
    word: "Presagio",
    definition: "Omen; premonition — signs of fate that characters sense but cannot escape",
    sentenceEn: "The ice was an omen of the wonders yet to come to Macondo.",
    sentenceEs: "El hielo fue un presagio de las maravillas que llegarían a Macondo.",
    difficulty: "advanced",
    category: "Supernatural"
  },
  {
    word: "Destierro",
    definition: "Exile; banishment — the founding journey to Macondo is itself an exile",
    sentenceEn: "Their exile led them through swamps and jungles to found a new village.",
    sentenceEs: "Su destierro los llevó por pantanos y selvas para fundar un nuevo pueblo.",
    difficulty: "advanced",
    category: "Place"
  },
  {
    word: "Insomnio",
    definition: "Insomnia — the mysterious plague that robs Macondo of sleep and memory",
    sentenceEn: "The plague of insomnia spread silently from house to house.",
    sentenceEs: "La plaga del insomnio se extendió silenciosamente de casa en casa.",
    difficulty: "intermediate",
    category: "Condition"
  },
  {
    word: "Torbellino",
    definition: "Whirlwind — the apocalyptic wind that erases Macondo from existence",
    sentenceEn: "A biblical whirlwind swept the city of mirrors from the face of the earth.",
    sentenceEs: "Un torbellino bíblico arrasó la ciudad de los espejos de la faz de la tierra.",
    difficulty: "advanced",
    category: "Nature"
  },
  {
    word: "Estirpe",
    definition: "Lineage; bloodline — the dynastic thread connecting every Buendía",
    sentenceEn: "The lineage was condemned to one hundred years of solitude.",
    sentenceEs: "La estirpe fue condenada a cien años de soledad.",
    difficulty: "advanced",
    category: "Family"
  },
  {
    word: "Amanecer",
    definition: "Dawn; daybreak — moments of revelation and new beginnings",
    sentenceEn: "At that distant dawn, Macondo was a village of twenty adobe houses.",
    sentenceEs: "En aquel amanecer lejano, Macondo era una aldea de veinte casas de barro.",
    difficulty: "beginner",
    category: "Nature"
  }
];

const QUIZ_TYPES = ["definition", "sentence", "reverse"];

// ─── Utility ───
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── Speech Helpers ───
function getVoice(langPrefix) {
  const voices = window.speechSynthesis?.getVoices() || [];
  return voices.find(v => v.lang.startsWith(langPrefix)) || voices[0] || null;
}

function speakText(text, lang, onEnd) {
  const synth = window.speechSynthesis;
  if (!synth) { onEnd?.(); return; }
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = lang.startsWith("es") ? 0.82 : 0.92;
  u.volume = 1;
  const v = getVoice(lang.slice(0, 2));
  if (v) u.voice = v;
  if (onEnd) u.onend = onEnd;
  u.onerror = () => onEnd?.();
  synth.speak(u);
}

/** Speak full English sentence, pause, then full Spanish sentence */
function speakBilingual(enText, esText, onDone) {
  speakText(enText, "en-US", () => {
    setTimeout(() => {
      speakText(esText, "es-ES", onDone);
    }, 500);
  });
}

/** Listen for speech via Web Speech Recognition API */
function listenForSpeech(lang = "en-US", timeout = 7000) {
  return new Promise((resolve) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { resolve(null); return; }
    const rec = new SpeechRecognition();
    rec.lang = lang;
    rec.interimResults = false;
    rec.maxAlternatives = 3;
    let resolved = false;
    const timer = setTimeout(() => {
      if (!resolved) { resolved = true; rec.abort(); resolve(null); }
    }, timeout);
    rec.onresult = (e) => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timer);
        resolve(e.results[0][0].transcript.toLowerCase().trim());
      }
    };
    rec.onerror = () => { if (!resolved) { resolved = true; clearTimeout(timer); resolve(null); } };
    rec.onend = () => { if (!resolved) { resolved = true; clearTimeout(timer); resolve(null); } };
    rec.start();
  });
}

// ─── Components ───

function GoldButterfly({ style }) {
  return (
    <span style={{
      position: "absolute", fontSize: "1.4rem", opacity: 0.15,
      pointerEvents: "none", animation: "float 8s ease-in-out infinite", ...style
    }}>🦋</span>
  );
}

function MarquezLineModal({ line, onClose }) {
  const [speaking, setSpeaking] = useState(false);

  const speakLine = useCallback(() => {
    setSpeaking(true);
    speakBilingual(line.en, line.es, () => setSpeaking(false));
  }, [line]);

  useEffect(() => { speakLine(); }, [speakLine]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(15,10,5,0.85)", backdropFilter: "blur(6px)",
      animation: "fadeIn 0.5s ease"
    }}>
      <div style={{
        background: "linear-gradient(135deg, #1a1408 0%, #2a1f0e 50%, #1a1408 100%)",
        border: "1px solid #8b6914", borderRadius: 16,
        padding: "48px 40px", maxWidth: 560, width: "90%", textAlign: "center",
        boxShadow: "0 0 60px rgba(139,105,20,0.3), inset 0 0 30px rgba(139,105,20,0.05)",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, transparent, #d4a017, transparent)" }} />
        <div style={{ fontSize: "2rem", marginBottom: 20, opacity: 0.6 }}>🦋</div>
        <p style={{
          fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.2rem",
          lineHeight: 1.7, color: "#e8d5a3", fontStyle: "italic", margin: "0 0 14px 0"
        }}>"{line.en}"</p>
        <p style={{
          fontFamily: "'EB Garamond', Garamond, serif", fontSize: "1.05rem",
          lineHeight: 1.6, color: "#a89660", fontStyle: "italic", margin: "0 0 14px 0"
        }}>"{line.es}"</p>
        <p style={{
          fontFamily: "'EB Garamond', Garamond, serif", fontSize: "0.85rem",
          color: "#8b7a55", letterSpacing: 2, textTransform: "uppercase", margin: "16px 0 24px 0"
        }}>— Gabriel García Márquez</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button onClick={speakLine} disabled={speaking} style={{
            background: "rgba(139,105,20,0.15)", border: "1px solid #5a4a20",
            color: "#d4a017", padding: "10px 20px", borderRadius: 8,
            fontFamily: "'EB Garamond', serif", fontSize: "0.95rem", cursor: "pointer"
          }}>{speaking ? "🔊 Speaking..." : "🔊 Hear Again"}</button>
          <button onClick={() => { window.speechSynthesis?.cancel(); onClose(); }} style={{
            background: "linear-gradient(135deg, #8b6914, #d4a017)", border: "none",
            color: "#1a1408", padding: "10px 32px", borderRadius: 8,
            fontFamily: "'EB Garamond', serif", fontSize: "1rem", fontWeight: 700, cursor: "pointer"
          }}>Continue</button>
        </div>
      </div>
    </div>
  );
}

function MarquezPromptModal({ onYes, onNo }) {
  const [status, setStatus] = useState("speaking"); // speaking | listening | fallback
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    // Step 1: Ask aloud "Do you want a Márquez line?"
    speakText("Do you want a Márquez line?", "en-US", async () => {
      if (!mountedRef.current) return;

      // Step 2: Listen for spoken reply
      setStatus("listening");
      const reply = await listenForSpeech("en-US", 7000);
      if (!mountedRef.current) return;

      if (reply && (reply.includes("yes") || reply.includes("yeah") || reply.includes("sure") || reply.includes("ok") || reply.includes("please") || reply.includes("yep") || reply.includes("yup"))) {
        onYes();
      } else if (reply && (reply.includes("no") || reply.includes("nah") || reply.includes("not") || reply.includes("nope") || reply.includes("skip"))) {
        onNo();
      } else {
        // Didn't catch a clear answer — fall back to buttons
        setStatus("fallback");
      }
    });

    return () => { mountedRef.current = false; window.speechSynthesis?.cancel(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9998,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(15,10,5,0.75)", backdropFilter: "blur(4px)",
      animation: "fadeIn 0.4s ease"
    }}>
      <div style={{
        background: "linear-gradient(135deg, #1a1408 0%, #2a1f0e 100%)",
        border: "1px solid #5a4a20", borderRadius: 14,
        padding: "36px 40px", maxWidth: 420, width: "85%", textAlign: "center",
        boxShadow: "0 0 40px rgba(139,105,20,0.2)"
      }}>
        <div style={{ fontSize: "1.6rem", marginBottom: 16, opacity: 0.5 }}>✨</div>
        <p style={{
          fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.15rem",
          color: "#e8d5a3", margin: "0 0 8px 0", lineHeight: 1.6
        }}>Do you want a Márquez line?</p>

        {status === "speaking" && (
          <p style={{ color: "#6b5d3e", fontFamily: "'EB Garamond', serif", fontSize: "0.9rem", margin: "12px 0 0 0" }}>
            🔊 Speaking...
          </p>
        )}

        {status === "listening" && (
          <div style={{ margin: "16px 0 0 0" }}>
            <div style={{
              display: "inline-block", width: 14, height: 14, borderRadius: "50%",
              background: "#d4a017", animation: "pulse 1s ease-in-out infinite", marginBottom: 8
            }} />
            <p style={{ color: "#d4a017", fontFamily: "'EB Garamond', serif", fontSize: "0.95rem" }}>
              🎤 Listening — say "yes" or "no"
            </p>
          </div>
        )}

        {status === "fallback" && (
          <p style={{ color: "#6b5d3e", fontFamily: "'EB Garamond', serif", fontSize: "0.85rem", margin: "8px 0 16px 0" }}>
            I didn't catch that — tap below:
          </p>
        )}

        {/* Buttons always visible as fallback / accessibility */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: status === "fallback" ? 0 : 20 }}>
          <button onClick={() => { window.speechSynthesis?.cancel(); onYes(); }} style={{
            background: "linear-gradient(135deg, #8b6914, #d4a017)", border: "none",
            color: "#1a1408", padding: "10px 28px", borderRadius: 8,
            fontFamily: "'EB Garamond', serif", fontSize: "1rem", fontWeight: 700, cursor: "pointer"
          }}>Yes</button>
          <button onClick={() => { window.speechSynthesis?.cancel(); onNo(); }} style={{
            background: "transparent", border: "1px solid #5a4a20",
            color: "#8b7a55", padding: "10px 28px", borderRadius: 8,
            fontFamily: "'EB Garamond', serif", fontSize: "1rem", cursor: "pointer"
          }}>Not now</button>
        </div>
      </div>
    </div>
  );
}

function VoiceButton({ word, sentenceEn, sentenceEs }) {
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const load = () => synth.getVoices();
    load();
    synth.addEventListener("voiceschanged", load);
    return () => synth.removeEventListener("voiceschanged", load);
  }, []);

  const speakWord = useCallback(() => {
    setSpeaking(true);
    speakText(word, "es-ES", () => setSpeaking(false));
  }, [word]);

  const speakSentences = useCallback(() => {
    if (!sentenceEn || !sentenceEs) return;
    setSpeaking(true);
    speakBilingual(sentenceEn, sentenceEs, () => setSpeaking(false));
  }, [sentenceEn, sentenceEs]);

  return (
    <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
      <button onClick={speakWord} disabled={speaking} title="Hear word in Spanish" style={{
        background: "rgba(139,105,20,0.15)", border: "1px solid #5a4a20",
        color: "#d4a017", borderRadius: 8, padding: "6px 14px", cursor: "pointer",
        fontSize: "0.85rem", fontFamily: "'EB Garamond', serif",
        display: "flex", alignItems: "center", gap: 6, opacity: speaking ? 0.6 : 1
      }}>🔊 Word</button>
      {sentenceEn && sentenceEs && (
        <button onClick={speakSentences} disabled={speaking} title="Hear English then Spanish" style={{
          background: "rgba(139,105,20,0.08)", border: "1px solid #3a3210",
          color: "#8b7a55", borderRadius: 8, padding: "6px 14px", cursor: "pointer",
          fontSize: "0.85rem", fontFamily: "'EB Garamond', serif",
          display: "flex", alignItems: "center", gap: 6, opacity: speaking ? 0.6 : 1
        }}>{speaking ? "🔊 Speaking..." : "🔊 EN → ES"}</button>
      )}
    </div>
  );
}

// ─── Main App ───
export default function MarquezVocabCoach() {
  const [screen, setScreen] = useState("home");
  const [difficulty, setDifficulty] = useState("all");
  const [category, setCategory] = useState("all");
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [deck, setDeck] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [masteredWords, setMasteredWords] = useState(new Set());
  const [showMarquezLine, setShowMarquezLine] = useState(null);
  const [showMarquezPrompt, setShowMarquezPrompt] = useState(false);
  const [usedLineIndices, setUsedLineIndices] = useState(new Set());
  const timerRef = useRef(null);

  // Preload voices on mount
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) { synth.getVoices(); synth.addEventListener("voiceschanged", () => synth.getVoices()); }
  }, []);

  // ─── 2-minute timer ───
  const startMarquezTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setShowMarquezPrompt(true);
    }, 2 * 60 * 1000);
  }, []);

  const stopMarquezTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  useEffect(() => {
    startMarquezTimer();
    return () => stopMarquezTimer();
  }, [startMarquezTimer, stopMarquezTimer]);

  const getNextLine = useCallback(() => {
    let available = MARQUEZ_LINES.map((_, i) => i).filter(i => !usedLineIndices.has(i));
    if (available.length === 0) {
      setUsedLineIndices(new Set());
      available = MARQUEZ_LINES.map((_, i) => i);
    }
    const idx = pickRandom(available);
    setUsedLineIndices(prev => new Set([...prev, idx]));
    return MARQUEZ_LINES[idx];
  }, [usedLineIndices]);

  const handleMarquezYes = useCallback(() => {
    setShowMarquezPrompt(false);
    setShowMarquezLine(getNextLine());
    startMarquezTimer();
  }, [getNextLine, startMarquezTimer]);

  const handleMarquezNo = useCallback(() => {
    setShowMarquezPrompt(false);
    startMarquezTimer();
  }, [startMarquezTimer]);

  const closeMarquezLine = useCallback(() => { setShowMarquezLine(null); }, []);

  // ─── Filtering ───
  const getFilteredVocab = useCallback(() => {
    return VOCAB_LIBRARY.filter(v => {
      if (difficulty !== "all" && v.difficulty !== difficulty) return false;
      if (category !== "all" && v.category !== category) return false;
      return true;
    });
  }, [difficulty, category]);

  const categories = [...new Set(VOCAB_LIBRARY.map(v => v.category))];

  // ─── Flashcards ───
  const startFlashcards = useCallback(() => {
    const filtered = getFilteredVocab();
    if (filtered.length === 0) return;
    setDeck(shuffle(filtered));
    setCurrentCard(0);
    setFlipped(false);
    setScreen("flashcards");
  }, [getFilteredVocab]);

  const nextCard = useCallback(() => { setFlipped(false); setCurrentCard(prev => (prev + 1) % deck.length); }, [deck.length]);
  const prevCard = useCallback(() => { setFlipped(false); setCurrentCard(prev => (prev - 1 + deck.length) % deck.length); }, [deck.length]);

  const markMastered = useCallback(() => {
    if (deck[currentCard]) setMasteredWords(prev => new Set([...prev, deck[currentCard].word]));
    nextCard();
  }, [deck, currentCard, nextCard]);

  // ─── Quiz ───
  const startQuiz = useCallback(() => {
    const filtered = getFilteredVocab();
    if (filtered.length < 4) return;
    setScore({ correct: 0, total: 0 });
    generateQuizQuestion(filtered);
    setScreen("quiz");
  }, [getFilteredVocab]);

  const generateQuizQuestion = useCallback((vocabPool) => {
    const pool = vocabPool || getFilteredVocab();
    if (pool.length < 4) return;
    const type = pickRandom(QUIZ_TYPES);
    const correct = pickRandom(pool);
    const others = shuffle(pool.filter(v => v.word !== correct.word)).slice(0, 3);
    setQuiz({ type, correct, options: shuffle([correct, ...others]) });
    setQuizAnswer(null);
  }, [getFilteredVocab]);

  const answerQuiz = useCallback((selectedWord) => {
    const isCorrect = selectedWord === quiz.correct.word;
    setQuizAnswer({ selected: selectedWord, isCorrect });
    setScore(prev => ({ correct: prev.correct + (isCorrect ? 1 : 0), total: prev.total + 1 }));
    if (isCorrect) setMasteredWords(prev => new Set([...prev, quiz.correct.word]));
  }, [quiz]);

  const filteredForBrowse = getFilteredVocab();

  // ─── Render: Home ───
  const renderHome = () => (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <div style={{ position: "relative", display: "inline-block", marginBottom: 8 }}>
        <GoldButterfly style={{ top: -20, left: -30, animationDelay: "0s" }} />
        <GoldButterfly style={{ top: -15, right: -25, animationDelay: "2s" }} />
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif", fontSize: "2.4rem",
          background: "linear-gradient(135deg, #d4a017, #f0d060, #d4a017)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          marginBottom: 4, letterSpacing: 1
        }}>Macondo Lexicon</h1>
      </div>
      <p style={{
        fontFamily: "'EB Garamond', Garamond, serif", color: "#8b7a55",
        fontSize: "1.05rem", fontStyle: "italic", marginBottom: 36
      }}>A Literary Vocabulary Coach — Inspired by García Márquez</p>

      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 30 }}>
        <select value={difficulty} onChange={e => setDifficulty(e.target.value)} style={selectStyle}>
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <select value={category} onChange={e => setCategory(e.target.value)} style={selectStyle}>
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
        {[
          { label: "Words", value: VOCAB_LIBRARY.length },
          { label: "Mastered", value: masteredWords.size },
          { label: "Quiz Score", value: score.total > 0 ? `${Math.round(score.correct / score.total * 100)}%` : "—" }
        ].map(s => (
          <div key={s.label} style={{
            background: "rgba(139,105,20,0.08)", border: "1px solid #3a3210",
            borderRadius: 12, padding: "16px 24px", minWidth: 100
          }}>
            <div style={{ fontSize: "1.6rem", color: "#d4a017", fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>{s.value}</div>
            <div style={{ fontSize: "0.75rem", color: "#6b5d3e", letterSpacing: 2, textTransform: "uppercase", fontFamily: "'EB Garamond', serif", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320, margin: "0 auto" }}>
        {[
          { label: "Flashcards", icon: "📜", action: startFlashcards, desc: "Study with EN → ES audio" },
          { label: "Quiz", icon: "⚡", action: startQuiz, desc: "Test your knowledge" },
          { label: "Browse All", icon: "📖", action: () => setScreen("browse"), desc: "Explore the lexicon" },
          { label: "Márquez Line", icon: "🦋", action: handleMarquezYes, desc: "Receive wisdom aloud" }
        ].map(btn => (
          <button key={btn.label} onClick={btn.action} style={{
            background: "linear-gradient(135deg, rgba(139,105,20,0.12), rgba(139,105,20,0.05))",
            border: "1px solid #4a3d18", color: "#e8d5a3", borderRadius: 12,
            padding: "16px 20px", cursor: "pointer", fontFamily: "'EB Garamond', serif",
            fontSize: "1.1rem", display: "flex", alignItems: "center", gap: 14,
            textAlign: "left", transition: "all 0.3s ease"
          }}>
            <span style={{ fontSize: "1.5rem" }}>{btn.icon}</span>
            <div>
              <div style={{ fontWeight: 600 }}>{btn.label}</div>
              <div style={{ fontSize: "0.8rem", color: "#6b5d3e" }}>{btn.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // ─── Render: Flashcards ───
  const renderFlashcards = () => {
    if (deck.length === 0) return null;
    const card = deck[currentCard];
    const isMastered = masteredWords.has(card.word);
    return (
      <div style={{ padding: "30px 20px", textAlign: "center" }}>
        <button onClick={() => setScreen("home")} style={backBtnStyle}>← Back</button>
        <p style={{ color: "#6b5d3e", fontFamily: "'EB Garamond', serif", fontSize: "0.9rem", marginBottom: 20, letterSpacing: 2 }}>
          CARD {currentCard + 1} OF {deck.length}
        </p>
        <div onClick={() => setFlipped(!flipped)} style={{
          background: flipped ? "linear-gradient(135deg, #1f1a08, #2a2010)" : "linear-gradient(135deg, #2a1f0e, #1a1408)",
          border: `1px solid ${flipped ? "#8b6914" : "#4a3d18"}`, borderRadius: 16,
          padding: "48px 32px", maxWidth: 460, margin: "0 auto 24px", cursor: "pointer",
          minHeight: 240, display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", transition: "all 0.4s ease",
          boxShadow: flipped ? "0 0 30px rgba(139,105,20,0.15)" : "none", position: "relative"
        }}>
          {isMastered && (
            <span style={{
              position: "absolute", top: 12, right: 16, color: "#d4a017",
              fontSize: "0.75rem", fontFamily: "'EB Garamond', serif",
              letterSpacing: 2, textTransform: "uppercase", opacity: 0.7
            }}>✦ mastered</span>
          )}
          {!flipped ? (
            <>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", color: "#e8d5a3", marginBottom: 8 }}>{card.word}</div>
              <div style={{ color: "#6b5d3e", fontFamily: "'EB Garamond', serif", fontSize: "0.85rem", letterSpacing: 2, textTransform: "uppercase" }}>{card.category} • {card.difficulty}</div>
              <div style={{ color: "#4a3d18", fontSize: "0.8rem", marginTop: 16, fontFamily: "'EB Garamond', serif" }}>tap to reveal</div>
            </>
          ) : (
            <>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#d4a017", marginBottom: 12 }}>{card.word}</div>
              <div style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.05rem", color: "#c4b896", lineHeight: 1.6, marginBottom: 16 }}>{card.definition}</div>
              <div style={{ borderTop: "1px solid #3a3210", paddingTop: 14, width: "100%" }}>
                <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "0.95rem", color: "#c4b896", lineHeight: 1.5, margin: "0 0 6px 0" }}>
                  🇬🇧 "{card.sentenceEn}"
                </p>
                <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "0.95rem", color: "#a89660", fontStyle: "italic", lineHeight: 1.5, margin: 0 }}>
                  🇪🇸 "{card.sentenceEs}"
                </p>
              </div>
              <VoiceButton word={card.word} sentenceEn={card.sentenceEn} sentenceEs={card.sentenceEs} />
            </>
          )}
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={prevCard} style={navBtnStyle}>← Prev</button>
          <button onClick={markMastered} style={{
            ...navBtnStyle,
            background: isMastered ? "rgba(139,105,20,0.2)" : "linear-gradient(135deg, #8b6914, #d4a017)",
            color: isMastered ? "#8b7a55" : "#1a1408", fontWeight: 700
          }}>{isMastered ? "✦ Mastered" : "Mark Mastered"}</button>
          <button onClick={nextCard} style={navBtnStyle}>Next →</button>
        </div>
      </div>
    );
  };

  // ─── Render: Quiz ───
  const renderQuiz = () => {
    if (!quiz) return null;
    const questionText = quiz.type === "definition"
      ? `What does "${quiz.correct.word}" mean?`
      : quiz.type === "sentence"
        ? `Which word fits: "${quiz.correct.sentenceEn.replace(new RegExp(quiz.correct.word, "gi"), "______")}"?`
        : `Which word matches this definition? "${quiz.correct.definition}"`;

    return (
      <div style={{ padding: "30px 20px", textAlign: "center" }}>
        <button onClick={() => setScreen("home")} style={backBtnStyle}>← Back</button>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 24 }}>
          <span style={{ color: "#d4a017", fontFamily: "'EB Garamond', serif" }}>Score: {score.correct}/{score.total}</span>
          <span style={{ color: "#6b5d3e", fontFamily: "'EB Garamond', serif", fontSize: "0.85rem", letterSpacing: 2, textTransform: "uppercase" }}>{quiz.type}</span>
        </div>
        <div style={{ background: "rgba(139,105,20,0.06)", border: "1px solid #3a3210", borderRadius: 14, padding: "28px 24px", maxWidth: 500, margin: "0 auto 24px" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#e8d5a3", lineHeight: 1.6, margin: 0 }}>{questionText}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, maxWidth: 500, margin: "0 auto 24px" }}>
          {quiz.options.map(opt => {
            let bg = "rgba(139,105,20,0.08)", border = "#3a3210", color = "#c4b896";
            if (quizAnswer) {
              if (opt.word === quiz.correct.word) { bg = "rgba(34,139,34,0.15)"; border = "#228B22"; color = "#90EE90"; }
              else if (opt.word === quizAnswer.selected && !quizAnswer.isCorrect) { bg = "rgba(178,34,34,0.15)"; border = "#B22222"; color = "#FFA07A"; }
            }
            return (
              <button key={opt.word} onClick={() => !quizAnswer && answerQuiz(opt.word)} disabled={!!quizAnswer} style={{
                background: bg, border: `1px solid ${border}`, color, borderRadius: 10,
                padding: "16px 12px", cursor: quizAnswer ? "default" : "pointer",
                fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", transition: "all 0.3s ease"
              }}>{opt.word}</button>
            );
          })}
        </div>
        {quizAnswer && (
          <div style={{ marginBottom: 16 }}>
            <p style={{ color: quizAnswer.isCorrect ? "#90EE90" : "#FFA07A", fontFamily: "'EB Garamond', serif", fontSize: "1.05rem", marginBottom: 8 }}>
              {quizAnswer.isCorrect ? "Correct! ✦" : `Not quite — the answer is "${quiz.correct.word}"`}
            </p>
            <VoiceButton word={quiz.correct.word} sentenceEn={quiz.correct.sentenceEn} sentenceEs={quiz.correct.sentenceEs} />
          </div>
        )}
        {quizAnswer && (
          <button onClick={() => generateQuizQuestion()} style={{
            background: "linear-gradient(135deg, #8b6914, #d4a017)", border: "none",
            color: "#1a1408", padding: "12px 32px", borderRadius: 10,
            fontFamily: "'EB Garamond', serif", fontSize: "1rem", fontWeight: 700, cursor: "pointer", marginTop: 8
          }}>Next Question →</button>
        )}
      </div>
    );
  };

  // ─── Render: Browse ───
  const renderBrowse = () => (
    <div style={{ padding: "30px 20px" }}>
      <button onClick={() => setScreen("home")} style={backBtnStyle}>← Back</button>
      <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#d4a017", fontSize: "1.5rem", textAlign: "center", marginBottom: 24 }}>
        Full Lexicon ({filteredForBrowse.length} words)
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 520, margin: "0 auto" }}>
        {filteredForBrowse.map(v => (
          <div key={v.word} style={{
            background: "rgba(139,105,20,0.06)",
            border: `1px solid ${masteredWords.has(v.word) ? "#8b6914" : "#2a2010"}`,
            borderRadius: 12, padding: "18px 20px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "#e8d5a3" }}>{v.word}</span>
              <span style={{ fontSize: "0.7rem", color: "#6b5d3e", letterSpacing: 2, textTransform: "uppercase", fontFamily: "'EB Garamond', serif" }}>
                {v.category} • {v.difficulty} {masteredWords.has(v.word) ? "✦" : ""}
              </span>
            </div>
            <p style={{ fontFamily: "'EB Garamond', serif", color: "#c4b896", fontSize: "0.95rem", margin: "0 0 8px 0", lineHeight: 1.5 }}>{v.definition}</p>
            <p style={{ fontFamily: "'EB Garamond', serif", color: "#c4b896", fontSize: "0.9rem", margin: "0 0 4px 0", lineHeight: 1.5 }}>🇬🇧 "{v.sentenceEn}"</p>
            <p style={{ fontFamily: "'EB Garamond', serif", color: "#a89660", fontSize: "0.9rem", fontStyle: "italic", margin: 0, lineHeight: 1.5 }}>🇪🇸 "{v.sentenceEs}"</p>
            <VoiceButton word={v.word} sentenceEn={v.sentenceEn} sentenceEs={v.sentenceEs} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0f0a05 0%, #1a1408 30%, #0f0a05 100%)",
      color: "#c4b896", fontFamily: "'EB Garamond', Garamond, serif",
      position: "relative", overflow: "hidden"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=EB+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-12px) rotate(5deg); }
          50% { transform: translateY(-6px) rotate(-3deg); }
          75% { transform: translateY(-16px) rotate(4deg); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.3); } }
        select:focus, button:focus { outline: 1px solid #8b6914; outline-offset: 2px; }
        button:hover { opacity: 0.88; }
      `}</style>

      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent 10%, #8b6914 50%, transparent 90%)", opacity: 0.4, zIndex: 100 }} />
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent 10%, #8b6914 50%, transparent 90%)", opacity: 0.2, zIndex: 100 }} />

      {showMarquezPrompt && <MarquezPromptModal onYes={handleMarquezYes} onNo={handleMarquezNo} />}
      {showMarquezLine && <MarquezLineModal line={showMarquezLine} onClose={closeMarquezLine} />}

      {screen === "home" && renderHome()}
      {screen === "flashcards" && renderFlashcards()}
      {screen === "quiz" && renderQuiz()}
      {screen === "browse" && renderBrowse()}
    </div>
  );
}

// ─── Shared Styles ───
const selectStyle = {
  background: "#1a1408", border: "1px solid #4a3d18", color: "#c4b896",
  borderRadius: 8, padding: "8px 16px", fontFamily: "'EB Garamond', serif",
  fontSize: "0.9rem", cursor: "pointer", appearance: "auto"
};
const backBtnStyle = {
  background: "none", border: "none", color: "#8b7a55",
  fontFamily: "'EB Garamond', serif", fontSize: "0.95rem",
  cursor: "pointer", marginBottom: 16, padding: "4px 0"
};
const navBtnStyle = {
  background: "rgba(139,105,20,0.1)", border: "1px solid #4a3d18",
  color: "#c4b896", borderRadius: 10, padding: "10px 20px",
  cursor: "pointer", fontFamily: "'EB Garamond', serif", fontSize: "0.95rem"
};
