import Settings from '../../config/settings';
import NETWORK from '../enums/Network';
import { ethers } from 'ethers';
import config from '../../config/abi';

export  default class SmartContract {

  /**
   * create instance for smart contrat
   * @param {object} opts - option to initiate a smart contract
  */
  constructor(opts = new Object()) {

    this._instance = null;
    this._provider = null;
    this._options = new Object();
    this._options.host = Settings.host || '127.0.0.1' ;
    this._options.port = Settings.port || '8545';
    this._options.provider = Settings.provider || 'https';
    this._options.network = Settings.network || NETWORK.RINKEBYTESTNETWORK;
    this._address = null;
    this._abi = null;
    Object.freeze(this._options);
    this.provider = this._options;
    this._address = config.address;
    this._abi = config.abi;
    this._contract = new ethers.Contract(this._address, this._abi, this.provider);

  }


  set provider (options) {
    try {
      if (!options)
        throw  new Error('option is not defined');
        if (Settings.port == '8545') {
          console.log('local');
          this._provider = new ethers.providers.JsonRpcProvider(`${options.provider}://${options.host}:${options.port}`);
        }
        else {
          console.log('Rinkeby');
          this._provider = new ethers.providers.JsonRpcProvider(`${options.provider}://${options.host}`);
        }
  
    } catch(exception) {
      console.error('[Inpage-instance] Error: ' + exception.message);
    }
  }

  /**
   * function to get provider
   * @return {Object} provider instance
   * */
  get provider() {
    return this._provider;
  }

  /**
   * function to get Smart Contract instance
   * @return {Object} contract instance
   * */
  get contract () {    
      return this._contract;
   }
}
