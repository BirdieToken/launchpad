import styles from './Header.module.scss'
import { useState } from 'react'
import Provider from '../../Layout/Provider/Provider'
import { useMoralis } from 'react-moralis'

const Header = () => {
  const { user, isAuthenticated, logout } = useMoralis()

  const [providerMenu, setProviderMenu] = useState(false)

  return (
    <header className={styles.hdr}>
      <nav>
        <div>
          <a href='/'><img src='/images/birdienew1.png' alt='birdie token logo' /></a>
        </div>

        <div>
          <a className={`${styles.button} ${styles.button_white} ${styles.button_hover} ${styles.button_shadow}`} href='https://www.birdietoken.io/wp-content/uploads/2021/10/BTWP.pdf' target='_blank'>Whitepaper</a>

          {isAuthenticated ?
            <button
              onClick={() => logout()}
              className={`${styles.button} ${styles.button_blue} ${styles.button_hover} open_modal`}>
              {user.get('ethAddress').slice(0, 10)}...
            </button>
            :
            <button
              onClick={() => setProviderMenu(!providerMenu)}
              id='btn_connect'
              className={`${styles.button} ${styles.button_blue} ${styles.button_hover} open_modal`}>
              <i id='btn-connect-icon' className='fa-solid fa-plus'></i>
              Connect
            </button>
          }
        </div>
      </nav>

      {providerMenu &&
        <Provider
          setSignInModal={setProviderMenu} />}
    </header>
  )
}

export default Header