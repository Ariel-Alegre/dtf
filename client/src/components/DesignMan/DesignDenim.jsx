import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import styles from "./DesignMan.module.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import camisetas_diseñar from "../../images/camisetas_diseñar_denim.png";
import camisetas_diseñador_detras from "../../images/camisetas_diseñador_detras_denim.png";
import IconButton from "@mui/material/IconButton";
import CollectionsIcon from "@mui/icons-material/Collections";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DownloadIcon from "@mui/icons-material/Download";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";

const DesignDenim = () => {
  const [back, setBack] = useState(camisetas_diseñar);
  const canvasRef = useRef(null);
  const [loadingCars, setLoadingCars] = useState(false);

  const [open, setOpen] = React.useState(false);

  const fileInputRef = useRef(null);
  const fontList = [
    "Arial",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Impact",
    "Georgia",
    "Tahoma",
    "Comic Sans MS",
    "Trebuchet MS",
    "Arial Black",
    "Lucida Console",
    "Palatino Linotype",
    "Lucida Sans Unicode",
    "Garamond",
    "Book Antiqua",
    "Consolas",
    "Candara",
    "Franklin Gothic Medium",
    "Century Gothic",
    "Segoe UI",
  ];
  const [canvas, setCanvas] = React.useState(null);
  const [backgroundImage, setBackgroundImage] = React.useState(null);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  React.useEffect(() => {
    if (!canvasRef.current) return;

    const newCanvas = new fabric.Canvas(canvasRef.current);

    // Crear una imagen de fondo
    const backgroundImageUrl = back;
    fabric.Image.fromURL(backgroundImageUrl, (img) => {
      if (!img) return; // Verificar si la imagen se cargó correctamente
      setBackgroundImage(img);
      const aspectRatio = img.width / img.height;
      const canvasWidth = 400; // Ancho máximo deseado del canvas
      const canvasHeight = 600; // Alto máximo deseado del canvas
      const canvasAspectRatio = canvasWidth / canvasHeight;

      let newWidth = canvasWidth;
      let newHeight = canvasHeight;

      // Ajustar la imagen de fondo al tamaño máximo del canvas manteniendo la relación de aspecto
      if (canvasAspectRatio > aspectRatio) {
        // El canvas es más ancho que la imagen, ajustar la altura
        newHeight = canvasHeight;
        newWidth = canvasHeight * aspectRatio;
      } else {
        // El canvas es más alto que la imagen, ajustar el ancho
        newWidth = canvasWidth;
        newHeight = canvasWidth / aspectRatio;
      }

      // Establecer las dimensiones del canvas y la imagen de fondo
      newCanvas.setDimensions({ width: newWidth, height: newHeight });
      newCanvas.setBackgroundImage(img, newCanvas.renderAll.bind(newCanvas), {
        scaleX: newWidth / img.width,
        scaleY: newHeight / img.height,
      });

      // Centrar el canvas
      const container = canvasRef.current.parentElement;
      container.style.display = "flex";
      container.style.justifyContent = "center";
      container.style.alignItems = "center";
      setCanvas(newCanvas);
    });

    return () => {
      newCanvas.dispose(); // Limpiar el canvas al desmontar el componente
    };
  }, [back, canvasRef]);

  const addTextWithDeleteButton = (fontFamily) => {
    if (!canvas || !backgroundImage) return;

    const canvasWidth = canvas.getWidth(); // Obtener el ancho del canvas
    const canvasHeight = canvas.getHeight(); // Obtener el alto del canvas
    const textWidth = 200; // Ancho deseado del texto
    const textHeight = 20; // Alto deseado del texto

    // Calcular la posición para que el texto esté pegado al borde del canvas
    const left = Math.max(0, Math.min(canvasWidth - textWidth, 150));
    const top = Math.max(0, Math.min(canvasHeight - textHeight, 150));

    const text = new fabric.Textbox("Texto Aquí", {
      position: "absolute",
      textAlign: "center",
      left: left,
      top: top,
      width: 1,
      fontSize: 20,
      fontFamily: fontFamily,
      fill: "#00FF6E",
      hasControls: true,
    });

    canvas.add(text);
  };

  const handleTextColorChange = (e) => {
    const color = e.target.value;
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set("fill", color);
      canvas.renderAll();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !canvas) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;
      fabric.Image.fromURL(imageUrl, (img) => {
        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();
        const maxWidth = canvasWidth * 0.8; // Puedes ajustar este valor según tus necesidades
        const maxHeight = canvasHeight * 0.8; // Puedes ajustar este valor según tus necesidades
        let scaleFactor = 1;

        if (img.width > maxWidth || img.height > maxHeight) {
          const scaleX = maxWidth / img.width;
          const scaleY = maxHeight / img.height;
          scaleFactor = Math.min(scaleX, scaleY);
        }

        img.set({
          scaleX: scaleFactor,
          scaleY: scaleFactor,
          left: (canvasWidth - img.width * scaleFactor) / 2,
          top: (canvasHeight - img.height * scaleFactor) / 2,
          hasControls: true,
        });

        canvas.add(img);
        canvas.renderAll();
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "design.png";
    link.href = canvas.toDataURL({ format: "png" });
    link.click();
  };

  const handleDeleteAll = () => {
    window.location.reload();
  };

  const handleBack = (src) => {
    setBack(src);
  };
  const handleAddToCart = async () => {
    setLoadingCars(true);

    try {
      if (!canvas) return;

      const link = document.createElement("a");
      link.download = "design.png";
      link.href = canvas.toDataURL({ format: "png" });
      const designData = {
        backgroundImage: back,
        objects: canvas.getObjects().map((obj) => obj.toObject()),
        image: link.href,
      };

      // Save the design to localStorage
      const cartDesigns = JSON.parse(
        localStorage.getItem("cartDesigns") || "[]"
      );
      cartDesigns.push(designData);
      localStorage.setItem("cartDesigns", JSON.stringify(cartDesigns));

      // Send a request to the server-side endpoint to generate a link to the image
      const formData = new FormData();
      formData.append("image", dataURLtoFile(designData.image, "design.png"));

      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const imageUrl = data.url;

      // Add the imageUrl to the designData object
      designData.imageUrl = imageUrl;

      // Update the localStorage with the new designData object
      const updatedCartDesigns = cartDesigns.map((design) =>
        design === designData ? designData : design
      );
      localStorage.setItem("cartDesigns", JSON.stringify(updatedCartDesigns));

      // Reload the page
      alert(
        "Diseño guardado en el carrito de compras, ingrese y realize el pedido"
      );
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
      setLoadingCars(false);
    }
  };

  // Helper function to convert dataURL to File object
  function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  /*    const handleSendByWhatsApp = async () => {
    if (!canvas) return;

    // Convert the canvas image to a data URI
    const dataUri = canvas.toDataURL();
    console.log("Data URI:", dataUri);

    // Convert the data URI to a Blobobject
    const blob = convertDataURIToBlob(dataUri);
    console.log("Blob:", blob);

    // Create a FormData object and append the Blob object to it
    const formData = new FormData();
    formData.append("image", blob);
    console.log("FormData:", formData);

    // Send a request to the server-side endpoint to generate a link to the image
    const response = await fetch("http://localhost:3001/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    const imageUrl = data.url;

    // Use the WhatsApp API to send a message with the link to the image
    const message = "Quiero este diseño!";
    const url = `https://api.whatsapp.com/send?phone=+541161361408&text=${encodeURIComponent(
      message
    )} ${encodeURIComponent(imageUrl)} ${encodeURIComponent(
      size
    )} ${encodeURIComponent(quanty)}`;
    console.log("URL:", url);
    window.open(url, "_blank");
  };  */

  function convertDataURIToBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    console.log("Blob:", new Blob([ab], { type: mimeString }));
    return new Blob([ab], { type: mimeString });
  }

  const DrawerList = (
    <Box sx={{ width: 500, marginLeft: "2em" }} role="presentation">
      <div>
        <div>
          <h2 onClick={toggleDrawer(false)}>X</h2>
        </div>
        <div onClick={toggleDrawer(false)}>
          <Button onClick={() => handleBack(camisetas_diseñar)}>
            <img src={camisetas_diseñar} alt="" className={styles.img_design} />
          </Button>

          <Button onClick={() => handleBack(camisetas_diseñador_detras)}>
            <img
              src={camisetas_diseñador_detras}
              alt=""
              className={styles.img_design}
            />
          </Button>
        </div>

        <Stack direction="row" sx={{ display: "grid", gap: "1em" }}>
          <div className={styles.text_select}>
            <div>
              <label htmlFor="">Agregar texto: </label>
              <select
                className={styles.select}
                onChange={(e) => addTextWithDeleteButton(e.target.value)}
              >
                {fontList.map((font, index) => (
                  <option onClick={toggleDrawer(false)}>{font}</option>
                ))}
              </select>
            </div>
            <div>
              Color: <input type="color" onChange={handleTextColorChange} />
            </div>
          </div>
          <label htmlFor="image-upload" style={{ display: "inline-block" }}>
            <Button
              variant="contained"
              component="span"
              sx={{
                height: 100,
                width: 300,
                background: "#fff",
                color: "#000",
                ":hover": { background: "#fff", color: "#000" },
              }}
            >
              <div>
                <CollectionsIcon />
              </div>

              <div>Cargar Imagen</div>
            </Button>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
          </label>
          <div>
            <Button
              onClick={handleDownload}
              variant="contained"
              sx={{
                height: 100,
                width: 300,
                background: "#fff",
                color: "#000",
                ":hover": { background: "#fff", color: "#000" },
              }}
            >
              <div>
                <DownloadIcon />
              </div>
              <div>Descargar</div>
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              onClick={handleDeleteAll}
              sx={{
                height: 100,
                width: 300,
                background: "#fff",
                color: "#000",
                ":hover": { background: "#fff", color: "#000" },
              }}
            >
              <div>
                <AutorenewIcon />
              </div>
              <div>Rehacer</div>
            </Button>
          </div>
          <div>
            <Button
              onClick={handleAddToCart}
              variant="contained"
              sx={{
                height: 100,
                width: 300,
                background: "#fff",
                color: "#000",
                ":hover": { background: "#fff", color: "#000" },
              }}
            >
              {loadingCars ? (
                <>
                  <CircularProgress
                    color="primary"
                    sx={{ color: "#000", fontSize: 5 }}
                  />
                  <div>+</div>
                  <div>Agregar al carrito</div>
                </>
              ) : (
                <>
                  <div>+</div>
                  <div>Agregar al carrito</div>
                </>
              )}
            </Button>
          </div>

          <div>
          <div className={styles.color_mobile}>
              <Link to="/herramienta-de-diseño">
                <IconButton
                  aria-label="delete"
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#000",
                    ":hover": { backgroundColor: "#000" },
                  }}
                ></IconButton>
              </Link>
              <Link to="/herramienta-de-diseño/gris">
                <IconButton
                  aria-label="delete"
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#454449",
                    ":hover": { backgroundColor: "#454449" },
                  }}
                ></IconButton>
              </Link>
              <Link to="/herramienta-de-diseño/blanco">
                <IconButton
                  aria-label="delete"
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#fff",
                    ":hover": { backgroundColor: "#fff" },
                  }}
                ></IconButton>
              </Link>
              <Link to="/herramienta-de-diseño/marron">
                <IconButton
                  aria-label="delete"
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#584a30",
                    ":hover": { backgroundColor: "#584a30" },
                  }}
                ></IconButton>
              </Link>
              <Link to="/herramienta-de-diseño/marron-claro">
                <IconButton
                  aria-label="delete"
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#f3e8ca",
                    ":hover": { backgroundColor: "#f3e8ca" },
                  }}
                ></IconButton>
              </Link>
              <Link to="/herramienta-de-diseño/verde">
                <IconButton
                  aria-label="delete"
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#018829",
                    ":hover": { backgroundColor: "#018829" },
                  }}
                ></IconButton>
              </Link>
              <Link to="/herramienta-de-diseño/naranja">
                <IconButton
                  aria-label="delete"
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#f26531",
                    ":hover": { backgroundColor: "#f26531" },
                  }}
                ></IconButton>
              </Link>
              <Link to="/herramienta-de-diseño/amarillo">
                <IconButton
                  aria-label="delete"
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#ffc832",
                    ":hover": { backgroundColor: "#ffc832" },
                  }}
                ></IconButton>
              </Link>
              <Link to="/herramienta-de-diseño/bordo">
                <IconButton
                  aria-label="delete"
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#640e25",
                    ":hover": { backgroundColor: "#640e25" },
                  }}
                ></IconButton>
              </Link>
              <Link to="/herramienta-de-diseño/rojo">
                <IconButton
                  aria-label="delete"
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#9f0e04",
                    ":hover": { backgroundColor: "#9f0e04" },
                  }}
                ></IconButton>
              </Link>
              <Link to="/herramienta-de-diseño/violeta">
                <IconButton
                  aria-label="delete"
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#593783",
                    ":hover": { backgroundColor: "#593783" },
                  }}
                ></IconButton>
              </Link>
              <Link to="/herramienta-de-diseño/azul-marino">
                <IconButton
                  aria-label="delete"
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#2b3039",
                    ":hover": { backgroundColor: "#2b3039" },
                  }}
                ></IconButton>
              </Link>
              <Link to="/herramienta-de-diseño/azul-denim">
                <IconButton
                  aria-label="delete"
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#203552",
                    ":hover": { backgroundColor: "#203552" },
                  }}
                ></IconButton>
              </Link>
              <Link to="/herramienta-de-diseño/azul-royal">
                <IconButton
                  aria-label="delete"
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#005195",
                    ":hover": { backgroundColor: "#005195" },
                  }}
                ></IconButton>
              </Link>
              <Link to="/herramienta-de-diseño/gris-vigoré">
                <IconButton
                  aria-label="delete"
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#c0c0c0",
                    ":hover": { backgroundColor: "#c0c0c0" },
                  }}
                ></IconButton>
              </Link>
              <Link to="/herramienta-de-diseño/caquí">
                <IconButton
                  aria-label="delete"
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#909173",
                    ":hover": { backgroundColor: "#909173" },
                  }}
                ></IconButton>
              </Link>
              <Link to="/herramienta-de-diseño/terracota">
                <IconButton
                  aria-label="delete"
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#af462d",
                    ":hover": { backgroundColor: "#af462d" },
                  }}
                ></IconButton>
              </Link>
              <Link to="/herramienta-de-diseño/verde-oscuro">
                <IconButton
                  aria-label="delete"
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#143f23",
                    ":hover": { backgroundColor: "#143f23" },
                  }}
                ></IconButton>
              </Link>
            </div>
          </div>
        </Stack>
      </div>
    </Box>
  );
  return (
    <div className={styles.canvas_container}>
      <div className={styles.imageContainer}>
        <Button onClick={() => handleBack(camisetas_diseñar)}>
          <img src={camisetas_diseñar} alt="" className={styles.img_design} />
        </Button>
        <Button onClick={() => handleBack(camisetas_diseñador_detras)}>
          <img
            src={camisetas_diseñador_detras}
            alt=""
            className={styles.img_design}
          />
        </Button>
      </div>

      <Stack direction="row" className={styles.container_all_btn}>
        <div className={styles.text_select}>
          <div>
            <label htmlFor="">Agregar texto: </label>
            <select
              className={styles.select}
              onChange={(e) => addTextWithDeleteButton(e.target.value)}
            >
              {fontList.map((font, index) => (
                <option key={index} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>
          <div>
            Color: <input type="color" onChange={handleTextColorChange} />
          </div>
        </div>
        <label htmlFor="image-upload" style={{ display: "inline-block" }}>
          <Button
            variant="contained"
            component="span"
            sx={{
              height: 100,
              width: 300,
              background: "#fff",
              color: "#000",
              ":hover": { background: "#fff", color: "#000" },
            }}
          >
            <div>
              <CollectionsIcon />
            </div>

            <div>Cargar Imagen</div>
          </Button>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </label>
        <div>
          <Button
            onClick={handleDownload}
            variant="contained"
            sx={{
              height: 100,
              width: 300,
              background: "#fff",
              color: "#000",
              ":hover": { background: "#fff", color: "#000" },
            }}
          >
            <div>
              <DownloadIcon />
            </div>
            <div>Descargar</div>
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            onClick={handleDeleteAll}
            sx={{
              height: 100,
              width: 300,
              background: "#fff",
              color: "#000",
              ":hover": { background: "#fff", color: "#000" },
            }}
          >
            <div>
              <AutorenewIcon />
            </div>
            <div>Rehacer</div>
          </Button>
        </div>
        <div>
          <Button
            onClick={handleAddToCart}
            variant="contained"
            sx={{
              height: 100,
              width: 300,
              background: "#fff",
              color: "#000",
              ":hover": { background: "#fff", color: "#000" },
            }}
          >
            {loadingCars ? (
              <>
                <CircularProgress
                  color="primary"
                  sx={{ color: "#000", fontSize: 5 }}
                />
                <div>+</div>
                <div>Agregar al carrito</div>
              </>
            ) : (
              <>
                <div>+</div>
                <div>Agregar al carrito</div>
              </>
            )}
          </Button>
        </div>
      </Stack>
      <div>
        <div className={styles.drawer_mobile}>
          <Button
            variant="contained"
            sx={{ background: "#000", ":hover": { background: "#000" } }}
            onClick={toggleDrawer(true)}
          >
            Open drawer
          </Button>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </div>
        <div className={styles.canvas_box}>
          <canvas ref={canvasRef} className={styles.canvas_img} />
        </div>
      </div>
      <div className={styles.color}>
        <Link to="/herramienta-de-diseño">
          <IconButton
            aria-label="delete"
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: "#000",
              ":hover": { backgroundColor: "#000" },
            }}
          ></IconButton>
        </Link>
        <Link to="/herramienta-de-diseño/gris">
          <IconButton
            aria-label="delete"
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: "#454449",
              ":hover": { backgroundColor: "#454449" },
            }}
          ></IconButton>
        </Link>
        <Link to="/herramienta-de-diseño/blanco">
          <IconButton
            aria-label="delete"
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: "#fff",
              ":hover": { backgroundColor: "#fff" },
            }}
          ></IconButton>
        </Link>
        <Link to="/herramienta-de-diseño/marron">
          <IconButton
            aria-label="delete"
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: "#584a30",
              ":hover": { backgroundColor: "#584a30" },
            }}
          ></IconButton>
        </Link>
        <Link to="/herramienta-de-diseño/marron-claro">
          <IconButton
            aria-label="delete"
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: "#f3e8ca",
              ":hover": { backgroundColor: "#f3e8ca" },
            }}
          ></IconButton>
        </Link>
        <Link to="/herramienta-de-diseño/verde">
          <IconButton
            aria-label="delete"
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: "#018829",
              ":hover": { backgroundColor: "#018829" },
            }}
          ></IconButton>
        </Link>
        <Link to="/herramienta-de-diseño/naranja">
          <IconButton
            aria-label="delete"
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: "#f26531",
              ":hover": { backgroundColor: "#f26531" },
            }}
          ></IconButton>
        </Link>
        <Link to="/herramienta-de-diseño/amarillo">
          <IconButton
            aria-label="delete"
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: "#ffc832",
              ":hover": { backgroundColor: "#ffc832" },
            }}
          ></IconButton>
        </Link>
        <Link to="/herramienta-de-diseño/bordo">
          <IconButton
            aria-label="delete"
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: "#640e25",
              ":hover": { backgroundColor: "#640e25" },
            }}
          ></IconButton>
        </Link>
        <Link to="/herramienta-de-diseño/rojo">
          <IconButton
            aria-label="delete"
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: "#9f0e04",
              ":hover": { backgroundColor: "#9f0e04" },
            }}
          ></IconButton>
        </Link>
        <Link to="/herramienta-de-diseño/violeta">
          <IconButton
            aria-label="delete"
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: "#593783",
              ":hover": { backgroundColor: "#593783" },
            }}
          ></IconButton>
        </Link>
        <Link to="/herramienta-de-diseño/azul-marino">
          <IconButton
            aria-label="delete"
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: "#2b3039",
              ":hover": { backgroundColor: "#2b3039" },
            }}
          ></IconButton>
        </Link>
        <Link to="/herramienta-de-diseño/azul-denim">
          <IconButton
            aria-label="delete"
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: "#203552",
              ":hover": { backgroundColor: "#203552" },
            }}
          ></IconButton>
        </Link>
        <Link to="/herramienta-de-diseño/azul-royal">
          <IconButton
            aria-label="delete"
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: "#005195",
              ":hover": { backgroundColor: "#005195" },
            }}
          ></IconButton>
        </Link>
        <Link to="/herramienta-de-diseño/gris-vigoré">
          <IconButton
            aria-label="delete"
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: "#c0c0c0",
              ":hover": { backgroundColor: "#c0c0c0" },
            }}
          ></IconButton>
        </Link>
        <Link to="/herramienta-de-diseño/caquí">
          <IconButton
            aria-label="delete"
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: "#909173",
              ":hover": { backgroundColor: "#909173" },
            }}
          ></IconButton>
        </Link>
        <Link to="/herramienta-de-diseño/terracota">
          <IconButton
            aria-label="delete"
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: "#af462d",
              ":hover": { backgroundColor: "#af462d" },
            }}
          ></IconButton>
        </Link>
        <Link to="/herramienta-de-diseño/verde-oscuro">
          <IconButton
            aria-label="delete"
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: "#143f23",
              ":hover": { backgroundColor: "#143f23" },
            }}
          ></IconButton>
        </Link>
      </div>
    </div>
  );
};
export default DesignDenim;
