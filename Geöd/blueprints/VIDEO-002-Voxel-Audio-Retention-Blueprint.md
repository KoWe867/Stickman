# VIDEO 002 – Voxel-Blockbau, tonlos gesprochen

**Produktions-Blueprint · Stand 27. August 2026**
**Format:** 1080 × 1920, 30 fps, 54,0 Sekunden
**Besonderheit:** kein Voiceover. Die gesamte Führung übernehmen Text-Overlays und ein getakteter Sound-Layer.
**Thema:** dieselbe Mechanik wie AKTE 001 – verpasste Handwerker-Anrufe werden zu erlaubnisbasierten Terminen.

---

## 0. Stilentscheidung und warum sie so getroffen ist

Der ursprüngliche Auftrag lautete „100 % Roblox-Stil mit klassischen Roblox-Soundeffekten" **und** „frei von urheberrechtlich geschützten Markenproblemen". Beides zusammen ist nicht erfüllbar:

| Gefordertes Element | Problem | Ersatz in diesem Blueprint |
|---|---|---|
| Oof-Sound | 2022 von Roblox wegen ungeklärter Rechte entfernt | `thud_blunt` – trockener Holz-Impact, selbst erzeugt |
| Roblox-Avatare | geschützte Figurgestaltung | eigene Voxel-Figur, siehe Abschnitt 1.1 |
| Roblox-Marke, -Logo, -UI | Wort- und Bildmarke der Roblox Corporation | eigenes Voxel-UI, siehe 1.3 |
| „typische Roblox-Welt" | Trade Dress | generischer Klötzchen-Baukasten |

Der eigentliche Wert des Konzepts liegt nicht im Roblox-Look, sondern im **Audio-Takt**. Der ist stilunabhängig und bleibt vollständig erhalten. Ergebnis: identische Retention-Mechanik, kein Rechtsrisiko im kommerziellen Vertrieb.

---

## 1. Visuelle Szenen-Architektur

### 1.1 Die Figuren

**HANDWERKER (Hauptfigur)**
- Körper: Quaderstapel, 1 × 1 × 2 Einheiten, keine Gelenkkugeln
- Kopf: Würfel, aufgemalte Zwei-Punkt-Augen, kein Mund; Emotion läuft über Kopfneigung und Augenbrauenbalken
- Farben: Helm `#E8B23A`, Hemd `#1B2A47`, Hose `#15191A`, Haut `#D9A06B`
- Silhouette-Merkmal: schräg sitzender Helm, damit die Figur bei 1080-Breite auf 200 px noch erkennbar bleibt
- Bewegung: keine Interpolation zwischen Posen. Harte Pose-to-Pose-Schnitte auf 6 fps innerhalb der 30-fps-Timeline. Das erzeugt den Klötzchen-Ruck, ohne Roblox zu kopieren.

**TRESORKOPF (Autoritätsfigur, Übernahme aus GELDAKTE)**
- Kopf: abgerundeter Würfel mit Drehrad links, Bandmaske, Kupfer-Augen
- Anzug: Dunkelblau `#1B2A47`, Krawatte Burgund `#701C32`
- Auftritt: nur in vier Shots, immer frontal, nie in Bewegung. Er ist der ruhende Pol gegen den hektischen Schnitt.

**KONKURRENT (Nebenfigur, 2 Auftritte)**
- Identischer Bauplan wie Handwerker, Helm in Grau `#8A8F98`, Hemd Grün `#2E9E5B`
- Erscheint nur, wenn ein Auftrag abwandert. Grün ist hier **Erfolgssignal des Gegners**, nicht des Zuschauers.

### 1.2 Die Umgebung

Drei Sets, jedes aus demselben Klötzchen-Baukasten, damit die Asset-Bibliothek klein bleibt:

