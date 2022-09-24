import styled from "styled-components";

export default function Letras(props) {
    return (
        <>
        <Letrascss>
            {
                props.letras.map((value, indice) => 
                <button data-identifier="letter" key={indice} onClick={e => props.chutarLetra(indice, e)} className={props.classesLetras}>{value}</button>)
            }
        </Letrascss>
        </>
    )
}

const Letrascss = styled.div`
    margin: 0 auto;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 800px;
    margin-bottom: 25px;
`;
