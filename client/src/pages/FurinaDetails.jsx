import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FurinaPreview from "../components/FurinaPreview";
import { deleteFurina, getFurina } from "../services/FurinasAPI";
import usePageTitle from "../utilities/usePageTitle";

const FurinaDetails = ({ title }) => {
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

  const handleDelete = async () => {
    try {
      await deleteFurina(id);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete Furina:", error.message);
      alert(error.message);
    }
  };

  if (loading) {
    return <p>Loading Furina design...</p>;
  }

  if (!furina) {
    return <p>Furina design not found.</p>;
  }

  return (
    <main className="details-page">
      <FurinaPreview furina={furina} />

      <section className="details-info">
        <h1>{furina.name}</h1>
        <p>Outfit: {furina.outfit}</p>
        <p>Pose: {furina.pose}</p>
        <p>Expression: {furina.expression}</p>
        <p>Background: {furina.background}</p>
        <p>Total Price: ${furina.total_price}</p>
      </section>

      <div className="details-actions">
        <Link to="/">
          <button>Back</button>
        </Link>

        <Link to={`/furinas/${furina.id}/edit`}>
          <button>Edit</button>
        </Link>

        <button onClick={handleDelete}>Delete</button>
      </div>
    </main>
  );
};

export default FurinaDetails;
