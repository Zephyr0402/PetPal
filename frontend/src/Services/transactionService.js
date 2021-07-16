import backendURL from './backendURL';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const getTransactionHistory = async () => {
    return await axios.get(backendURL+'/api/transaction/uuid')
        .then(res => res.data);
}