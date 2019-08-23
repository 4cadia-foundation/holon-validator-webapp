import React, { Component } from 'react'
import {Grid, Row, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ValidationActions from '../../redux/actions/validations';

import CloseIconPage from '../../components/CloseIconPage/CloseIconPage';
import Loader from '../../components/Loader/Loader';

import imgInfo from '../../images/info.svg';
import './Validation.css';

class Validation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            requesterName: '', 
            requester: '', 
            field: '', 
            dataValue: '', 
            uriDataConfirmation: '',
            optionChosen: -1,
            msg: 'Getting request details',
            submitted: false,
        };    
        this.handleClickValidate = this.handleClickValidate.bind(this);
        this.handleClickNotValidate = this.handleClickNotValidate.bind(this);
        this.handleClickCanNotValidate = this.handleClickCanNotValidate.bind(this);
        this.closePage = this.closePage.bind(this);
        this.submitEvaluation = this.submitEvaluation.bind(this);
    }

    submitEvaluation(optionChosen) {
        this.setState({
            optionChosen : optionChosen,
            msg: 'Submitting your evaluation',
            submitted: true,
            isProcessing: true,
        })
        this.props.submitValidation(this.state.requester, this.state.field, optionChosen)
    }

    handleClickValidate(event) {
        event.preventDefault()     
        this.submitEvaluation(0)
    }

    handleClickNotValidate(event){
        event.preventDefault()     
        this.submitEvaluation(1)
    }

    handleClickCanNotValidate(event){
        event.preventDefault()     
        this.submitEvaluation(2)
    }

    componentDidMount() {
        const {requesterName, requester, field, dataValue, uriDataConfirmation} = this.props.validations.activeValidation;
        this.setState({
            isProcessing: false,
            requesterName: requesterName, 
            requester: requester, 
            field: field, 
            dataValue: dataValue, 
            uriDataConfirmation: uriDataConfirmation,
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.validations.error.length > 2) {
            const msg = 'Erro: ' + nextProps.validations.error;
            console.error('Validation/getDerivedStateFromProps: ', msg);
            return { isProcessing: false };
        }
        return null;
    }


    closePage() {
        this.props.resetActiveValidation()
    }

    render() {
        console.log('Validation/render',this.props.validations.activeValidation, this.props.validations.activeValidation === null)
        if ( (!this.props.validations.activeValidation) || (this.props.validations.activeValidation === null) ) {
            return ( <Redirect to="/home" /> )
        } 
        const {requesterName, field, dataValue, uriDataConfirmation} = this.state;
        return (
            <div>
                <Grid>
                    <Row>
                        <Col>
                        <div className="btn-validation-close">
                            <CloseIconPage destination="/home"/>                    
                        </div>
                
                        </Col>
                    </Row>
                    <Row>
                        <Col className="title text-center">
                            <h3>Validation request details for your evaluation of: </h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="paragraph">
                            <label>{requesterName}</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="paragraph">
                            <label>Field:</label> {field}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="paragraph">
                            <label>Data:</label> {dataValue}
                        </Col>
                    </Row>        
                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>            
                    <Row>
                        <Col className="text-left paragraph">
                            <label>Link to check the data</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-left paragraph">
                            {uriDataConfirmation}
                        </Col>
                    </Row>                    
                </Grid>
                <Grid>
                    <Row>
                        <Col className="text-center paragraph margin-top-30">
                            <p className="ask-question"> Is this information valid? </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center margin-top-10">
                            <p className="txtInfo paragraph"> The veracity of the information is your responsability and affect your reputation.</p>
                        </Col>
                    </Row>
                </Grid>
                <Grid>
                    <Row className="grdButton paragraph margin-top-30">
                        <Col>
                            <Button className = 'btnGroupLine' bsStyle="success" onClick={this.handleClickValidate}>VALID</Button>
                            <Button className = 'btnGroupLine' bsStyle="danger" onClick={this.handleClickNotValidate}>NOT VALID</Button>
                            <Button className = 'btnGroupLine' bsStyle="warning" onClick={this.handleClickCanNotValidate}>NOT EVALUATE</Button>
                        </Col>
                    </Row>                    
                </Grid>
                <Loader visible={this.state.isProcessing} message={this.state.msg} />               
            </div>
        );
    }

}

const mapStateToProps = reduxState => ({ 
    validations: reduxState.validations
});

const mapDispatchToProps = dispatch => bindActionCreators(ValidationActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Validation);