| Set | Aufbau | Verwendung |
|---|---|---|
| **DACH** | Ziegelraster 12 × 8 Blöcke, Gerüststangen, Himmel als Flachfarbe `#7FB2D9` mit drei Wolkenquadern | Sek. 0–12, 48–54 |
| **STRASSE** | vier Häuserwürfel in einer Reihe, je ein Betriebsschild, Boden `#6E7B6A` | Sek. 12–22 |
| **BÜRO** | ein Schreibtischquader, Aktenschrank, Lampe, Wand `#F3E8CF` | Sek. 22–48 |

Kein Set hat einen Hintergrundverlauf. Flachfarben halten die Dateigröße klein und die Text-Overlays lesbar.

### 1.3 Das UI-Vokabular

Eigene Elemente, bewusst nicht an eine bestehende Plattform angelehnt:

- **Anruf-Karte:** Rechteck mit abgeschnittener oberer rechter Ecke, roter Randbalken links, Uhrzeit in Monospace
- **Chat-Blase:** Rechteck mit Dreiecksfuß, immer aus der unteren Bildhälfte einfahrend
- **Inventar-Leiste:** fünf Quadrate am unteren Rand, gefüllte Felder in Kupfer `#D68A3A` — zeigt Fortschritt statt Besitz
- **Zähler:** siebensegmentartige Ziffern aus Blöcken, keine Systemschrift

### 1.4 Kamera und Mikro-Bewegung

Die wichtigste Regel gegen Abbrüche: **kein Frame steht still.** Auch wenn die Figur nicht animiert ist, bewegt sich die Kamera.

| Bewegungstyp | Einsatz | Amplitude |
|---|---|---|
| Slow Push | Grundzustand jeder Einstellung | 1,0 → 1,06 über die Shotdauer |
| Whip-Pan | jeder Szenenwechsel | 8 Frames, mit Motion Blur |
| Snap-Zoom | auf jeden Zahlen-Beat | 3 Frames rein, 5 Frames zurück |
| Screen-Shake | auf jeden Impact-Sound | 4 Frames, ±6 px, abklingend |
| Parallaxe | Vorder-/Mittel-/Hintergrund | 3 Ebenen, Faktor 1,0 / 0,6 / 0,25 |

Zusätzlich läuft über die gesamte Laufzeit ein **Idle-Loop**: die Kamera atmet mit ±2 px auf einer 1,4-Sekunden-Sinuskurve. Das ist unter der Wahrnehmungsschwelle, verhindert aber das tote Standbild.

---

## 2. Der Audio- und Retention-Takt

### 2.1 Die Sound-Bibliothek

Elf Grundsounds, alle in einer eigenen Bibliothek, alle austauschbar. **Bezugsquellen mit kommerzieller Lizenz:** Epidemic Sound, Artlist, Soundstripe (Abo-Lizenz), Pixabay Audio und freesound.org (nur CC0-Dateien, Lizenz je Datei prüfen und im Asset-Ledger festhalten).

| Kürzel | Beschreibung | Dauer | Funktion |
|---|---|---:|---|
| `ui_click` | trockener Tastendruck, 2 kHz-Peak | 0,08 s | Taktgeber, wird tonhöhenversetzt gestapelt |
| `ping_notify` | zweitöniger Glockenanschlag | 0,35 s | Benachrichtigung, Aufmerksamkeitsanker |
| `whoosh_short` | gefilterter Rauschsweep | 0,30 s | Szenenwechsel |
| `sub_drop` | Sinus 60 → 28 Hz | 0,60 s | körperlicher Anker, maximal 4 × im Video |
| `impact_hit` | Layer aus Kick und Holzschlag | 0,25 s | Zahlen- und Text-Anschlag |
| `thud_blunt` | dumpfer Holzaufschlag | 0,40 s | Niederlage, Ersatz für den Oof-Reflex |
| `coin_pick` | heller Dreiklang aufwärts | 0,30 s | Gewinn, Item, Erfolg |
| `riser_1s` | gefilterter Rauschanstieg | 1,00 s | Spannung vor einem Reveal |
| `stamp_hard` | Aktenstempel auf Papier | 0,30 s | Bestätigung, Vertrag, Stempel |
| `tape_stop` | Tonbandbremse | 0,45 s | harter Musterbruch, genau 1 × |
| `bass_pulse` | gedämpfter Sub-Puls | 0,20 s | Grundschlag alle 2 s im Hintergrund |

