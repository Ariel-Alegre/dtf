import { BsWhatsapp } from 'react-icons/bs';
import styles from './ButtonWhatsapp.module.css'


export default function ButtonWhatsapp() {
    return (
        <div>


		<a href="https://wa.me/+34670862817" className={styles.whatsapp} target="__blank"> <i className={styles.icon_whatsapp}><BsWhatsapp/></i></a>
	</div>
    )
}