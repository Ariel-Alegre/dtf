import * as React from "react";

import Button from "@mui/material/Button";

import ReactDOMServer from "react-dom/server";
import html2pdf from "html2pdf.js";
import styles from "./PdfTarifa.module.css";

export default function PdfTarifa() {
  const [loading, setLoading] = React.useState(false);

  const pdfContent = (
    <div className={styles.contact_container}>
     
      <div className={styles.text_contact}>
        <h1>TARIFA DE PRECIOS A PROFESIONALES 2024</h1>
        <div className={styles.border_bottom}></div>
        <h2>
        PRECIO POR METRO DE TEXTIL
        </h2>
        <div className={styles.border_bottom2}></div>
         <p> Por metro= 13.95€ + iva</p>
         <br />
      <div>

        <h2>
        PRECIO POR CAMISETA
        </h2>
        <div className={styles.border_bottom2}></div>
        <p> Diseño de camiseta delantera o trasera= 18.90€ + iva</p>

         <p> Diseño de camiseta delantera y trasera= 37.80€ + iva</p>
      </div>
      <br />
      <br />
        
      </div>

      
    </div>
  );

  const generatePdf = async (e) => {
    e.preventDefault();

    setLoading(true);

    const contentDiv = document.createElement("div");
    contentDiv.id = "pdfContent";
    contentDiv.innerHTML = ReactDOMServer.renderToString(pdfContent);

    try {
      const pdfOutput = await html2pdf(contentDiv, {
        margin: 10,
        filename: "formulario.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a3", orientation: "portrait" },
      });

      pdfOutput.save("formulario.pdf");
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={generatePdf} disabled={loading} sx={{background: "#000", ":hover": {background: "#000"}}}>
        Ver tarifas de precios
      </Button>
    </>
  );
}