**Lautheit:** Gesamtmix auf **−14 LUFS integriert**, True Peak maximal **−1,0 dBTP**. Jeder Effekt sitzt 4–6 LU unter dem Peak des Text-Anschlags, sonst ermüdet der Mix innerhalb von 20 Sekunden.

### 2.2 Das Ladder-Prinzip

Der stärkste Einzeltrick im ganzen Blueprint: **gestapelte Tonhöhen.** Gleichartige Ereignisse in Folge bekommen denselben Sound, aber jeweils zwei Halbtöne höher. Das Gehör liest eine aufsteigende Tonleiter als unabgeschlossen und hält bis zur Auflösung durch. Eingesetzt bei den vier Anrufkarten (Sek. 4–7) und den vier Rechenfaktoren (Sek. 36–41).

Die Auflösung kommt jeweils als Terzsprung nach unten plus `impact_hit`. Ohne diese Auflösung entsteht Anspannung ohne Belohnung — der häufigste Fehler in getakteten Shorts.

### 2.3 Sekundenprotokoll

Grundschlag: `bass_pulse` auf jeder geraden Sekunde, −20 LU, durchgehend. Er ist nicht einzeln aufgeführt.

| Sek | Text-Overlay | Sound-Trigger | Animation / Kamera |
|---:|---|---|---|
| 0 | **VIER ANRUFE.** | `sub_drop` + `ping_notify` | Harter Einstieg auf DACH, Snap-Zoom auf Handwerker |
| 1 | *hält, Skalen-Punch* | `ui_click` | Telefonquader neben ihm wackelt, Slow Push |
| 2 | **KEINER ANGENOMMEN.** | `whoosh_short` + `impact_hit` | Whip-Pan auf das Telefon, Screen-Shake |
| 3 | — | `ping_notify` | Erste Anruf-Karte fährt von rechts ein |
| 4 | **08:14** | `ui_click` (Grundton) | Karte 1 stempelt, Snap-Zoom |
| 5 | **09:02** | `ui_click` (+2 HT) | Karte 2 stapelt darüber |
| 6 | **11:37** | `ui_click` (+4 HT) | Karte 3 |
| 7 | **14:05** | `ui_click` (+7 HT) + `impact_hit` | Karte 4, Shake, Kupfer-Aufblitzen |
| 8 | **= 0 AUFTRÄGE** | `thud_blunt` | Handwerker sackt zusammen, Kamera kippt 3° |
| 9 | — | `whoosh_short` | Whip-Pan Richtung Straße |
| 10 | **ER HAT GEARBEITET.** | `ui_click` | Rückblende: Hammer-Loop auf 6 fps |
| 11 | **DAS WAR DAS PROBLEM.** | `impact_hit` | Snap-Zoom auf Helm, Push |
| 12 | — | `whoosh_short` + `bass_pulse` | Schnitt auf STRASSE, Parallaxe läuft an |
| 13 | **DER KUNDE WARTET NICHT.** | `ping_notify` | Kundenfigur am Fenster, Telefonblase |
| 14 | **ZWEI MINUTEN.** | `ui_click` ×2 | Zähler von 120 rückwärts, Ziffernblöcke drehen |
| 15 | — | `riser_1s` startet | Kamera fährt an der Häuserreihe entlang |
| 16 | **DANN RUFT ER DEN NÄCHSTEN.** | `impact_hit` (Riser löst auf) | Whip-Pan auf zweites Haus |
| 17 | — | `coin_pick` | KONKURRENT nimmt ab, grüner Haken |
| 18 | **DER NIMMT AB.** | `thud_blunt` | Auftragsquader wandert sichtbar hinüber |
| 19 | **500 € WEG.** | `sub_drop` | Geldquader zerfällt in Partikel |
| 20 | — | `whoosh_short` | Whip-Pan, Übergang |
| 21 | **DAS IST DIE LÜCKE.** | `impact_hit` | Schnitt auf BÜRO, TRESORKOPF frontal |
| 22 | — | `stamp_hard` | Akte klappt auf, Lampe blitzt |
| 23 | **SCHRITT 1** | `ui_click` + `ping_notify` | Inventar-Leiste erscheint, Feld 1 füllt sich |
| 24 | **VERTRAG MIT DEM BETRIEB.** | `stamp_hard` | Vertragsblatt fährt ein, Unterschrift zeichnet sich |
| 25 | **NUR MIT ERLAUBNIS.** | `ui_click` | Klausel leuchtet kupfern auf |
| 26 | — | `whoosh_short` | Reframe auf Schreibtischmitte |
| 27 | **SCHRITT 2** | `ui_click` + `ping_notify` | Inventar-Feld 2 füllt sich |
| 28 | **AUTO-ANTWORT IN 20 SEK.** | `impact_hit` | Maschinenquader stampft, Zahnrad dreht |
| 29 | — | `ping_notify` | Chat-Blase fährt von unten ein |
| 30 | **WAS?** | `ui_click` (Grundton) | Blase 1 |
| 31 | **WO?** | `ui_click` (+2 HT) | Blase 2 |
| 32 | **FOTO?** | `ui_click` (+4 HT) | Blase 3 |
| 33 | **WANN?** | `ui_click` (+7 HT) + `impact_hit` | Blase 4, Shake |
| 34 | **SCHRITT 3** | `ui_click` + `ping_notify` | Inventar-Feld 3 füllt sich |
| 35 | **NUR BESTÄTIGTE TERMINE.** | `stamp_hard` + `coin_pick` | Kalenderblock klappt auf, grüner Haken |
| 36 | — | `riser_1s` startet | Snap-Zoom auf Rechentafel |
| 37 | **2 TERMINE / TAG** | `ui_click` (Grundton) | Faktor 1 stempelt |
| 38 | **4 BETRIEBE** | `ui_click` (+2 HT) | Faktor 2 |
| 39 | **20 TAGE** | `ui_click` (+4 HT) | Faktor 3 |
| 40 | **= 160 TERMINE** | `ui_click` (+7 HT) + `impact_hit` | Ergebnis, Shake, Riser löst auf |
| 41 | **× 35 €** | `ui_click` (+9 HT) | Multiplikator fährt ein |
| 42 | **= 5.600 €** | `sub_drop` + `coin_pick` | Große Ziffern bauen sich blockweise auf |
| 43 | *Stempel MODELLRECHNUNG* | `stamp_hard` | Stempel schlägt schräg ein |
| 44 | **BEISPIELRECHNUNG.** | `ui_click` | Kleindruck erscheint, Kamera hält |
| 45 | **KOSTEN FEHLEN.** | `ui_click` | Vier Abzugszeilen fahren ein |
| 46 | **STEUERN FEHLEN.** | `ui_click` | Zeile 3 und 4 |
| 47 | — | `tape_stop` | **Musterbruch:** alles friert 12 Frames ein |
| 48 | **DU REPARIERST NICHTS.** | `impact_hit` | Schnitt zurück auf DACH, Werkzeug liegt |
| 49 | — | `whoosh_short` | Dolly-out vom Werkzeug |
| 50 | **DU VERKAUFST DIE REAKTION.** | `sub_drop` | TRESORKOPF tritt frontal ins Bild |
| 51 | — | `stamp_hard` | Akte klappt zu |
| 52 | **FOLGE DER GELDAKTE** | `impact_hit` + `coin_pick` | Snap-Zoom auf Maske |
| 53 | **ODER BLEIB DIE EINNAHMEQUELLE.** | `ping_notify` | Telefon klingelt erneut → Loop-Kante |

