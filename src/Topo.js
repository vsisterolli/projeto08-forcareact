export default function Topo(props) {
    return(   
        <>
        <div className="container topo">
            <img data-identifier="game-image" alt="imagem da forca" src={props.forca}/>
            <button data-identifier="choose-word" onClick={props.iniciarJogo}>Escolher palavra</button>
            <p data-identifier="word" className={props.classeDisplay}>{props.displayPalavra}</p>
        </div>
        </>
    )
}