import type {Shot} from '../../lib/shots';

/**
 * AKTE 001 – „Verkaufe verpasste Anrufe“
 *
 * 18 Shots. Die zwölf Bilder aus `episodes/AKTE-001/visualprompts.md` stehen
 * unverändert in ihrer Reihenfolge; dazwischen liegen sechs neue Shots, die
 * `referenzen/Geldakte_Kanalmaschine.md` Abschnitt 12 für die 61-Sekunden-
 * Fassung verlangt: ein echter Beleg, ein Kundeneinwand und die
 * Vertragsbedingung. Sie sind in `visualprompts.md` als 13–18 ergänzt.
 *
 * WICHTIG: Die Tonspur ist fertig und wird nicht verlängert. Die sechs neuen
 * Shots sind deshalb zusätzliche *visuelle* Beats über bereits gesprochenem
 * Text, keine neue Narration. Soll der Beleg-, Einwand- und Vertragsbeat auch
 * inhaltlich gesprochen werden, braucht es einen neuen Voiceover.
 *
 * Timing: aus `public/akte-001/voiceover.m4a` gemessen (60,16 s). Die
 * Schnittgrenzen liegen auf den per Pausenerkennung ermittelten Sprechpausen,
 * wo eine nah genug lag, sonst mitten im Satz. Alle Shots liegen zwischen
 * 2,0 und 4,3 Sekunden; die fünf über 3,2 Sekunden tragen innere Beats.
 *
 * Die `voiceover`-Felder sind schnittbezogene Fragmente eines durchlaufenden
 * Reads – Sätze verteilen sich über mehrere Shots.
 *
 * Rechnung geprüft: 2 × 4 × 20 = 160 und 160 × 35 € = 5.600 €. Beide korrekt.
 *
 * OFFEN vor der Freigabe:
 *  1. Abgleich, ob die Tonspur wirklich `script.md` spricht. 139 Wörter auf
 *     60,16 s sind 2,3 Wörter/Sekunde; die Kanalmaschine setzt 2,7–2,9 an.
 *     Ein Mensch muss die Datei abhören – siehe `remotionplan.md`, Punkt 1.
 *  2. Redaktionelle Sperre aus `script.md`: Wortlaut, Markenbezeichnung,
 *     Datenschutzprozess, Vergütungsdefinition und Zahlen brauchen die
 *     Freigabe einer zweiten Person.
 *  3. Bilder nach `public/akte-001/` legen und `image` setzen.
 */
