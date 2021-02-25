import TopMenu from "./components/TopMenu";
import useFetch from "./hooks/useFetch";
import { urlApiProducts } from "./utils/constants";
import Products from "./components/Products";

function App() {
  const products = useFetch(urlApiProducts, null);

  return (
    <div className="App">
      <TopMenu></TopMenu>
      <Products products={products} />
    </div>
  );
}

export default App;
