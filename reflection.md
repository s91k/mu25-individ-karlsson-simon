# Reflektion – Git & Agilt (1–2 sidor)

## 1) Egen user story + Acceptance Criteria + INVEST

**Story:** Som användare vill jag kunna ta bort bokmärken om jag inte behöver dem längre.

**Acceptance Criteria (checkboxar):**

- [x] Varje bokmärke har en knapp som för att ta bort det
- [x] Innan bokmärket tas bort måste användaren bekräfta att dem vill det
- [x] Bokmärket försvinner direkt efter användaren har bekräftat
- [x] LocalStorage uppdateras så fort kortet tas bort

**INVEST – kort motivering (2–4 meningar):**
Vilka av I, N, V, E, S, T uppfyller storyn och varför?

- **I**ndependent: Kräver att sparning i localStorage finns.
- **N**egotiable: Behovet av en bekräftelse eller t.ex. en möjlighet att ångra kan diskuteras.
- **V**aluable: Att kunna ta bort bokmärken är ett krav.
- **E**stimable: Max en timme.
- **S**mall: Bortsett från bekräftelsen är bara nödvändig funktionalitet inkluderad.
- **T**estable: Testa genom att ta bort en bokmärke och se att det försvinner från listan, inklusive efter att sidan har laddats om.

## 2) Sprintmål + Definition of Done (DoD)

**Sprintmål:**
Utveckla en enkel webbapplikation för hantering av bokmärken, användaren ska kunna skapa, ändra och ta bort bokmärken. Demonstrera ett fungerande Git-flöde.

**DoD (checklista):**

- [x] Kod kör lokalt utan fel
- [x] PR granskad och godkänd (minst 1 review)
- [x] README uppdaterad
- [x] Issue/kort länkat och stängt vid merge

## 3) Retro: Start / Stop / Continue

- **Start:** Inkludera Story ID i branch-namn.
- **Stop:** Vänta för länge med att börja med saker som kan vara tidskritiska.
- **Continue:** Länka branches och pull requests i Trello med Power-Ups.

Minst **en** konkret förbättring du provar nästa sprint och *varför*.

### Förbättring 1

Använda CSS variabler så att det blir lättare hålla till ordning exempelvis färger, som det är nu hade jag varit tvungen att uppdatera på flera ställen om vill ändra färgen indikerar att något är fel.

### Förbättring 2

Tänka igenom mer om hur lång tid och hur mycket kod som krävs för varje User Story. Exempelvis så blev implementation av localStorage bara några rader lång och hade antagligen inte behövt vara separat.

### Förbättring 3

Se till att börja i tid med t.ex. reviews så jag inte sitter sista dagen och letar efter en PR reviewa.

## 4) Hänvisningar (VG)

- Förbättring 1 stöds av PR/commit: <https://github.com/s91k/mu25-individ-karlsson-simon/pull/6>
- Förbättring 2 stöds av PR/commit: <https://github.com/s91k/mu25-individ-karlsson-simon/pull/2>
