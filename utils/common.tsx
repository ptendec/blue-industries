import { SmileBad } from "../components/SvgIcons/smile-bad";
import { SmileGood } from "../components/SvgIcons/smile-good";
import { SmileMedium } from "../components/SvgIcons/smile-medium";

export const valueToEmoji = (value: number | string): JSX.Element | string => {
  const val = Number(value);
  if (val > 2.25 && val <= 3) return <SmileGood />;
  else if (val > 1.75 && val <= 2.25) return <SmileMedium />;
  else if (val <= 1.75) return <SmileBad />;

  return "";
};
