import { isSpecialPose } from "./validation";

const furinaModules = import.meta.glob(
  "../assets/furina/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  },
);

const backgroundModules = import.meta.glob(
  "../assets/backgrounds/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  },
);

const buildImageMap = (modules) => {
  const imageMap = {};

  Object.entries(modules).forEach(([path, src]) => {
    const filename = path
      .split("/")
      .pop()
      .replace(/\.(png|jpg|jpeg|webp)$/i, "");

    imageMap[filename] = src;
  });

  return imageMap;
};

const furinaImages = buildImageMap(furinaModules);
const backgroundImages = buildImageMap(backgroundModules);

export const getFurinaImage = (outfit, pose, expression) => {
  const imageKey = isSpecialPose(pose)
    ? `${outfit}-${pose}`
    : `${outfit}-${pose}-${expression}`;

  return furinaImages[imageKey];
};

export const getBackgroundImage = (background) => {
  return backgroundImages[background];
};
