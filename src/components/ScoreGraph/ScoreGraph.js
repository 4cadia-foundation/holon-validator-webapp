import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ValidatorActions from "../../redux/actions/validator";
import Loader from '../../components/Loader/Loader';
import './ScoreGraph.css';
import GaugeChart from 'react-gauge-chart'


class ScoreGraph extends Component {

  constructor(props) {
      super(props);
      this.state = {
        isRunning: true,
        msg: "Loading your Validator's profile",
        validator: null,
      }      
  }

  componentDidMount() {

    this.props.getValidatorScore();
    
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.validator.error.length>2) {
        const msg = 'Erro: ' + nextProps.validator.error;
        console.error('ScoreGraph/getDerivedStateFromProps: ', msg);
        return { isRunning: false };
    }
    if (nextProps.validator.address.length < 1) {
      return { isRunning: true };
    }
    return {isRunning: nextProps.validator.isRunning, numberOfValidations: nextProps.validator.numberOfValidations}

  }

  render() {
        if (this.state.isRunning) {
          return (
            <div>
              <Loader visible={this.state.isRunning} message={this.state.msg} />
            </div>
          )
        } else {
          console.log('ScoreGraph/render numberOfValidations: ' + this.state.numberOfValidations)
          const percentage = (this.state.numberOfValidations > 100 ? 100 : this.state.numberOfValidations / 100);
          const validationQty = this.state.numberOfValidations; 
              return(
              <div>
                <div className="score-validations">
                  <GaugeChart hideText={true}	 nrOfLevels={10} arcPadding={0.05} cornerRadius={3} 
                  percent={percentage} id="gauge-chart1" textColor="#000000" 
                  colors={["#FF0000", "#FFFF00", "#00FF00"]}/>
                  <div className="paragraph" id="validationQty">
                    {validationQty + ' validations'}
                  </div>
                </div>
              </div>
            )
        }
  }
}

const mapStateToProps = reduxState => ({ 
  validator: reduxState.validator
});
const mapDispatchToProps = dispatch => bindActionCreators(ValidatorActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ScoreGraph);
