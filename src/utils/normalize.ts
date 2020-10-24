export const normalize = (string: string): string => {
  return string.replace(/ /g, '-').toLowerCase();
};
