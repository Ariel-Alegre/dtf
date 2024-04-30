import ImpressionComponents from "../components/Impression/Impression";
import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ButtonWhatsapp from "../components/ButtonWhatsapp/ButtonWhatsapp";

export default function Impression() {
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
                <ImpressionComponents/>
            </div>
            <div>
        <ButtonWhatsapp/>
      </div>
        </div>
    )
}