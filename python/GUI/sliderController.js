const arcoBase = document.getElementById("baseArco");
const arcoSpalla = document.getElementById("spallaArco");
const arcoGomito = document.getElementById("gomitoArco");
const arcoPolso = document.getElementById("polsoArco");
const arcoMano = document.getElementById("manoArco");
const arcoPinza = document.getElementById("pinzaArco");

const inputBase = document.getElementById("baseInput");
const inputSpalla = document.getElementById("spallaInput");
const inputGomito = document.getElementById("gomitoInput");
const inputPolso = document.getElementById("polsoInput");
const inputMano = document.getElementById("manoInput");
const inputPinza = document.getElementById("pinzaInput");

const invia = document.getElementById("invia");

const raggio = 45;
const crf = 2 * Math.PI * raggio;

inputBase.addEventListener('input', (evento) => {
    let angolo = parseFloat(evento.target.value);

    if (angolo>180) {
        angolo = 180;
    }else if (angolo<0) {
        angolo=0;
    }

    const lunghezzaArco = angolo / 360 * crf;
    arcoBase.setAttribute('stroke-dasharray', `${lunghezzaArco} ${crf}`);

    console.log(`${lunghezzaArco} ${crf}`);
});
inputSpalla.addEventListener('input', (evento) => {
    let angolo = parseFloat(evento.target.value);

    if (angolo>180) {
        angolo = 180;
    }else if (angolo<0) {
        angolo=0;
    }

    const lunghezzaArco = angolo / 360 * crf;

    arcoSpalla.setAttribute('stroke-dasharray', `${lunghezzaArco} ${crf}`);

});
inputGomito.addEventListener('input', (evento) => {
    let angolo = parseFloat(evento.target.value);

    if (angolo>180) {
        angolo = 180;
    }else if (angolo<0) {
        angolo=0;
    }

    const lunghezzaArco = angolo / 360 * crf;

    arcoGomito.setAttribute('stroke-dasharray', `${lunghezzaArco} ${crf}`);
});
inputPolso.addEventListener('input', (evento) => {
    let angolo = parseFloat(evento.target.value);

    if (angolo>180) {
        angolo = 180;
    }else if (angolo<0) {
        angolo=0;
    }

    const lunghezzaArco = angolo / 360 * crf;

    arcoPolso.setAttribute('stroke-dasharray', `${lunghezzaArco} ${crf}`);

   
});
inputMano.addEventListener('input', (evento) => {
    let angolo = parseFloat(evento.target.value);

    if (angolo>180) {
        angolo = 180;
    }else if (angolo<0) {
        angolo=0;
    }

    const lunghezzaArco = angolo / 360 * crf;

    arcoMano.setAttribute('stroke-dasharray', `${lunghezzaArco} ${crf}`);

    
});
inputPinza.addEventListener('input', (evento) => {
    let percentuale = parseFloat(evento.target.value);

    if (percentuale>100) {
        percentuale = 100;
    }else if (percentuale<0) {
        percentuale=0;
    }

    const lunghezzaArco = percentuale / 200 * crf;

    arcoPinza.setAttribute('stroke-dasharray', `${lunghezzaArco} ${crf}`);

});

invia.addEventListener('click', async function inviaTuttiIMotori() {
    try {
        // Ogni riga attende che Python risponda prima di passare alla successiva
        let r1 = await window.pywebview.api.inviaArduino("base", inputBase.value);
        console.log("Risposta base:", r1);

        let r2 = await window.pywebview.api.inviaArduino("spalla", inputSpalla.value);
        console.log("Risposta spalla:", r2);

        let r3 = await window.pywebview.api.inviaArduino("gomito", inputGomito.value);
        console.log("Risposta gomito:", r3);

        let r4 = await window.pywebview.api.inviaArduino("polso", inputPolso.value);
        console.log("Risposta polso:", r4);

        let r5 = await window.pywebview.api.inviaArduino("mano", inputMano.value);
        console.log("Risposta mano:", r5);

        let r6 = await window.pywebview.api.inviaArduino("pinza", inputPinza.value);
        console.log("Risposta pinza:", r6);
        
    } catch (error) {
        console.error("Errore durante l'invio sequenziale:", error);
    }
});