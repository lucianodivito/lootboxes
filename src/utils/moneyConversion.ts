const creditsToDollars = (credits: number): string => {
  return (credits / 10).toFixed(2);
};

const dollarsToCredits = (dollars: number): string => {
  return (dollars * 10).toFixed(2);
};

export {creditsToDollars, dollarsToCredits};
