1. Vytvořil jsem `.env` soubor a ten přidal do `.gitignore`. Přesunul jsem do něj API klíč, protože by neměl být veřejně viditelný.

2. Vytáhnul jsem fetchovací logiku na počasí do single hooku, kvůli porušení single responsibility principle a lepší testovatelnosti.

3. Přidal jsem podporu pro zobrazení loading skeletonu a chyb při fetchování dat pro lepší UX.

4. Zrefaktoroval jsem WeatherCard a rozdělil na menší komponenty pro lepší přehlednost a testovatelnost. Podrobnější informace o počasí jdou nyní přes jednu společnou komponentu - redukce 4 téměř duplicitních bloků.

5. Upravil jsem adresářovou strukturu pro lepší přehlednost - components, hooks, types, utils.

6. Přidal jsem Vitest a RTL balíčky a doplnil ke všemu testy. Hooky testovány izolovaně, komponenty s mockovanými daty. U `useCities` testuji i integraci s localStorage, včetně fallbacku při corrupted datech.

7. V useWeather jsem přidal city prop do hook dependencies. Při změně city prop by se v původním řešení nenačetla nová data.

8. Do hooků s fetchem jsem přidal AbortController proti race conditions.

9. Odstranil jsem zapomenutý console.log, který by se neměl v produkčním kódu vyskytovat.

10. Funkci formatTime jsem rozšířil o podporu časových zón (timezone offset z API response), aby uživatel viděl místní časy.

11. Jako vlastní feature jsem přidal search bar s autocomplete podporou.
   - Volám OpenWeather GEO API, aby si uživatel mohl pohodlně vybrat z nabídky a nemusel psát celý přesný název.
   - Výsledky jsou deduplikované, jelikož API občas vrací stejná místa s lehce odlišnými daty.
   - Feature podporuje debounce, aby se api nevolalo po každém stisku klávesy.
   - Combobox s nabídkou míst podporuje pohyb a výběr klávesnicí.
   - Seznam měst je ukládán do local storage, uživatel si může města přes tlačítko odebírat.