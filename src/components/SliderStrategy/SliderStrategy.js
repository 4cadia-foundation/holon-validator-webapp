import React, { Component } from 'react';

import './SliderStrategy.css';


class SliderStrategy extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 2
        };
    }

    onChange = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    render() {
    
        return (
          <section className="paragraph">
            <label className="label-data text-center">How much do you want to charge or pay for this service?</label>
            <div className="sliderContainer margin-top-30">
                <input type="range" min="1" max="3" step="1" className="slider" value={this.state.value} onChange={this.onChange}/>
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