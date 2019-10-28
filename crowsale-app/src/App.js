import React from 'react';
//import logo from './logo.svg';
import './App.css';
import logo from './ETH-Icon.png'

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onLaunchClicked = this.onLaunchClicked.bind(this);
    this.state = { amount: null, isTransferButtonDisabled: false, };
  }

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

  render() {
    const hposition = {
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)'
    };

    const mystyle = {
      color: "black",
      backgroundColor: "lightblue",
      padding: "10px",
      fontFamily: "Arial",
      width: 800,
      textAlign: 'center'
    };

    const headline = {
        textAlign: 'center', // <-- the magic
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
        width: 100,
    };

    const divstyle = {

        backgroundColor: 'lightgrey',
        width: 640,
        padding: 10,
    }

    const headerStyle = {
        textAlign: 'center',
    }
    return (
        <form onSubmit={this.mySubmitHandler}>
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
