import Header from '../components/Index/Header/Header'
import styles from '../components/Index/Index.module.scss'
import Hero from '../components/Index/Sections/Hero/Hero'

export default function Home() {
  return (
    <div className={styles.index}>
      <div className={styles.bg}></div>

      <div className={styles.container}>
        <Header />

        {/* Sections */}
        <Hero />

        {/* <section className={styles.info}>
          <div className={styles.info_left}>
            <h3>ICO Ends In:</h3>

            <div className={styles.timer}>
              <div className={`${styles.circle} days`}>
                <div className={styles.svg_wrapper}>
                  <svg preserveAspectRatio="none">
                    <circle cx="50%" cy="50%" r="48%" />
                  </svg>
                </div>
                <div className={styles.border}></div>
                <span>DAYS</span>
                <p>10</p>
              </div>

              <div className={`${styles.circle} hours`}>
                <div className={styles.svg_wrapper}>
                  <svg preserveAspectRatio="none">
                    <circle cx="50%" cy="50%" r="48%" />
                  </svg>
                </div>
                <div className={styles.border}></div>
                <span>HOURS</span>
                <p>23</p>
              </div>

              <div className={`${styles.circle} minutes`}>
                <div className={styles.svg_wrapper}>
                  <svg preserveAspectRatio="none">
                    <circle cx="50%" cy="50%" r="48%" />
                  </svg>
                </div>
                <div className={styles.border}></div>
                <span>MINUTES</span>
                <p>59</p>
              </div>

              <div className={`${styles.circle} seconds`}>
                <div className={styles.svg_wrapper}>
                  <svg preserveAspectRatio="none">
                    <circle cx="50%" cy="50%" r="48%" />
                  </svg>
                </div>
                <div className={styles.border}></div>
                <span>SECONDS</span>
                <p>0</p>
              </div>
            </div>

            <div className={styles.progress} data-width='0%'><span>0%</span></div>
          </div>

          <div className={styles.info_right}>

          </div>
        </section> */}

      </div>
    </div>
  )
}
