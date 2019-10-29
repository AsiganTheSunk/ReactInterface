import './App.css';
import logo from './ETH-Icon.png'
import React, { Component } from 'react';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
//import CustomToken from './build/CustomToken.json';
//import CustomCrowdsale from './build/CustomCrowdsale.json';
//import WETH9 from './build/WETH9.json';

import Nav from './components/Nav';
import InstallMetamask from './components/InstallMetamask';
import UnlockMetamask from './components/UnlockMetamask';

const CROWDSALE_ERROR_MESSAGES ={
  not_enough_gas: 'Not Enough Gas',
};

const CROWDSALE_TEXT ={
  text_header: 'Welcome To The CustomCrowdsale',
  text_weth_symbol: 'WETH',
  text_ether_symbol : 'ETH',
  text_weth: 'Wrapped Ether',
  text_ether: 'Ether'
};
    const mystyle = {
      color: "black",
      backgroundColor: "lightblue",
      padding: "10px",
      fontFamily: "Arial",
      width: 800,
      textAlign: 'center'
    };

    const divstyle = {

        backgroundColor: 'lightgrey',
        width: 640,
        padding: 10,
    }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.appName = 'CustomTokenCrodwsale';
    this.isWeb3 = true;
    this.isWeb3Locked = false;
    //this.buyToken = this.buyToken.bind(this);
    //this.claimToken = this.claimToken.bind(this);
    //this.onInputChangeUpdateField = this.onInputChangeUpdateField.bind(this);
//
//    this.state = {
//        crowdsaleAddress: null,
//        tokenAddress: null,
//        weth9Address: null,
//        inProgress: false,
//        tx: null,
//        network: 'Checking...',
//        account: null,
//        tokens: [],
//        transferDetail: {},
//        fields: {
//            receiver: null,
//            amount: null,
//            gasPrice: null,
//            gasLimit: null,
//        },
//        defaultGasPrice: null,
//        defaultGasLimit: 200000
//    }
    let web3 = window.web3;
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        this.web3Provider = web3.currentProvider;
        this.web3 = new Web3(web3.currentProvider);
        //this.tokenZendr = TruffleContract(TokenZendR);
        //this.tokenZendr.setProvider(this.web3Provider);

        //if (web3.eth.coinbase === null) this.isWeb3Locked = true;

    }else{
        this.isWeb3 = false;
    }

    this.onLaunchClicked = this.onLaunchClicked.bind(this);
    this.state = { amount: null, isTransferButtonDisabled: false, };
  }

//
setNetwork = () => {
    let networkName,that = this;
    this.web3.version.getNetwork(function (err, networkId) {
        switch (networkId) {
            case "1":
                networkName = "Main";
                break;
            case "2":
                networkName = "Morden";
                break;
            case "3":
                networkName = "Ropsten";
                break;
            case "4":
                networkName = "Rinkeby";
                break;
            case "42":
                networkName = "Kovan";
                break;
            default:
                networkName = networkId;
        }

        that.setState({
            network: networkName
        })
    });
    };

//   newTransfer = (index) => {
//        this.setState({
//            transferDetail: this.state.tokens[index]
//        })
//    };

