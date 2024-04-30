// Footer.js
import React from 'react';
import styles from './Footer.module.css'; // Archivo CSS para estilos del footer

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <p>&copy; 2024 DTF lowcost. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
