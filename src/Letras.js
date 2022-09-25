import styled from "styled-components";

export default function Letras(props) {

    return (
        <>
        <Letrascss>
            {
                props.letras.map((value, indice) => 
                <Letracss data-identifier="letter" ativa={props.ativos[indice]} key={indice} onClick={e => props.chutarLetra(indice, e)}>{value}</Letracss>)
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
 
const Letracss = styled.button`
    width: 40px;
    height: 40px;
    margin: 10px;
    border-radius: 4px;
    font-weight: bold;
    border: transparent;
    color: ${props => props.ativa === true ? "#4169E1" : "#363636"};
    background-color: ${props => props.ativa ? "#ADD8E6" : "#778899"};
`;