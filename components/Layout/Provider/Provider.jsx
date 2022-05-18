import styles from './Provider.module.scss'
import { useMoralis } from 'react-moralis'

const Provider = ({setSignInModal}) => {
  const { authenticate } = useMoralis()

  const sign_in_walletconnect = async() => {
    await authenticate({
      provider: 'walletconnect',
      signingMessage: 'Sign in using WalletConnect.',
      chainId: 1
    })

    setSignInModal(false)
  }
  
  const sign_in_metamask = async() => {
    await authenticate({
      signingMessage: 'Sign in using Metamask.',
      chainId: 1
    })
    setSignInModal(false)
  }

  return (
    <div className={styles.provider}>
      <p className={styles.header}>Select Provider</p>
      <p className={styles.sub_header}>Choose the WalletConnect or Metamask provider to continue.</p>

      <div className={`${styles.option} ${styles.walletconnect}`} onClick={sign_in_walletconnect}>
        <p>Wallet Connect</p>
        <img src={`/svg/walletconnect.svg?${new Date()}`} />
      </div>

      <div className={`${styles.option} ${styles.metamask}`} onClick={sign_in_metamask}>
        <p>MetaMask</p>
        <img src={`/svg/metamask.svg?${new Date()}`} />
      </div>

      <button onClick={() => setSignInModal(false)}>
        <i className='far fa-times-circle'></i>                
        Dismiss Action
      </button>
    </div>
  )
}

export default Provider