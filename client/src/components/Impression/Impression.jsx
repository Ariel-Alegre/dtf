import React, { useState, useEffect, useCallback } from "react";
import styles from "./Impression.module.css";
import { TfiGallery } from "react-icons/tfi";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineCurrencyEuro } from "react-icons/hi";
import { TbExclamationCircle } from "react-icons/tb";
import Button from "@mui/material/Button";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
export default function Impression() {
  const [selectLength, setSetLength] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [copias, setCopias] = useState(0);
  const [canvases, setCanvases] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [open, setOpen] = useState(false);

  const [uploadedImage, setUploadedImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");

  const getImageDimensions = (url) => {
    const img = new Image();
    img.onload = function () {
      setImageDimensions({
        width: this.width,
        height: this.height,
      });
    };
    img.src = url;
  };

  const handleFileUpload = async (files) => {
    setOpen(true);
    const formData = new FormData();
    formData.append("image", files[0]);

    try {
      const response = await axios.post(
        "https://dtf-production.up.railway.app/field",
        formData
      );
      const url = response.data.url;
      const name = files[0].name;
      setImageUrl(url);
      setImageName(name);
      setUploadedImage(true);

      console.log("File uploaded successfully:", url);
      // Obtener las dimensiones de la imagen cargada
      getImageDimensions(url);
    setOpen(false);

    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {

    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleCopiasChange = (e) => {
    const cantidadCopias = parseInt(e.target.value, 10);
    const totalCopias = cantidadCopias;
    setCopias(totalCopias);
    const totalLienzos = Math.ceil(totalCopias / 15);
    setCanvases(Array.from({ length: totalLienzos }, (_, i) => i));
  };

  const getPpmFromPpi = (ppi) => {
    return 25.4 / ppi; // 1 pulgada = 25.4 milímetros
  };

  const getWidthInMm = (width, ppi) => {
    return width * getPpmFromPpi(ppi);
  };

  const getHeightInMm = (height, ppi) => {
    return height * getPpmFromPpi(ppi);
  };

  const createNewCanvas = (index) => {
    const newCanvases = [...canvases, index];
    setCanvases(newCanvases);

    const pngContainer = document.querySelector("." + styles.png_container);
    const newCanvas = document.createElement("canvas");
    newCanvas.id = `canvas${index + 1}`;
    newCanvas.className = styles.canvas_design;
    pngContainer.appendChild(newCanvas);
  };

  useEffect(() => {
    if (canvases.length > 0) {
      canvases.forEach((index) => {
        if (!document.getElementById(`canvas${index + 1}`)) {
          createNewCanvas(index);
        }
      });
    }
  }, [canvases]);

  useEffect(() => {
    canvases.forEach((index) => {
      const canvas = document.getElementById(`canvas${index + 1}`);
      if (canvas) {
        const ctx = canvas.getContext("2d");

        // Establecer el fondo como blanco
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dibujar cuadrados en el lienzo
        const squareSize = 50;
        const margin = 1;
        const maxPerRow = Math.floor(canvas.width / (squareSize + margin));
        let x = margin;
        let y = margin;
        for (let i = index * 15; i < (index + 1) * 15 && i < copias; i++) {
          ctx.fillStyle = "black";
          ctx.fillRect(x, y, squareSize, squareSize);
          x += squareSize + margin;
          if (x + squareSize > canvas.width) {
            x = margin;
            y += squareSize + margin;
          }
        }
      }
    });
  }, [copias, canvases]);

  const total = canvases.length * 13.95;
  const handleOrder = useCallback(() => {
    const message = `Orden de impresión:\n\nCopias: ${copias}\nTotal: ${total.toFixed(
      2
    )}€ (+21% IVA)\nImagen: ${imageUrl}`;
    const whatsappUrl = `https://wa.me/+34670862817?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  }, [copias, total, imageUrl]);

  const handleDeleteImage = () => {
    setUploadedImage(false);
    setImageUrl("");
    setImageName("");
  };

  return (
    <>
        <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
        Subiendo...
      </Backdrop>
      <div className={styles.impression_container}>
        <div className={styles.box_datas}>
          <div className={styles.logo_container}>
            <img src={require("../../images/logo.jpg")} alt="" />
          </div>
          {/*     <div className={styles.price_m2}>
            <span className={styles.stat_title}>Total imágenes</span>
            <div className={styles.container_gallery}>
              <strong>{totalImages}</strong>
              <div>
                <TfiGallery className={styles.icons} />
              </div>
            </div>
          </div> */}
          <div className={styles.price_m2}>
            <span className={styles.stat_title}>Total elementos</span>
            <div className={styles.container_gallery}>
              <div>
                <strong className={styles.elements}>
                  {copias ? copias : 0}
                </strong>
              </div>
              <div>
                <RxDashboard className={styles.icons} />
              </div>
            </div>
          </div>
          <div className={styles.price_m2_price}>
            <span className={styles.stat_title}>Precio / m</span>
            <div className={styles.container_gallery}>
              <div>
                <strong>13.95€</strong>
              </div>
              <div>
                <HiOutlineCurrencyEuro className={styles.icons} />
              </div>
            </div>
            <span className={styles.inpuesto}>(+21% IVA)</span>
          </div>
          <div className={styles.price_m2}>
            <span className={styles.stat_title}>Metros totales</span>
            <div className={styles.container_gallery}>
              <div>
                <strong>{canvases.length}</strong>
              </div>
              <div>
                <TbExclamationCircle className={styles.icons} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.png_container}>
          <div className={styles.upload}>
            <div className={styles.upload_img}>
              {!uploadedImage ? (
                <label htmlFor="file-upload" className={styles.input_img}>
                  Arrastra tus imágenes PNG aquí o pulsa botón para cargarlas.
                  <input
                    id="file-upload"
                    type="file"
                    accept=".png"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </label>
              ) : (
                <>
                  <img
                    src={imageUrl}
                    alt="Uploaded"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      width: "100%",
                    }}
                  />
                </>
              )}
            </div>
            {uploadedImage && (
              <div className={styles.inputs_impression}>
                <div className={styles.name_img}>
                  <p>{imageName}</p>
                  <IconButton
                    onClick={handleDeleteImage}
                    aria-label="delete"
                    size="small"
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </div>
                <div className={styles.input_copias}>
                  <label htmlFor="">Copias:</label>
                  <input
                    type="number"
                    value={copias}
                    min="0"
                    max="200"
                    onChange={handleCopiasChange}
                    className={styles.number_copias}
                  />
                </div>
                {imageDimensions.width > 0 && (
                  <p>
                    {imageDimensions.width.toFixed(1)} x{" "}
                    {imageDimensions.height.toFixed(1)}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className={styles.png_container_complete}>
            <div className={styles.canvas_container}>
              {uploadedImage &&
                canvases.map((index) => (
                  <div key={index} className={styles.canvas_container}>
                    <canvas
                      id={`canvas${index + 1}`}
                      className={styles.canvas_design}
                    ></canvas>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className={styles.total_canva}>
          <div>
            <strong>Total: {total.toFixed(2)}€ (+21% IVA)</strong>
          </div>

          <Button
            variant="contained"
            sx={{
              background: "green",
              ":hover": { background: "green" },
              marginBottom: "2em",
            }}
            onClick={handleOrder}
          >
            <FaWhatsapp /> Realizar la orden
          </Button>
        </div>
      </div>
    </>
  );
}
