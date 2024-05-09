import { Button } from "@material-ui/core";
import styles from "./Tarifa.module.css";
import  PdfTarifa  from "../PdfTarifa/PdfTarifa";

export default function Tarifa() {
  return (
    <>
    <div className={styles.contact_container}>
      <div className={styles.logo}>
        <img src="" alt="" />
      </div>
      <div className={styles.text_contact}>
        <h1>
        PRECIOS 2024
        </h1>
        <h2>Precios exclusivos para profesionales del sector de las Artes Gráficas y la personalización en España, Portugal y a nivel Europeo.</h2>
      </div>
    
      <div className={styles.btn_container}>
        <PdfTarifa/>
     
      </div>

 
    </div>
    
    </>

  );
}
