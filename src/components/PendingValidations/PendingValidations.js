import React, { Component } from 'react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ValidationActions from '../../redux/actions/validations';

import PendingValidationsBox from '../PendingValidationsBox/PendingValidationsBox';
import './PendingValidations.css'

class PendingValidations extends Component {

  constructor(props) {
    super(props)    
    this.state = {
      validationRequests: [],
      validationResults: [],
      validationPending: [],
    } 
  }

  componentDidMount() {
    this.props.setValidations()
    console.log('PendingValidations/componentDidMount/props', this.props)   
  }

  static getDerivedStateFromProps(nextProps) {
    console.log('PendingValidations/getDerivedStateFromProps', nextProps.validations.objLogs)
    let vPending = []
    if (nextProps.validations.objLogs.validationResults && nextProps.validations.objLogs.validationResults.length>0) {
      vPending = nextProps.validations.objLogs.getPendingValidations();
    } else {
      vPending = nextProps.validations.objLogs.validationAsks;
    }
    console.log('PendingValidations/getDerivedStateFromProps/vPending', vPending)
    return { validationPending: vPending, validationRequests: nextProps.validations.objLogs.validationAsks, validationResults: nextProps.validations.objLogs.validationResults };
  }


  render() {
    if ( (!this.state.validationPending) || (this.state.validationPending.length < 1) ) {
      return ( 
        <div className="margin-top-212">
          <p className="information paragraph text-center">There is no requests yet. 😉 </p>
        </div>
       )
    } else {
      if (this.props.onlyPending) {
        const onlyPendingRequests = this.state.validationRequests.filter(s => s.status === 3);
        if (onlyPendingRequests.length>0) {
          return (
            <div>
              {onlyPendingRequests.map((item, index) => 
                <PendingValidationsBox key={index} validationItemData={item} />
              )}   
            </div>     
          )       
        } else {
          return ( 
            <div className="margin-top-212">
              <p className="information paragraph text-center">Congratulations! You don't have pending requests. 😉 </p>
            </div>
          )
        }
      } else {
        return (
          <div>
            {this.state.validationRequests.map((item, index) => 
              <PendingValidationsBox key={index} validationItemData={item} />
            )}   
          </div>     
        )    
      }
    }
  }
}

const mapStateToProps = reduxState => ({ 
  validations: reduxState.validations
});

const mapDispatchToProps = dispatch => bindActionCreators(ValidationActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PendingValidations);