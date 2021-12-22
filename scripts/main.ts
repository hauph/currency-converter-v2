import { ChartData } from "../interface/chartData";
import { APIs } from "./apis";
const { chart } = require('highcharts');

export function convertCurrency(input: number, convertValue: number): number {
    return (input * convertValue)
}

export function secondFetch(infoString: string) {
    return fetch(APIs.convertCurrency, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain"
        },
        body: infoString
    }).then(responseConvertValue => {
        return responseConvertValue.json()
    }).then(dataConvertValue => {
        return dataConvertValue;
    })
        .catch(err => {
            console.log(err);
        })
}

export function getConvertURL() {
    let dateObj = { startDate: "", endDate: "" }

    let endDate = new Date()
    let endYear = endDate.getFullYear(),
        endMonth = endDate.getMonth() + 1,
        endDay = endDate.getDate(),
        endTime = endDate.getTime();

    let fullEndDateString = `${endYear}-${endMonth}-${endDay}`;
    dateObj.endDate = fullEndDateString;


    let past8days = 8 * 24 * 60 * 60 * 1000;
    let startDate = new Date((endTime - past8days));
    let startDate_Year = startDate.getFullYear(),
        startDate_Month = startDate.getMonth() + 1,
        startDate_Date = startDate.getDate();

    let fullStartDateString = `${startDate_Year}-${startDate_Month}-${startDate_Date}`;
    dateObj.startDate = fullStartDateString;

    return dateObj;
}

export function highChartJs(data: ChartData, fromTo: string) {
    if (Object.keys(data).length) {
        const _xAxis = data.keys,
            _yAxis = data.values,
            _fromTo = fromTo;

        let splitFromTo = _fromTo.split('to');
        // @ts-ignore
        const text = `1 ${splitFromTo[0].trim()} equals <strong>${_yAxis[_yAxis.length - 1]} ${splitFromTo[1].trim()}</strong>`;

        chart('highlight-chart', {
            title: {
                text,
                useHTML: true,
            },
            chart: {
                type: 'line'
            },
            xAxis: {
                categories: _xAxis,
                title: {
                    text: "Date"
                }
            },
            yAxis: {
                title: {
                    text: "Exchange Rate"
                }
            },
            series: [{
                name: _fromTo,
                data: _yAxis
            }]
        })
    }
}