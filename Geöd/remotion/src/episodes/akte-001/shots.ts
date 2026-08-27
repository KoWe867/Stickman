import type {Shot} from '../../lib/shots';

/**
 * AKTE 001 – „Verkaufe verpasste Anrufe“
 *
 * Bilder: `episodes/AKTE-001/visualprompts.md` (12 Shotprompts, unverändert
 * in der dort festgelegten Reihenfolge).
 * Sprechertext: `episodes/AKTE-001/script.md`, Arbeitsfassung, 139 Wörter.
 *
 * Die `voiceover`-Felder sind schnittbezogene Fragmente eines durchlaufenden
 * Reads – der Text läuft über die Schnitte hinweg weiter, einzelne Sätze
 * verteilen sich deshalb über zwei Shots.
 *
 * Rechnung geprüft: 2 × 4 × 20 = 160 und 160 × 35 € = 5.600 €. Beide korrekt.
 *
 * OFFEN vor der Freigabe:
 *  1. Redaktionelle Sperre aus `script.md`: Wortlaut, Markenbezeichnung,
 *     Datenschutzprozess, Vergütungsdefinition und Zahlen brauchen die
 *     Freigabe einer zweiten Person.
 *  2. Timing gegen `public/audio/voiceover.m4a` legen. Die Datei liegt dem
 *     Projekt nicht vor; die Dauern hier sind aus der Sprechlänge geschätzt.
 *  3. Bilder nach `public/akte-001/` legen und `image` setzen.
 */
