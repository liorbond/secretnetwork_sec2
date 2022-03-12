import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

const calcContractAddress = "0x5C4829F9720A85f12b656e2e335835669DD709B9";
const calcContractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"int256","name":"q","type":"int256"},{"indexed":false,"internalType":"uint256","name":"r","type":"uint256"}],"name":"onDuoResult","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"int256","name":"result","type":"int256"}],"name":"onSingleResult","type":"event"},{"inputs":[{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"}],"name":"Add","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"}],"name":"Div","outputs":[{"internalType":"int256","name":"","type":"int256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"}],"name":"Mul","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"}],"name":"Sub","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getOperationCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

function App() {
  const [x, setX] = useState('');
  const [y, setY] = useState('');

  const getContract = () => {
     try{
        if(window) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const calcContract = new ethers.Contract(calcContractAddress, calcContractABI, signer);

            return calcContract;
        } else {
            return {};
        }
      }
      catch {
        return {};
      }
  }

  const addHandler = async () => {
    let contract = getContract();
    if(contract === {}) {
        document.getElementById('Answer').innerHTML = "No contract";
        return {};
    }
    try{
        let contractTransaction = await contract.Add(x,y);
        document.getElementById('Answer').innerHTML = "Calculating...";
        contract.on("onSingleResult", (result) => {document.getElementById('Answer').innerHTML = result; })
        await contractTransaction.wait();
    } catch {
     document.getElementById('Answer').innerHTML = "Function error...";
     return {};
    }

  }

  const subHandler = async () => {
      let contract = getContract();
      if(contract === {}) {
          document.getElementById('Answer').innerHTML = "No contract";
          return {};
      }
      try{
          let contractTransaction = await contract.Sub(x,y);
          document.getElementById('Answer').innerHTML = "Calculating...";
          contract.on("onSingleResult", (result) => {document.getElementById('Answer').innerHTML = result; })
          await contractTransaction.wait();
      } catch {
       document.getElementById('Answer').innerHTML = "Function error...";
       return {};
      }

  }
  const mulHandler = async () => {
        let contract = getContract();
        if(contract === {}) {
            document.getElementById('Answer').innerHTML = "No contract";
            return {};
        }
        try{
            let contractTransaction = await contract.Mul(x,y);
            document.getElementById('Answer').innerHTML = "Calculating...";
            contract.on("onSingleResult", (result) => {document.getElementById('Answer').innerHTML = result; })
            await contractTransaction.wait();
        } catch {
         document.getElementById('Answer').innerHTML = "Function error...";
         return {};
        }

  }
  const divHandler = async () => {
          let contract = getContract();
          if(contract === {}) {
              document.getElementById('Answer').innerHTML = "No contract";
              return {};
          }
          try{
              let contractTransaction = await contract.Div(x,y);
              document.getElementById('Answer').innerHTML = "Calculating...";

              contract.on("onDuoResult", (q, r) => {
                let output = '';
                if(r === '0') {
                    output = '' + q;
                } else {
                    output = '' + q + ' ' + r + '/' + y;
                }
                document.getElementById('Answer').innerHTML = output;
              });
              await contractTransaction.wait();
          } catch {
           document.getElementById('Answer').innerHTML = "Function error...";
           return {};
          }
  }

  const addButton = () => {
    return (
      <button onClick={addHandler} className='op-button add-button'>
        Add
      </button>
    )
  }

  const subButton = () => {
    return (
      <button onClick={subHandler} className='op-button sub-button'>
        Sub
      </button>
    )
  }

  const mulButton = () => {
    return (
      <button onClick={mulHandler} className='op-button mul-button'>
        Mul
      </button>
    )
  }

  const divButton = () => {
    return (
      <button onClick={divHandler} className='op-button div-button'>
        Div
      </button>
    )
  }

  useEffect(() => {
  }, [])

  return (
    <div className='main-app'>
      <h1>Calc</h1>
      <div>
        <label for="First"> First Number: </label>
        <input type="number" id="First" name="First" onChange={event => setX(event.target.value)} />
        <label for="Second"> Second Number: </label>
        <input type="number" id="Second" name="Second" onChange={event => setY(event.target.value)} />
      </div>
      <div>
        {addButton()}
        {subButton()}
        {mulButton()}
        {divButton()}
      </div>
      <div>
        <label id="Answer"> 0 </label>
      </div>
    </div>
  )
}

export default App;
