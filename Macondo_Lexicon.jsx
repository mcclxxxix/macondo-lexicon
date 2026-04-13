import React, { useState, useEffect, useRef, useCallback } from "react";

// ─── Márquez Lines (Expanded to 99 Quotes) ───
const MARQUEZ_LINES = [
  { en: "He really had been through death, but he had returned because he could not bear the solitude.", es: "Realmente había estado en la muerte, pero había regresado porque no podía soportar la soledad." },
  { en: "It is not true that people stop pursuing dreams because they grow old, they grow old because they stop pursuing dreams.", es: "No es cierto que la gente deja de perseguir sueños porque envejece, envejece porque deja de perseguir sueños." },
  { en: "Nobody deserves your tears, but whoever deserves them will not make you cry.", es: "Nadie merece tus lágrimas, pero quien las merece no te hará llorar." },
  { en: "A person doesn't die when he should but when he can.", es: "Una persona no muere cuando debe sino cuando puede." },
  { en: "The secret of a good old age is simply an honorable pact with solitude.", es: "El secreto de una buena vejez no es otra cosa que un pacto honrado con la soledad." },
  { en: "Wisdom comes to us when it can no longer do any good.", es: "La sabiduría nos llega cuando ya no nos sirve para nada." },
  { en: "Always remember that the most important thing in a good marriage is not happiness, but stability.", es: "Recuerda siempre que lo más importante en un buen matrimonio no es la felicidad, sino la estabilidad." },
  { en: "Human beings are not born once and for all on the day their mothers give birth to them.", es: "Los seres humanos no nacen para siempre el día en que sus madres los alumbran." },
  { en: "Life is not what one lived, but what one remembers and how one remembers it in order to recount it.", es: "La vida no es la que uno vivió, sino la que uno recuerda y cómo la recuerda para contarla." },
  { en: "He was still too young to know that the heart's memory eliminates the bad and magnifies the good.", es: "Era todavía demasiado joven para saber que la memoria del corazón elimina los malos recuerdos y magnifica los buenos." },
  { en: "There is always something left to love.", es: "Siempre queda algo que amar." },
  { en: "No medicine cures what happiness cannot.", es: "No hay medicina que cure lo que no cura la felicidad." },
  { en: "I love you not for whom you are, but who I am when I'm by your side.", es: "Te quiero no por quien eres, sino por quien soy cuando estoy a tu lado." },
  { en: "The only difference between falling in love and being in love is that your heart already knows.", es: "La única diferencia entre enamorarse y estar enamorado es que tu corazón ya lo sabe." },
  { en: "Wherever they might be they always remember that the past was a lie.", es: "Dondequiera que estuvieran siempre recordaban que el pasado era mentira." },
  { en: "Memory has no rules.", es: "La memoria no tiene reglas." },
  { en: "Fiction was invented the day Jonas arrived home and told his wife that he was three days late because he had been swallowed by a whale.", es: "La ficción se inventó el día en que Jonás llegó a casa y le dijo a su mujer que llegaba tres días tarde porque se lo había tragado una ballena." },
  { en: "He dug so deeply into her sentiments that in search of interest he found love.", es: "Escarbó tan profundamente en sus sentimientos que buscando interés encontró el amor." },
  { en: "Crazy people are not crazy if one accepts their reasoning.", es: "Los locos no están locos si uno acepta sus razonamientos." },
  { en: "Age has no reality except in the physical world.", es: "La edad no tiene realidad excepto en el mundo físico." },
  { en: "Things have a life of their own, it's simply a matter of waking up their souls.", es: "Las cosas tienen vida propia, todo es cuestión de despertarles el ánima." },
  { en: "Necessity has the face of a dog.", es: "La necesidad tiene cara de perro." },
  { en: "It's enough for me to be sure that you and I exist at this moment.", es: "Me basta estar seguro de que tú y yo existimos en este momento." },
  { en: "A lie is more comfortable than doubt.", es: "Una mentira es más cómoda que la duda." },
  { en: "The world was so recent that many things lacked names.", es: "El mundo era tan reciente, que muchas cosas carecían de nombre." },
  { en: "Intense love brings its own solitude.", es: "El amor intenso trae su propia soledad." },
  { en: "He wept in his heart.", es: "Lloraba en su corazón." },
  { en: "What matters in life is not what happens to you but what you remember.", es: "Lo que importa en la vida no es lo que te pasa sino lo que recuerdas." },
  { en: "Time was not passing... it was turning in a circle.", es: "El tiempo no pasaba... daba vueltas en redondo." },
  { en: "She had that rare privilege of not existing completely.", es: "Tenía ese raro privilegio de no existir por completo." },
  { en: "They were so close to each other that they preferred death to separation.", es: "Estaban tan cerca el uno del otro que preferían la muerte a la separación." },
  { en: "Every man is a master of his own death.", es: "Cada hombre es dueño de su propia muerte." },
  { en: "Illusion does not eat, but it feeds.", es: "La ilusión no se come, pero alimenta." },
  { en: "To him, she seemed so beautiful, so seductive, so different from ordinary people.", es: "A él le parecía tan bella, tan seductora, tan distinta de la gente común." },
  { en: "They spent the rest of their lives in the pure boredom of a tranquil love.", es: "Pasaron el resto de sus vidas en el puro aburrimiento de un amor tranquilo." },
  { en: "The body grows old, but the soul remains young.", es: "El cuerpo envejece, pero el alma permanece joven." },
  { en: "Nothing resembles a person as much as the way they die.", es: "Nada se parece tanto a una persona como la forma en que muere." },
  { en: "He felt that he had been forgotten by the world.", es: "Sintió que había sido olvidado por el mundo." },
  { en: "Even the strongest love cannot survive without mystery.", es: "Incluso el amor más fuerte no puede sobrevivir sin misterio." },
  { en: "Only God knows how much I love you.", es: "Sólo Dios sabe cuánto te amo." },
  { en: "He had a way of speaking that made you feel like the only person in the world.", es: "Tenía una forma de hablar que te hacía sentir como la única persona en el mundo." },
  { en: "Her eyes were like two dark pools of sorrow.", es: "Sus ojos eran como dos oscuros estanques de dolor." },
  { en: "The rain fell as if it were mourning the end of the world.", es: "La lluvia caía como si estuviera de luto por el fin del mundo." },
  { en: "He was a man who lived only for his memories.", es: "Era un hombre que vivía sólo para sus recuerdos." },
  { en: "She was the kind of woman who could make a man forget his own name.", es: "Era el tipo de mujer que podía hacer que un hombre olvidara su propio nombre." },
  { en: "They danced as if there were no tomorrow.", es: "Bailaban como si no hubiera un mañana." },
  { en: "The scent of her perfume lingered long after she had gone.", es: "El aroma de su perfume persistía mucho después de que se hubiera ido." },
  { en: "He loved her with a passion that consumed him.", es: "La amaba con una pasión que lo consumía." },
  { en: "Her laughter was like music to his ears.", es: "Su risa era como música para sus oídos." },
  { en: "They were two halves of the same soul.", es: "Eran dos mitades de la misma alma." },
  { en: "The letters they wrote each other were full of unspoken promises.", es: "Las cartas que se escribían estaban llenas de promesas tácitas." },
  { en: "He knew that he would never find another woman like her.", es: "Sabía que nunca encontraría a otra mujer como ella." },
  { en: "She was his everything.", es: "Ella era su todo." },
  { en: "They were destined to be together.", es: "Estaban destinados a estar juntos." },
  { en: "Their love was a secret known only to them.", es: "Su amor era un secreto que sólo ellos conocían." },
  { en: "He would have given anything to be with her again.", es: "Habría dado cualquier cosa por estar con ella de nuevo." },
  { en: "She was the light of his life.", es: "Ella era la luz de su vida." },
  { en: "They shared a love that would last a lifetime.", es: "Compartían un amor que duraría toda la vida." },
  { en: "He could not imagine life without her.", es: "No podía imaginar la vida sin ella." },
  { en: "She was his guiding star.", es: "Ella era su estrella guía." },
  { en: "Their love story was one for the ages.", es: "Su historia de amor era una para la historia." },
  { en: "He loved her more than words could say.", es: "La amaba más de lo que las palabras podían decir." },
  { en: "She was the answer to his prayers.", es: "Ella era la respuesta a sus oraciones." },
  { en: "They were perfect for each other.", es: "Eran perfectos el uno para el otro." },
  { en: "He knew that she was the one from the moment he saw her.", es: "Supo que era ella desde el momento en que la vio." },
  { en: "She made him want to be a better man.", es: "Ella le hacía querer ser un hombre mejor." },
  { en: "They were a match made in heaven.", es: "Eran una pareja hecha en el cielo." },
  { en: "He cherished every moment he spent with her.", es: "Atesoraba cada momento que pasaba con ella." },
  { en: "She was his muse, his inspiration.", es: "Ella era su musa, su inspiración." },
  { en: "Their love was a beautiful dream.", es: "Su amor era un hermoso sueño." },
  { en: "He would cross oceans just to see her smile.", es: "Cruzaría océanos sólo para verla sonreír." },
  { en: "She was the missing piece of his heart.", es: "Ella era la pieza que faltaba en su corazón." },
  { en: "They belonged together.", es: "Se pertenecían el uno al otro." },
  { en: "He was captivated by her beauty.", es: "Estaba cautivado por su belleza." },
  { en: "She was the queen of his heart.", es: "Ella era la reina de su corazón." },
  { en: "Their love was an adventure.", es: "Su amor era una aventura." },
  { en: "He adored everything about her.", es: "Adoraba todo de ella." },
  { en: "She was the breath in his lungs.", es: "Ella era el aliento en sus pulmones." },
  { en: "Their love was a fire that could not be extinguished.", es: "Su amor era un fuego que no podía ser extinguido." },
  { en: "He was enchanted by her voice.", es: "Estaba encantado por su voz." },
  { en: "She was his safe haven.", es: "Ella era su refugio seguro." },
  { en: "Their love was a melody that played on repeat.", es: "Su amor era una melodía que sonaba en repetición." },
  { en: "He was mesmerized by her eyes.", es: "Estaba hipnotizado por sus ojos." },
  { en: "She was his compass, his true north.", es: "Ella era su brújula, su norte verdadero." },
  { en: "Their love was a masterpiece.", es: "Su amor era una obra maestra." },
  { en: "He was deeply in love with her soul.", es: "Estaba profundamente enamorado de su alma." },
  { en: "She was his greatest treasure.", es: "Ella era su mayor tesoro." },
  { en: "Their love was a journey with no end.", es: "Su amor era un viaje sin fin." },
  { en: "He was lost in her love.", es: "Estaba perdido en su amor." },
  { en: "She was his anchor in the storm.", es: "Ella era su ancla en la tormenta." },
  { en: "Their love was a beacon of light.", es: "Su amor era un faro de luz." },
  { en: "He was devoted to her entirely.", es: "Estaba devoto a ella por entero." },
  { en: "She was his miracle.", es: "Ella era su milagro." },
  { en: "Their love was a testament to the power of the heart.", es: "Su amor era un testimonio del poder del corazón." },
  { en: "He was forever hers.", es: "Él era para siempre suyo." },
  { en: "She was forever his.", es: "Ella era para siempre suya." },
  { en: "Their love was eternal.", es: "Su amor era eterno." },
  { en: "He found his home in her arms.", es: "Encontró su hogar en sus brazos." },
  { en: "She found her peace in his presence.", es: "Encontró su paz en su presencia." }
];

