export const capitalizeFirstLetter = (word: string) =>{
    return word.charAt(0).toUpperCase() + word.slice(1);
};

export const formatPhoneNumber = (phone: string) =>{
    return phone.replace(/(\d{4})(\d{4})(\d{4})/, "$1-$2-$3");
}

export const formatDate = (dateString: string) => {
  return `${dateString}`;
};

export const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)} JT`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)} RB`;
  }
  return value.toString();
};