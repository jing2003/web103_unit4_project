import { useState } from "react";
import FurinaPreview from "./FurinaPreview";
import {
  outfitOptions,
  poseOptions,
  expressionOptions,
  backgroundOptions,
} from "../utilities/furinaOptions";
import { calculateTotalPrice } from "../utilities/calcPrice";
import { isSpecialPose, validateFurina } from "../utilities/validation";

const FurinaForm = ({ initialData, onSubmit, submitLabel }) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      outfit: "ousia",
      pose: "standing",
      expression: "default",
      background: "morning",
    },
  );

  const [error, setError] = useState("");

  const specialPoseSelected = isSpecialPose(formData.pose);
  const totalPrice = calculateTotalPrice(formData);

  const handleChange = (event) => {
    const { name, value } = event.target;

    const updatedData = {
      ...formData,
      [name]: value,
    };

    if (name === "pose") {
      if (isSpecialPose(value)) {
        updatedData.expression = "fixed";
      } else if (formData.expression === "fixed") {
        updatedData.expression = "default";
      }
    }

    setFormData(updatedData);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const furinaToSave = {
      ...formData,
      expression: isSpecialPose(formData.pose) ? "fixed" : formData.expression,
      total_price: totalPrice,
    };

    const validationError = validateFurina(furinaToSave);

    if (validationError) {
      setError(validationError);
      return;
    }

    onSubmit(furinaToSave);
  };

  return (
    <main className="form-page">
      <form className="custom-form" onSubmit={handleSubmit}>
        <h2>Customize Furina</h2>

        {error && <p className="error-message">{error}</p>}

        <label className="full-row">
          Design Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Morning Ousia Furina"
          />
        </label>

        <div className="form-options-grid">
          <label>
            Outfit Alignment
            <select
              name="outfit"
              value={formData.outfit}
              onChange={handleChange}
            >
              {outfitOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} (+${option.price})
                </option>
              ))}
            </select>
          </label>

          <label>
            Background
            <select
              name="background"
              value={formData.background}
              onChange={handleChange}
            >
              {backgroundOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} (+${option.price})
                </option>
              ))}
            </select>
          </label>

          <label>
            Pose
            <select name="pose" value={formData.pose} onChange={handleChange}>
              {poseOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} (+${option.price})
                </option>
              ))}
            </select>
          </label>

          <label>
            Expression
            <select
              name="expression"
              value={formData.expression}
              onChange={handleChange}
              disabled={specialPoseSelected}
            >
              {specialPoseSelected ? (
                <option value="fixed">Fixed Expression</option>
              ) : (
                expressionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} (+${option.price})
                  </option>
                ))
              )}
            </select>
          </label>
        </div>

        {specialPoseSelected && (
          <p className="helper-text">
            Playing and eating poses use fixed expressions.
          </p>
        )}

        <div className="form-footer">
          <h2>Total Price: ${totalPrice}</h2>
          <button type="submit">{submitLabel}</button>
        </div>

        {/* <label>
          Design Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Midnight Ousia Furina"
          />
        </label>

        <label>
          Outfit Alignment
          <select name="outfit" value={formData.outfit} onChange={handleChange}>
            {outfitOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} (+${option.price})
              </option>
            ))}
          </select>
        </label>

        <label>
          Pose
          <select name="pose" value={formData.pose} onChange={handleChange}>
            {poseOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} (+${option.price})
              </option>
            ))}
          </select>
        </label>

        <label>
          Expression
          <select
            name="expression"
            value={formData.expression}
            onChange={handleChange}
            disabled={specialPoseSelected}
          >
            {specialPoseSelected ? (
              <option value="fixed">Fixed Expression</option>
            ) : (
              expressionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} (+${option.price})
                </option>
              ))
            )}
          </select>
        </label>

        {specialPoseSelected && (
          <p className="helper-text">
            Playing and eating poses use fixed expressions.
          </p>
        )}

        <label>
          Background
          <select
            name="background"
            value={formData.background}
            onChange={handleChange}
          >
            {backgroundOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} (+${option.price})
              </option>
            ))}
          </select>
        </label>

        <h2>Total Price: ${totalPrice}</h2>

        <button type="submit">{submitLabel}</button> */}
      </form>

      <FurinaPreview
        furina={{
          ...formData,
          expression: specialPoseSelected ? "fixed" : formData.expression,
        }}
      />
    </main>
  );
};

export default FurinaForm;
