export const formatCurrency = (
  value: number,
  currencySymbol: string = "$",
  decimalPlaces: number = 2
): string => {
  // Ensure the value is a number
  const amount = Number(value);
  if (isNaN(amount)) {
    throw new Error("Invalid number value");
  }

  // Format the number with commas and specified decimal places
  const formattedValue = amount.toLocaleString("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

  return `${currencySymbol}${formattedValue}`;
};