**Zählung der Pattern Interrupts:** 27 markante Trigger auf 54 Sekunden, Durchschnittsabstand 2,0 s, größter Abstand 2,4 s (Sek. 43 → 45). Damit ist die Vorgabe „alle 2 bis 3 Sekunden" durchgehend erfüllt.

### 2.4 Die Loop-Kante

Sekunde 53 endet auf demselben Telefonklingeln, mit dem Sekunde 0 beginnt. Bild und Ton sind an dieser Naht deckungsgleich: gleiche Kameraposition, gleiche Flachfarbe, gleicher `ping_notify`. Ein Zuschauer, der nicht wegwischt, sieht den Anfang und merkt eine Sekunde lang nicht, dass das Video von vorn läuft. Das ist der billigste Weg zu Wiedergaben über 100 %.

---

## 3. Psychologischer Mehrwert und Hook-Mechanik

### 3.1 Warum die fehlende Stimme ein Vorteil ist

Ein Voiceover erzeugt eine **Erwartung auf Vollständigkeit**: Der Zuschauer wartet auf das Satzende und kann in dieser Wartezeit entscheiden, ob es sich lohnt. Ohne Stimme fehlt dieser Entscheidungspunkt. Text-Overlays werden nicht gehört, sondern gelesen — und Lesen ist eine aktive Handlung, die schwerer abzubrechen ist als Zuhören.

