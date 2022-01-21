import axios from 'axios'


export const getDataAxios = async(url) => {
    const {data}=await axios.get(url)
    
  return data;
};
