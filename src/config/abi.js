module.exports = {
	"address": "0x6c5796a7607d0859648156de00fd970dddde6e16",
	"abi": [
		{
		  "constant": true,
		  "inputs": [
			{
			  "name": "",
			  "type": "address"
			}
		  ],
		  "name": "members",
		  "outputs": [
			{
			  "name": "personalAddress",
			  "type": "address"
			},
			{
			  "name": "pendingDataDeliver",
			  "type": "uint256"
			},
			{
			  "name": "exists",
			  "type": "bool"
			}
		  ],
		  "payable": false,
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "constant": true,
		  "inputs": [
			{
			  "name": "",
			  "type": "address"
			}
		  ],
		  "name": "holonValidators",
		  "outputs": [
			{
			  "name": "validatorAddress",
			  "type": "address"
			},
			{
			  "name": "reputation",
			  "type": "uint256"
			},
			{
			  "name": "strategy",
			  "type": "uint8"
			},
			{
			  "name": "price",
			  "type": "uint256"
			},
			{
			  "name": "exists",
			  "type": "bool"
			}
		  ],
		  "payable": false,
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "constant": true,
		  "inputs": [
			{
			  "name": "",
			  "type": "uint256"
			}
		  ],
		  "name": "holonValidatorsList",
		  "outputs": [
			{
			  "name": "",
			  "type": "address"
			}
		  ],
		  "payable": false,
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "constant": true,
		  "inputs": [
			{
			  "name": "",
			  "type": "uint256"
			}
		  ],
		  "name": "infoCategories",
		  "outputs": [
			{
			  "name": "",
			  "type": "string"
			}
		  ],
		  "payable": false,
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "inputs": [],
		  "payable": true,
		  "stateMutability": "payable",
		  "type": "constructor"
		},
		{
		  "anonymous": false,
		  "inputs": [
			{
			  "indexed": true,
			  "name": "persona",
			  "type": "address"
			},
			{
			  "indexed": false,
			  "name": "dataCategory",
			  "type": "uint8"
			},
			{
			  "indexed": false,
			  "name": "infoCategory",
			  "type": "uint256"
			},
			{
			  "indexed": false,
			  "name": "field",
			  "type": "string"
			}
		  ],
		  "name": "NewData",
		  "type": "event"
		},
		{
		  "anonymous": false,
		  "inputs": [
			{
			  "indexed": true,
			  "name": "requester",
			  "type": "address"
			},
			{
			  "indexed": true,
			  "name": "validator",
			  "type": "address"
			},
			{
			  "indexed": false,
			  "name": "dataCategory",
			  "type": "uint8"
			},
			{
			  "indexed": false,
			  "name": "field",
			  "type": "string"
			},
			{
			  "indexed": false,
			  "name": "data",
			  "type": "string"
			},
			{
			  "indexed": false,
			  "name": "uriConfirmationData",
			  "type": "string"
			}
		  ],
		  "name": "ValidateMe",
		  "type": "event"
		},
		{
		  "anonymous": false,
		  "inputs": [
			{
			  "indexed": true,
			  "name": "persona",
			  "type": "address"
			},
			{
			  "indexed": true,
			  "name": "validator",
			  "type": "address"
			},
			{
			  "indexed": false,
			  "name": "field",
			  "type": "string"
			},
			{
			  "indexed": false,
			  "name": "result",
			  "type": "uint8"
			}
		  ],
		  "name": "ValidationResult",
		  "type": "event"
		},
		{
		  "anonymous": false,
		  "inputs": [
			{
			  "indexed": true,
			  "name": "requester",
			  "type": "address"
			},
			{
			  "indexed": true,
			  "name": "persona",
			  "type": "address"
			},
			{
			  "indexed": false,
			  "name": "field",
			  "type": "string"
			}
		  ],
		  "name": "LetMeSeeYourData",
		  "type": "event"
		},
		{
		  "anonymous": false,
		  "inputs": [
			{
			  "indexed": false,
			  "name": "accepted",
			  "type": "bool"
			},
			{
			  "indexed": true,
			  "name": "persona",
			  "type": "address"
			},
			{
			  "indexed": true,
			  "name": "consumer",
			  "type": "address"
			},
			{
			  "indexed": false,
			  "name": "dataCategory",
			  "type": "uint8"
			},
			{
			  "indexed": false,
			  "name": "field",
			  "type": "string"
			},
			{
			  "indexed": false,
			  "name": "data",
			  "type": "string"
			}
		  ],
		  "name": "DeliverData",
		  "type": "event"
		},
		{
		  "constant": true,
		  "inputs": [
			{
			  "name": "_strategy",
			  "type": "uint8"
			},
			{
			  "name": "valueInformed",
			  "type": "uint256"
			}
		  ],
		  "name": "correctPrice",
		  "outputs": [
			{
			  "name": "",
			  "type": "bool"
			}
		  ],
		  "payable": false,
		  "stateMutability": "pure",
		  "type": "function"
		},
		{
		  "constant": false,
		  "inputs": [
			{
			  "name": "_infoCode",
			  "type": "uint256"
			},
			{
			  "name": "_dataCategory",
			  "type": "uint8"
			},
			{
			  "name": "_field",
			  "type": "string"
			},
			{
			  "name": "_data",
			  "type": "string"
			},
			{
			  "name": "_price",
			  "type": "uint256"
			}
		  ],
		  "name": "addPersona",
		  "outputs": [
			{
			  "name": "",
			  "type": "bool"
			}
		  ],
		  "payable": false,
		  "stateMutability": "nonpayable",
		  "type": "function"
		},
		{
		  "constant": false,
		  "inputs": [
			{
			  "name": "_infoCode",
			  "type": "uint256"
			},
			{
			  "name": "_dataCategory",
			  "type": "uint8"
			},
			{
			  "name": "_field",
			  "type": "string"
			},
			{
			  "name": "_data",
			  "type": "string"
			},
			{
			  "name": "_price",
			  "type": "uint256"
			}
		  ],
		  "name": "addData",
		  "outputs": [
			{
			  "name": "",
			  "type": "bool"
			}
		  ],
		  "payable": false,
		  "stateMutability": "nonpayable",
		  "type": "function"
		},
		{
		  "constant": false,
		  "inputs": [
			{
			  "name": "_strategy",
			  "type": "uint8"
			},
			{
			  "name": "_price",
			  "type": "uint256"
			}
		  ],
		  "name": "addValidator",
		  "outputs": [
			{
			  "name": "",
			  "type": "bool"
			}
		  ],
		  "payable": true,
		  "stateMutability": "payable",
		  "type": "function"
		},
		{
		  "constant": false,
		  "inputs": [
			{
			  "name": "_index",
			  "type": "uint256"
			},
			{
			  "name": "_details",
			  "type": "string"
			}
		  ],
		  "name": "addInfoCategory",
		  "outputs": [
			{
			  "name": "",
			  "type": "bool"
			}
		  ],
		  "payable": false,
		  "stateMutability": "nonpayable",
		  "type": "function"
		},
		{
		  "constant": false,
		  "inputs": [
			{
			  "name": "_validator",
			  "type": "address"
			},
			{
			  "name": "_field",
			  "type": "string"
			},
			{
			  "name": "_proofUrl",
			  "type": "string"
			}
		  ],
		  "name": "askToValidate",
		  "outputs": [
			{
			  "name": "",
			  "type": "bool"
			}
		  ],
		  "payable": true,
		  "stateMutability": "payable",
		  "type": "function"
		},
		{
		  "constant": true,
		  "inputs": [
			{
			  "name": "_field",
			  "type": "string"
			}
		  ],
		  "name": "GetFieldLastStatus",
		  "outputs": [
			{
			  "name": "",
			  "type": "uint8"
			}
		  ],
		  "payable": false,
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "constant": false,
		  "inputs": [
			{
			  "name": "_persona",
			  "type": "address"
			},
			{
			  "name": "_field",
			  "type": "string"
			},
			{
			  "name": "_status",
			  "type": "uint8"
			}
		  ],
		  "name": "validate",
		  "outputs": [
			{
			  "name": "",
			  "type": "bool"
			}
		  ],
		  "payable": true,
		  "stateMutability": "payable",
		  "type": "function"
		},
		{
		  "constant": true,
		  "inputs": [
			{
			  "name": "_address",
			  "type": "address"
			},
			{
			  "name": "_field",
			  "type": "string"
			}
		  ],
		  "name": "getPersonaData",
		  "outputs": [
			{
			  "name": "",
			  "type": "string"
			},
			{
			  "name": "",
			  "type": "string"
			},
			{
			  "name": "",
			  "type": "uint8"
			},
			{
			  "name": "",
			  "type": "uint256"
			},
			{
			  "name": "",
			  "type": "uint256"
			},
			{
			  "name": "",
			  "type": "uint256"
			}
		  ],
		  "payable": false,
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "constant": true,
		  "inputs": [
			{
			  "name": "_address",
			  "type": "address"
			},
			{
			  "name": "_fieldIndex",
			  "type": "uint256"
			}
		  ],
		  "name": "getPersonaDataByFieldIndex",
		  "outputs": [
			{
			  "name": "",
			  "type": "string"
			},
			{
			  "name": "",
			  "type": "string"
			},
			{
			  "name": "",
			  "type": "uint8"
			},
			{
			  "name": "",
			  "type": "uint256"
			},
			{
			  "name": "",
			  "type": "uint256"
			},
			{
			  "name": "",
			  "type": "uint256"
			}
		  ],
		  "payable": false,
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "constant": true,
		  "inputs": [
			{
			  "name": "_address",
			  "type": "address"
			}
		  ],
		  "name": "getPersonaNumberOfFields",
		  "outputs": [
			{
			  "name": "",
			  "type": "uint256"
			}
		  ],
		  "payable": false,
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "constant": true,
		  "inputs": [
			{
			  "name": "_address",
			  "type": "address"
			},
			{
			  "name": "_field",
			  "type": "string"
			},
			{
			  "name": "validatorIndex",
			  "type": "uint256"
			}
		  ],
		  "name": "getPersonaDataValidatorDetails",
		  "outputs": [
			{
			  "name": "",
			  "type": "string"
			},
			{
			  "name": "",
			  "type": "string"
			},
			{
			  "name": "",
			  "type": "uint8"
			},
			{
			  "name": "",
			  "type": "uint256"
			},
			{
			  "name": "",
			  "type": "uint256"
			},
			{
			  "name": "",
			  "type": "address"
			},
			{
			  "name": "",
			  "type": "uint256"
			},
			{
			  "name": "",
			  "type": "uint8"
			},
			{
			  "name": "",
			  "type": "uint256"
			},
			{
			  "name": "",
			  "type": "uint256"
			}
		  ],
		  "payable": false,
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "constant": false,
		  "inputs": [
			{
			  "name": "_address",
			  "type": "address"
			},
			{
			  "name": "_field",
			  "type": "string"
			}
		  ],
		  "name": "askDecryptedData",
		  "outputs": [
			{
			  "name": "",
			  "type": "bool"
			}
		  ],
		  "payable": true,
		  "stateMutability": "payable",
		  "type": "function"
		},
		{
		  "constant": true,
		  "inputs": [],
		  "name": "GetRequestedFields",
		  "outputs": [
			{
			  "name": "",
			  "type": "address[]"
			},
			{
			  "name": "",
			  "type": "string[]"
			},
			{
			  "name": "",
			  "type": "string[]"
			}
		  ],
		  "payable": false,
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "constant": true,
		  "inputs": [
			{
			  "name": "personaAddress",
			  "type": "address"
			},
			{
			  "name": "_field",
			  "type": "string"
			}
		  ],
		  "name": "getAllowedField",
		  "outputs": [
			{
			  "name": "",
			  "type": "bool"
			},
			{
			  "name": "",
			  "type": "string"
			}
		  ],
		  "payable": false,
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "constant": false,
		  "inputs": [
			{
			  "name": "_accept",
			  "type": "bool"
			},
			{
			  "name": "_address",
			  "type": "address"
			},
			{
			  "name": "_field",
			  "type": "string"
			}
		  ],
		  "name": "deliverDecryptedData",
		  "outputs": [
			{
			  "name": "",
			  "type": "bool"
			}
		  ],
		  "payable": false,
		  "stateMutability": "nonpayable",
		  "type": "function"
		},
		{
		  "constant": true,
		  "inputs": [
			{
			  "name": "_personaAddress",
			  "type": "address"
			}
		  ],
		  "name": "score",
		  "outputs": [
			{
			  "name": "",
			  "type": "uint256"
			},
			{
			  "name": "",
			  "type": "uint256"
			}
		  ],
		  "payable": false,
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "constant": true,
		  "inputs": [],
		  "name": "getTotalValidators",
		  "outputs": [
			{
			  "name": "",
			  "type": "uint256"
			}
		  ],
		  "payable": false,
		  "stateMutability": "view",
		  "type": "function"
		}
	]
}