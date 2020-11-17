import { eventsService } from '../eventsService';
import { icon } from '../../assets/images';

class NotificationsService {
  static notify = async ({ title, notification, callback, tag }: { title: string; notification: string; callback?: () => void; tag?: number }) => {
    const permission = await Notification.requestPermission();
    const isAppMinimized = await eventsService.isAppMinimized();
    if (permission === 'granted' && isAppMinimized) {
      const notificationOptions = {
        body: notification,
        icon,
        tag: `message-group-${tag || 0}`
      };
      const desktopNotification = new Notification(title || 'Alert', notificationOptions);
      desktopNotification.onclick = () => {
        eventsService.notificationWasClicked();
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        callback && callback();
      };
    }
  };
}

export default NotificationsService;