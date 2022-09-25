import React from "react";
import palavras from "./palavras";
import Jogo from "./Jogo";
import Chute from "././Chute";
import Letras from "./Letras";
import GlobalStyle from "./GlobalStyle.js"

let palavraEscolhida = "";
let erros = 0;
let finalizado = true;

const inicial = [];
for(let i = 0 ; i < 26; i++)
    inicial.push(false);

export default function App() {
    
    const [letras, setLetras] = React.useState("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''));
    const [displayPalavra, setDisplayPalavra] = React.useState([]);
    const [forca, setForca] = React.useState("assets/forca0.png");
    const [chutePalavraForm, setChutePalavraForm] = React.useState("");
    const [vitoria, setVitoria] = React.useState("none");
    const [ativos, setAtivos] = React.useState(inicial);

    function terminarJogo(venceu) {
        
        if(venceu) 
            setDisplayPalavra(palavraEscolhida.replaceAll(' ', ''));
        
        else 
            setDisplayPalavra("quarentena");

        const aux = [...ativos];
        for(let i = 0; i < aux.length; i++)
            aux[i] = false;
        setAtivos(aux);
        finalizado = true;

        setVitoria(venceu);

    }

    function chutarLetra(indice, e) {
     
        if(ativos[indice] === false)
            return;

        const aux = [...ativos];
        aux[indice] = false;
        setAtivos(aux);
        
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

        let aux = [...letras];
        setLetras(aux);
        setForca(`assets/forca${0}.png`)
        setChutePalavraForm("");
        setVitoria("none");

        erros = 0;
        finalizado = false;

        aux = [];
        for(let i = 0; i < letras.length; i++)
            aux.push(true);
        setAtivos(aux);

        const posicaoEscolihda = Math.floor(Math.random() * palavras.length);
        palavraEscolhida = palavras[posicaoEscolihda].toUpperCase();
        console.log(palavraEscolhida);

        let arrayInicial = [];
        for(let i = 0; i < palavraEscolhida.length; i++)
            arrayInicial.push('_');

        setDisplayPalavra(arrayInicial.join(' '));

    }

    function chutarPalavra(e) {

        if(finalizado)
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
            <GlobalStyle/>
            <Jogo iniciarJogo={iniciarJogo} vitoria={vitoria} displayPalavra={displayPalavra} forca={forca}/>
            <Letras ativos={ativos} letras={letras} chutarLetra={chutarLetra}/>
            <Chute chutarPalavra={chutarPalavra} finalizado={finalizado} chutePalavraForm={chutePalavraForm} setChutePalavraForm={setChutePalavraForm}/>
        </>
    );
}