import { store } from 'react-notifications-component';

export default function notify(type, message) {
    store.addNotification({
        title: "",
        message: message,
        type: type,
        insert: "top",
        container: "top-left",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 3000,
            onScreen: true,
            pauseOnHover: true
        }
    })
}