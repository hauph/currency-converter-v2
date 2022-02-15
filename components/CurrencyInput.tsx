import React from "react";
import Select from "react-select";
import styles from "../styles/CurrencyInput.module.scss";

type currency = {
  id: string;
  name: string;
};

type Props = {
  onValueInputChange: (type: number, value: string) => void;
  onValueChange: (type: number, value: string) => void;
  currencyArray: Array<currency>;
  value: string;
  currencyName: string;
  type: number;
};

type State = {};

class CurrencyInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const re = /^\$?[\d,]+(\.\d*)?$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      this.props.onValueInputChange(this.props.type, e.target.value);
    }
  }

  handleSelectChange(e: any) {
    this.props.onValueChange(this.props.type, e.label);
  }

  render() {
    const { currencyArray, value, currencyName } = this.props;
    let defaultValue = { label: currencyName, value: "" };

    const options = currencyArray.map((currency) => {
      const { name, id } = currency;

      if (name === defaultValue.label) {
        defaultValue.value = id;
      }

      return {
        value: id,
        label: name,
      };
    });

    return (
      <fieldset>
        <legend>
          Input amount in{" "}
          <span style={{ fontWeight: "500", fontSize: "30px" }}>
            {currencyName}
          </span>
          :
        </legend>
        <input
          className={styles.currency_input}
          value={value}
          onChange={this.handleChange}
        />
        <Select
          className={styles.currency_select}
          options={options}
          value={defaultValue}
          onChange={this.handleSelectChange}
        />
      </fieldset>
    );
  }
}

export default CurrencyInput;
