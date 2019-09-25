import React, { Component } from 'react';

import './SliderStrategy.css';


class SliderStrategy extends Component {

    constructor(props) {
        super(props);

    }

    onChange = (event) => {
        this.props.emitSetPriceStrategy(event.target.value);
    }

    render() {
        
        const strategy = this.props.strategy;

        return (
          <section className="paragraph">
            <label className="label-data text-center">How much do you want to charge or pay for this service?</label>
            <div className="sliderContainer margin-top-30">
                <input type="range" min="1" max="3" step="1" className="slider" value={strategy} onChange={this.onChange}/>
                <div className="optionsStrategy margin-top-10">
                    <p>Charged</p>
                    <p>For Free</p>
                    <p>Rebate</p>
                </div>
            </div>
          </section>
        )
    }
}

export default SliderStrategy;