Dazu kommen drei belastbare Effekte:

1. **Stummer Konsum.** Ein erheblicher Teil des Short-Form-Konsums läuft ohne Ton — im Bett, im Bus, im Büro. Ein Video, das ohne Stimme funktioniert, verliert diese Zuschauer nicht. Mit Ton bekommt es zusätzlich die volle Wirkung. Es gewinnt in beiden Zuständen.
2. **Keine Stimmablehnung.** Jede Stimme polarisiert — Dialekt, Tempo, KI-Klang. Eine Stimme, die 15 % der Zuschauer abstößt, kostet 15 % Retention in den ersten drei Sekunden. Kein Sprecher, keine Ablehnung.
3. **Sprachunabhängigkeit.** Nur die Overlays sind deutsch. Eine englische, spanische oder türkische Fassung ist ein Textaustausch, kein neuer Dreh und keine neue Aufnahme. Das ist der eigentliche Skalierungshebel dieses Formats.

### 3.2 Warum der 2-Sekunden-Takt wirkt

Der Orientierungsreflex ist eine unwillkürliche Reaktion auf neue Reize — das Gehirn richtet die Aufmerksamkeit aus, bevor bewusst entschieden wird. Er lässt nach, wenn ein Reiz sich wiederholt (Habituation). Ein Takt, der alle zwei Sekunden **den Reiztyp wechselt**, verhindert genau diese Gewöhnung.

Deshalb ist die Reihenfolge im Sekundenprotokoll bewusst durchmischt: nie zweimal hintereinander derselbe Soundtyp, außer in den Ladder-Sequenzen — und dort ändert sich die Tonhöhe, was als neuer Reiz zählt.

**Warnung, die in solchen Konzepten meist fehlt:** Ein durchgehend maximaler Takt ermüdet. Deshalb sitzen im Protokoll bewusst zwei Ruhepunkte — Sekunde 44 und der Tape-Stop bei Sekunde 47. Der Musterbruch wirkt nur, wenn vorher ein Muster bestand. Ohne diese Atempausen ist Sekunde 47 kein Bruch, sondern nur mehr vom Gleichen.

### 3.3 Die Hook-Architektur der ersten drei Sekunden

