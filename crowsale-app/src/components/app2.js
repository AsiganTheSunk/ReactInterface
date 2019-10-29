import React from 'react';
import Web3 from 'web3'

export default class App extends React.Component {
  state = {account: ''}

  async loadBlockChain() {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
    const network = await web3.eth.net.getNetworkType();
    console.log(network) // should give you main if you're connected to the main network via metamask...
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})
  }
  componentDidMount() {
    this.loadBlockChain()
  }
  render() {
    return (
      <div>
        <p>Check out the the console....</p>
        <p>Your account: {this.state.account}</p>
      </div>
    );
  }
}