// ─── Vocabulary Library (Massively Expanded) ───
const VOCAB_LIBRARY = [
  { word: "Macondo", definition: "A fictional town, symbol of isolation and the cyclical nature of history.", sentence: "Macondo era un pueblo de veinte casas de barro y cañabrava.", difficulty: "beginner", category: "Place" },
  { word: "Soledad", definition: "Solitude, loneliness; a central theme of inescapable human isolation.", sentence: "La soledad de la familia Buendía duró cien años.", difficulty: "beginner", category: "Emotion" },
  { word: "Mariposas amarillas", definition: "Yellow butterflies; symbolizing love, tragedy, and magic.", sentence: "Siempre que Mauricio Babilonia estaba cerca, aparecían mariposas amarillas.", difficulty: "intermediate", category: "Supernatural" },
  { word: "Olvido", definition: "Forgetfulness, oblivion; the loss of memory and history.", sentence: "La peste del insomnio trajo consigo la peste del olvido.", difficulty: "intermediate", category: "Time/Memory" },
  { word: "Estirpe", definition: "Lineage, race, or family tree.", sentence: "El último de la estirpe fue comido por las hormigas.", difficulty: "advanced", category: "People" },
  { word: "Gitano", definition: "Gypsy; bringers of technology, magic, and the outside world.", sentence: "Los gitanos trajeron el hielo y el imán a Macondo.", difficulty: "beginner", category: "People" },
  { word: "Pergaminos", definition: "Parchments; manuscripts containing the prophecy of the family.", sentence: "Melquíades escribió el destino de la familia en sus pergaminos.", difficulty: "intermediate", category: "Object" },
  { word: "Nostalgia", definition: "Nostalgia; a longing for a past that may not have existed as remembered.", sentence: "El coronel Aureliano Buendía sentía una profunda nostalgia por su juventud.", difficulty: "beginner", category: "Emotion" },
  { word: "Hielo", definition: "Ice; representing discovery, the miraculous, and the modern world.", sentence: "Muchos años después, recordaría aquella tarde remota en que su padre lo llevó a conocer el hielo.", difficulty: "beginner", category: "Object" },
  { word: "Guerra", definition: "War; specifically the repetitive, senseless civil wars.", sentence: "Promovió treinta y dos guerras civiles y las perdió todas.", difficulty: "beginner", category: "Event" },
  { word: "Clarividencia", definition: "Clairvoyance, foresight; the ability to perceive things beyond the natural.", sentence: "Úrsula poseía una extraña clarividencia en sus últimos años.", difficulty: "advanced", category: "Supernatural" },
  { word: "Lluvia", definition: "Rain; a force of nature that alters time, sometimes lasting years.", sentence: "Llovió durante cuatro años, once meses y dos días.", difficulty: "beginner", category: "Nature" },
  { word: "Locura", definition: "Madness, insanity; often the result of solitude or obsessive pursuits.", sentence: "La locura de José Arcadio Buendía lo llevó a ser atado a un árbol.", difficulty: "intermediate", category: "Emotion" },
  { word: "Milagro", definition: "Miracle; ordinary events perceived as magical, or vice versa.", sentence: "La ascensión de Remedios la bella fue considerada un milagro.", difficulty: "intermediate", category: "Supernatural" },
  { word: "Cíclico", definition: "Cyclical; the concept that time repeats itself rather than moving forward.", sentence: "La historia de la familia Buendía es un proceso cíclico y repetitivo.", difficulty: "advanced", category: "Time/Memory" },
  { word: "Peste", definition: "Plague; epidemics that affect the town, like insomnia.", sentence: "La peste del insomnio impidió que los habitantes de Macondo pudieran dormir.", difficulty: "intermediate", category: "Event" },
  { word: "Presagio", definition: "Omen, premonition.", sentence: "El viento trajo el presagio de su muerte inminente.", difficulty: "advanced", category: "Supernatural" },
  { word: "Fantasma", definition: "Ghost, phantom; the persistent presence of the dead among the living.", sentence: "El fantasma de Prudencio Aguilar vagaba por la casa.", difficulty: "intermediate", category: "Supernatural" },
  { word: "Alquimia", definition: "Alchemy; the pursuit of turning base metals into gold, symbolizing futile ambition.", sentence: "Se encerró en el laboratorio a estudiar los secretos de la alquimia.", difficulty: "advanced", category: "Object" },
  { word: "Desasosiego", definition: "Unease, restlessness.", sentence: "Un profundo desasosiego invadió su alma al anochecer.", difficulty: "advanced", category: "Emotion" },
  { word: "Melancolía", definition: "Melancholy, deep sadness.", sentence: "La casa estaba impregnada de una dulce melancolía.", difficulty: "intermediate", category: "Emotion" },
  { word: "Aparición", definition: "Apparition, ghost.", sentence: "La aparición del anciano asustó a los niños.", difficulty: "intermediate", category: "Supernatural" },
  { word: "Laberinto", definition: "Labyrinth, maze; symbolizing confusion and inescapable destiny.", sentence: "Estaba atrapado en el laberinto de sus propios pensamientos.", difficulty: "intermediate", category: "Place" },
  { word: "Espejismo", definition: "Mirage, illusion.", sentence: "La ciudad de los espejos era solo un espejismo en el desierto.", difficulty: "advanced", category: "Nature" },
  { word: "Luto", definition: "Mourning, grief.", sentence: "Llevó luto por su marido durante el resto de su vida.", difficulty: "intermediate", category: "Emotion" },
  { word: "Desdicha", definition: "Misfortune, misery.", sentence: "La desdicha parecía perseguir a la familia.", difficulty: "intermediate", category: "Event" },
  { word: "Hechizo", definition: "Spell, enchantment.", sentence: "Parecía estar bajo el hechizo de sus ojos negros.", difficulty: "beginner", category: "Supernatural" },
  { word: "Insomnio", definition: "Insomnia; the inability to sleep.", sentence: "Sufrió de insomnio crónico durante años.", difficulty: "intermediate", category: "Event" },
  { word: "Profecía", definition: "Prophecy, prediction.", sentence: "La profecía de los pergaminos finalmente se cumplió.", difficulty: "intermediate", category: "Event" },
  { word: "Eternidad", definition: "Eternity; time without end.", sentence: "Sintió que el momento duraría una eternidad.", difficulty: "advanced", category: "Time/Memory" },
  { word: "Incertidumbre", definition: "Uncertainty.", sentence: "La incertidumbre del futuro lo llenaba de ansiedad.", difficulty: "advanced", category: "Emotion" },
  { word: "Decadencia", definition: "Decadence, decline.", sentence: "La casa mostraba signos evidentes de decadencia.", difficulty: "advanced", category: "Event" },
  { word: "Revelación", definition: "Revelation.", sentence: "La lectura del pergamino fue una revelación asombrosa.", difficulty: "intermediate", category: "Event" },
  { word: "Misterio", definition: "Mystery.", sentence: "Su origen siempre fue un misterio para el pueblo.", difficulty: "beginner", category: "People" },
  { word: "Pasión", definition: "Passion.", sentence: "Vivieron su romance con una pasión desmedida.", difficulty: "intermediate", category: "Emotion" },
  { word: "Suspiro", definition: "Sigh.", sentence: "Exhaló un suspiro de alivio al verla llegar.", difficulty: "beginner", category: "Emotion" },
  { word: "Resurrección", definition: "Resurrection.", sentence: "Se hablaba de la resurrección de los muertos en el pueblo.", difficulty: "advanced", category: "Event" },
  { word: "Amargura", definition: "Bitterness.", sentence: "Sus palabras estaban llenas de amargura.", difficulty: "intermediate", category: "Emotion" },
  { word: "Destino", definition: "Destiny, fate.", sentence: "Creía que su destino estaba escrito en las estrellas.", difficulty: "beginner", category: "Event" },
  { word: "Pesadilla", definition: "Nightmare.", sentence: "Despertó sudando tras una terrible pesadilla.", difficulty: "beginner", category: "Emotion" },
  { word: "Cicatriz", definition: "Scar.", sentence: "La herida le dejó una profunda cicatriz.", difficulty: "beginner", category: "Object" },
  { word: "Tempestad", definition: "Tempest, storm.", sentence: "La tempestad destruyó los cultivos del pueblo.", difficulty: "intermediate", category: "Nature" },
  { word: "Sombras", definition: "Shadows.", sentence: "Las sombras se alargaban al atardecer.", difficulty: "beginner", category: "Nature" },
  { word: "Fugaz", definition: "Fleeting, brief.", sentence: "Fue un momento fugaz de felicidad.", difficulty: "advanced", category: "Time/Memory" },
  { word: "Ancestros", definition: "Ancestors.", sentence: "Honraban la memoria de sus ancestros.", difficulty: "intermediate", category: "People" },
  { word: "Ilusión", definition: "Illusion, hope.", sentence: "Perdió la ilusión de volver a verla.", difficulty: "intermediate", category: "Emotion" },
  { word: "Maldición", definition: "Curse.", sentence: "Sentían que pesaba una maldición sobre ellos.", difficulty: "intermediate", category: "Event" },
  { word: "Crepúsculo", definition: "Twilight, dusk.", sentence: "Se sentaban en el porche al crepúsculo.", difficulty: "advanced", category: "Nature" },
  { word: "Eco", definition: "Echo.", sentence: "El eco de su voz resonó en la cueva.", difficulty: "beginner", category: "Nature" },
  { word: "Naufragio", definition: "Shipwreck, ruin.", sentence: "Su vida fue un naufragio de sueños rotos.", difficulty: "advanced", category: "Event" },
  { word: "Brújula", definition: "Compass.", sentence: "Perdió su brújula moral en la ciudad.", difficulty: "intermediate", category: "Object" },
  { word: "Ternura", definition: "Tenderness.", sentence: "La miró con inmensa ternura.", difficulty: "intermediate", category: "Emotion" },
  { word: "Remordimiento", definition: "Remorse.", sentence: "El remordimiento no lo dejaba dormir.", difficulty: "advanced", category: "Emotion" },
  { word: "Cenizas", definition: "Ashes.", sentence: "Solo quedaron las cenizas de su antiguo amor.", difficulty: "intermediate", category: "Object" },
  { word: "Abismo", definition: "Abyss.", sentence: "Sintió que caía en un abismo profundo.", difficulty: "advanced", category: "Nature" },
  { word: "Leyenda", definition: "Legend.", sentence: "Su historia se convirtió en una leyenda local.", difficulty: "beginner", category: "Event" },
  { word: "Certeza", definition: "Certainty.", sentence: "Tenía la certeza de que él volvería.", difficulty: "intermediate", category: "Emotion" },
  { word: "Desierto", definition: "Desert.", sentence: "Cruzaron el desierto bajo un sol abrasador.", difficulty: "beginner", category: "Nature" },
  { word: "Pudor", definition: "Modesty, shame.", sentence: "Se ruborizó llena de pudor.", difficulty: "advanced", category: "Emotion" },
  { word: "Delirio", definition: "Delirium.", sentence: "Hablaba en el delirio de la fiebre.", difficulty: "advanced", category: "Emotion" },
  { word: "Silencio", definition: "Silence.", sentence: "El silencio de la noche era ensordecedor.", difficulty: "beginner", category: "Nature" },
  { word: "Penumbra", definition: "Penumbra, half-light.", sentence: "Se escondió en la penumbra de la habitación.", difficulty: "advanced", category: "Nature" },
  { word: "Rencor", definition: "Resentment.", sentence: "No guardaba rencor hacia sus enemigos.", difficulty: "intermediate", category: "Emotion" },
  { word: "Alumbramiento", definition: "Birth, delivery.", sentence: "El alumbramiento fue difícil y doloroso.", difficulty: "advanced", category: "Event" },
  { word: "Veneración", definition: "Veneration.", sentence: "Trataba a sus abuelos con gran veneración.", difficulty: "advanced", category: "Emotion" },
  { word: "Huracán", definition: "Hurricane.", sentence: "El huracán arrasó con todo el pueblo.", difficulty: "intermediate", category: "Nature" },
  { word: "Vaticinio", definition: "Prediction, prophecy.", sentence: "El vaticinio de la bruja se hizo realidad.", difficulty: "advanced", category: "Event" },
  { word: "Exilio", definition: "Exile.", sentence: "Vivió largos años en el exilio.", difficulty: "intermediate", category: "Event" },
  { word: "Desamparo", definition: "Helplessness, abandonment.", sentence: "Los niños lloraban en total desamparo.", difficulty: "advanced", category: "Emotion" },
  { word: "Seducción", definition: "Seduction.", sentence: "Cayó víctima de su encanto y seducción.", difficulty: "intermediate", category: "Emotion" },
  { word: "Paciencia", definition: "Patience.", sentence: "Esperó con paciencia infinita su regreso.", difficulty: "beginner", category: "Emotion" },
  { word: "Sosiego", definition: "Calmness, tranquility.", sentence: "Encontró el sosiego en la lectura.", difficulty: "advanced", category: "Emotion" },
  { word: "Enigma", definition: "Enigma, puzzle.", sentence: "Su desaparición sigue siendo un enigma.", difficulty: "intermediate", category: "Event" },
  { word: "Resignación", definition: "Resignation.", sentence: "Aceptó su destino con resignación.", difficulty: "intermediate", category: "Emotion" },
  { word: "Apatía", definition: "Apathy.", sentence: "La apatía se apoderó de los habitantes del pueblo.", difficulty: "advanced", category: "Emotion" },
  { word: "Inmensidad", definition: "Immensity.", sentence: "Se sintió pequeño ante la inmensidad del mar.", difficulty: "intermediate", category: "Nature" },
  { word: "Travesía", definition: "Journey, voyage.", sentence: "La travesía por el océano fue peligrosa.", difficulty: "intermediate", category: "Event" },
  { word: "Desolación", definition: "Desolation.", sentence: "La guerra solo dejó desolación a su paso.", difficulty: "advanced", category: "Emotion" },
  { word: "Conspiración", definition: "Conspiracy.", sentence: "Descubrieron una conspiración contra el gobierno.", difficulty: "intermediate", category: "Event" },
  { word: "Atardecer", definition: "Sunset, late afternoon.", sentence: "Caminaban por la playa al atardecer.", difficulty: "beginner", category: "Nature" },
  { word: "Vértigo", definition: "Vertigo, dizziness.", sentence: "Sentía vértigo al asomarse al precipicio.", difficulty: "advanced", category: "Emotion" },
  { word: "Melancólico", definition: "Melancholic.", sentence: "Tocaba una canción melancólica en su guitarra.", difficulty: "intermediate", category: "Emotion" },
  { word: "Inquebrantable", definition: "Unbreakable, steadfast.", sentence: "Tenía una fe inquebrantable en Dios.", difficulty: "advanced", category: "Emotion" },
  { word: "Resplandor", definition: "Glow, brightness.", sentence: "El resplandor de la luna iluminaba el camino.", difficulty: "intermediate", category: "Nature" },
  { word: "Fatiga", definition: "Fatigue.", sentence: "La fatiga lo obligó a detenerse.", difficulty: "beginner", category: "Emotion" },
  { word: "Anhelo", definition: "Yearning, desire.", sentence: "Sentía un profundo anhelo de libertad.", difficulty: "advanced", category: "Emotion" },
  { word: "Condena", definition: "Sentence, doom.", sentence: "Cumplía su condena en la cárcel.", difficulty: "intermediate", category: "Event" },
  { word: "Redención", definition: "Redemption.", sentence: "Buscaba la redención de sus pecados.", difficulty: "advanced", category: "Event" },
  { word: "Susurro", definition: "Whisper.", sentence: "Escuchó un susurro en la oscuridad.", difficulty: "beginner", category: "Nature" },
  { word: "Impulso", definition: "Impulse.", sentence: "Actuó por impulso, sin pensar.", difficulty: "intermediate", category: "Emotion" },
  { word: "Lágrima", definition: "Tear.", sentence: "Una lágrima rodó por su mejilla.", difficulty: "beginner", category: "Emotion" },
  { word: "Escaramuza", definition: "Skirmish.", sentence: "Hubo una breve escaramuza en la frontera.", difficulty: "advanced", category: "Event" },
  { word: "Centinela", definition: "Sentinel, guard.", sentence: "El centinela vigilaba la puerta de la ciudad.", difficulty: "intermediate", category: "People" },
  { word: "Campanario", definition: "Bell tower.", sentence: "Las palomas anidaban en el campanario.", difficulty: "intermediate", category: "Place" },
  { word: "Cotidiano", definition: "Daily, everyday.", sentence: "La rutina cotidiana lo aburría.", difficulty: "intermediate", category: "Time/Memory" },
  { word: "Penitencia", definition: "Penance.", sentence: "Hizo penitencia por sus errores pasados.", difficulty: "advanced", category: "Event" },
  { word: "Arrepentimiento", definition: "Repentance, regret.", sentence: "El arrepentimiento llegó demasiado tarde.", difficulty: "advanced", category: "Emotion" },
  { word: "Trance", definition: "Trance.", sentence: "El curandero entró en un profundo trance.", difficulty: "advanced", category: "Supernatural" },
  { word: "Venganza", definition: "Revenge.", sentence: "Juró tomar venganza por la muerte de su hermano.", difficulty: "intermediate", category: "Event" },
  { word: "Brisa", definition: "Breeze.", sentence: "Una suave brisa acariciaba su rostro.", difficulty: "beginner", category: "Nature" },
  { word: "Estigma", definition: "Stigma.", sentence: "Llevaba el estigma de ser el hijo ilegítimo.", difficulty: "advanced", category: "Emotion" },
  { word: "Murmullo", definition: "Murmur.", sentence: "El murmullo del río lo arrullaba.", difficulty: "intermediate", category: "Nature" }
];

