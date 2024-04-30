import { Link } from "react-router-dom";
import styles from "./DetailsData.module.css";
import { Image } from "antd";

export default function DetailsData() {
  return (
    <div className={styles.details_container}>
      <div className={styles.details_box}>
        <div>
          <Image.PreviewGroup
            items={[
              "https://dtfbarcelona.es/wp-content/uploads/2022/11/colorful_modern_lettering_logo_plakatstil_printed_in_1ad38bc3-19eb-4d70-901e-21dbde3a6698.png",
              "https://dtfbarcelona.es/wp-content/uploads/2022/11/colorful_realistic_wolf_printed_in_a_t_shirt_with_co_ad925367-f338-4b5b-ad80-24a0c4a2c8c9.png",
              "https://dtfbarcelona.es/wp-content/uploads/2022/11/colorful_modern_lettering_logo_plakatstil_printed_in_d8df96cf-3348-41f5-9fea-c8d277287729.png",
              "https://dtfbarcelona.es/wp-content/uploads/2022/07/imprimir-metros-en-dtf-barcelona.jpg",
            ]}
          >
            <Image
              width={400}
              src="https://dtfbarcelona.es/wp-content/uploads/2022/11/colorful_modern_lettering_logo_plakatstil_printed_in_1ad38bc3-19eb-4d70-901e-21dbde3a6698.png"
            />
          </Image.PreviewGroup>
        </div>
        <div className={styles.ul_li}>
          <div className={styles.title}>
            <strong>
              <h1>DTF impresión por metro</h1>
            </strong>
          </div>

          <ul>
            <strong>
              <li>DTF Impresión por metro a tamaño 55×100 cm</li>
            </strong>
            <strong>
              <li>Film de retirado en caliente de 80 micras</li>
            </strong>
            <strong>
              <li>Poliamida de grano fino blanca</li>
            </strong>
            <strong>
              <li>Impresión a 8 pasadas a 2400×720 ppp</li>
            </strong>
            <strong>
              <li>
                ENVÍO GRATIS A PARTIR DE 150 euros + IVA en servicio 24 horas
              </li>
            </strong>
          </ul>
          <Link to="/impression" target='_blanck'>
            <div className={styles.tools}>
              <strong>
                <h1>
                  Utilizar la herramienta de imposición online de metros
                  cargando png individualmente
                </h1>
              </strong>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
