import React, { useEffect } from 'react';
import { useSelect } from '../hooks/useSelect';
import { currencies } from 'currencies.json';
import { getDataAxios } from '../helpers/getDataAxios';
import { useState } from 'react';
import { useRef } from 'react';


export const Form = ({setMonedas}) => {

    const [criptos, setCriptos,] = useState([]);
    const [disabled, setDisabled] = useState(true);

    const [moneda,SelectMonedas]=useSelect('Elige tu moneda',currencies)
    const [cripto,SelectCripto]=useSelect('Elige tu Criptomoneda',criptos)

    const boton = useRef();
useEffect(async() => {
    const {Data}=await getDataAxios('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD')
    setCriptos(Data.map((cripto) => ({
      code:cripto.CoinInfo.Internal,
      name:cripto.CoinInfo.FullName
    })))

}, []);

useEffect(() => {
  (moneda&&cripto)?setDisabled(false):setDisabled(true)
}, [moneda,cripto]);


const handleSubmit=(e) => {
  e.preventDefault();
 setMonedas({moneda,cripto})

}


  return <form onSubmit={handleSubmit}>
      <div className="d-grid gap-2 container">
    <div className="row">
        <div className="col-12 col-lg-6"><SelectMonedas/>
   </div>
        <div className="col"> <SelectCripto/></div>
    </div>
    <div className="d-grid gap-2 m-2">       
     <button ref={boton} id='cotizar' className="btn btn-outline-info" disabled={disabled} type="submit">COTIZAR</button>
</div>
      </div>
  </form>;
};