//    closeTransfer = () => {
//        this.setState({
//            transferDetail: {},
//            fields: {},
//        })
//    };
//
//    setGasPrice = () => {
//        this.web3.eth.getGasPrice((err,price) => {
//            price = this.web3.fromWei(price,'gwei');
//            if(!err) this.setState({defaultGasPrice: price.toNumber()})
//        });
//    };
//
//    setContractAddress = ()=> {
//        //this.tokenZendr.deployed().then((instance) => {
//            this.setState({tzAddress: instance.address});
//        });
//    };
//
//    resetApp = () => {
//      this.setState({
//          transferDetail: {},
//          fields: {
//              receiver: null,
//              amount: null,
//              gasPrice: null,
//              gasLimit: null,
//          },
//          defaultGasPrice: null,
//      })
//    };
//
//    Transfer = () => {
//
//        this.setState({
//            inProgress: true
//        });
//
//        let contract = this.web3.eth.contract(this.state.transferDetail.abi).at(this.state.transferDetail.address);
//        let transObj = {from: this.state.account,gas: this.state.defaultGasLimit,gasPrice: this.state.defaultGasPrice};
//        let app = this;
//        let amount = this.state.fields.amount  + 'e' + this.state.transferDetail.decimal;
//        let symbol = this.state.transferDetail.symbol;
//        let receiver = this.state.fields.receiver;
//        amount = new this.web3.BigNumber(amount).toNumber();
//
//        contract.approve(this.state.tzAddress, amount ,transObj, (err,response)=>{
//            if(!err) {
//                app.tokenZendr.deployed().then((instance) => {
//                    this.tokenZendrInstance = instance;
//                    this.watchEvents();
//
//                    this.tokenZendrInstance.transferTokens(symbol, receiver, amount, transObj)
//                        .then((response,err) => {
//                            if(response) {
//                                console.log(response);
//
//                                app.resetApp();
//
//                                app.setState({
//                                    tx: response.tx,
//                                    inProgress: false
//                                });
//                            }else{
//                                console.log(err);
//                            }
//                        });
//                })
//            }else{
//                console.log(err);
//            }
//        });
//    };


onLaunchClicked (event) {
    event.preventDefault();
    this.setState({isTransferButtonDisabled: true});
    let amount = this.state.amount;
    if (amount === '') {
        // Alert on Submit if the amount is 0
        alert("Your Invested Amount Must be more than 0");
    }
    if (amount !== '' && Number(amount)) {
        // Time Out the button to avoid over transfering of the funds and spam clicking.
        alert("Your Invested Amount is Being Transfer ...");

    }
    setTimeout(() => this.setState({ isTransferButtonDisabled: false }), 1000);
}



mySubmitHandler = (event) => {
    event.preventDefault();
}

myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    let err = '';
    if (nam === "amount") {
            if (val !=='' && !Number(val)) {
                err = <strong>Your age must be a number</strong>;
            }
        }
    this.setState({errormessage: err});
    this.setState({[nam]: val});
}

//this.setNetwork();
render() {


   //if(this.isWeb3) {
//        if(this.isWeb3Locked) {
//            return (
//
//            )
//        } else {
        return (
            <form onSubmit={this.mySubmitHandler}>
                <div>
                    <Nav appName={this.appName} network={this.state.network} />
                    <UnlockMetamask message="Unlock Your Metamask/Mist Wallet" />
                </div>
                <center>
                    <img src={logo} className="App-logo" alt="logo" />
                </center>
                <div>
                    <center>
                        <h1 style={mystyle}> Welcome To The Custom Crowdsale </h1>
                        <p> <b>Select The  Amount & Start Contributing! </b></p>
                    </center>
                    <div>
                        <center>
                            <pre style={divstyle}> --------------------------------- DISCLAIMER ----------------------------------
                            <br/>
                            <br/><b>Custom Crowdsale</b> is not protected against <b>Reentry Attacks</b>
                            <br/><b>Custom Crowdsale</b> is protected against <b>UnderFlow/OverFlow Attacks</b>
                            <br/>
                            <br/> ------------------------------------------------------------------------------- </pre>
                         </center>
                    </div>
                </div>
                <div>
                    <center>
                            <p>
                                Exchange Rate: <b> 100 per WETH </b> <br/>
                                Release Time: <b>2 minuntes </b> <br/>
                                Contribution Cap: <b>10 WETH </b> </p>

                            <p>Enter your desired CustomToken Amount:</p>
                            <input type='text' name='amount' onChange={this.myChangeHandler}/>

                            <br/>
                            <br/>
                     </center>
                </div>
                <div>
                  <center>
                        <input type='submit' name='transfer' onClick={this.onLaunchClicked} disabled={this.state.isTransferButtonDisabled}/>
                        {this.state.errormessage}
                    </center>
                </div>
                <center>

                </center>
            </form>
        );
      }
}

export default App;
