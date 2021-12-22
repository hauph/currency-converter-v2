import React from "react";
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

  handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    this.props.onValueChange(this.props.type, e.target.value);
  }

  render() {
    const _currencyArray = this.props.currencyArray;
    const ListName = _currencyArray.map((name) => (
      <option key={name.id} value={name.name}>
        {name.id} - {name.name}
      </option>
    ));
    const value = this.props.value;
    const name = this.props.currencyName;

    return (
      <fieldset>
        <legend>
          Input amount in{" "}
          <span style={{ fontWeight: "500", fontSize: "30px" }}>{name}</span>:
        </legend>
        <input
          className={styles.currency_input}
          value={value}
          onChange={this.handleChange}
        />
        <select
          className={styles.currency_select}
          value={name}
          onChange={this.handleSelectChange}
        >
          {ListName}
        </select>
      </fieldset>
    );
  }
}

export default CurrencyInput;
