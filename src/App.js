import React from "react";
import palavras from "./palavras";

let palavraEscolhida = "";
let erros = 0;
let chutePalavraForm = "";

export default function App() {
    
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    let [displayPalavra, setDisplayPalavra] = React.useState([]);
    const [classesLetras, setClassesLetras] = React.useState("letra inativa");
    const [forca, setForca] = React.useState("assets/forca0.png");
    const [classeDisplay, setClasseDisplay] = React.useState("");

    function terminarJogo(vitoria) {
        
        if(vitoria) {
            setDisplayPalavra(displayPalavra.replaceAll(' ', ''));
            setClasseDisplay("ganhou");
        }
        else {
            setDisplayPalavra("quarentena");
            setClasseDisplay("perdeu");
        }

        setClassesLetras("letra inativa");

    }

    function chutarLetra(indice, e) {
     
        if(e.target.className === "letra inativa")
            return;
        
        e.target.className = "letra inativa";
        
        let semAcento = palavraEscolhida.normalize('NFD').replace(/[\u0300-\u036f]/g, ""); // normaliza removendo os acentos

        if(semAcento.indexOf(letras[indice]) > -1) {
            
            const auxiliar = displayPalavra.split(' ');
            for(let i = 0; i < auxiliar.length; i++)
                if(semAcento[i] == letras[indice]) 
                    auxiliar[i] = palavraEscolhida[i];
            setDisplayPalavra(auxiliar.join(' '));
            
            if(auxiliar.indexOf('_') === -1) {
                displayPalavra = palavraEscolhida.split(' ').join('');
                terminarJogo(true);
            }

        }

        else {
            setForca(`assets/forca${++erros}.png`)
            if(erros === 6)
                terminarJogo(false);
        }

    }

    function iniciarJogo() {

        const posicaoEscolihda = Math.floor(Math.random() * palavras.length);
        palavraEscolhida = palavras[posicaoEscolihda].toUpperCase();
        console.log(palavraEscolhida);
        let arrayInicial = [];
        for(let i = 0; i < palavraEscolhida.length; i++)
            arrayInicial.push('_');

        setDisplayPalavra(arrayInicial.join(' '));
        setClassesLetras("letra ativa")

    }

    function chutarPalavra() {

        if(classesLetras === "letra inativa")
            return;

        if(palavraEscolhida.replaceAll(' ', '') === chutePalavraForm.replaceAll(' ', '')) {
            displayPalavra = palavraEscolhida.replaceAll(' ', '');
            terminarJogo(true);
        }
        else {
            erros = 6;
            setForca(`assets/forca${erros}.png`)
            terminarJogo(false);
        }
    }

    return (
        <>
            <div className="container topo">
                <img src={forca}/>
                <button onClick={iniciarJogo}>Escolher palavra</button>
                <p className={classeDisplay}>{displayPalavra}</p>
            </div>
            <div className="container letras">
                {letras.map((value, indice) => <button key={indice} onClick={e => chutarLetra(indice, e)} className={classesLetras}>{value}</button>)}
            </div>
            <div className="container chute">
                <p>Já sei a palavra!</p>
                <input type="text" onChange={(e) => chutePalavraForm = e.target.value.toUpperCase()}></input>
                <button onClick={chutarPalavra}>Chutar</button>
            </div>
        </>
    );
}