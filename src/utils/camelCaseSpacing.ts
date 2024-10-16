export const camelCaseSpacing = (camelCaseStr: string): string => {
  return (
    camelCaseStr
      // Add a space before each uppercase letter, then convert to uppercase
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Insert space before capital letters
      .replace(/^./, (match) => match.toUpperCase())
  );
};