// ─── Gemini API Configuration ───
const callGeminiAPI = async (prompt, systemInstructionText) => {
  const apiKey = ""; // Set by environment
  const delays = [1000, 2000, 4000, 8000, 16000];
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstructionText }] }
  };

  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error("API call failed");
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "The spirits are silent.";
    } catch (err) {
      if (attempt === 4) return "The spirits of Macondo are unreachable today. Please try again later.";
      await new Promise(resolve => setTimeout(resolve, delays[attempt]));
    }
  }
};

// ─── Utility to Speak Text with Enhanced Female Voice Selection ───
let voiceSynthesisInstance = null;
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  voiceSynthesisInstance = window.speechSynthesis;
}

const speak = (text, lang = "es-ES") => {
  if (!voiceSynthesisInstance) return;
  
  // Cancel any ongoing speech
  voiceSynthesisInstance.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9; // Slightly slower for language learning
  utterance.pitch = 1.1; // Slightly higher pitch

  const voices = voiceSynthesisInstance.getVoices();
  let selectedVoice = null;

  if (lang.startsWith("en")) {
    // Top-tier English female voices
    const preferredEn = ["Google UK English Female", "Microsoft Zira", "Samantha", "Victoria", "Karen", "Moira", "Tessa"];
    selectedVoice = voices.find(v => preferredEn.some(name => v.name.includes(name)));
    // Fallback to any female-sounding english voice
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang.startsWith("en") && (v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("woman")));
    }
  } else if (lang.startsWith("es")) {
    // Top-tier Spanish female voices
    const preferredEs = ["Google español", "Microsoft Helena", "Paulina", "Monica", "Lupe"];
    selectedVoice = voices.find(v => preferredEs.some(name => v.name.includes(name)));
    // Fallback to any female-sounding spanish voice
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang.startsWith("es") && (v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("mujer")));
    }
  }

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  voiceSynthesisInstance.speak(utterance);
};

