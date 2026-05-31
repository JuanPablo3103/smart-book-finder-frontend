import { useState } from "react";

const API_URL = "http://localhost:8080/api/books";

function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [language, setLanguage] = useState("");
  const [publishedAfter, setPublishedAfter] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setError("");
    setBooks([]);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title || null,
          author: author || null,
          language: language || null,
          publishedAfter: publishedAfter ? parseInt(publishedAfter) : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error en la búsqueda.");
      } else {
        setBooks(data);
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px", fontFamily: "Arial, sans-serif" }}>
      <h1>📚 Smart Book Finder</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
        <input
          data-testid="input-title"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "8px", fontSize: "16px" }}
        />
        <input
          data-testid="input-author"
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ padding: "8px", fontSize: "16px" }}
        />
        <select
          data-testid="input-language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ padding: "8px", fontSize: "16px" }}
        >
          <option value="">Idioma (opcional)</option>
          <option value="eng">Inglés</option>
          <option value="spa">Español</option>
          <option value="por">Portugués</option>
          <option value="fre">Francés</option>
          <option value="ger">Alemán</option>
        </select>
        <input
          data-testid="input-published-after"
          placeholder="Publicado después de (año)"
          value={publishedAfter}
          onChange={(e) => setPublishedAfter(e.target.value)}
          type="number"
          style={{ padding: "8px", fontSize: "16px" }}
        />
        <button
          data-testid="btn-search"
          onClick={handleSearch}
          disabled={loading}
          style={{ padding: "10px", fontSize: "16px", cursor: "pointer", backgroundColor: "#4CAF50", color: "white", border: "none" }}
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {error && (
        <div data-testid="error-message" style={{ color: "red", marginBottom: "20px" }}>
          ⚠️ {error}
        </div>
      )}

      {books.length > 0 && (
        <div data-testid="results-container">
          {books.map((book, index) => (
            <div key={index} style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "10px", display: "flex", gap: "15px" }}>
              {book.coverUrl && (
                <img src={book.coverUrl} alt={book.title} style={{ width: "60px", height: "90px", objectFit: "cover" }} />
              )}
              <div>
                <h3 style={{ margin: "0 0 5px 0" }}>{book.title}</h3>
                <p style={{ margin: "2px 0" }}>✍️ {book.author}</p>
                <p style={{ margin: "2px 0" }}>📅 {book.firstPublishYear}</p>
                <p style={{ margin: "2px 0" }}>📖 {book.editionCount} ediciones</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;