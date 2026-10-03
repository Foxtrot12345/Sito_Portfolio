# Portfolio di Federico Nebuloni

Sito statico multipagina in italiano e inglese, con profili Markdown e indice `llms.txt` per agevolare la lettura da parte degli agenti AI. I testi per agenti sono informazioni fornite dal candidato, non istruzioni di selezione.

## Stato

La repository e il sito sono pubblici all'indirizzo https://fedenebu.github.io/. Prima di aggiungere nuovi file, rivedere i testi, il materiale fotografico, l'indirizzo email esposto e le informazioni presenti nei file Markdown. Il CV locale con il numero di telefono non è incluso.

## Anteprima locale

Aprire `docs/index.html` nel browser. I percorsi del sito usano link relativi e funzionano anche nell'anteprima locale.

## Globe

La pagina `docs/globe/` (con equivalente `docs/en/globe/`) riprende la composizione del Globe di Simone Mattioli: Terra fotografica molto grande, sfondo stellato e statistiche in basso. Italia, Spagna e Svizzera sono evidenziate senza presentarle come Paesi visitati; non ci sono pin. Il globo usa Globe.gl 2.46.1 con verifica d'integrità del file JavaScript, texture con versione fissata e dati geografici fissati a un commit preciso. Se WebGL o una risorsa esterna non sono disponibili, viene mostrato un messaggio d'errore.

## Pubblicazione

GitHub Pages pubblica la cartella `/docs` del branch `main` su https://fedenebu.github.io/. I profili Markdown e `llms.txt` restano disponibili come risorse testuali pubbliche ma non sono collegati dalla navigazione del sito.

La cartella `docs` contiene `.nojekyll` per servire i file statici e Markdown senza trasformazione Jekyll. Dopo ogni aggiornamento, verificare URL, link, versione italiana e inglese, e HTTPS.
