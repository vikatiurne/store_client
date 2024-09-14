const options = {
  day: "numeric",
  month: "numeric",
  year: "numeric",
};

export function getDate(str) {
  const date = new Date(str);
  return date.toLocaleString("ru", options);
}

export default class DateServices {
  static getDate(str) {
    const date = new Date(str);
    return date.toLocaleString("ru", options);
  }
  static getUpdate(updateTime) {
    const currentDate = new Date();
    const tooday = currentDate.toISOString();

    const update = Date.parse(updateTime);
    const current = Date.parse(tooday);

    const timestamp = current - update;
    const deffTime = timestamp < 86400000;

    let message;
    if (deffTime) {
      const mins = Math.round(timestamp / 60000);
      const hours = Math.round(mins / 60);

      let ending = "";
      const end2 = [2, 3, 4];
      const lastDigit = hours % 10;

      if (hours === 1 || mins === 1) ending = "у";
      if (end2.includes(lastDigit)) ending = "и";
      hours < 1
        ? (message = `оновлено ${mins} хвилин${ending} тому`)
        : (message = `оновлено ${hours} годин${ending} тому`);
    } else {
      const updateDate = new Date(updateTime);
      message = `оновлено ${updateDate.toLocaleString("ru", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      })} `;
    }

    return message;
  }

  static getMaxData(period) {
    const date = new Date();
    const milisec = date.setDate(date.getDate() + period);
    const maxDate = new Date(milisec);
    return maxDate.toISOString().split("T")[0];
  }

  static transformDate(date) {
    const trDate = date.split("T")[0];
    return trDate.split("-").reverse().join("/");
  }
}
