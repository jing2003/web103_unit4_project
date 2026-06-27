import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FurinaForm from "../components/FurinaForm";
import { getFurina, updateFurina } from "../services/FurinasAPI";
import usePageTitle from "../utilities/usePageTitle";

const EditFurina = ({ title }) => {
  usePageTitle(title);

  const { id } = useParams();
  const navigate = useNavigate();

  const [furina, setFurina] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFurina = async () => {
      try {
        const data = await getFurina(id);
        setFurina(data);
      } catch (error) {
        console.error("Failed to fetch Furina:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFurina();
  }, [id]);

  const handleUpdate = async (updatedFurina) => {
    try {
      await updateFurina(id, updatedFurina);
      navigate(`/furinas/${id}`);
    } catch (error) {
      console.error("Failed to update Furina:", error.message);
      alert(error.message);
    }
  };

  if (loading) {
    return <p>Loading Furina editor...</p>;
  }

  if (!furina) {
    return <p>Furina design not found.</p>;
  }

  return (
    <FurinaForm
      initialData={furina}
      onSubmit={handleUpdate}
      submitLabel="Update Furina"
    />
  );
};

export default EditFurina;
