import styled from "@emotion/styled";
import { useEffect } from "react";
import { useState } from "react";
import { Form } from "./components/Form";
import { Resultado } from "./components/Resultado";
import { getDataAxios } from "./helpers/getDataAxios";
import Swal from 'sweetalert2'
import SyncLoader from "react-spinners/SyncLoader"



// style
const Contenedor = styled.div`
background-color: #02143bf8;
background-image: url('/img/fondo.jpg');
background-repeat: no-repeat;
background-attachment: fixed;
background-size: cover;
/* background-position:fixed; */
width:100vw;
height: 100vh; 
color: white;
overflow: scroll;
`

const Spinner=styled.div`
text-align: center;
position: absolute;
right: 50%;
bottom: 20%;
`


const Imagen = styled.img`
width: 100%;
position: absolute;
bottom: 0;
`
export const App = () => {
const [monedas, setMonedas] = useState({});
const [resultado, setResultado] = useState({});
const [error, setError] = useState(false);
let [loading, setLoading] = useState(false);

  useEffect(async() => {
    if(Object.values(monedas).length>0){
      setLoading(true)
      const {DISPLAY}= await getDataAxios(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${monedas.cripto}&tsyms=${monedas.moneda}`)
      setLoading(false)
      if(DISPLAY){
        setResultado(DISPLAY[monedas.cripto][monedas.moneda])
        setError(false)
      }else{
        setError(true)
      }
    }
  }, [monedas]);

  useEffect(() => {
    error&&(Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Lo sentimos, esta conversión no está disponible en este momento',
      showConfirmButton: false,
      timer: 2000
    }))
  }, [error]);
  
  
  return (

  <Contenedor> 
	  <h1 className="fs-1 fw-bold p-5 text-center">Cotiza tu Criptomoneda!</h1>
	  <Form setMonedas={setMonedas}/>
{loading?
(<Spinner><SyncLoader
  color='white' size={10} /></Spinner>)
:
((Object.values(resultado).length>0&&!error)&&(
  <Resultado  resultado={resultado}/>
))
}
  </Contenedor>
 )
};

