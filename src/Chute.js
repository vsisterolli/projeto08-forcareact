export default function Chute(props) {
    return(
        <>
        <div className="container chute">
            <p>Já sei a palavra!</p>
            
            <input type="text" 
                data-identifier="type-guess" 
                onKeyUp={(e) => e.key === 'Enter' ? props.chutarPalavra(e) : ''} 
                value={props.chutePalavraForm}
                onChange={(e) => props.setChutePalavraForm(props.classesLetras === "letra inativa" ? "" : e.target.value.toUpperCase().replaceAll(' ', ''))}>
            </input>

            <button data-identifier="guess-button" onClick={props.chutarPalavra}>Chutar</button>
        </div>
        </>
    )
}