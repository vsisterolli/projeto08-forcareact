import styled from "styled-components";

export default function Chute(props) {
    return(
        <>
        <Chutecss>
            <p>Já sei a palavra!</p>
            
            <input type="text" 
                data-identifier="type-guess" 
                onKeyUp={(e) => e.key === 'Enter' ? props.chutarPalavra(e) : ''} 
                value={props.chutePalavraForm}
                onChange={(e) => props.setChutePalavraForm(props.classesLetras === "letra inativa" ? "" : e.target.value.toUpperCase().replaceAll(' ', ''))}>
            </input>

            <button data-identifier="guess-button" onClick={props.chutarPalavra}>Chutar</button>
        </Chutecss>
        </>
    )
}

const Chutecss = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;

    button {
        background-color: #ADD8E6;
        color: #4169E1;
        font-weight: bold;
        height: 40px;
        width: 65px;
        border: 0 solid;
        border-radius: 4px;
        margin-left: 20px;
    }

    input {
        margin-left: 10px;
        border-radius: 4px;
        border: solid #c0c0c0 2px;
        height: 35px;
        width: 300px;
    }
`