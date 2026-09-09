import { useEffect, useState } from "react";

export type Permission = 'default' | 'denied' | 'granted';

const useNotification = () => {
    const [permission, setPermission] = useState<Permission>(Notification.permission);

    useEffect(() => {
        if ('Notification' in window) {
            setPermission(Notification.permission);
        }
    }, []);

    const requestPermission = async () => {
        if (!('Notification' in window)) {
            console.error('This browser does not support notifications.');
            return;
        }

        // Ask the user for permission
        const result = await Notification.requestPermission();
        setPermission(result);
    };

    const fireNotification = (title: string, body: string) => {
        if (permission !== 'granted') {
            console.warn('Notification permission not granted.');
            return;
        }

        new Notification(title, {
            icon: '/your-app-icon.png',
            body
        });
    }

    return { permission, fireNotification, requestPermission };

};
export default useNotification;
