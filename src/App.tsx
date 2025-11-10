import axios from "axios";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import logoGitHub from "../src/assets/logo-github.png";
import lupa from "../src/assets/lupa.png";

type GITHUBResponse = {
  name: string;
  bio: string;
  avatar_url: string;
};

function App() {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showContent, setShowContent] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!search.trim()) return;

    setLoading(true);
    setError("");
    setShowContent(true);

    try {
      const res = await axios.get<GITHUBResponse>(
        `https://api.github.com/users/${search}`
      );

      setName(res.data.name || "Usuário sem nome público");
      setBio(res.data.bio || "Sem biografia disponível");
      setAvatarURL(res.data.avatar_url);
    } catch (err) {
      setError("Nenhum perfil foi encontrado com esse nome de usuário.\n Tente novamente!");
      setName("");
      setBio("");
      setAvatarURL("");
    } finally {
      setLoading(false);
      setSearch(""); // limpa o input depois de pesquisar
    }
  };

  return (
    <div className="container-app">
      <div className="container">
        <main>
          <div className="form">
            <div className="titulo">
              <img src={logoGitHub} alt="logo-do-github" />
              <h1>
                <span className="normal">Perfil</span>Git
                <span className="github-name">Hub</span>
              </h1>
            </div>
            
            <form className="form-search" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Digite um usuário do Github"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit">
                <img src={lupa} alt="imagem-de-lupa" />
              </button>
            </form>
          </div>

          {/* Content só aparece depois do botão ser clicado */}
          {showContent && (
            <div className="content">
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  style={{ fontSize: "2rem", margin: "20px auto" }}
                >
                  <FaSpinner />
                </motion.div>
              ) : error ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%"
                  }}
                >
                  <p
                    style={{
                      color: "red",
                      textAlign: "center",
                      whiteSpace: "pre-line",
                      fontSize: "1rem",
                      fontWeight: "500"
                    }}
                  >
                    {error}
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <img src={avatarURL} alt="avatar do usuário" />
                  </div>
                  <div className="texto">
                    <h2>{name}</h2>
                    <p>{bio}</p>
                  </div>
                </>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
