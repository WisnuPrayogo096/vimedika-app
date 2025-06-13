export const capitalizeFirstLetter = (word: string) =>{
    return word.charAt(0).toUpperCase() + word.slice(1);
};

export const formatPhoneNumber = (phone: string) =>{
    return phone.replace(/(\d{4})(\d{4})(\d{4})/, "$1-$2-$3");
}