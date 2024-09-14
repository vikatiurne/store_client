import styles from '../components/ControlPanel/ControlPanel.module.css';

const statusName = ['нове', 'в роботі', 'готове', 'виконане'];
const statusClassName = [
  styles.orderStatusNew,
  styles.orderStatusWork,
  styles.orderStatusReady,
  styles.orderStatusDone,
];
export default class OrderStatusServices {
  static getStatusName(status) {
    return statusName[status];
  }
  static getClassName(status) {
    return statusClassName[status];
  }
}