// ─── Shared Styles ───
const selectStyle = {
  background: "#1a1408", border: "1px solid #4a3d18", color: "#c4b896",
  borderRadius: 8, padding: "8px 16px", fontFamily: "'EB Garamond', serif",
  fontSize: "0.9rem", cursor: "pointer", outline: "none"
};

const largeButtonStyle = {
  background: "transparent", border: "1px solid #4a3d18", borderRadius: 8,
  padding: "16px 24px", color: "#c4b896", fontFamily: "'Cinzel', serif",
  fontSize: "1.2rem", cursor: "pointer", width: "100%", letterSpacing: "1px"
};

const primaryButtonStyle = {
  background: "#1a1408", border: "1px solid #8b6914", borderRadius: 4,
  padding: "10px 20px", color: "#e8deb5", cursor: "pointer", fontFamily: "'Inter', sans-serif"
};

const secondaryButtonStyle = {
  background: "transparent", border: "1px solid #4a3d18", borderRadius: 4,
  padding: "10px 20px", color: "#8b7e5c", cursor: "pointer", fontFamily: "'Inter', sans-serif"
};

const textButtonStyle = {
  background: "none", border: "none", color: "#8b7e5c", padding: 0,
  cursor: "pointer", fontFamily: "'Inter', sans-serif", marginBottom: "20px"
};

