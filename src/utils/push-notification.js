const PushNotification = require('react-native-push-notification')

export function setupPushNotification(handleNotification) {

    PushNotification.configure({
        onNotification: function (notification) {
            if (notification.foreground) {
                handleNotification(notification)
            }
        },
        permissions: {
            alert: true,
            badge: true,
            sound: true,

        },

        popInitialNotification: true,
        requestPermissions: true,

    });

    return PushNotification
}
