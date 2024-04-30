import { Button } from "@material-ui/core";
import styles from "./ContactUs.module.css";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactUs() {
  return (
    <>
    <div className={styles.contact_container}>
      <div className={styles.logo}>
        <img src="" alt="" />
      </div>
      <div className={styles.text_contact}>
        <h1>
          Si deseas obtener más información sobre nosotros o ponerte en contacto
          con nosotros, puedes hacerlo a través de WhatsApp.
        </h1>
      </div>
      {/*  <div className={styles.text_method_payment}>
        <h1>METODOS DE PAGO</h1>
        <h2>
          Para PayPal te dirige solo al enlace, para bizum y cuenta bancaria
          póngase en contacto a través de WhatsApp gracias.
        </h2>
      </div>
      <div className={styles.payment}>
        <div className={styles.logo_payment}>
          <a
            href="https://www.paypal.com/paypalme/VipMonNoal"
            target="__blanck"
          >
               <img src=""alt="" />

          </a>
        </div>
        <div className={styles.logo_payment}>
        <img src=""alt="" />

          <label>+34 670 862 817</label>
        </div>

        <div className={styles.logo_payment}>
        <img src=""alt="" />

          <label>ES3821030157090010025387</label>
        </div>
      </div>
      <div className={styles.text_method_payment}>
        <h1>METODO DE ENVÍO</h1>
      </div>
      <div className={styles.payment}>
        <div className={styles.logo_payment}>
        <img src=""alt="" />

          <label>
            El precio del envío varía según el peso. Hasta un kilo, el precio es
            el mismo. Se pueden incluir hasta 5 prendas por el mismo valor de
            envío.
          </label>
        </div>
      </div> */}
      <div className={styles.btn_container}>
        <Button
          variant="contained"
   className={styles.btn_contact}
   href="https://wa.me/+34617166097"
   target="_blanck"
        >
          <FaWhatsapp className={styles.icons} /> Contactanos
        </Button>
      </div>
    </div>
    </>

  );
}
