import {
  outfitOptions,
  poseOptions,
  expressionOptions,
  backgroundOptions,
} from "./furinaOptions";

const getOptionPrice = (options, value) => {
  return options.find((option) => option.value === value)?.price || 0;
};

export const calculateTotalPrice = (furina) => {
  const outfitPrice = getOptionPrice(outfitOptions, furina.outfit);
  const posePrice = getOptionPrice(poseOptions, furina.pose);
  const backgroundPrice = getOptionPrice(backgroundOptions, furina.background);

  const expressionPrice =
    furina.expression === "fixed"
      ? 0
      : getOptionPrice(expressionOptions, furina.expression);

  return outfitPrice + posePrice + expressionPrice + backgroundPrice;
};
