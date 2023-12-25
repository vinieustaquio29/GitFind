import { Header } from "../../Componets/header";
import Background from "../../assets/background.svg";
import Profile from "../../assets/WhatsApp Image 2023-11-26 at 11.17.01.jpeg";
import { useState } from "react";
import ItemList from "../../Componets/ItemList";
import "./style.css";

function App() {
  const [user, setUser] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState("");

  const handleGetDate = async () => {
    const userDate = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userDate.json();

    if(newUser.name){
      const {avatar_url, name, bio, login} = newUser;
      setCurrentUser({avatar_url, name, bio, login})
    }

    const reposDate = await fetch(`https://api.github.com/users/${user}/repos`);
    const newRepos = await reposDate.json();

    if(newRepos.length){
      setRepos(newRepos)

    }

  };

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={Background} className="background" alt="Background" />
      </div>
      <div className="info">
        <input
          name="usuario"
          placeholder="@usuario"
          value={user}
          onChange={(event) => setUser(event.target.value)}
        />
        <button onClick={handleGetDate}>Buscar</button>
      </div>

    {currentUser?.name ? ( <> 
         <div className="profile">
         <img src={currentUser.avatar_url} className="photo" alt="foto perfil" />
         <div className="Description">
           <h3>{currentUser.name}</h3>
           <p>@{currentUser.login}</p>
           <p className="status">Estudante de Programação</p>
         </div>
       </div>
       <div className="traço">
         <div className="separator"></div>
       </div>

</> ):null}
     
     {repos?.length ? ( <>

<div className="descrição">
<h4>Repositórios</h4>
</div>
<div className="contain">
{repos.map(repo => ( 
<ItemList title={repo.name} description={repo.description} />
))}

</div>
</>
     ):null}
  
    </div>
  );
}

export default App;
