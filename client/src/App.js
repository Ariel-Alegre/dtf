import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./pages/Test";
import Details from "./pages/Details";
import Impression from "./pages/Impression";
import DesignMan from "./pages/DesignMan";
import DesignGray from "./pages/DesignGray";
import DesignWhite from "./pages/DesignWhite";
import DesignBrown from "./pages/DesignBrown";
import DesignBrownLigth from "./pages/DesignBrownLigth";
import DesignGreen from "./pages/DesignGreen";
import DesignOrange from "./pages/DesignOrange";
import DesignYellow from "./pages/DesignYellow";
import DesignBordo from "./pages/DesignBordo";
import DesignRed from "./pages/DesignRed";
import DesignViolet from "./pages/DesignViolet";
import DesignBlueMarin from "./pages/DesignBlueMarin";
import DesignDenim from "./pages/DesignDenim";
import DesignBlueRoyal from "./pages/DesignBlueRoyal";
import DesignGrayVigore from "./pages/DesignGrayVigore";
import DesignCaqui from "./pages/DesignCaqui";
import DesignTerracota from "./pages/DesignTerracota";
import DesignGreenHard from "./pages/DesignGreenHard";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/dtf" element={<Details />} />
        <Route exact path="/contactanos" element={<Contact />} />


        <Route exact path="/test" element={<Test />} />
        <Route exact path="/impression" element={<Impression />} />
        <Route exact path="/herramienta-de-diseño" element={<DesignMan />} />
        <Route exact path="/herramienta-de-diseño/gris" element={<DesignGray />} />
        <Route exact path="/herramienta-de-diseño/blanco" element={<DesignWhite />} />
        <Route exact path="/herramienta-de-diseño/marron" element={<DesignBrown/>} />
        <Route exact path="/herramienta-de-diseño/marron-claro" element={<DesignBrownLigth/>} />
        <Route exact path="/herramienta-de-diseño/verde" element={<DesignGreen/>} />
        <Route exact path="/herramienta-de-diseño/naranja" element={<DesignOrange/>} />
        <Route exact path="/herramienta-de-diseño/amarillo" element={<DesignYellow/>} />
        <Route exact path="/herramienta-de-diseño/bordo" element={<DesignBordo/>} />
        <Route exact path="/herramienta-de-diseño/rojo" element={<DesignRed/>} />
        <Route exact path="/herramienta-de-diseño/violeta" element={<DesignViolet/>} />
        <Route exact path="/herramienta-de-diseño/azul-marino" element={<DesignBlueMarin/>} />
        <Route exact path="/herramienta-de-diseño/azul-denim" element={<DesignDenim/>} />
        <Route exact path="/herramienta-de-diseño/azul-royal" element={<DesignBlueRoyal/>} />
        <Route exact path="/herramienta-de-diseño/gris-vigoré" element={<DesignGrayVigore/>} />
        <Route exact path="/herramienta-de-diseño/caquí" element={<DesignCaqui/>} />
        <Route exact path="/herramienta-de-diseño/terracota" element={<DesignTerracota/>} />
        <Route exact path="/herramienta-de-diseño/verde-oscuro" element={<DesignGreenHard/>} />




















        
      </Routes>
    </Router>
  );
}

export default App;
