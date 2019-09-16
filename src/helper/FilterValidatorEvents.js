import FilterEventsBlockchain from '../scripts/core/FilterEventsBlockchain'

export default class FilterValidatorEvents extends FilterEventsBlockchain {

  constructor() {
    super()
    this._validatorAddress = ''
    this._validationAsks = []
    this._validationResults = []
    this._transactor = null
  }

  get validatorAddress() {
    return this._transactor.wallet.address
  }

  set validationAsks(_validationsList) {
    this._validationAsks = _validationsList
  }

  get validationAsks() {
    return this._validationAsks
  }

  set validationResults(_validationResults) {
    this._validationResults = _validationResults
  }

  get validationResults() {
    return this._validationResults
  }

  getValidationResult(index) {
    if (this._validationResult.length<1) {
      return null
    }
    return this._validationResults[index]
  }

  updateValidationAsks(requester, field) {
    if (this._validationResults.length<1) {
      return
    }
    if (this._validationAsks.length<1) {
      return
    }
    for (let i=0; i<this._validationAsks.length; i++) {
      for (let k=0; k<this._validationResults.length; k++) {
        // console.log('filterValidatorEvent/updateValidationAsks/indexes', i, k)
        // console.log('filterValidatorEvent/updateValidationAsks/this._validationAsks', this._validationAsks[i])
        // console.log('filterValidatorEvent/updateValidationAsks/this._validationResults', this._validationResults[k])
        if (    (this._validationAsks[i].requester.toUpperCase() == this._validationResults[k].requester.toUpperCase())
            &&  (this._validationAsks[i].field.toUpperCase() == this._validationResults[k].field.toUpperCase()) ) {
              this._validationAsks[i].status = this._validationResults[k].status
            }
      } 
    }
  }

  getValidationAsk(index) {
    if (this._validationAsks.length<1) {
      return null
    }
    return this._validationAsks[index]
  }

  async loadValidateMeLogs() {
    if (this.validatorAddress.length<10) {
      return 0
    }
    this._validationAsks = []
    this.setEventToFilter('validateme');
    let rawLogs = await this.getLogsTransactionHash()
    for (let i=0; i<rawLogs.length; i++) {
      let receipt = await this.getTransactionReceipt(rawLogs[i]);
      //console.log('FilterValidatorEvents/loadValidateMeLogs/receipt', receipt);
      let receiptDecoded = this.contractDecoder.decodeLogs(receipt.logs)
      receiptDecoded = receiptDecoded[0];
      //console.log('FilterValidatorEvents/loadValidateMeLogs/decoded', receiptDecoded, this.validatorAddress.toUpperCase())
      if (receiptDecoded.events[1].value.toUpperCase() == this.validatorAddress.toUpperCase()) {
        let requesterData = await this._transactor.getOtherPersonaDataField(receiptDecoded.events[0].value, 'name')
        let item = {
          requester: receiptDecoded.events[0].value,
          requesterName: requesterData[1],
          validatorAddress: receiptDecoded.events[1].value,
          dataCategory: receiptDecoded.events[2].value,
          field: receiptDecoded.events[3].value,
          dataValue: receiptDecoded.events[4].value,
          uriDataConfirmation: receiptDecoded.events[5].value,
          status: 3,
        }
        this._validationAsks.push(item)
        //console.log('FilterValidatorEvents/loadValidateMeLogs/item', item)          
      }
    }
    return this._validationAsks.length         
  }

  async loadValidateResultLogs() {
    if (this.validatorAddress.length<10) {
      return 0
    }
    this._validationResults = []
    this.setEventToFilter('validationresult');
    let rawLogs = await this.getLogsTransactionHash()
    for (let i=0; i<rawLogs.length; i++) {
      let receipt = await this.getTransactionReceipt(rawLogs[i]);
      //console.log('FilterValidatorEvents/loadValidateMeLogs/receipt', receipt);
      let receiptDecoded = this.contractDecoder.decodeLogs(receipt.logs)
      receiptDecoded = receiptDecoded[0];
      //console.log('FilterValidatorEvents/loadValidateResultLogs/decoded', receiptDecoded, this.validatorAddress.toUpperCase())
      if (receiptDecoded.events[1].value.toUpperCase() == this.validatorAddress.toUpperCase()) {
        let requesterData = await this._transactor.getOtherPersonaDataField(receiptDecoded.events[0].value, 'name')
        let item = {
          requester: receiptDecoded.events[0].value,
          requesterName: requesterData[1],
          validatorAddress: receiptDecoded.events[1].value,
          field: receiptDecoded.events[2].value,
          status: ((receiptDecoded.events[3].value)*1),
        }
        let found = false
        for (let z=0; z<this._validationResults.length; z++) {
          let result = this._validationResults[z]
          if (
            (item.field.toUpperCase() == result.field.toUpperCase()) && (item.requester.toUpperCase() == result.requester.toUpperCase())
            ) {
              found = true
          }
        }
        if (!found) {
          this._validationResults.push(item)
        }
        //console.log('FilterValidatorEvents/loadValidateResultLogs/events', item)          
      }
    }
    return this._validationResults.length         
  }

  getPendingValidations() {
    if (this._validationResults.length < 1) {
      return this._validationAsks
    }
    let validationsPending = []
    for (let i=0; i<this._validationAsks.length; i++) {
      for (let z=0; z<this._validationResults.length; z++) {
        let request = this._validationAsks[i]
        let result = this._validationResults[z]
        if (
          (request.field.toUpperCase() == result.field.toUpperCase()) && (request.requester.toUpperCase() == result.requester.toUpperCase())
          ) {
          // console.log('FilterValidationEvent/getPendingValidations/request', request.field.toUpperCase(), request.requester.toUpperCase())
          // console.log('FilterValidationEvent/getPendingValidations/result', result.field.toUpperCase(), result.requester.toUpperCase())
          validationsPending.push(request)
        }
      }
    }
    return validationsPending
  }
}