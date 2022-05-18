import styles from './Hero.module.scss'
import { useState } from 'react'
import { useMoralis } from 'react-moralis'
import Provider from '../../../Layout/Provider/Provider'
import Web3 from 'web3'
import WalletConnectProvider from "@walletconnect/web3-provider";

const Hero = () => {
  const { user, isAuthenticated, enableWeb3 } = useMoralis()

  const [providerMenu, setProviderMenu] = useState(false)
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(0)

  const from_on_change = (value) => {
    setFrom(value)

    setTo(Number(value / 0.00000001).toFixed(8).replace(/\.?0+$/, ""))
  }

  const to_on_change = (value) => {
    setTo(value)

    setFrom(Number(value * 0.00000001).toFixed(8).replace(/\.?0+$/, ""))
    console.log(Number(value * 0.00000001).toFixed(8).replace(/\.?0+$/, ""))
  }

  const purchase_tokens_on_click = async () => {
    let web3
    const abi = '[{"inputs":[{"internalType":"address","name":"_birdie","type":"address"},{"internalType":"address","name":"_wallet","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"purchaseTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawFunds","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
   
    if (localStorage.walletconnect) {
      await enableWeb3({
        provider: 'walletconnect',
        chainId: 1
      })
  
      let provider = new WalletConnectProvider({
        rpc: {
          1: 'https://speedy-nodes-nyc.moralis.io/0ce2a68b03c70533ec3210d3/eth/mainnet',
          // 4: 'https://rpc.ankr.com/eth_rinkeby'
        }
      })

      await provider.enable();

      web3 = new Web3(provider)
    } else {
      await enableWeb3({
        provider: 'metamask',
        chainId: 1
      })
      web3 = new Web3(window.ethereum)
    }

    let contract = new web3.eth.Contract(JSON.parse(abi), process.env.NEXT_PUBLIC_PRESALE_ADDRESS)
    let trans = await contract.methods.purchaseTokens(String(to * (10 ** 18))).send({ from: user?.get('ethAddress'), value: web3.utils.toWei(String(from), 'ether') })
    console.log(trans)
  }

  return (
    <section className={styles.hero}>
      <div className={styles.hero_left}>
        <h1 className={`${styles.poppins} ${styles.blue}`}>
          GOLF AND CRYPTO <span className={`${styles.poppins} ${styles.green}`}>COME TOGETHER</span>
        </h1>

        <div className={styles.form}>
          <div>
            <input
              id='input-ETH'
              className={styles.poppins}
              type={'number'}
              placeholder={'ETH'}
              value={from}
              onChange={e => from_on_change(e.target.value)} />
            <img src='/images/ethwhite.png' alt='' />
          </div>

          <i className='fa-solid fa-exchange-alt'></i>

          <div>
            <input
              id='input-birdie'
              className={styles.poppins}
              type={'number'}
              placeholder={'BIRDIE'}
              value={to}
              onChange={e => to_on_change(e.target.value)} />
            <img src='/images/favicon.png' alt='' />
          </div>

          {isAuthenticated ?
            <button id="btn-buy" className={styles.poppins} onClick={() => purchase_tokens_on_click()}>
              Buy
            </button>
            :
            <button id="btn-connect1" className={`${styles.poppins} open-modal`} onClick={() => setProviderMenu(!providerMenu)}>
              Connect
            </button>
          }
        </div>

        <p>
          In case you encounter any technical issues make sure to join any
          of our Social Media Platforms and the team would be more than
          happy to assist you.
        </p>
      </div>

      <div className={styles.hero_right}>
        <img src='/images/hero.png' alt='' />
      </div>


      {providerMenu &&
        <Provider
          setSignInModal={setProviderMenu} />}
    </section>
  )
}

export default Hero