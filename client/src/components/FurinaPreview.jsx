import { getBackgroundImage, getFurinaImage } from "../utilities/imageHelpers";

const FurinaPreview = ({ furina }) => {
  const backgroundImage = getBackgroundImage(furina.background);
  const furinaImage = getFurinaImage(
    furina.outfit,
    furina.pose,
    furina.expression,
  );

  return (
    <section className="preview-card">
      <div className="preview-scene">
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt={`${furina.background} background`}
            className="preview-background"
          />
        )}

        {furinaImage && (
          <img
            src={furinaImage}
            alt={`Furina ${furina.outfit} ${furina.pose}`}
            className="preview-character"
          />
        )}
      </div>

      <div className="preview-info">
        <h3>{furina.name || "Custom Furina"}</h3>
        <p>Outfit: {furina.outfit}</p>
        <p>Background: {furina.background}</p>
        <p>Pose: {furina.pose}</p>
        <p>Expression: {furina.expression}</p>
      </div>
    </section>
  );
};

export default FurinaPreview;
