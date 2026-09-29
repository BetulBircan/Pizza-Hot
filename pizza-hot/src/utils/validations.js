export const isEmail = (value) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(value);
}

export const isPhone = (value) => {
  var re =  /^5\d{9}$/;
  return re.test(value);
}

export function hasMinLength(value, minLength) {
    return value.length >= minLength;
}


export const isNotEmpty = (value) => {
    return value.trim() !== "";
}