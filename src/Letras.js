export default function Letras(props) {
    return (
        <>
        <div className="container letras">
            {
                props.letras.map((value, indice) => 
                <button data-identifier="letter" key={indice} onClick={e => props.chutarLetra(indice, e)} className={props.classesLetras}>{value}</button>)
            }
        </div>
        </>
    )
}