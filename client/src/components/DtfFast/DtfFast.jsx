import styles from './DtfFast.module.css'

export default function DtfFast() {
    return (
        <div className={styles.DtfFast_container}>
        <div>
            <p>
            <h1 className={styles.info}>
            LOS MEJORES 
            </h1>

            </p>
            <p>
            <h1 className={styles.info}>
            PRECIOS PARA
            </h1>

            </p>
            <h1 className={styles.info}>
                 <strong>PROFESIONALES</strong>
            </h1>
        </div>
        <div>
            <img src="https://i0.wp.com/evolutiondigital.es/wp-content/uploads/2021/01/Heat-Transfer-System-OR-760HT.png?resize=1024%2C683&ssl=1" alt="" className={styles.img_dtf} />
        </div>
        </div>
    )
}