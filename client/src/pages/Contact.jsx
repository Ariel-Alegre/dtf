import React, { useEffect, useState } from "react";
import ContactUsComponents from "../components/ContactUs/ContactUs";
import Navbar from "../components/Navbar/Navbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "../components/Footer/Footer";
import ButtonWhatsapp from "../components/ButtonWhatsapp/ButtonWhatsapp";


export default function Contact() {
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
        <ContactUsComponents />
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
