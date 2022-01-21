
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useLayoutEffect, useRef, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

export const useSelect = (label,opciones) => {

    const [state, setState] = useState('');
    const [error, setError] = useState(false);
    const [count, setCount] = useState(0);

    useLayoutEffect(() => {
        count>0&&((!state)?setError(true):setError(false))
      
    }, [state]);
    

    const handleChange = (event) => {
        setState(event.target.value);
        setCount(count+1)
      };

    const selectMonedas=() => (
        <>
        <h2 className='fs-3 text-center d-block' htmlFor="">{label}</h2>
      <div className="row w-100">
      <ThemeProvider theme={darkTheme}>
        <FormControl sx={{ m: 2}} error={error}>
        <InputLabel id={label}>Seleccione</InputLabel>
        <Select
          labelId={label}
          id="select-helper"
          value={state}
          label="Seleccioneee"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>Seleccione</em>
          </MenuItem>
          { opciones?.map((op) => (
               <MenuItem key={op.code}
               value={op.code}>
                {op.name}
               </MenuItem>
           ))}
        </Select>
      </FormControl>
    </ThemeProvider></div>
    </>
    )

  return [state,selectMonedas];
};