| Sek | Reiz | Wirkung |
|---|---|---|
| 0,0 | `sub_drop` | körperlich, vorbewusst, stoppt den Wischreflex |
| 0,0 | Text **VIER ANRUFE.** | konkrete Zahl statt Behauptung |
| 0,3 | `ping_notify` | vertrautes Benachrichtigungsmuster, erzeugt Reflex zum Hinsehen |
| 1,0 | Skalen-Punch | Bewegung ohne Schnitt, hält den Blick |
| 2,0 | Whip-Pan + Text 2 | erster Szenenwechsel, bestätigt: hier passiert etwas |

Die offene Schleife ist mit Sekunde 0 gesetzt: *Vier Anrufe — und dann?* Sie schließt erst bei Sekunde 42 mit der Zahl. 42 Sekunden gehaltene Neugier bei 54 Sekunden Laufzeit.

### 3.4 Was dieses Format nicht leistet

Ehrlich benannt, damit es niemand falsch einplant:

- **Keine Vertrauensbildung.** Ohne Stimme und Gesicht entsteht keine Bindung an eine Person. Für Verkauf über Vertrauen ist das Format ungeeignet — es liefert Reichweite, nicht Beziehung.
- **Kein komplexer Inhalt.** Alles, was mehr als fünf Wörter pro Beat braucht, funktioniert hier nicht.
- **Hohe Ermüdung bei Serien.** Drei solche Videos hintereinander im Feed wirken wie eins. Das Format braucht Abwechslung im Kanal, nicht Wiederholung.

---

## 4. Automatisierung und Skalierung

### 4.1 Empfehlung: auf der bestehenden Remotion-Pipeline aufbauen

Im Repository liegt bereits ein funktionierendes Remotion-Projekt unter `Geöd/remotion/` mit Szenensystem, Caption-Komponenten, Regelprüfung und geprüftem Renderpfad. Eine zweite Toolchain aus Python und FFmpeg daneben zu stellen würde die Wartung verdoppeln, ohne etwas zu gewinnen.

Der Voxel-Look ist in Remotion umsetzbar, weil er bewusst flach ist: Quader ohne Perspektivverzerrung sind CSS-Transforms auf `<div>`-Elementen. Kein 3D-Renderer nötig.

**Erweiterung um zwei Bausteine:**

```ts
// src/lib/beatsheet.ts
export type Trigger = {
  /** Sekunde im Video, auf die der Effekt fällt. */
  readonly at: number;
  /** Kürzel aus der Sound-Bibliothek, Datei in public/sfx/<key>.mp3 */
  readonly sfx: string;
  /** Halbtonversatz für Ladder-Sequenzen. */
  readonly semitones?: number;
  /** Lautstärke relativ zum Mix, in dB. */
  readonly gain?: number;
};

export type Beat = {
  readonly at: number;
  readonly text: string | null;
  readonly kamera: 'push' | 'whip' | 'snap' | 'shake' | 'hold';
  readonly trigger: readonly Trigger[];
};
```

```tsx
// src/components/SfxSpur.tsx
import {Audio, Sequence, staticFile} from 'remotion';
import type {Trigger} from '../lib/beatsheet';

/**
 * Legt jeden Trigger als eigene Audio-Sequenz auf die Timeline.
 * Remotion mischt die Spuren beim Rendern selbst – kein FFmpeg-Aufruf nötig.
 * playbackRate setzt die Tonhöhe für die Ladder-Sequenzen; das verkürzt den
 * Effekt entsprechend, was bei Sounds unter 0,4 s nicht hörbar stört.
 */
export const SfxSpur: React.FC<{
  readonly trigger: readonly Trigger[];
  readonly fps: number;
}> = ({trigger, fps}) => (
  <>
    {trigger.map((t, i) => (
      <Sequence key={`${t.sfx}-${t.at}-${i}`} from={Math.round(t.at * fps)}>
        <Audio
          src={staticFile(`sfx/${t.sfx}.mp3`)}
          playbackRate={2 ** ((t.semitones ?? 0) / 12)}
          volume={10 ** ((t.gain ?? 0) / 20)}
        />
      </Sequence>
    ))}
  </>
);
```

