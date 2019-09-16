import React, { Component } from 'react';

import './DataCategory.css';

class DataCategory extends Component {

  constructor(props) {
    super(props);
    this.setCategory = this.setCategory.bind(this);
    this.state = {
      values: [
        {
          key: "0",
          value: 0,
          text: 'For Free'
        },
        {
          key: "1",
          value: 1,
          text: 'Charged'
        },
        {
          key: "2",
          value: 2,
          text: 'Rebate'
        }
      ]
    }
    this.props.emitsetpriceStrategy(0);
  }

  setCategory(event) {
    this.props.emitsetpriceStrategy(event.target.value);
  }

  render() {
    let optionTemplate = this.state.values.map(v => (
      <option key={v.key} value={v.value}>{v.text}</option>
    ));

    return (
      <section>
        <label className="paragraph label-data text-center">How much do you want to charge or pay for this service?</label>
        <div>
          <select value={this.state.value} onChange={this.setCategory} id="categoryId" className="paragraph">
            {optionTemplate}
          </select>
        </div>
      </section>
    )
  }
}

export default DataCategory;