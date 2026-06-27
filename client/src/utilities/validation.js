import {
  outfitOptions,
  poseOptions,
  expressionOptions,
  backgroundOptions,
} from "./furinaOptions";

const getValues = (options) => options.map((option) => option.value);

export const isSpecialPose = (pose) => {
  return pose === "playing" || pose === "eating";
};

export const validateFurina = (furina) => {
  if (!furina.name.trim()) {
    return "Please give your custom Furina a name.";
  }

  if (!getValues(outfitOptions).includes(furina.outfit)) {
    return "Please select a valid outfit.";
  }

  if (!getValues(poseOptions).includes(furina.pose)) {
    return "Please select a valid pose.";
  }

  if (!getValues(backgroundOptions).includes(furina.background)) {
    return "Please select a valid background.";
  }

  if (isSpecialPose(furina.pose) && furina.expression !== "fixed") {
    return "Playing and eating poses use fixed expressions and cannot use custom expressions.";
  }

  if (!isSpecialPose(furina.pose)) {
    const validExpressions = getValues(expressionOptions);

    if (!validExpressions.includes(furina.expression)) {
      return "Please select a valid expression.";
    }
  }

  return null;
};
