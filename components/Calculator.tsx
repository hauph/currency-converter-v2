import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Chart from "./Chart";
import CurrencyInput from "./CurrencyInput";
import { getConvertURL, secondFetch, convertCurrency } from "../scripts/main";
import { CurrencyData } from "../interface/currencyData";
import { ChartData } from "../interface/chartData";
import { APIs } from "../scripts/apis";

type Props = {};

let currency1 = "AED";
let currency2 = "AED";

export default function Calculator(props: Props) {
  const dateObj = getConvertURL();
  const startDate = dateObj.startDate;
  const endDate = dateObj.endDate;

  const [currentCurrency, setCurrentCurrency] = useState(0);
  const [value, setValue] = useState(0);
  const [convertValue1, setConvertValue1] = useState(0);
  const [convertValue2, setConvertValue2] = useState(0);
  const [currencyValue1, setCurrencyValue1] = useState(0);
  const [currencyValue2, setCurrencyValue2] = useState(0);
  const [currencyName1, setCurrencyName1] = useState("UAE Dirham");
  const [currencyName2, setCurrencyName2] = useState("UAE Dirham");
  const [currencyArray, setCurrencyArray] = useState<Array<CurrencyData>>([]);
  const [dataChart, setDataChart] = useState<ChartData | {}>({});
  const [fromTo, setFromTo] = useState("");

  useEffect(() => {
    try {
      (async () => {
        const response = await axios(APIs.getAllCurrency);
        const data = response.data;
        setCurrencyArray(data);

        // Remove loader
        const divLoading = document.querySelector(".loading");
        if (divLoading) {
          divLoading.classList.remove("loading");
        }
      })();
    } catch (error) {
      console.error("/api/get-all-currency", error);
    }
  }, []);

  useEffect(() => {
    setFromTo(`${currency1} to ${currency2}`);
    setCurrencyValue1(
      currentCurrency === 2 ? convertCurrency(value, convertValue2) : value
    );
    setCurrencyValue2(
      currentCurrency === 1 ? convertCurrency(value, convertValue1) : value
    );
  }, [convertValue1, convertValue2, value, currentCurrency]);

  const getCurrencyFromCurrencyArray = (targetCurrency: string): string => {
    let res = "";
    for (var i = 0; i < currencyArray.length; i++) {
      if (currencyArray[i].name.indexOf(targetCurrency) > -1) {
        res = currencyArray[i].id;
        break;
      }
    }
    return res;
  };

  const handleSelectChange = (type: number, currencyName: string) => {
    if (type === 1) {
      setCurrencyName1(currencyName);
      currency1 = getCurrencyFromCurrencyArray(currencyName);
    } else {
      setCurrencyName2(currencyName);
      currency2 = getCurrencyFromCurrencyArray(currencyName);
    }
    secondFetchHandle(currency1, currency2);
  };

  const handleInputChange = (type: number, value: string) => {
    setValue(+value);
    setCurrentCurrency(type);
  };

  const handleOnClick = () => {
    currency1 = getCurrencyFromCurrencyArray(currencyName2);
    currency2 = getCurrencyFromCurrencyArray(currencyName1);
    setCurrencyName1(currencyName2);
    setCurrencyName2(currencyName1);
    secondFetchHandle(currency1, currency2);
  };

  const secondFetchHandle = (currency1: string, currency2: string) => {
    if (currency1 !== currency2) {
      let infoString = `q=${currency1}_${currency2},${currency2}_${currency1}&compact=ultra&date=${startDate}&endDate=${endDate}`;
      //SECOND FETCH
      secondFetch(infoString).then((response) => {
        setConvertValue1(response.convertValue1);
        setConvertValue2(response.convertValue2);
        setDataChart(response.dataForChart);
      });
    }
  };

  return (
    <div className="text-center">
      <h1>Choose currencies to convert:</h1>

      <CurrencyInput
        currencyName={currencyName1}
        currencyArray={currencyArray}
        onValueChange={handleSelectChange}
        value={currencyValue1.toString()}
        onValueInputChange={handleInputChange}
        type={1}
      />

      <Button variant="outline-secondary" onClick={() => handleOnClick()}>
        Swap Currency
      </Button>

      <CurrencyInput
        currencyName={currencyName2}
        currencyArray={currencyArray}
        onValueChange={handleSelectChange}
        value={currencyValue2.toString()}
        onValueInputChange={handleInputChange}
        type={2}
      />

      <Chart dataChart={dataChart} fromTo={fromTo} />

      <a
        href="https://github.com/hauph/currency-converter-v2"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Source
      </a>
    </div>
  );
}
