// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { CurrencyData } from '../../interface/currencyData';
import { API_URL } from './../../scripts/variables';

type Data = Array<CurrencyData>;

type CurrencyAPIDATA = {
    currencyName: string,
    currencySymbol: string,
    id: string,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    let result: Data = [];
    const currencyAPI = `${API_URL}currencies?apiKey=${process.env.API_KEY}`;
    try {
        const data = await axios(currencyAPI);
        const r = data.data.results;
        const arrayCurrency: Array<CurrencyAPIDATA> = Object.values(r);
        result = arrayCurrency.reduce((
            previousValue: Data,
            currentCurrency
        ): Data => {
            const currencyObj = { name: currentCurrency.currencyName, id: currentCurrency.id };
            previousValue.push(currencyObj)
            return previousValue;
        }, []);
        result.sort((a, b) => {
            const nameA = a.id;
            const nameB = b.id;
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        })
    } catch (err: any) {
        console.error('get-all-currency >>>', err.response.data)
    }
    res.status(200).json(result)
}
