import { useNavigate } from "react-router-dom";
import FurinaForm from "../components/FurinaForm";
import { createFurina } from "../services/FurinasAPI";
import usePageTitle from "../utilities/usePageTitle";

const CreateFurina = ({ title }) => {
  usePageTitle(title);

  const navigate = useNavigate();

  const handleCreate = async (furina) => {
    try {
      await createFurina(furina);
      navigate("/");
    } catch (error) {
      console.error("Failed to create Furina:", error.message);
      alert(error.message);
    }
  };

  return <FurinaForm onSubmit={handleCreate} submitLabel="Save Furina" />;
};

export default CreateFurina;
