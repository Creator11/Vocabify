import { Link, Outlet } from "react-router";
import { booksRoutes } from "@packages/shared/src/routes/books";
import { cardsRoutes } from "@packages/shared/src/routes/cards";
import { vocabularyRoutes } from "@packages/shared/src/routes/vocabulary";
 

export const App = () => {
  return (
    <div>
      <Link to={vocabularyRoutes.vocabulary}>testiki</Link>
      <br />
      <Link to={cardsRoutes.cards}>testiki</Link> 
      <br />
      <Link to={booksRoutes.books}>testiki</Link>
      <br />
      <Outlet /> 
    </div>
  );
};

export default App;
