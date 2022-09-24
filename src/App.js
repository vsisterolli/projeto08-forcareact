import React from "react";
import palavras from "./palavras";
import Jogo from "./Jogo";
import Chute from "././Chute";
import Letras from "./Letras";

let palavraEscolhida = "";
let erros = 0;

export default function App() {
    
    const [letras, setLetras] = React.useState("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''));
    const [displayPalavra, setDisplayPalavra] = React.useState([]);
    const [classesLetras, setClassesLetras] = React.useState("letra inativa");
    const [forca, setForca] = React.useState("assets/forca0.png");
    const [classeDisplay, setClasseDisplay] = React.useState("");
    const [chutePalavraForm, setChutePalavraForm] = React.useState("");

    function terminarJogo(vitoria) {
        
        if(vitoria) {
            setDisplayPalavra(palavraEscolhida.replaceAll(' ', ''));
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
                if(semAcento[i] === letras[indice]) 
                    auxiliar[i] = palavraEscolhida[i];
            setDisplayPalavra(auxiliar.join(' '));
            
            if(auxiliar.indexOf('_') === -1) 
                terminarJogo(true);
            

        }

        else {
            setForca(`assets/forca${++erros}.png`)
            if(erros === 6)
                terminarJogo(false);
        }

    }

    function iniciarJogo() {

        const aux = [...letras];
        setLetras(aux);
        setForca(`assets/forca${0}.png`)
        setChutePalavraForm("");
        setClasseDisplay("");
        erros = 0;

        const posicaoEscolihda = Math.floor(Math.random() * palavras.length);
        palavraEscolhida = palavras[posicaoEscolihda].toUpperCase();
        console.log(palavraEscolhida);

        let arrayInicial = [];
        for(let i = 0; i < palavraEscolhida.length; i++)
            arrayInicial.push('_');

        setDisplayPalavra(arrayInicial.join(' '));
        setClassesLetras("letra ativa")

    }

    function chutarPalavra(e) {

        if(classesLetras === "letra inativa")
            return;

        if(palavraEscolhida.replaceAll(' ', '') === chutePalavraForm) 
            terminarJogo(true);
        
        else {
            erros = 6;
            setForca(`assets/forca${erros}.png`)
            terminarJogo(false);
        }
    }

    return (
        <>
            <Jogo iniciarJogo={iniciarJogo} classeDisplay={classeDisplay} displayPalavra={displayPalavra} forca={forca}/>
            <Letras letras={letras} classesLetras={classesLetras} chutarLetra={chutarLetra}/>
            <Chute chutarPalavra={chutarPalavra} classesLetras={classesLetras} chutePalavraForm={chutePalavraForm} setChutePalavraForm={setChutePalavraForm}/>
        </>
    );
}