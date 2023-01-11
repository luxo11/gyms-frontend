import notificationStyles from "../styles/Notification.module.css"
import { useState } from "react";

const Notification = ({message}) => {
    const [showModal, setShowModal] = useState(true)

    setTimeout(() => {
        setShowModal(false)
    }, 3000);

    return (  
        showModal && (
            <div className={notificationStyles['notification-wrapper']}>
                <div className={notificationStyles['notification']}>
                    <span className={notificationStyles['close-button']} onClick={ () => setShowModal(false)}>Zavrieť</span>
                    <span className={notificationStyles['notification-message']}>{message}</span>
                </div>
            </div>
        )
    );
}
 
export default Notification;