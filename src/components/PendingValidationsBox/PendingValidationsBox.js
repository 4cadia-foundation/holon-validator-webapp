import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ValidationActions from '../../redux/actions/validations';
import * as ValidationHelper from '../../helper/validations';

import notebook from '../../images/notebook-icon.svg';
import './PendingValidationsBox.css'

class PendingValidationsBox extends Component {

  constructor(props) {
    super(props)
    this.openValidationWindow = this.openValidationWindow.bind(this);
    this.state = {
      validationItemData : {},
    };
  }

  componentDidMount() {
    this.setState({
      validationItemData: this.props.validationItemData
    })
  }

  openValidationWindow(event) {
    console.log('PendingValidationsBox/openValidationWindow/event', event)
    this.props.defineActiveValidation(this.state.validationItemData)    
  }

  render() {
    if ( (this.props.validations.activeValidation) && (this.props.validations.activeValidation.field.length>1) ) {
      console.log('PendingValidationsBox/render/this.props.validations', this.props.validations)
      return(
        <Redirect to="/validation" />
      )
    }
    console.log('PendingValidationsBox/render/this.state.validationItemData', this.state.validationItemData)
    const {requesterName, requester, status} = this.state.validationItemData;
    let statusDesc = ValidationHelper.getStatusValidationDescription(status);
    return (

      <div className="card paragraph" onClick={() => this.openValidationWindow()}>
        <div className="card-content">
          <img className="notebook-icon" src={notebook} alt="Notebook Icon" />
          <div className="elements">
            <p><b>{requesterName}</b></p>
            <p>{requester}</p>
          </div>
        </div>
      </div>
    )    
  }
 }

const mapStateToProps = reduxState => ({ 
  validations: reduxState.validations
});

const mapDispatchToProps = dispatch => bindActionCreators(ValidationActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PendingValidationsBox);