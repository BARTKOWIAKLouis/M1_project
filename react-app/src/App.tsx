import './App.css'
import { Hello } from './Hello'
import { HomeComponent } from "./modules/homeComponent"
import { Route as booksRoute } from './routes/books'
import { Route as authorsRoute } from './routes/authors'
import { Route as clientsRoute } from './routes/clients'
function App() {


  return (
    <div>
      <Hello></Hello>
      <div style={{position: "absolute", width: "100vw", height:'50%', display: "flex", justifyContent: "space-evenly", alignItems: "center", margin: "auto"}}>
        <HomeComponent
          title="Books"
          desciption="Discover our extensive collection of books across various genres and authors. Find your next great read here!"
          goTo={booksRoute.to}
        />

        <HomeComponent
          title="Authors"
          desciption="Explore profiles of renowned authors, their biographies, and bibliographies. Dive into the world of literature through their works."
          goTo={authorsRoute.to}
        />

        <HomeComponent
          title="Clients"
          desciption="Manage your client relationships effectively. Access client information and purchase history all in one place."
          goTo={clientsRoute.to}
        />

      </div>
    </div>
  )
}

export default App
