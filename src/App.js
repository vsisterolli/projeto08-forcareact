import React from "react";
import palavras from "./palavras";

let palavraEscolhida = "";
let erros = 0;

export default function App() {
    
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    let [displayPalavra, setDisplayPalavra] = React.useState([]);
    const [classesLetras, setClassesLetras] = React.useState("letra inativa");
    const [forca, setForca] = React.useState("assets/forca0.png");
    const [classeDisplay, setClasseDisplay] = React.useState("");
    const [chutePalavraForm, setChutePalavraForm] = React.useState("");

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

        setForca(`assets/forca${0}.png`)
        setChutePalavraForm("");
        setClasseDisplay("");
        erros = 0;

        const posicaoEscolihda = Math.floor(Math.random() * palavras.length);
        palavraEscolhida = palavras[posicaoEscolihda].toUpperCase();

        let arrayInicial = [];
        for(let i = 0; i < palavraEscolhida.length; i++)
            arrayInicial.push('_');

        setDisplayPalavra(arrayInicial.join(' '));
        setClassesLetras("letra ativa")

    }

    function chutarPalavra(e) {

        if(classesLetras === "letra inativa")
            return;

        if(palavraEscolhida.replaceAll(' ', '') === chutePalavraForm) {
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
                <img data-identifier="game-image" src={forca}/>
                <button data-identifier="choose-word" onClick={iniciarJogo}>Escolher palavra</button>
                <p data-identifier="word" className={classeDisplay}>{displayPalavra}</p>
            </div>
            <div className="container letras">
                {letras.map((value, indice) => <button data-identifier="letter" key={indice} onClick={e => chutarLetra(indice, e)} className={classesLetras}>{value}</button>)}
            </div>
            <div className="container chute">
                <p>Já sei a palavra!</p>
                
                <input type="text" 
                    data-identifier="type-guess" 
                    onKeyUp={(e) => e.key === 'Enter' ? chutarPalavra(e) : ''} 
                    value={chutePalavraForm}
                    onChange={(e) => setChutePalavraForm(classesLetras === "letra inativa" ? "" : e.target.value.toUpperCase().replaceAll(' ', ''))}>
                </input>

                <button data-identifier="guess-button" onClick={chutarPalavra}>Chutar</button>
            </div>
        </>
    );
}