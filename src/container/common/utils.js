import moment from "moment";

export const validateValue = (str, type) => {
  switch (type) {
    case "email":
      var re = /\S+@\S+\.\S+/;
      return re.test(str);
    default:
      return str !== "";
  }
};
export const resizeImage = (base64Str, maxWidth = 1024, maxHeight = 1024) => {
  return new Promise((resolve) => {
    let img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let canvas = document.createElement("canvas");
      const MAX_WIDTH = maxWidth;
      const MAX_HEIGHT = maxHeight;
      let width = img.width;
      let height = img.height;
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL());
    };
  });
};
export const randomArray = (length, max) =>
  [...new Array(length)].map(() => Math.round(Math.random() * max));

export const convertTime = (time) => {
  let now = new Date().getTime();
  let ctime = new Date(time).getTime();
  var minutes = 1000 * 60;
  let difTime = now - ctime;
  debugger;
  if (difTime <= minutes * 30) {
    debugger;
    return `${moment(time).fromNow()}`;
  } else if (difTime > minutes * 30 && difTime < minutes * 60 * 24) {
    return `${moment(time).format("LT")}`;
  } else {
    return `${moment(time).format("LL")}`;
  }
};
