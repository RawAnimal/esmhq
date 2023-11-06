const getTel = (str: string) => {
  const onlyNumbers = str.replace(/\D/g, '');
  return `tel:${onlyNumbers}`;
};

export default getTel;
