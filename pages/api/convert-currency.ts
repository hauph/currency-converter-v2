import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { API_URL } from './../../scripts/variables';

type DataForChart = {
    keys: Array<string>,
    values: Array<number>,
}

type Data = {
    convertValue1?: number,
    convertValue2?: number,
    dataForChart?: DataForChart
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const body = req.body;
    let result: Data = {};
    const convertAPI = `${API_URL}convert?${body}&apiKey=${process.env.API_KEY}`;
    try {
        const data = await axios(convertAPI);
        const dataValue = data.data;
        const arrayValue: Array<{ [key: string]: number }> = Object.values(dataValue);

        const objValue_1 = arrayValue[0];
        const arrayValue_1 = Object.values(objValue_1);
        result.convertValue1 = arrayValue_1[arrayValue_1.length - 1];

        const objValue_2 = arrayValue[1];
        const arrayValue_2 = Object.values(objValue_2);
        result.convertValue2 = arrayValue_2[arrayValue_2.length - 1];

        let dataForChart: DataForChart = { keys: [], values: [] };
        dataForChart.keys = Object.keys(objValue_1);
        dataForChart.values = arrayValue_1;
        result.dataForChart = dataForChart;
    } catch (err: any) {
        console.error('convert-currency >>>', err.response.data)
    }
    res.status(200).json(result)
}