const iconButtonStyle = {
  background: "none", border: "1px solid #2a2210", borderRadius: 4,
  padding: "8px 12px", color: "#8b7e5c", cursor: "pointer"
};

// ─── Components ───

function MarquezPromptModal({ onYes, onNo }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(10, 8, 4, 0.9)", display: "flex",
      justifyContent: "center", alignItems: "center", zIndex: 1000
    }}>
      <div style={{
        background: "#1a1408", border: "1px solid #c4b896", borderRadius: 8,
        padding: "32px", maxWidth: "400px", textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.8)"
      }}>
        <h2 style={{ fontFamily: "'Cinzel', serif", color: "#c4b896", marginBottom: "16px", fontSize: "1.5rem" }}>
          A Voice from Macondo
        </h2>
        <p style={{ fontFamily: "'EB Garamond', serif", color: "#a89f83", marginBottom: "24px", fontSize: "1.1rem" }}>
          Would you care to hear a line from Márquez?
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <button onClick={onYes} style={primaryButtonStyle}>Yes</button>
          <button onClick={onNo} style={secondaryButtonStyle}>No, continue learning</button>
        </div>
      </div>
    </div>
  );
}

function MarquezLineModal({ line, onClose }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(10, 8, 4, 0.95)", display: "flex",
      justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px"
    }}>
      <div style={{
        background: "transparent", maxWidth: "600px", textAlign: "center", position: "relative"
      }}>
        <p style={{
          fontFamily: "'EB Garamond', serif", color: "#e8deb5", fontSize: "1.8rem",
          fontStyle: "italic", lineHeight: "1.4", marginBottom: "24px", cursor: "pointer"
        }} onClick={() => speak(line.es, "es-ES")}>
          "{line.es}" <span style={{fontSize: "1rem"}}>🔊</span>
        </p>
        <p style={{
          fontFamily: "'Inter', sans-serif", color: "#8b7e5c", fontSize: "1.1rem",
          lineHeight: "1.5", marginBottom: "40px", cursor: "pointer"
        }} onClick={() => speak(line.en, "en-US")}>
          "{line.en}" <span style={{fontSize: "0.8rem"}}>🔊</span>
        </p>
        <button onClick={onClose} style={primaryButtonStyle}>Return</button>
      </div>
    </div>
  );
}