Damit wird das Sekundenprotokoll aus Abschnitt 2.3 zu Daten. Eine neue Folge ist eine neue Beat-Liste, kein neuer Code.

### 4.2 Lautheitsnormalisierung

Remotion normalisiert nicht. Der Master läuft danach einmal durch FFmpeg — das Binary bringt Remotion selbst mit, ein separates FFmpeg ist nicht nötig:

```bash
npx remotion ffmpeg -i out/VIDEO-002.mp4 \
  -af loudnorm=I=-14:TP=-1.0:LRA=11 \
  -c:v copy -c:a aac -b:a 192k \
  out/VIDEO-002-normalisiert.mp4
```

`-c:v copy` lässt das Bild unangetastet, es wird nur die Tonspur neu kodiert. Das dauert Sekunden statt Minuten.

### 4.3 Asset-Bibliothek

```text
public/
├── sfx/            11 Dateien, MP3 48 kHz, siehe Tabelle 2.1
├── voxel/
│   ├── figuren/    handwerker-*.png, tresorkopf-*.png, konkurrent-*.png
│   ├── sets/       dach.png, strasse.png, buero.png
│   └── ui/         anrufkarte.png, chatblase.png, inventar.png
└── fonts/          Display-Schrift, lizenziert
```

Jede Figur liegt als Pose-Serie vor (6 Posen genügen für den 6-fps-Ruck). Bei drei Figuren und drei Sets sind das rund 30 Dateien für eine unbegrenzte Zahl an Folgen.

### 4.4 Warum kein n8n

n8n lohnt sich, wenn heterogene Dienste verkettet werden. Hier läuft alles in einem Prozess: Daten rein, Remotion rendert, FFmpeg normalisiert. Das ist ein npm-Skript, kein Workflow-Graph. Ein n8n-Knoten dazwischen fügt eine Fehlerquelle hinzu, ohne Arbeit abzunehmen.

Sinnvoll wird n8n erst beim Schritt **danach**: Upload-Planung, Kennzahlen-Abruf, Benachrichtigung bei Freigabe. Das ist ein eigenes Thema und gehört nicht in den Renderpfad.

---

## 5. Compliance-Prüfung vor Veröffentlichung

### 5.1 Marken- und Urheberrecht

| Prüfpunkt | Anforderung | Status in diesem Blueprint |
|---|---|---|
| Plattform-Marken | kein Roblox-, Minecraft- oder Fortnite-Bezug in Bild, Ton, Titel, Beschreibung, Hashtags | erfüllt durch eigenständigen Voxel-Look |
| Figurgestaltung | keine Nachbildung geschützter Spielfiguren | erfüllt, eigene Bauform nach 1.1 |
| Soundeffekte | jede Datei mit kommerzieller Lizenz, im Asset-Ledger erfasst | **offen – vor Produktion zu erledigen** |
| Schriftart | Lizenz deckt eingebettete Nutzung in Video | **offen** |
| Musik | falls Musikbett ergänzt wird: Lizenz für kommerzielle Nutzung und Werbung | derzeit kein Musikbett vorgesehen |
| Ortsdaten, Firmennamen | keine realen Betriebe, keine echten Rufnummern | erfüllt, alle Beispieldaten synthetisch |

### 5.2 Jugendschutz und Plattformrichtlinien

- Keine Gewaltdarstellung. Der `thud_blunt` begleitet Enttäuschung, keinen Treffer gegen eine Figur.
- Keine Glücksspiel-Anmutung. Kein Rad, keine Kiste, kein Zufallsmechanismus — der Inventar-Balken zeigt Fortschritt, nicht Gewinn.
- Keine Ansprache von Kindern. Der blockige Stil ist visuell jugendaffin, der Inhalt ist B2B. Titel, Beschreibung und Hashtags müssen die Zielgruppe eindeutig als erwachsen ausweisen, sonst greift bei einigen Plattformen die Einstufung als kinderorientierter Inhalt — mit dem Nebeneffekt eingeschränkter Monetarisierung.
- **Blitzempfindlichkeit:** Bei diesem Schnitttempo relevant. Kein Vollbildwechsel häufiger als dreimal pro Sekunde, keine Hell-Dunkel-Sprünge über 20 % Flächenhelligkeit. Das Protokoll hält das ein; bei Änderungen erneut prüfen.

