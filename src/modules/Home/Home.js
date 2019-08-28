import React, { Component } from 'react';
import { Grid, Row, Col, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ValidatorActions from '../../redux/actions/validator';

import Loader from '../../components/Loader/Loader';
import HamburguerMenu from '../../components/HamburguerMenu/HamburguerMenu';
import PendingValidations from '../../components/PendingValidations/PendingValidations';
import Balance from '../../components/Balance/Balance';
import './Home.css';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            validator: this.props.validator,
        };
    }

    componentDidMount() {
        if (!this.props.validator || !this.props.validator.objLogs || !this.props.validator.objLogs.validationAsks) {
            this.props.getValidatorData();
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        //console.log('ChooseCreateIdentityOrHome/getDerivedStateFromProps nextProps', nextProps);
        //console.log('ChooseCreateIdentityOrHome/getDerivedStateFromProps prevState', prevState);
        if (nextProps.validator.error.length>2) {
            const msg = 'Erro: ' + nextProps.validator.error;
            console.error('ChooseCreateIdentityOrHome/getDerivedStateFromProps: ', msg);
            return { isRunning: false };
        }
        if (nextProps.validator && nextProps.validator.objLogs && nextProps.validator.objLogs.validationAsks) {
            if ( !prevState.validator || !prevState.validator.objLogs || !prevState.validator.objLogs.validationAsks ||
                (prevState.validator.objLogs.validationAsks.length !== nextProps.validator.objLogs.validationAsks.length )) {
                return { validator: nextProps.validator };
            }
        }
        return null;
    }

    render () {
        let content = '';
        // console.log("pendingvalidations/render", this.props.validator, this.props.validator.objLogs)
        if (!this.state.validator || !this.state.validator.objLogs) {
            content = <Loader visible="true" message="Loding Profile Data" />;
        }  else {
            content = <PendingValidations onlyPending={true}/>;
        }
        return (
            <div>
                <Grid>
                    <Row>
                        <Col>
                            <div className="expandView">
                                <HamburguerMenu />
                            </div>
                        </Col>
                        <Col sm={2}></Col>
                        <Col sm={6}></Col>
                        <Col sm={3}>
                            <Balance />
                        </Col>
                    </Row>
                    <section className="margin-top-30">
                        <Row>
                            <Col xs={12}>
                                {content}
                            </Col>
                        </Row>
                    </section>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    validator: state.validator
});

const mapDispatchToProps = dispatch => bindActionCreators(ValidatorActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
