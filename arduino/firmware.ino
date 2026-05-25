#include <Servo.h> //importo la libreria per la gestione dei servomotori

//definisco degli identificativi per i pin
#define pinBase 11
#define pinSpalla 10
#define pinGomito 9
#define pinPolso 6
#define pinMano 5

Servo base, spalla, gomito, polso, mano; //istanzio gli oggetti servo


String decodifica(String in) {
  // Riassegna le stringhe modificate
  in.trim();
  in.toLowerCase();

  // Trova il separatore
  int indiceSeparatore = in.indexOf(":");
  
  // Gestione errore: se il separatore non esiste, esci
  if (indiceSeparatore == -1) {
    return "sintassi non rispettata"; 
  }

  // Estrae le sottostringhe usando gli indici corretti
  String motore = in.substring(0, indiceSeparatore);
  motore.trim(); // Rimuove eventuali spazi attorno al nome
  
  String valoreStr = in.substring(indiceSeparatore + 1);
  int angolo = valoreStr.toInt(); // Converte in intero

  // Valida i limiti dell'angolo
  if (angolo < 0 || angolo > 180) {
    return "angolo non valido"; 
  }

  // Comanda i servomotori in base al nome
  if (motore == "base") {
    base.write(angolo);
    return "base impostata correttamente";
  }
  else if (motore == "spalla") {
    spalla.write(angolo);
    return "spalla impostata correttamente";
  }
  else if (motore == "gomito") {
    gomito.write(angolo);
    return "gomito impostato correttamente";
  }
  else if (motore == "polso") {
    polso.write(angolo);
    return "polso impostato correttamente"; 
  }
  else if (motore == "mano") {
    mano.write(angolo);
    return "mano impostato correttamente";
  }
  
  return "motore {" + valoreStr +  "} non valido"; // Motore non valido
}


void setup() {
  // Inizializza la comunicazione seriale a 9600 baud
  Serial.begin(9600);

  // Associa ogni oggetto Servo al rispettivo pin hardware
  base.attach(pinBase);
  spalla.attach(pinSpalla);
  gomito.attach(pinGomito);
  polso.attach(pinPolso);
  mano.attach(pinMano);

  // Posiziona i motori a un angolo iniziale sicuro (es. 90 gradi)
  base.write(90);
  spalla.write(90);
  gomito.write(90);
  polso.write(90);
  mano.write(90);
}

void loop() {
  // Controlla se ci sono dati in arrivo sulla porta seriale
  if (Serial.available() > 0) {
    
    // Legge la stringa fino al carattere di Nuova Riga (\n)
    String datoRicevuto = Serial.readStringUntil('\n');
    
    // Esegue la decodifica e invia un feedback al PC
    Serial.println(decodifica(datoRicevuto));
  }
}