export const akte001Shots: readonly Shot[] = [
  {
    id: 1,
    image: null,
    beschreibung:
      'Nahaufnahme eines anonymisierten Smartphones mit verpasstem Anruf, rotes Warnsignal, Geldschein als grafisches Beweisstück.',
    caption: 'Verpasst',
    voiceover: 'Ein Dachdecker steht auf dem Gerüst.',
    sekunden: 2.99,
    kenBurns: 'zoom-in',
  },
  {
    id: 2,
    image: null,
    beschreibung:
      'Handwerker auf einem Gerüst, Handy in der Tasche, neugieriger statt dramatischer Gesichtsausdruck, sichere Baustellendarstellung.',
    caption: 'Sein Handy klingelt',
    voiceover: 'Sein Handy klingelt.',
    sekunden: 2.79,
    kenBurns: 'pan-down',
  },
  {
    id: 3,
    image: null,
    beschreibung:
      'NEU – Beleg: Anrufprotokoll als Beweisstück, vier Einträge mit Uhrzeit, alle unbeantwortet, roter Balken am Rand.',
    caption: 'Vier Anrufe',
    voiceover: 'Er geht nicht ran.',
    sekunden: 3.65,
    kenBurns: 'pan-up',
    beats: ['08:14', '09:02', '11:37', '14:05'],
  },
  {
    id: 4,
    image: null,
    beschreibung:
      'Geöffnete Fallakte mit Uhrzeit, Telefon und leerem Kontaktfeld, Tresorkopf als Ermittler.',
    caption: 'Zwei Minuten',
    voiceover: 'Zwei Minuten später',
    sekunden: 2.72,
    kenBurns: 'zoom-in',
  },
  {
    id: 5,
    image: null,
    beschreibung:
      'Kundin am Fenster ruft einen Betrieb an, im Hintergrund ein zweites Telefon, klarer Ursache-Wirkungs-Moment.',
    caption: 'Nächster Betrieb',
    voiceover: 'ruft der Kunde den nächsten Betrieb an.',
    sekunden: 3.1,
    kenBurns: 'pan-right',
  },
  {
    id: 6,
    image: null,
    beschreibung:
      'NEU – Beleg: Der zweite Betrieb nimmt ab, der Auftrag wandert sichtbar von der einen zur anderen Seite, grüner Haken beim Konkurrenten.',
    caption: 'Der nimmt ab',
    voiceover: '',
    sekunden: 2.99,
    kenBurns: 'pan-left',
  },
  {
    id: 7,
    image: null,
    beschreibung:
      'Tresorkopf zeigt auf eine leere Verbindung zwischen Kunde und Betrieb, einzelne gelbe Markierung.',
    caption: 'Die Lücke',
    voiceover: 'Genau hier liegt die Lücke.',
    sekunden: 2.84,
    kenBurns: 'zoom-in',
  },
  {
    id: 8,
    image: null,
    beschreibung:
      'Vereinfachte Stadtkarte mit vier neutralen Betriebsmarkern, keine Kartendienstkopie und keine echten Ortsdaten.',
    caption: 'Vier Betriebe',
    voiceover: 'Du vereinbarst mit einem Betrieb,',
    sekunden: 2.99,
    kenBurns: 'pan-up',
  },
  {
    id: 9,
    image: null,
    beschreibung:
      'NEU – Vertragsbedingung: Vertrag zwischen Tresorkopf und Betriebsinhaber, die Klausel zur Sofortantwort ist hervorgehoben, Unterschrift und Stempel.',
    caption: 'Nur mit Vertrag',
    voiceover: 'verpasste Anrufe sofort zu beantworten.',
    sekunden: 2.79,
    kenBurns: 'zoom-in',
  },
  {
    id: 10,
    image: null,
    beschreibung:
      'Maschine beantwortet eine Anfrage nach einer vorher festgelegten Regel, Zustimmungssymbol sichtbar.',
    caption: 'Sofort-Antwort',
    voiceover: 'Eine kurze Nachricht fragt:',
    sekunden: 3.01,
    kenBurns: 'zoom-out',
  },
  {
    id: 11,
    image: null,
    beschreibung:
      'Chat mit vier kurzen Fragen: WAS, WO, FOTO, WANN. Neutrale, synthetische Beispieldaten.',
    caption: 'Was Wo Foto Wann',
    voiceover: 'Was ist kaputt? Wo ist der Einsatzort? Wann passt ein Termin?',
    sekunden: 4.22,
    kenBurns: 'zoom-in',
    beats: ['WAS', 'WO', 'FOTO', 'WANN'],
  },
  {
    id: 12,
    image: null,
    beschreibung:
      'NEU – Kundeneinwand: Betriebsinhaber hebt abwehrend die Hand, Sprechblase mit skeptischer Rückfrage, Tresorkopf bleibt ruhig.',
    caption: 'Und wenn nicht?',
    voiceover: '',
    sekunden: 3.07,
    kenBurns: 'pan-right',
  },
  {
    id: 13,
    image: null,
    beschreibung:
      'NEU – Vertragsbedingung: Einwilligungsschalter springt auf Zustimmung, daneben die Regel des Betriebs als kurze Liste.',
    caption: 'Nur mit Zustimmung',
    voiceover: 'Nur wenn der Betrieb zustimmt,',
    sekunden: 2.84,
    kenBurns: 'zoom-in',
    erfolg: true,
  },
  {
    id: 14,
    image: null,
    beschreibung:
      'Kalenderblock mit Termin, Betrieb als Auftraggeber sichtbar, keine echten Kundendaten.',
    caption: 'Termin gebucht',
    voiceover:
      'leitest du die Anfrage nach seinen Regeln weiter und buchst einen Termin.',
    sekunden: 3.74,
    kenBurns: 'pan-left',
    erfolg: true,
    beats: ['NACH SEINEN REGELN', 'TERMIN'],
  },
  {
    id: 15,
    image: null,
    beschreibung:
      'Große Rechentafel mit 2 x 4 x 20 = 160, jeder Faktor als eigenes Beweisstück.',
    caption: '160 Termine',
    voiceover:
      'Beispiel: Zwei qualifizierte Termine pro Tag, vier Betriebe, 20 Arbeitstage. Das sind 2 x 4 x 20 = 160 Termine.',
    sekunden: 3.92,
    kenBurns: 'zoom-in',
    stempel: 'Modellrechnung',
    beats: ['2 TERMINE / TAG', '4 BETRIEBE', '20 ARBEITSTAGE', '= 160'],
  },
  {
    id: 16,
    image: null,
    beschreibung:
      '160 Termine und 35 EUR führen zu 5.600 EUR, Stempel MODELLRECHNUNG gut sichtbar.',
    caption: 'Im Monat',
    betrag: '5.600 €',
    voiceover:
      'Bei 35 Euro je wahrgenommenem Termin ergibt das 160 x 35 = 5.600 Euro Umsatz im Monat.',
    sekunden: 3.44,
    kenBurns: 'zoom-out',
    stempel: 'Modellrechnung',
    // Das Ergebnis trägt der grosse Betrag, nicht noch ein Beat – sonst steht
    // 5.600 € doppelt im Bild.
    beats: ['160 TERMINE', '× 35 €'],
  },
  {
    id: 17,
    image: null,
    beschreibung:
      'NEU – Beleg: Dieselbe Rechnung mit vier Abzugszeilen darunter – Kosten, Ausfälle, Steuern, Stornos – jede als eigener Beleg, Ergebnis bewusst offen.',
    caption: 'Minus Kosten',
    voiceover:
      'Das ist eine Beispielrechnung. Kosten, Ausfälle, Steuern und Stornos fehlen.',
    sekunden: 2.16,
    kenBurns: 'pan-down',
    stempel: 'Modellrechnung',
  },
  {
    id: 18,
    image: null,
    beschreibung:
      'Tresorkopf blickt in die Kamera, Fallakte geschlossen, CTA und Hinweis Beispielrechnung.',
    caption: 'Du reparierst nichts',
    voiceover:
      'Du reparierst kein Dach. Du verkaufst dem Betrieb eine saubere Reaktion auf verpasste Anrufe.',
    sekunden: 2.16,
    kenBurns: 'zoom-in',
  },
];

/**
 * Pflicht-Kleindruck aus `referenzen/Geldakte_Kanalmaschine.md`, Abschnitt 7.
 * Muss über der gesamten Folge sichtbar bleiben (Qualitäts-Gate, Punkt 3).
 */
export const KLEINDRUCK =
  'Beispielrechnung · nur mit Vertrag und datenschutzkonformer Einwilligung';
