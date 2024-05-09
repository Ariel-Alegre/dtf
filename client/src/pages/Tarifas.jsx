import React, { useEffect, useState } from "react";
import TarifasComponents from "../components/Trifa/Tarifa";
import Navbar from "../components/Navbar/Navbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "../components/Footer/Footer";
import ButtonWhatsapp from "../components/ButtonWhatsapp/ButtonWhatsapp";


export default function Tarifas() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }, []);
  return (
    <div>
       <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div>
        <Navbar />
      </div>
      <div>
        <TarifasComponents />
      </div>
      <div>
        <ButtonWhatsapp/>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
