export const valueToEmoji = (value: number): string => {
  if (value === 3) return "🙂";
  else if (value === 2) return "😐";
  else if (value === 1) return "😡";

  return "";
};
