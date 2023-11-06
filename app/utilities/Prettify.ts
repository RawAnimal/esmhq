const prettify = (str: string) => {
  str = str.toLowerCase().replace(/_/g, ' ');

  return (str = str.replace(/\b\w/g, function (match) {
    return match.toUpperCase();
  }));
};
export default prettify;
