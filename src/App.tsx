import axios from "axios";
import { useState } from "react";
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
  const [content, setContent] = useState(false);



  const handleSearch = () => {
    axios.get<GITHUBResponse>(`https://api.github.com/users/${search}`).then((res) => {
      setName(res.data.name);
      setBio(res.data.bio);
      setAvatarURL(res.data.avatar_url);
    })
  }

  return (
    <div className="container-app">


      <div className="container">
        <main>
          <div className="form">
            <div className="titulo">
              <img src={logoGitHub} alt="logo-do-github" />
              <h1><span className="normal">Perfil</span>Git<span className="github-name">Hub</span></h1>
            </div>
            <div className="form-search">
              <input
              type="text"
              placeholder="Digite um usuário do Github"
              onChange={(e) => setSearch(e.target.value)}
              />
              <button onClick={handleSearch}><img src={lupa} alt="imagem-de-lupa" /></button>
            </div>
          </div>
          <div className="content">
            <div><img src={avatarURL} /></div>
            <h1>{name}</h1>
            <p>{bio}</p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
