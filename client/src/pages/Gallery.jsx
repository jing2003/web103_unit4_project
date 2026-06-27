import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FurinaPreview from "../components/FurinaPreview";
import { deleteFurina, getAllFurinas } from "../services/FurinasAPI";

const Gallery = () => {
  const [furinas, setFurinas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFurinas = async () => {
      try {
        const data = await getAllFurinas();
        setFurinas(data);
      } catch (error) {
        console.error("Failed to fetch Furinas:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFurinas();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteFurina(id);
      setFurinas(furinas.filter((furina) => furina.id !== id));
    } catch (error) {
      console.error("Failed to delete Furina:", error.message);
      alert(error.message);
    }
  };

  if (loading) {
    return <p>Loading saved Furina designs...</p>;
  }

  return (
    <main className="gallery-page">
      <section className="page-header">
        <h1>Saved Furina Designs</h1>
        <Link to="/create">
          <button>Create New Furina</button>
        </Link>
      </section>

      {furinas.length === 0 ? (
        <p>No Furina designs saved yet.</p>
      ) : (
        <section className="gallery-grid">
          {furinas.map((furina) => (
            <article key={furina.id} className="gallery-card">
              <FurinaPreview furina={furina} />

              <p>Total Price: ${furina.total_price}</p>

              <div className="card-actions">
                <Link to={`/furinas/${furina.id}`}>
                  <button>View</button>
                </Link>

                <Link to={`/furinas/${furina.id}/edit`}>
                  <button>Edit</button>
                </Link>

                <button onClick={() => handleDelete(furina.id)}>Delete</button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default Gallery;
