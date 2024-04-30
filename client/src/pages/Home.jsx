import React, { useEffect, useState } from "react";
import BgViewOferta from "../components/BgViewOferta/BgViewOferta";
import BgViewPrice from "../components/BgViewPrice/BgViewPrice";
import Category from "../components/Category/Category";
import DtfFast from "../components/DtfFast/DtfFast";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import WhyUs from "../components/WhyUs/WhyUs";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ButtonWhatsapp from "../components/ButtonWhatsapp/ButtonWhatsapp";

export default function Home() {
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
        <BgViewPrice />
      </div>
      <div>
        <Category />
      </div>
      <div>
        <BgViewOferta />
      </div>
      <div>
        <WhyUs />
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
