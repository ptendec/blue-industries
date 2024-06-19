import { SmileBad } from "../components/SvgIcons/smile-bad";
import { SmileGood } from "../components/SvgIcons/smile-good";
import { SmileMedium } from "../components/SvgIcons/smile-medium";

export const valueToEmoji = (value: number): JSX.Element | string => {
  if (value === 3) return <SmileGood />
  else if (value === 2) return <SmileMedium />
  else if (value === 1) return <SmileBad />

  return "";
};
