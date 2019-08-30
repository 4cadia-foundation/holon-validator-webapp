import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import * as WalletActions from "../../redux/actions/wallet";
import EthereumQRPlugin from 'ethereum-qr-code';


class Deposit extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            address: '',
        }
        this._qr = new EthereumQRPlugin();
    }

    componentDidMount() {
        const sendDetails = {
          to: this.props.wallet.address,
        }
        const configDetails = {
          size:300,
          selector: '#ethereum-qr-code-address',
        }
        console.log('qrcodeaddress', sendDetails);
        console.log('qrcodeaddress', configDetails);
        this.setState({
          isLoading: false,
          address: this.props.wallet.address,
        });
        this._qr.toCanvas(sendDetails, configDetails);
      }

      render() {
          return( 
            <div id="ethereum-qr-code-address">
              &nbps;
            </div>
        )
    }
}
const mapStateToProps = state => ({
    wallet: state.wallet
});


const mapDispatchToProps = dispatch => bindActionCreators(WalletActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Deposit);