# 🤖 Braccio Robotico 6-DOF (Arduino + Python GUI)

Questo repository contiene il progetto completo per la realizzazione, la stampa 3D e il controllo di un braccio robotico articolato a 6 gradi di libertà (DOF). Il sistema utilizza un firmware Arduino per la gestione fisica dei servomotori e un'interfaccia grafica moderna (GUI) desktop sviluppata in Python tramite `pywebview`.

---

## 📂 Struttura della Repository

```text
│   README.md
│
├───arduino
│       firmware.ino
│
├───CAD
│       avanbraccio.stl
│       baseFissa.stl
│       baseRotante.stl
│       braccio.stl
│       BraccioRobotico.3mf
│       mano.stl
│       pinzaAttiva.stl
│       pinzaPassiva.stl
│       polso.stl
│
└───python
    │   Api.py
    │   app.py
    │
    └───GUI
            dashboard.html
            sliderController.js
            style.css

```

---

## 🛠️ Dettagli dei Componenti

### 1. Stampa 3D (`/CAD`)

La cartella contiene tutti i modelli tridimensionali necessari per l'assemblaggio strutturale del braccio:

* **File `.stl`:** Tutti i singoli componenti meccanici pronti per essere importati singolarmente nel proprio slicer di fiducia.
* **`BraccioRobotico.3mf`:** File di progetto contenente un **preset di stampa** ottimale, utile per avere già pronti gli orientamenti ideali dei pezzi e i parametri di riempimento/supporto consigliati.

### 2. Firmware (`/arduino`)

* **`firmware.ino`:** Lo sketch per la scheda Arduino. Ha il compito di rimanere in ascolto sulla porta seriale, effettuare il parsing dei dati in ingresso e aggiornare istantaneamente la posizione angolare dei 6 servomotori tramite segnali PWM.

> ⚠️ **ATTENZIONE: Alimentazione dei Servomotori**
> I 6 servomotori assorbono molta corrente. **Non alimentarli mai direttamente dal pin 5V di Arduino.**
> Utilizza un alimentatore esterno (5V o 6V) e **ricorda di collegare in comune il `GND` (massa) dell'alimentatore con il `GND` di Arduino**, altrimenti i segnali PWM saranno instabili e i motori tremeranno o non risponderanno.

### 3. Interfaccia Grafica (`/python`)

Il controllo remoto del braccio avviene tramite un'applicazione desktop che unisce un backend in Python a un frontend sviluppato con tecnologie web (HTML, CSS, JS):

* **`app.py`:** Lo script principale che inizializza la finestra dell'applicazione sfruttando `pywebview`.
* **`Api.py`:** Contiene la logica di business e la comunicazione seriale. ⚠️ **Nota fondamentale di configurazione:** Prima di avviare il software, è necessario aprire questo file con un editor di testo e mappare manualmente la porta **COM** corretta associata ad Arduino (es. `COM3` su Windows o `/dev/ttyUSB0` su Linux).
* **`/GUI`:** Sotto-cartella dedicata al frontend dell'interfaccia utente:
* `dashboard.html`: Struttura della pagina e degli slider.
* `style.css`: Stile grafico e layout visivo.
* `sliderController.js`: Gestione degli eventi di movimento degli slider e invio dei dati in tempo reale al backend Python.



---

## 🚀 Installazione e Avvio

### Configurazione Hardware & Firmware

1. Stampa i componenti presenti nella cartella `CAD` (utilizzando i singoli file STL o il preset `.3mf`).
2. Assembla la struttura meccanica posizionando i 6 servomotori.
3. Collega i servo ai pin dedicati di Arduino secondo quanto definito in `firmware.ino`.
4. Collega Arduino al PC via USB, apri il file `arduino/firmware.ino` con l'Arduino IDE e caricalo sulla scheda.

### Configurazione Software (GUI Python)

1. Installa le librerie Python necessarie eseguendo nel terminale:
```bash
pip install pywebview pyserial

```


2. Apri il file `python/Api.py` e modifica la stringa contenente la porta COM con quella corrispondente alla tua scheda Arduino.
3. Avvia l'interfaccia grafica posizionandoti nella cartella principale e avviando lo script:
```bash
python python/app.py

```


4. Utilizza gli slider presenti sulla dashboard per muovere interattivamente il braccio robotico!

```

```
