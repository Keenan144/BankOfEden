import axios from 'axios';

const API_BASE_URL = 'http://localhost:5004';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const fetchChores = async () => {
    const response = await api.get('/chores');
    return response.data;
};

export const fetchTransactions = async () => {
    const response = await api.get('/transactions');
    return response.data;
};

export const fetchBalance = async () => {
    const response = await api.get('/wallet');
    return response.data[0];
};

export const fetchMonthlyBills = async () => {
    const response = await api.get('/bills');
    return response.data;
};

export const payMonthlyBill = async (billId) => {
    const response = await api.put(`/monthly-bills/${billId}/pay`);
    return response.data;
};

export const completeChore = async (chore) => {
    const response = await api.put(`/chores/${chore.id}`, chore);
    return response.data;
};
