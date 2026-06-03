# Coach — la tua PWA personale

App installabile (nutrizione a 3 fasi, allenamento 4×/settimana, coach AI, timer, progressi). Gira su Vercel con una funzione serverless che parla con Claude. Tutti i tuoi dati restano sul telefono (localStorage). **Costo per partire: 5 $** di credito API.

---

## Cosa c'è dentro

```
coach-app/
├── api/
│   └── chat.js          ← backend: inoltra le richieste a Claude (la tua API key resta sul server)
├── public/
│   ├── index.html       ← tutta l'app
│   ├── manifest.json    ← config PWA (nome, icone, colori)
│   ├── sw.js            ← service worker (funziona offline, esclusa la chat)
│   └── icons/           ← icone app
├── vercel.json          ← configurazione Vercel
└── package.json
```

La chat e il briefing chiamano `/api/chat`. Tutto il resto (piani, allenamenti, timer, progressi) funziona anche offline.

---

## Deploy in 8 passi (~15 minuti)

### 1. Credito Anthropic
Vai su **console.anthropic.com** → accedi → **Billing** → aggiungi **5 $** di credito. Bastano per mesi di uso personale.

### 2. Crea la API key
Sempre nella Console → **API Keys** → **Create Key** → copiala e tienila da parte (la incolli al passo 6). Non metterla mai nel codice.

### 3. Metti il codice su GitHub
- Crea un repo nuovo (es. `coach-app`), anche privato.
- Carica **l'intera cartella** `coach-app` (puoi trascinare i file nella UI di GitHub con "Add file → Upload files").

### 4. Importa su Vercel
- Vai su **vercel.com** → accedi con GitHub → **Add New → Project** → seleziona il repo `coach-app`.

### 5. Lascia le impostazioni di default
Vercel legge `vercel.json` da solo. Framework: **Other**. Non toccare build command né output directory.

### 6. Aggiungi la API key come variabile d'ambiente
Nella schermata di import, apri **Environment Variables** e aggiungi:
- **Name:** `ANTHROPIC_API_KEY`
- **Value:** la chiave copiata al passo 2

### 7. Deploy
Premi **Deploy**. Dopo ~1 minuto avrai un indirizzo tipo `coach-app-xxx.vercel.app`.

### 8. Installa sul telefono
- **iPhone (Safari):** apri il link → tasto Condividi → **Aggiungi a Home**.
- **Android (Chrome):** apri il link → menu ⋮ → **Installa app** (o comparirà il banner "Installa").

Si apre a schermo intero come un'app vera. Alla prima apertura conferma il peso di partenza e parti.

---

## Funzioni principali

- **Dashboard "Oggi":** briefing AI giornaliero, check del mattino (peso + umore), pasti e allenamento del giorno, promemoria integratori.
- **Allenamento:** 4 schede (Lun/Mar/Gio/Sab), core-first per la schiena. Per ogni esercizio: scheda **Tecnica** (esecuzione, errori, trucchi), pulsante **Video** (apre la ricerca YouTube giusta), **Nota**, **Sostituisci** (chiede un'alternativa al coach AI).
- **Timer di recupero:** parte da solo quando spunti una serie, vibra a fine recupero. **Cronometro sessione** in alto.
- **Modalità allenamento:** schermo dedicato, un esercizio alla volta, schermo che resta acceso.
- **Progressi:** peso con grafico, misure, record carichi.
- **4 temi colore** (◐ in alto a destra): arancio, blu, verde, viola.

---

## Aggiornare l'app
Modifica i file su GitHub → Vercel ri-deploya da solo a ogni commit. Sul telefono basta riaprire l'app.

## Costi
- Setup: **0 €** (Vercel Hobby gratis, GitHub gratis).
- API: ~**3–8 €/mese** con uso normale; i 5 $ iniziali durano a lungo perché chat e briefing sono brevi.

## Problemi comuni
- **La chat dà "Errore di connessione":** controlla che `ANTHROPIC_API_KEY` sia su Vercel (Settings → Environment Variables) e che ci sia credito sulla Console.
- **L'app non si installa:** su iPhone deve essere **Safari** (non Chrome). Su Android usa Chrome.
- **Il briefing non si aggiorna:** tocca "↻ Rigenera briefing". È in cache un briefing al giorno per risparmiare API.
- **Voglio azzerare tutto:** cancella i dati del sito dal browser (oppure reinstalla). I dati sono solo locali.
