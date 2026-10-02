import { useEffect, useState } from "react";

export type Permission = 'default' | 'denied' | 'granted';

const useNotification = () => {
    const [permission, setPermission] = useState<Permission>(Notification.permission);
    const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

    useEffect(() => {
        if ('Notification' in window) {
            setPermission(Notification.permission);
        }
        fetchRegistration();
    }, []);

    const fetchRegistration = async (): Promise<ServiceWorkerRegistration | null> => {
        try {
            if (registration) return registration;

            const readyRegistration = await navigator.serviceWorker.ready;
            setRegistration(readyRegistration);
            return registration;
        } catch (err) {
            console.error('Service worker error');
            return registration;
        }
    };

    const requestPermission = async () => {
        if (!('Notification' in window)) {
            console.error('This browser does not support notifications.');
            return;
        }

        // Ask the user for permission
        const result = await Notification.requestPermission();
        setPermission(result);
    };

    const scheduleNotification = (title: string, body: string, delayInMilliseconds: number) => {
        if (!registration) return null;

        const scheduledOptions = {
            icon: '/your-app-icon.png',
            body,
            showTrigger: new TimestampTrigger(delayInMilliseconds)
        };
        registration.showNotification(title, scheduledOptions);
    };

    const fireNotification = async (title: string, body: string) => {
        if (permission !== 'granted') {
            console.warn('Notification permission not granted.');
            return;
        }

        if ('serviceWorker' in navigator) {
            if (!registration) return null;
            registration.showNotification(title, {
                icon: '/your-app-icon.png',
                body
            });
        } else {
            new Notification(title, {
                icon: '/your-app-icon.png',
                body
            });
        }
    }

    return { permission, registration, fireNotification, requestPermission, scheduleNotification };

};
export default useNotification;