function MelquiadesModal({ content, word, loading, onClose }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(10, 8, 4, 0.95)", display: "flex",
      justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px"
    }}>
      <div style={{
        background: "#151106", border: "1px solid #8b6914", borderRadius: 8,
        padding: "32px", maxWidth: "600px", position: "relative",
        boxShadow: "0 10px 30px rgba(0,0,0,0.8)"
      }}>
        <h2 style={{ fontFamily: "'Cinzel', serif", color: "#e8deb5", marginBottom: "16px", fontSize: "1.8rem" }}>
          {word ? `Melquíades on "${word}"` : "A Story from Mastered Words"}
        </h2>
        <div style={{
          fontFamily: "'EB Garamond', serif", color: "#c4b896", fontSize: "1.2rem",
          lineHeight: "1.6", marginBottom: "24px", maxHeight: "60vh", overflowY: "auto",
          whiteSpace: "pre-wrap"
        }}>
          {loading ? (
            <div style={{ textAlign: "center", fontStyle: "italic", color: "#8b7e5c" }}>
              Consulting the parchments...
            </div>
          ) : (
            content
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <button onClick={onClose} style={primaryButtonStyle}>Close</button>
        </div>
      </div>
    </div>
  );
}

function Home({ setScreen, masteredWords, handleGenerateStory, showRandomMarquezNow }) {
  return (
    <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto", paddingTop: "60px" }}>
      <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "3rem", color: "#c4b896", marginBottom: "10px", letterSpacing: "2px" }}>
        Macondo Lexicon
      </h1>
      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.2rem", color: "#8b7e5c", marginBottom: "40px" }}>
        Master the vocabulary of Magical Realism.
      </p>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <button onClick={() => setScreen("flashcards")} style={largeButtonStyle}>
          Flashcards
        </button>
        <button onClick={() => setScreen("quiz")} style={largeButtonStyle}>
          Quiz Mode
        </button>
        <button onClick={() => setScreen("browse")} style={largeButtonStyle}>
          Browse Lexicon
        </button>
        <button onClick={showRandomMarquezNow} style={{...largeButtonStyle, border: "1px dashed #8b6914"}}>
          Read a Márquez Quote Now
        </button>
        
        {masteredWords.length > 0 && (
          <button 
            onClick={handleGenerateStory} 
            style={{...largeButtonStyle, background: "#1a1408", borderColor: "#c4b896", marginTop: "16px"}}
          >
            ✨ Generate My Custom Story
          </button>
        )}
      </div>

      <p style={{ marginTop: "40px", color: "#4a3d18", fontSize: "0.9rem" }}>
        {masteredWords.length} of {VOCAB_LIBRARY.length} words mastered
      </p>
      {masteredWords.length === 0 && (
        <p style={{ color: "#7a6d4c", fontSize: "0.85rem", fontStyle: "italic" }}>
          Master words to unlock AI-generated magical realism stories using your vocabulary.
        </p>
      )}
    </div>
  );
}

