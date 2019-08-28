import React, { Component } from 'react'
import { Grid, Row, Col,FormControl } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ValidatorActions from '../../redux/actions/validator';

import CloseIconPage from '../../components/CloseIconPage/CloseIconPage';
import ScoreGraph from '../../components/ScoreGraph/ScoreGraph';
import './Profile.css';

class Profile extends Component {
    // Alterado
    constructor(props) {
        super(props);
        this.state={
            personalInfo: [],
        }
    }   

    componentDidMount() {
        this.setState({
            personalInfo: this.props.validator.personalInfo
        })
    }

    render() {
        return (
            <div>
                <Grid>
                     <div className="btn-profile-close">
                        <CloseIconPage destination="/menu"/>
                    </div>
                    <div className="text-center margin-top-30 margin-bottom-30">
                        {/* <img className="logoHome" src={logo} alt="Logo" />       */}
                    </div>
                    <Row>
                        <Col>
                            &nbsp;
                        </Col>
                    </Row>
                    {
                        this.state.personalInfo.map((val, idx) =>
                        {
                            return(
                                <Row className="text-center pad10b" key={'row_' + idx.toString()}>
                                    <Col>
                                        <FormControl
                                            id={idx.toString()}
                                            key={idx.toString()}
                                            type="text"
                                            value={val.field + ' : ' + val.valor}
                                            readOnly
                                            className="text-center"
                                        />                      
                                    </Col>
                                </Row>
                            )
                        })
                    }                            
                    <Row className="text-center">
                        <div className="margin-top-40">
                            <ScoreGraph />
                        </div>
                    </Row>       
                </Grid>
            </div>
        );
    }

}

const mapStateToProps = state => ({ 
    validator: state.validator
  });
  
  const mapDispatchToProps = dispatch => bindActionCreators(ValidatorActions, dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(Profile);