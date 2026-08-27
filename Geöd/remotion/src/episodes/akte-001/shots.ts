import type {Shot} from '../../lib/shots';

/**
 * AKTE 001 – „Verkaufe verpasste Anrufe“
 *
 * ACHTUNG – ENTWURF, NICHT FREIGEGEBEN.
 *
 * Diese Shotliste ist aus der STILANALYSE („13 erzählerische Illustrationen“,
 * Tresorkopf als Autoritätsfigur, Dachdecker/Kunde/Telefon/Automationsmaschine)
 * und den vorhandenen Szenenbildern rekonstruiert. Der verbindliche
 * Sprechertext steht in `Geldakte_Kanalmaschine.md`, die dem Projekt noch
 * fehlt. Vor der Produktion gilt:
 *
 *  1. `voiceover` gegen die freigegebene Kanalmaschine austauschen
 *     (120–140 Wörter gesamt, Handbuch Abschnitt 5, Arbeitsplatz B).
 *  2. Alle `betrag`-Werte durch geprüfte Zahlen ersetzen. `€ ???` ist ein
 *     bewusst sichtbarer Platzhalter, damit nichts ungeprüft rendert.
 *  3. `image` auf die Dateien in `public/akte-001/` setzen. `null` rendert
 *     eine Platzhalterkarte.
 *  4. Erlaubnis bzw. Vertragsbeziehung muss sichtbar verankert sein
 *     (Qualitäts-Gate, Punkt 2).
 */
export const akte001Shots: readonly Shot[] = [
  {
    id: 1,
    image: null,
    beschreibung:
      'Dachdecker kniet auf dem Dach und hämmert. Neben ihm klingelt das Handy auf einer Holzkiste.',
    caption: 'Er hört es nicht',
    voiceover:
      'Ein Dachdecker steht auf dem Dach. Sein Telefon klingelt zum vierten Mal an diesem Vormittag.',
    sekunden: 2.8,
    kenBurns: 'zoom-in',
  },
  {
    id: 2,
    image: null,
    beschreibung:
      'Dachdecker greift sich an den Helm, ratlos, das Handy vibriert neben ihm.',
    caption: 'Hände voll',
    voiceover:
      'Er kann nicht rangehen. Seine Hände sind voll, und die Leiter wackelt.',
    sekunden: 2.4,
    kenBurns: 'pan-right',
  },
  {
    id: 3,
    image: null,
    beschreibung:
      'Kunde im Fenster darunter telefoniert wütend, wird nicht erreicht.',
    caption: 'Der Kunde wartet',
    voiceover:
      'Am anderen Ende wartet ein Kunde, der heute einen Auftrag vergeben will.',
    sekunden: 2.4,
    kenBurns: 'zoom-in',
  },
  {
    id: 4,
    image: null,
    beschreibung:
      'Kunde legt auf und wählt sofort die nächste Nummer aus der Trefferliste.',
    caption: 'Nächste Nummer',
    voiceover:
      'Nach dem dritten Klingeln legt er auf und ruft den nächsten Betrieb an.',
    sekunden: 2.6,
    kenBurns: 'pan-left',
  },
  {
    id: 5,
    image: null,
    beschreibung:
      'Handy mit langer roter Liste verpasster Anrufe, daneben der Tresorkopf mit Taschenrechner, Scheine wehen davon.',
    caption: 'Vier verpasst',
    betrag: '€ ???',
    voiceover:
      'Vier verpasste Anrufe an einem Tag. Für den Dachdecker sind das keine Anrufe, sondern Aufträge.',
    sekunden: 3.0,
    kenBurns: 'zoom-out',
  },
  {
    id: 6,
    image: null,
    beschreibung:
      'Büro: Geldscheine wirbeln aus dem Kalender in einen Gully im Boden. Tresorkopf zeigt darauf.',
    caption: 'Jeden Monat',
    betrag: '€ ???',
    voiceover:
      'Hochgerechnet auf den Monat verschwindet so ein Betrag, den kein Betrieb freiwillig abschreiben würde.',
    sekunden: 3.0,
    kenBurns: 'pan-down',
  },
  {
    id: 7,
    image: null,
    beschreibung:
      'Tresorkopf am Schreibtisch, Lampe an, öffnet die burgunderrote Akte mit Lupe und Fotos.',
    caption: 'Akte geöffnet',
    voiceover: 'Und genau hier beginnt das Geschäftsmodell.',
    sekunden: 2.2,
    kenBurns: 'zoom-in',
  },
  {
    id: 8,
    image: null,
    beschreibung:
      'Automationsmaschine: verpasster Anruf läuft oben hinein, unten kommt eine Rückruf-Nachricht heraus.',
    caption: 'Anruf wird Termin',
    voiceover:
      'Ein System erkennt den verpassten Anruf und schickt dem Anrufer sofort eine Nachricht zurück.',
    sekunden: 3.0,
    kenBurns: 'pan-right',
  },
  {
    id: 9,
    image: null,
    beschreibung:
      'Vertrag zwischen Dachdecker und Dienstleister, Unterschrift und Haken – die Erlaubnis ist sichtbar.',
    caption: 'Mit Auftrag',
    voiceover:
      'Wichtig: Das läuft im Auftrag des Betriebs, mit Vertrag und im Namen des Betriebs.',
    sekunden: 2.8,
    kenBurns: 'zoom-in',
  },
  {
    id: 10,
    image: null,
    beschreibung:
      'Kunde im Wohnzimmer liest die Rückruf-Nachricht und bestätigt den Termin, grüner Haken.',
    caption: 'Termin steht',
    erfolg: true,
    voiceover:
      'Der Kunde bekommt in Sekunden eine Antwort und bucht einen Termin, statt weiterzuwählen.',
    sekunden: 2.8,
    kenBurns: 'zoom-out',
  },
  {
    id: 11,
    image: null,
    beschreibung:
      'Isometrische Karte mit vielen Handwerksbetrieben, Tresorkopf hakt eine Liste ab.',
    caption: 'Jeder Betrieb',
    voiceover:
      'Dachdecker, Installateur, Elektriker, Maler – jeder Betrieb mit Aussendienst hat dasselbe Loch.',
    sekunden: 2.8,
    kenBurns: 'pan-up',
  },
  {
    id: 12,
    image: null,
    beschreibung:
      'Tresorkopf hält den offenen Aktenkoffer, zeigt direkt in die Kamera.',
    caption: 'Wer zahlt hier',
    voiceover:
      'Die Frage ist nur, wer das Loch schliesst – und wer dafür bezahlt wird.',
    sekunden: 2.6,
    kenBurns: 'zoom-in',
  },
];