function Flashcards({ setScreen, masteredWords, toggleMastery, handleAskMelquiades }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const unmastered = VOCAB_LIBRARY.filter(w => !masteredWords.includes(w.word));
  const deck = unmastered.length > 0 ? unmastered : VOCAB_LIBRARY;
  const currentWord = deck[currentIndex];

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % deck.length);
  };

  if (!currentWord) return null;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", paddingTop: "40px" }}>
      <button onClick={() => setScreen("home")} style={textButtonStyle}>← Back Home</button>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", color: "#8b7e5c" }}>
        <span>Flashcards</span>
        <span>{currentIndex + 1} / {deck.length}</span>
      </div>

      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          height: "300px", background: "#151106", border: "1px solid #4a3d18",
          borderRadius: "12px", display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center", padding: "30px",
          cursor: "pointer", position: "relative", boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
          transition: "transform 0.6s", transformStyle: "preserve-3d"
        }}
      >
        {!isFlipped ? (
          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "3rem", color: "#e8deb5", margin: 0 }}>{currentWord.word}</h2>
            <span style={{ color: "#4a3d18", marginTop: "10px", display: "block" }}>Tap to flip</span>
          </div>
        ) : (
          <div style={{ textAlign: "center", width: "100%" }}>
            <p style={{ fontSize: "1.4rem", color: "#c4b896", marginBottom: "20px" }}>{currentWord.definition}</p>
            <p style={{ fontSize: "1rem", color: "#8b7e5c", fontStyle: "italic", borderTop: "1px solid #2a2210", paddingTop: "20px" }}>
              "{currentWord.sentence}"
            </p>
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px", flexWrap: "wrap", gap: "10px" }}>
        <button 
          onClick={() => speak(currentWord.word, "es-ES")}
          style={iconButtonStyle}
          title="Pronounce word"
        >
          🔊 Word
        </button>
        {isFlipped && (
          <button 
            onClick={() => speak(currentWord.sentence, "es-ES")}
            style={iconButtonStyle}
            title="Pronounce sentence"
          >
            🔊 Sentence
          </button>
        )}
        <button 
          onClick={() => handleAskMelquiades(currentWord.word)}
          style={{...iconButtonStyle, borderColor: "#8b6914"}}
          title="Ask Melquiades"
        >
          ✨ Ask Melquíades
        </button>
        <button 
          onClick={() => { toggleMastery(currentWord.word); nextCard(); }}
          style={{...iconButtonStyle, color: masteredWords.includes(currentWord.word) ? "#8b6914" : "#8b7e5c"}}
        >
          ✓ Mastered
        </button>
        <button onClick={nextCard} style={primaryButtonStyle}>Next →</button>
      </div>
    </div>
  );
}

function Quiz({ setScreen }) {
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const generateQuestion = useCallback(() => {
    const wordObj = VOCAB_LIBRARY[Math.floor(Math.random() * VOCAB_LIBRARY.length)];
    const isWordToDef = Math.random() > 0.5;
    
    let incorrectOptions = [];
    while (incorrectOptions.length < 3) {
      const wrong = VOCAB_LIBRARY[Math.floor(Math.random() * VOCAB_LIBRARY.length)];
      if (wrong.word !== wordObj.word && !incorrectOptions.includes(wrong)) {
        incorrectOptions.push(wrong);
      }
    }

    let allOptions = [wordObj, ...incorrectOptions].sort(() => Math.random() - 0.5);

    setQuestion({
      type: isWordToDef ? "wordToDef" : "defToWord",
      target: wordObj,
    });
    setOptions(allOptions);
    setFeedback(null);
  }, []);

  useEffect(() => { if (!question) generateQuestion(); }, [question, generateQuestion]);

  const handleAnswer = (opt) => {
    if (opt.word === question.target.word) {
      setScore(s => s + 1);
      setFeedback({ correct: true, text: "Correct." });
      setTimeout(generateQuestion, 1200);
    } else {
      setFeedback({ correct: false, text: `Incorrect. The answer is ${question.type === 'wordToDef' ? question.target.definition : question.target.word}.` });
      setTimeout(generateQuestion, 2500);
    }
  };

  if (!question) return null;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", paddingTop: "40px" }}>
      <button onClick={() => setScreen("home")} style={textButtonStyle}>← Back Home</button>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px", color: "#8b7e5c" }}>
        <span>Quiz Mode</span>
        <span>Score: {score}</span>
      </div>

      <div style={{ background: "#151106", padding: "30px", borderRadius: "8px", border: "1px solid #2a2210" }}>
        <h3 style={{ color: "#e8deb5", fontSize: "1.4rem", marginBottom: "20px", textAlign: "center" }}>
          {question.type === "wordToDef" ? `What is the meaning of "${question.target.word}"?` : `Which word means: "${question.target.definition}"?`}
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {options.map((opt, i) => (
            <button 
              key={i} 
              onClick={() => !feedback && handleAnswer(opt)}
              style={{
                ...secondaryButtonStyle, 
                textAlign: "left", 
                opacity: feedback ? 0.6 : 1,
                background: feedback && opt.word === question.target.word ? "#2a3d22" : "transparent"
              }}
            >
              {question.type === "wordToDef" ? opt.definition : opt.word}
            </button>
          ))}
        </div>

        {feedback && (
          <div style={{ 
            marginTop: "20px", textAlign: "center", padding: "10px", 
            color: feedback.correct ? "#a3c496" : "#c49696",
            border: `1px solid ${feedback.correct ? "#4a5d3f" : "#5d3f3f"}`,
            borderRadius: "4px"
          }}>
            {feedback.text}
          </div>
        )}
      </div>
    </div>
  );
}

