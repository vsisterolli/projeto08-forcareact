import styled from 'styled-components';

export default function Jogo(props) {
    return(   
        <>
        <Topo>
            <img data-identifier="game-image" alt="imagem da forca" src={props.forca}/>
            <button data-identifier="choose-word" onClick={props.iniciarJogo}>Escolher palavra</button>
            <p data-identifier="word" className={props.classeDisplay}>{props.displayPalavra}</p>
        </Topo>
        </>
    )
}

const Topo = styled.div`
    
    display: flex;
    margin: 0 auto;
    width: 80%;
    margin-top: 25px;
    justify-content: space-around;
    margin-bottom: 25px;
    position: relative;

    button {
        align-self: flex-start;
        margin-top: 60px;
        height: 50px;
        width: 200px;
        font-size: 18px;
        background-color: #229a00;
        color: white;
        font-weight: bold;
        border: 0 solid;
        border-radius: 4px;
    }

    img {
        height: 500px;
    }

    p {
        position: absolute;
        bottom: 20px;
        right: 15%;
        font-size: 50px;
        font-family: 'Courier New', Courier, monospace;
    }

    @media (max-width: 1400px) {
        width: 100%;
        p {font-size: 36px;}
    }

    @media (max-width: 900px) {p {font-size:30px;} }

    @media (max-width: 700px) {
        img {
            width: 300px;
            height: 300px;
        }
        p {font-size: 26px;}
    }
`; 

