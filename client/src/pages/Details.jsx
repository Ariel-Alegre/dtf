import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import DetailsData from "../components/DetailsData/DetailsData";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ButtonWhatsapp from "../components/ButtonWhatsapp/ButtonWhatsapp";

export default function Details() {

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
        <DetailsData />
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
