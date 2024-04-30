import styles from './BgViewOferta.module.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'

export default function BgViewOferta() {
    return (
        <div className={styles.bg_view_price}>
            <div  className={styles.centered}>

            <div>
                <h1 className={styles.title}>¡REALIZA TU PROPIO DISEÑO!</h1>
                <h1 className={styles.subTitle}>PUEDES REALIZAR TUS PROPIOS DISEÑOS</h1>

                <h1 className={styles.example}>POR EJEMPLO:</h1>
                <h1 style={{fontWeight: 600}} className={styles.example}>Agregar imagen que desees</h1>
                <h1 style={{marginBottom: '2em'}}className={styles.example}>Agregar cualquier tipo de letras </h1>
                <h1 style={{ marginBottom: '1em'}} className={styles.example}>Cambiar el color de las camisetas</h1>
                
                
            </div>
            <div>
                <Link to= "/herramienta-de-diseño">

                <Button variant="contained" className={styles.btn}>CREA TU PROPIO PRODUCTO</Button>
                </Link>
            </div>
            </div>
        </div>
    );
}
