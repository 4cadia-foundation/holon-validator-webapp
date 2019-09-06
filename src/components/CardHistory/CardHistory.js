import React, { Component } from 'react';
import { FaRegListAlt } from "react-icons/fa";
import PropTypes from 'prop-types';

import './CardHistory.css';

class CardHistory extends Component {

    constructor ( props ){
        super( props );

        this.state = {
            enableDetail: false
        };

        this.parseStatus.bind(this);
    }


    showDetail () {
        const enableDetail = this.state.enableDetail;
        this.setState({
            enableDetail:  !enableDetail
        });
    }


    parseStatus ( status ) {
        let label = '';
        switch (status) {
            case 0:
                label = 'Validate';
            break;
            case 1:
                label = 'Not Validate';
            break;
            case 2:
                label = 'Can Not Validate';
            break;
        }
        return label;
    }


    render () {

        const enableDetail = this.state.enableDetail;
        const { status, name, address, date, link, data, field } = this.props.personData;
        const { toggle, emitClick } = this.props;




        return (
            <section className={ `card card-history col-sm-12 `}   onClick={ toggle? this.showDetail.bind( this ) : emitClick.bind( this ) }>

                <header className='row col-md-12 card-header'>

                    <FaRegListAlt className={'margin-left-10 margin-right-10 hidden-xs'} size={32} />

                    <div className='box-info'>
                        <h4 className='no-margin title'>{ name }</h4>
                        <p className={'card-text'}>{ address }</p>
                    </div>
                </header>

                <section className={`row col-md-12 card-history-detail ${ enableDetail ? 'show' : 'hide'}`}>

                    <div className='row'>

                        <div className='col-md-4'>
                            <p> <span>Field:</span> <strong> { field }</strong> </p>
                        </div>

                        <div className='col-md-4'>
                            <p> <span>Status:</span> <strong> { this.parseStatus(status) } </strong> </p>
                        </div>

                        <div className='col-md-4'>
                            <p> <span>Date:</span> <strong> { date } </strong> </p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <p><span>Link do check the data:</span> <strong> { link } </strong></p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <p><span>Data: </span> <strong> { data } </strong></p>
                        </div>
                    </div>
                </section>

            </section>
        );
    }
}

CardHistory.defaultProps = {
    toggle: true,
    personData: {
        status: 'Not defined',
        name: 'Not defined',
        field: 'Not defined',
        address: 'Not defined',
        date: '00/00/0000',
        link: ' - ',
        data: 'Not defined'
    }
};

CardHistory.propTypes = {
    toggle: PropTypes.bool,
    personData: PropTypes.shape({
            status: PropTypes.string,
            name: PropTypes.string,
            field: PropTypes.string,
            address: PropTypes.string,
            date: PropTypes.string,
            link: PropTypes.string,
            data: PropTypes.string
        }),
    emitClick: PropTypes.func
};


export default CardHistory;
