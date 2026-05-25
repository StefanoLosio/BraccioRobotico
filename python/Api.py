import serial
import time

class Api:
    def __init__(self):
        porta_seriale = 'COM5'
        velocita_baud = 9600

        # Inizializzazione della connessione seriale
        self.ser = serial.Serial(porta_seriale, velocita_baud, timeout=1)
            
        # È consigliabile attendere un paio di secondi per stabilire la connessione
        time.sleep(2)

    def inviaArduino(self, motore:str, angolo:int):
        try:
            # Dati da inviare, convertiti in byte usando .encode()
            messaggio = f"{motore}:{angolo}\n" # Aggiunto \n per indicare il fine riga
            self.ser.write(messaggio.encode('utf-8'))
            print(f"Dati inviati: {messaggio.strip()}")

            # Aspetta un brevissimo istante per dare tempo ad Arduino di elaborare e rispondere
            time.sleep(0.1)

            # Leggi la risposta da Arduino se ci sono byte nel buffer
            if self.ser.in_waiting > 0:
                # Legge fino al carattere \n inviato da Arduino
                risposta = self.ser.readline().decode('utf-8').strip()
                print(f"Risposta da Arduino: {risposta}")
                return risposta
            else:
                print("Nessuna risposta ricevuta da Arduino.")
                return None

        except Exception as e:
            print(f"Errore nella connessione o comunicazione: {e}")
            return None