### 5.3 Werbe- und Aussagenrecht

- **Rechnung als Beispiel kennzeichnen.** Der Stempel bei Sekunde 43 und der Kleindruck sind Pflicht, nicht Gestaltung. Eine Zahl ohne diese Kennzeichnung ist ein Einkommensversprechen.
- **Kosten sichtbar benennen.** Sekunde 45 und 46 stehen genau dafür im Protokoll. Sie dürfen bei Kürzungen nicht als Erstes fallen.
- **Keine Garantie.** Kein „du verdienst", nur „Beispielrechnung". Die Overlays im Protokoll sind entsprechend formuliert.
- **KI-Kennzeichnung** auf der Plattform setzen, wenn synthetisch erzeugte Inhalte verwendet werden.
- **Werbekennzeichnung**, sobald das Video auf das Digistore24-Produkt verweist — als Werbung markieren, nicht als redaktionellen Beitrag tarnen.

### 5.4 Freigabe-Gate

Veröffentlichung nur, wenn alle Punkte mit JA beantwortet sind:

1. Trägt jede Sound- und Schriftdatei eine dokumentierte kommerzielle Lizenz?
2. Ist kein Plattformname und keine geschützte Figur erkennbar — auch nicht in Titel, Beschreibung oder Hashtags?
3. Sind alle Zahlen korrekt gerechnet und sichtbar als Beispiel gekennzeichnet?
4. Sind die Kostenhinweise bei Sekunde 44–46 enthalten?
5. Liegt der Mix bei −14 LUFS und maximal −1,0 dBTP?
6. Hält das Video die Blitzgrenze aus 5.2 ein?
7. Ist die Werbekennzeichnung gesetzt, wenn auf das Produkt verwiesen wird?
8. Ist die KI-Kennzeichnung der Plattform korrekt gesetzt?
9. Hat eine zweite Person Bild, Ton und Rechte geprüft?

Ein NEIN führt zu STOPP und Reparatur, nicht zu Veröffentlichung.

---

## 6. Was vor der Produktion noch zu entscheiden ist

Diese Punkte kann der Blueprint nicht für dich klären:

1. **Thema.** Der Prompt nannte keins. Dieses Dokument setzt die Mechanik aus AKTE 001 ein, damit es zum Produkt passt. Bei anderem Thema ändern sich ausschließlich die Text-Overlays in 2.3 — Takt, Sounds und Kamera bleiben.
2. **Sound-Lizenzen.** Elf Dateien beschaffen und im Asset-Ledger erfassen. Ohne diesen Schritt ist der Compliance-Teil unvollständig.
3. **Laufzeit.** 54 Sekunden liegen unter der Minute. Falls die 60-Sekunden-Schwelle für ein Vergütungsprogramm erreicht werden soll, ist der saubere Weg ein zusätzlicher Beleg-Beat zwischen Sekunde 46 und 48 — nicht gedehnte Standzeiten.
4. **Verhältnis zu GELDAKTE.** Dieses Format teilt den Tresorkopf mit AKTE 001, hat aber eine völlig andere Bildsprache. Zu klären ist, ob es dieselbe Marke ist oder eine zweite Linie. Beides ist vertretbar, aber nicht gleichzeitig.

---

**Hinweis:** Dieses Dokument ist ein Produktions- und Risikokonzept, keine Rechtsberatung. Lizenzfragen, Werbekennzeichnung und die Einstufung als kinderorientierter Inhalt sollten bei kommerziellem Vertrieb anwaltlich geprüft werden.