export const akte001Shots: readonly Shot[] = [
  {
    id: 1,
    image: null,
    beschreibung:
      'Nahaufnahme eines anonymisierten Smartphones mit verpasstem Anruf, rotes Warnsignal, Geldschein als grafisches Beweisstück.',
    caption: 'Verpasst',
    voiceover: 'Ein Dachdecker steht auf dem Gerüst. Sein Handy klingelt.',
    sekunden: 2.6,
    kenBurns: 'zoom-in',
  },
  {
    id: 2,
    image: null,
    beschreibung:
      'Handwerker auf einem Gerüst, Handy in der Tasche, neugieriger statt dramatischer Gesichtsausdruck, sichere Baustellendarstellung.',
    caption: 'Er geht nicht ran',
    voiceover: 'Er geht nicht ran.',
    sekunden: 2.2,
    kenBurns: 'pan-down',
  },
  {
    id: 3,
    image: null,
    beschreibung:
      'Geöffnete Fallakte mit Uhrzeit, Telefon und leerem Kontaktfeld, Tresorkopf als Ermittler.',
    caption: 'Zwei Minuten',
    voiceover: 'Zwei Minuten später',
    sekunden: 2.2,
    kenBurns: 'zoom-in',
  },
  {
    id: 4,
    image: null,
    beschreibung:
      'Kundin am Fenster ruft einen Betrieb an, im Hintergrund ein zweites Telefon, klarer Ursache-Wirkungs-Moment.',
    caption: 'Nächster Betrieb',
    voiceover: 'ruft der Kunde den nächsten Betrieb an.',
    sekunden: 3.0,
    kenBurns: 'pan-right',
  },
  {
    id: 5,
    image: null,
    beschreibung:
      'Tresorkopf zeigt auf eine leere Verbindung zwischen Kunde und Betrieb, einzelne gelbe Markierung.',
    caption: 'Die Lücke',
    voiceover: 'Genau hier liegt die Lücke.',
    sekunden: 2.6,
    kenBurns: 'zoom-in',
  },
  {
    id: 6,
    image: null,
    beschreibung:
      'Vereinfachte Stadtkarte mit vier neutralen Betriebsmarkern, keine Kartendienstkopie und keine echten Ortsdaten.',
    caption: 'Vier Betriebe',
    voiceover:
      'Du vereinbarst mit einem Betrieb, verpasste Anrufe sofort zu beantworten.',
    sekunden: 3.2,
    kenBurns: 'pan-up',
  },
  {
    id: 7,
    image: null,
    beschreibung:
      'Maschine beantwortet eine Anfrage nach einer vorher festgelegten Regel, Zustimmungssymbol sichtbar.',
    caption: 'Sofort-Antwort',
    voiceover: 'Eine kurze Nachricht fragt:',
    sekunden: 3.0,
    kenBurns: 'zoom-out',
  },
  {
    id: 8,
    image: null,
    beschreibung:
      'Chat mit vier kurzen Fragen: WAS, WO, FOTO, WANN. Neutrale, synthetische Beispieldaten.',
    caption: 'Was Wo Foto Wann',
    voiceover:
      'Was ist kaputt? Wo ist der Einsatzort? Wann passt ein Termin?',
    sekunden: 3.4,
    kenBurns: 'zoom-in',
    beats: ['WAS', 'WO', 'FOTO', 'WANN'],
  },
  {
    id: 9,
    image: null,
    beschreibung:
      'Kalenderblock mit Termin, Betrieb als Auftraggeber sichtbar, keine echten Kundendaten.',
    caption: 'Nur mit Zustimmung',
    voiceover:
      'Nur wenn der Betrieb zustimmt, leitest du die Anfrage nach seinen Regeln weiter und buchst einen Termin.',
    sekunden: 3.6,
    kenBurns: 'pan-left',
    erfolg: true,
    beats: ['ZUSTIMMUNG', 'NACH SEINEN REGELN', 'TERMIN'],
  },
  {
    id: 10,
    image: null,
    beschreibung:
      'Große Rechentafel mit 2 x 4 x 20 = 160, jeder Faktor als eigenes Beweisstück.',
    caption: '160 Termine',
    voiceover:
      'Beispiel: Zwei qualifizierte Termine pro Tag, vier Betriebe, 20 Arbeitstage. Das sind 2 x 4 x 20 = 160 Termine.',
    sekunden: 4.2,
    kenBurns: 'zoom-in',
    stempel: 'Modellrechnung',
    beats: ['2 TERMINE / TAG', '4 BETRIEBE', '20 ARBEITSTAGE', '= 160'],
  },
  {
    id: 11,
    image: null,
    beschreibung:
      '160 Termine und 35 EUR führen zu 5.600 EUR, Stempel MODELLRECHNUNG gut sichtbar.',
    caption: 'Im Monat',
    betrag: '5.600 €',
    voiceover:
      'Bei 35 Euro je wahrgenommenem Termin ergibt das 160 x 35 = 5.600 Euro Umsatz im Monat.',
    sekunden: 4.6,
    kenBurns: 'zoom-out',
    stempel: 'Modellrechnung',
    // Das Ergebnis trägt der grosse Betrag, nicht noch ein Beat – sonst steht
    // 5.600 € doppelt im Bild.
    beats: ['160 TERMINE', '× 35 €'],
  },
  {
    id: 12,
    image: null,
    beschreibung:
      'Tresorkopf blickt in die Kamera, Fallakte geschlossen, CTA und Hinweis Beispielrechnung.',
    caption: 'Du reparierst nichts',
    voiceover:
      'Das ist eine Beispielrechnung. Kosten, Ausfälle, Steuern und Stornos fehlen. Du reparierst kein Dach. Du verkaufst dem Betrieb eine saubere Reaktion auf verpasste Anrufe.',
    sekunden: 5.0,
    kenBurns: 'zoom-in',
    beats: ['KEIN DACH', 'NUR DIE REAKTION'],
  },
];

/**
 * Pflicht-Kleindruck aus `referenzen/Geldakte_Kanalmaschine.md`, Abschnitt 7.
 * Muss über der gesamten Folge sichtbar bleiben (Qualitäts-Gate, Punkt 3).
 */
export const KLEINDRUCK =
  'Beispielrechnung · nur mit Vertrag und datenschutzkonformer Einwilligung';
