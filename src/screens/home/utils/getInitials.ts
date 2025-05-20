export const getInitials = (name: string, lastName: string) => {
  const firstInitial = name?.trim()?.[0]?.toUpperCase() || '';
  const lastInitial = lastName?.trim()?.[0]?.toUpperCase() || '';
  return `${firstInitial}${lastInitial}`;
};
