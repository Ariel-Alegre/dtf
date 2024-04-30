import styles from "./WhyUs.module.css";
import { FcApproval } from "react-icons/fc";
export default function WhyUs() {
  return (
    <div className={styles.container_whyus}>
      <div>
        <h1 className={styles.why}>¿POR QUÉ NOSOTROS?</h1>
      </div>
      <div className={styles.datas}>
        <div className={styles.sub_data}>
          <FcApproval className={styles.icons} />
          <h1 className={styles.why_sub}>MÁXIMA CALIDAD</h1>
          <p>
            En DTFrápido valoramos tu tiempo, por eso trabajamos con FILM para
            retirada en caliente. Además nuestros BLANCOS están garantizados
            (Blanco 500%- 5 capas)
          </p>
        </div>
        <div className={styles.sub_data}>
          <FcApproval className={styles.icons} />
          <h1 className={styles.why_sub}>EL MEJOR PRECIO</h1>
          <p>
            Está feo que lo digamos nosotros, pero tenemos los mejores precios
            del mercado. LLévate 1 metro más GRATIS por cada 5 metros que
            compres. DTOS. A PROFESIONALES.
          </p>
        </div>
        <div className={styles.sub_data}>
          <FcApproval className={styles.icons} />
          <h1 className={styles.why_sub}>SERVICIO EXPRÉS</h1>
          <p>
            Tenemos varias opciones de envío para que tú sólo tengas que
            preocuparte de planchar. Entrega en 24 h. GARANTIZADA. También
            servicio MISMO DÍA*
          </p>
        </div>
        <div className={styles.sub_data}>
          <FcApproval className={styles.icons} />
          <h1 className={styles.why_sub}>ATENCIÓN PERSONAL</h1>

          <p>
            Contamos con un equipo técnico experto que te atenderá personalmente
            si necesitas ayuda con tus archivos o tienes alguna consulta que
            hacernos.
          </p>
        </div>
      </div>
    </div>
  );
}