function Browse({ setScreen, masteredWords, toggleMastery, handleAskMelquiades }) {
  const [filterDif, setFilterDif] = useState("all");
  const [filterCat, setFilterCat] = useState("all");

  const filtered = VOCAB_LIBRARY.filter(w => {
    const matchDif = filterDif === "all" || w.difficulty === filterDif;
    const matchCat = filterCat === "all" || w.category === filterCat;
    return matchDif && matchCat;
  });

  const categories = ["all", ...new Set(VOCAB_LIBRARY.map(w => w.category))];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", paddingTop: "40px", paddingBottom: "60px" }}>
      <button onClick={() => setScreen("home")} style={textButtonStyle}>← Back Home</button>
      <h2 style={{ color: "#c4b896", fontFamily: "'Cinzel', serif", marginBottom: "20px" }}>The Lexicon ({filtered.length})</h2>
      
      <div style={{ display: "flex", gap: "16px", marginBottom: "30px" }}>
        <select style={selectStyle} value={filterDif} onChange={e => setFilterDif(e.target.value)}>
          <option value="all">All Difficulties</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <select style={selectStyle} value={filterCat} onChange={e => setFilterCat(e.target.value)}>
          {categories.map(c => <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>)}
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "16px" }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ 
            background: "#151106", border: "1px solid #2a2210", borderRadius: "8px", 
            padding: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between"
          }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <h4 style={{ color: "#e8deb5", margin: "0 0 8px 0", fontSize: "1.2rem" }}>{w.word}</h4>
                <div style={{display: "flex", gap: "8px"}}>
                  <button onClick={() => handleAskMelquiades(w.word)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem" }} title="Ask Melquiades">✨</button>
                  <button onClick={() => speak(w.word, "es-ES")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem" }} title="Pronounce">🔊</button>
                </div>
              </div>
              <p style={{ color: "#a89f83", fontSize: "0.9rem", margin: "0 0 12px 0" }}>{w.definition}</p>
              <p style={{ color: "#7a6d4c", fontSize: "0.85rem", fontStyle: "italic", margin: 0 }}>"{w.sentence}"</p>
            </div>
            <div style={{ marginTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.75rem", color: "#4a3d18", textTransform: "uppercase" }}>{w.category}</span>
              <button 
                onClick={() => toggleMastery(w.word)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: masteredWords.includes(w.word) ? "#8b6914" : "#4a3d18",
                  fontSize: "0.8rem"
                }}
              >
                {masteredWords.includes(w.word) ? "★ Mastered" : "☆ Mark Mastered"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default function App() {
  const [screen, setScreen] = useState("home");
  const [masteredWords, setMasteredWords] = useState([]);
  
  // Márquez Prompt State
  const [showMarquezPrompt, setShowMarquezPrompt] = useState(false);
  const [showMarquezLine, setShowMarquezLine] = useState(null);
  const timerRef = useRef(null);

  // Gemini API States
  const [geminiModalData, setGeminiModalData] = useState({ visible: false, content: "", word: "", loading: false });

  // Force load voices on mount for better availability
  useEffect(() => {
    if (voiceSynthesisInstance && voiceSynthesisInstance.onvoiceschanged !== undefined) {
      voiceSynthesisInstance.onvoiceschanged = () => {
        voiceSynthesisInstance.getVoices();
      };
    }
  }, []);

  const startMarquezTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowMarquezPrompt(true);
    }, 2 * 60 * 1000); // 2 minutes
  }, []);

  useEffect(() => {
    startMarquezTimer();
    return () => clearTimeout(timerRef.current);
  }, [startMarquezTimer, screen]);

  const handleMarquezYes = () => {
    setShowMarquezPrompt(false);
    const randomLine = MARQUEZ_LINES[Math.floor(Math.random() * MARQUEZ_LINES.length)];
    setShowMarquezLine(randomLine);
  };

  const handleMarquezNo = () => {
    setShowMarquezPrompt(false);
    startMarquezTimer();
  };

  const closeMarquezLine = () => {
    setShowMarquezLine(null);
    startMarquezTimer();
  };

  const showRandomMarquezNow = () => {
    const randomLine = MARQUEZ_LINES[Math.floor(Math.random() * MARQUEZ_LINES.length)];
    setShowMarquezLine(randomLine);
  };

  const toggleMastery = (word) => {
    setMasteredWords(prev => 
      prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
    );
  };

  // ─── Gemini LLM Handlers ───
  const handleAskMelquiades = async (word) => {
    setGeminiModalData({ visible: true, content: "", word, loading: true });
    
    const systemInstruction = "You are Melquíades, the wise and enigmatic gypsy from Gabriel García Márquez's 'One Hundred Years of Solitude'. You are an expert in Spanish literature, magical realism, and etymology. You speak in a wise, slightly mystical, yet helpful and educational tone.";
    const prompt = `Explain the deeper literary or cultural significance of the Spanish word "${word}" in the context of Magical Realism or Latin American literature. Keep it insightful but concise, about 3 to 4 sentences maximum.`;
    
    const response = await callGeminiAPI(prompt, systemInstruction);
    setGeminiModalData({ visible: true, content: response, word, loading: false });
  };

  const handleGenerateStory = async () => {
    if (masteredWords.length === 0) return;
    setGeminiModalData({ visible: true, content: "", word: null, loading: true });

    const systemInstruction = "You are an author writing in the style of Gabriel García Márquez (Magical Realism). You write evocative, slightly surreal, and deeply melancholic or wondrous prose.";
    const prompt = `Write a 2-to-3 paragraph original short story in English. You MUST seamlessly incorporate the following Spanish vocabulary words naturally into the English text (providing enough context clues so a learner understands their meaning): ${masteredWords.join(", ")}. Do not just list them; weave them into a beautiful, magical realism narrative.`;

    const response = await callGeminiAPI(prompt, systemInstruction);
    setGeminiModalData({ visible: true, content: response, word: null, loading: false });
  };

  return (
    <div style={{ 
      minHeight: "100vh", backgroundColor: "#0a0804", color: "#c4b896", 
      fontFamily: "'Inter', sans-serif", padding: "20px" 
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=EB+Garamond:ital@0;1&family=Inter:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        button { transition: all 0.2s ease; }
        button:hover { filter: brightness(1.2); }
      `}</style>

      {/* Decorative letterbox borders */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent 10%, #8b6914 50%, transparent 90%)", opacity: 0.4, zIndex: 100 }} />
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent 10%, #8b6914 50%, transparent 90%)", opacity: 0.2, zIndex: 100 }} />

      {showMarquezPrompt && <MarquezPromptModal onYes={handleMarquezYes} onNo={handleMarquezNo} />}
      {showMarquezLine && <MarquezLineModal line={showMarquezLine} onClose={closeMarquezLine} />}
      {geminiModalData.visible && (
        <MelquiadesModal 
          content={geminiModalData.content} 
          word={geminiModalData.word} 
          loading={geminiModalData.loading} 
          onClose={() => setGeminiModalData({ ...geminiModalData, visible: false })} 
        />
      )}

      {screen === "home" && <Home setScreen={setScreen} masteredWords={masteredWords} handleGenerateStory={handleGenerateStory} showRandomMarquezNow={showRandomMarquezNow} />}
      {screen === "flashcards" && <Flashcards setScreen={setScreen} masteredWords={masteredWords} toggleMastery={toggleMastery} handleAskMelquiades={handleAskMelquiades} />}
      {screen === "quiz" && <Quiz setScreen={setScreen} />}
      {screen === "browse" && <Browse setScreen={setScreen} masteredWords={masteredWords} toggleMastery={toggleMastery} handleAskMelquiades={handleAskMelquiades} />}
    </div>
  );
}