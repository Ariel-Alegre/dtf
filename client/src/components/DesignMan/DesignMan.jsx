import React, { useRef, useState } from "react";
import { fabric } from "fabric";
import styles from "./DesignMan.module.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import camisetas_diseñar from "../../images/camisetas_diseñar.png";
import camisetas_diseñador_detras from "../../images/camisetas_diseñador_detras.png";
import IconButton from "@mui/material/IconButton";
import CollectionsIcon from "@mui/icons-material/Collections";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DownloadIcon from "@mui/icons-material/Download";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
const images = [
  {
    color: "#000",
    imgfront: require("../../images/camisetas_diseñar.png"),
    imgback: require("../../images/camisetas_diseñador_detras.png"),
  },

  {
    color: "#454449",
    imgfront: require("../../images/camisetas_diseñar_gris.png"),
    imgback: require("../../images/camisetas_diseñador_detras_gris.png"),
  },

  {
    color: "#fff",
    imgfront: require("../../images/camisetas_diseñar_blanco.png"),
    imgback: require("../../images/camisetas_diseñador_detras_blanco.png"),
  },
  {
    color: "#584a30",
    imgfront: require("../../images/camisetas_diseñar_marron.png"),
    imgback: require("../../images/camisetas_diseñador_detras_marron.png"),
  },

  {
    color: "#f3e8ca",
    imgfront: require("../../images/camisetas_diseñar_marron_claro.png"),
    imgback: require("../../images/camisetas_diseñador_detras_marron_claro.png"),
  },
  {
    color: "#018829",
    imgfront: require("../../images/camisetas_diseñar_verde.png"),
    imgback: require("../../images/camisetas_diseñador_detras_verde.png"),
  },
  {
    color: "#f26531",
    imgfront: require("../../images/camisetas_diseñar_naranja.png"),
    imgback: require("../../images/camisetas_diseñador_detras_naranja.png"),
  },

  {
    color: "#ffc832",
    imgfront: require("../../images/camisetas_diseñar_amarillo.png"),
    imgback: require("../../images/camisetas_diseñador_detras_amarillo.png"),
  },

  {
    color: "#640e25",
    imgfront: require("../../images/camisetas_diseñar_bordo.png"),
    imgback: require("../../images/camisetas_diseñador_detras_bordo.png"),
  },
  {
    color: "#9f0e04",
    imgfront: require("../../images/camisetas_diseñar_rojo.png"),
    imgback: require("../../images/camisetas_diseñador_detras_rojo.png"),
  },

  {
    color: "#593783",
    imgfront: require("../../images/camisetas_diseñar_violeta.png"),
    imgback: require("../../images/camisetas_diseñador_detras_violeta.png"),
  },

  {
    color: "#2b3039",
    imgfront: require("../../images/camisetas_diseñar_azul_marino.png"),
    imgback: require("../../images/camisetas_diseñador_detras_azul_marino.png"),
  },

  {
    color: "#203552",
    imgfront: require("../../images/camisetas_diseñar_denim.png"),
    imgback: require("../../images/camisetas_diseñador_detras_denim.png"),
  },

  {
    color: "#005195",
    imgfront: require("../../images/camisetas_diseñar_blue_royal.png"),
    imgback: require("../../images/camisetas_diseñador_detras_blue_royal.png"),
  },

  {
    color: "#c0c0c0",
    imgfront: require("../../images/camisetas_diseñar_gris_vigore.png"),
    imgback: require("../../images/camisetas_diseñador_detras_gris_vigore.png"),
  },

  {
    color: "#909173",
    imgfront: require("../../images/camisetas_diseñar_caqui.png"),
    imgback: require("../../images/camisetas_diseñador_detras_caqui.png"),
  },

  {
    color: "#af462d",
    imgfront: require("../../images/camisetas_diseñar_terracota.png"),
    imgback: require("../../images/camisetas_diseñador_detras_terracota.png"),
  },

  {
    color: "#143f23",
    imgfront: require("../../images/camisetas_diseñar_verde_oscuro.png"),
    imgback: require("../../images/camisetas_diseñador_detras_verde_oscuro.png"),
  },
];

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
const DesignMan = () => {
  const [back, setBack] = useState(images[0]);
  const canvasRef = useRef(null);
  const frontCanvasRef = useRef(null);
  const backCanvasRef = useRef(null);
  const [imgFront, setImgFront] = useState(null);
  const [imgBack, setImgBack] = useState(null);
  const [loadingCars, setLoadingCars] = useState(false);
  const [loadingCarsFront, setLoadingCarsFront] = useState(false);
  const [loadingCarsBack, setLoadingCarsBack] = useState(false);
 
  const [open, setOpen] = React.useState(false);
  const [saveBothCanvases, setSaveBothCanvases] = useState(false);


  const fileInputRef = useRef(null);

  const [canvas, setCanvas] = React.useState(null);
  const [backgroundImage, setBackgroundImage] = React.useState(null);
  const [tshirt, setTshirt] = React.useState(images[0]);

  const [frontCanvas, setFrontCanvas] = React.useState(null);
  const [backCanvas, setBackCanvas] = React.useState(null);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  React.useEffect(() => {
    if (!frontCanvasRef.current || !backCanvasRef.current) return;

    const frontCanvas = new fabric.Canvas(frontCanvasRef.current);
    const backCanvas = new fabric.Canvas(backCanvasRef.current);

    let frontImage = null;
    let backImage = null;

    fabric.Image.fromURL(tshirt.imgfront, (img) => {
      if (!img) return;
      frontImage = img;
      const aspectRatio = img.width / img.height;
      const canvasWidth = 400;
      const canvasHeight = 600;
      const canvasAspectRatio = canvasWidth / canvasHeight;
      let newWidth = canvasWidth;
      let newHeight = canvasHeight;
      if (canvasAspectRatio > aspectRatio) {
        newHeight = canvasHeight;
        newWidth = canvasHeight * aspectRatio;
      } else {
        newWidth = canvasWidth;
        newHeight = canvasWidth / aspectRatio;
      }
      frontCanvas.setDimensions({ width: newWidth, height: newHeight });
      frontCanvas.setBackgroundImage(
        img,
        frontCanvas.renderAll.bind(frontCanvas),
        {
          scaleX: newWidth / img.width,
          scaleY: newHeight / img.height,
        }
      );
      setFrontCanvas(frontCanvas);
    });

    fabric.Image.fromURL(tshirt.imgback, (img) => {
      if (!img) return;
      backImage = img;
      const aspectRatio = img.width / img.height;
      const canvasWidth = 400;
      const canvasHeight = 600;
      const canvasAspectRatio = canvasWidth / canvasHeight;
      let newWidth = canvasWidth;
      let newHeight = canvasHeight;
      if (canvasAspectRatio > aspectRatio) {
        newHeight = canvasHeight;
        newWidth = canvasHeight * aspectRatio;
      } else {
        newWidth = canvasWidth;
        newHeight = canvasWidth / aspectRatio;
      }
      backCanvas.setDimensions({ width: newWidth, height: newHeight });
      backCanvas.setBackgroundImage(
        img,
        backCanvas.renderAll.bind(backCanvas),
        {
          scaleX: newWidth / img.width,
          scaleY: newHeight / img.height,
        }
      );
      setBackCanvas(backCanvas);
    });

    return () => {
      if (frontCanvas) {
        frontCanvas.dispose(); // Limpiar el canvas al desmontar el componente
      }
      if (backCanvas) {
        backCanvas.dispose(); // Limpiar el canvas al desmontar el componente
      }
    };
  }, [tshirt.imgfront, tshirt.imgback, frontCanvasRef, backCanvasRef]);

  const addTextWithDeleteButton = (fontFamily) => {
    if (!frontCanvas) return;
    const canvasWidth = frontCanvas.getWidth(); // Obtener el ancho del canvas
    const canvasHeight = frontCanvas.getHeight(); // Obtener el alto del canvas
    const textWidth = 200; // Ancho deseado del texto
    const textHeight = 20; // Alto deseado del texto
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

    frontCanvas.add(text);
  };


  
  const handleTextColorChange = (e) => {
    const color = e.target.value;
    if (!frontCanvas) return;

    const activeObject = frontCanvas.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set("fill", color);
      frontCanvas.renderAll();
    }
  };



  const addTextBack = (fontFamily) => {
    if (!backCanvas) return;
    const canvasWidth = backCanvas.getWidth(); // Obtener el ancho del canvas
    const canvasHeight = backCanvas.getHeight(); // Obtener el alto del canvas
    const textWidth = 200; // Ancho deseado del texto
    const textHeight = 20; // Alto deseado del texto
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

    backCanvas.add(text);
  };


  
  const handleTextColorChangeBack = (e) => {
    const color = e.target.value;
    if (!backCanvas) return;

    const activeObject = backCanvas.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set("fill", color);
      backCanvas.renderAll();
    }
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !frontCanvas) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;
      fabric.Image.fromURL(imageUrl, (img) => {
        const canvasWidth = frontCanvas.getWidth();
        const canvasHeight = frontCanvas.getHeight();
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

        frontCanvas.add(img);
        frontCanvas.renderAll();
      });
    };
    reader.readAsDataURL(file);
  };

  const handleImageUploadBack = (e) => {
    const file = e.target.files[0];
    if (!file || !backCanvas) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;
      fabric.Image.fromURL(imageUrl, (img) => {
        const canvasWidth = backCanvas.getWidth();
        const canvasHeight = backCanvas.getHeight();
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

        backCanvas.add(img);
        backCanvas.renderAll();
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    const frontCanvas = frontCanvasRef.current;
    const backCanvas = backCanvasRef.current;

    if (frontCanvas && backCanvas) {
      // Convertir los canvases en imágenes
      const frontDataURL = frontCanvas.toDataURL({ format: "png" });
      const backDataURL = backCanvas.toDataURL({ format: "png" });

      // Crear un elemento "a" para la descarga de cada imagen
      const frontDownloadLink = document.createElement("a");
      frontDownloadLink.href = frontDataURL;
      frontDownloadLink.download = "front_design.png";
      document.body.appendChild(frontDownloadLink);
      frontDownloadLink.click();
      document.body.removeChild(frontDownloadLink);

      const backDownloadLink = document.createElement("a");
      backDownloadLink.href = backDataURL;
      backDownloadLink.download = "back_design.png";
      document.body.appendChild(backDownloadLink);
      backDownloadLink.click();
      document.body.removeChild(backDownloadLink);
    }
  };

  const handleDeleteAll = () => {
    window.location.reload();
  };

  const handleBack = (data, isBack = false) => {
    setTshirt(data);
    if (isBack) {
      if (frontCanvasRef.current instanceof fabric.Canvas) {
        const objects = frontCanvasRef.current.toJSON().objects; // Obtener los objetos existentes
        localStorage.setItem("frontCanvasObjects", JSON.stringify(objects)); // Guardar los objetos en el estado local
        frontCanvasRef.current.setBackgroundImage(data.imgfront, () => {
          // Restaurar los objetos al cambiar la imagen
          if (objects.length > 0) {
            frontCanvasRef.current.add(...objects); // Añadir los objetos de nuevo al lienzo si hay alguno
          }
          frontCanvasRef.current.renderAll();
        });
      }
    } else {
      if (backCanvasRef.current instanceof fabric.Canvas) {
        const objects = backCanvasRef.current.toJSON().objects; // Obtener los objetos existentes
        localStorage.setItem("backCanvasObjects", JSON.stringify(objects)); // Guardar los objetos en el estado local
        backCanvasRef.current.setBackgroundImage(data.imgback, () => {
          // Restaurar los objetos al cambiar la imagen
          if (objects.length > 0) {
            backCanvasRef.current.add(...objects); // Añadir los objetos de nuevo al lienzo si hay alguno
          }
          backCanvasRef.current.renderAll();
        });
      }
    }
  };



  const handleAddToCart = async () => {
    setLoadingCars(true);
    try {
        if (!frontCanvasRef.current || !backCanvasRef.current) {
            console.log("Los canvases no están inicializados");
            return;
        }

        const frontLink = document.createElement("a");
        frontLink.download = "design_front.png";
        frontLink.href = frontCanvasRef.current.toDataURL({ format: "png" });

        const backLink = document.createElement("a");
        backLink.download = "design_back.png";
        backLink.href = backCanvasRef.current.toDataURL({ format: "png" });

        const formData = new FormData();
        formData.append(
            "image",
            dataURLtoFile(frontLink.href, "design_front.png")
        );
        formData.append("image", dataURLtoFile(backLink.href, "design_back.png"));

        const response = await fetch("https://dtf-production.up.railway.app/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        const frontImageUrl = data.urls ? data.urls[0] : null;
        const backImageUrl = data.urls ? data.urls[1] : null;

        const frontObjects =
            frontCanvasRef.current instanceof fabric.Canvas
                ? frontCanvasRef.current.getObjects().map((obj) => obj.toObject())
                : [];
        const backObjects =
            backCanvasRef.current instanceof fabric.Canvas
                ? backCanvasRef.current.getObjects().map((obj) => obj.toObject())
                : [];

        const frontDesignData = {
            backgroundImage: back,
            objects: frontObjects,
            objectsBack: backObjects,
            image: frontLink.href,
            imgfront: tshirt.imgfront,
            imgback: tshirt.imgback,
            imageUrlfront: frontImageUrl,
            imageUrlback: backImageUrl,
            color: "black", // Ejemplo de color, asegúrate de tener la propiedad correcta aquí
            isEmpty: frontObjects.length === 0 && backObjects.length === 0, // Indica si el lienzo está vacío
        };

        const cartDesigns = JSON.parse(
            localStorage.getItem("cartDesigns") || "[]"
        );

        if (saveBothCanvases) {
            cartDesigns.push(frontDesignData);
        } else {
            cartDesigns.push({
                ...frontDesignData,
                objects: [], // Limpiar los objetos del frente si no se guarda el frente
            });
        }

        localStorage.setItem("cartDesigns", JSON.stringify(cartDesigns));
        console.log(localStorage.getItem("cartDesigns"));

        alert(
            "Diseño guardado en el carrito de compras, ingrese y realice el pedido"
        );
    } catch (error) {
        console.log("error en agregar en el carrito de compras:", error);
    } finally {
      window.location.reload();
        setLoadingCars(false);
    }
};


const handleAddFrontToCart = async () => {
  setLoadingCarsFront(true);
    try {
        if (!frontCanvasRef.current || !backCanvasRef.current) {
            console.log("Los canvases no están inicializados");
            return;
        }

        const frontLink = document.createElement("a");
        frontLink.download = "design_front.png";
        frontLink.href = frontCanvasRef.current.toDataURL({ format: "png" });

        const backLink = document.createElement("a");
        backLink.download = "design_back.png";
        backLink.href = backCanvasRef.current.toDataURL({ format: "png" });

        const formData = new FormData();
        formData.append(
            "image",
            dataURLtoFile(frontLink.href, "design_front.png")
        );
        formData.append("image", dataURLtoFile(backLink.href, "design_back.png"));

        const response = await fetch("https://dtf-production.up.railway.app/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        const frontImageUrl = data.urls ? data.urls[0] : null;
        const backImageUrl = data.urls ? data.urls[1] : null;

        const frontObjects =
            frontCanvasRef.current instanceof fabric.Canvas
                ? frontCanvasRef.current.getObjects().map((obj) => obj.toObject())
                : [];
        const backObjects =
            backCanvasRef.current instanceof fabric.Canvas
                ? backCanvasRef.current.getObjects().map((obj) => obj.toObject())
                : [];

        const frontDesignData = {
            backgroundImage: back,
            objects: frontObjects,
            objectsBack: backObjects,
            image: frontLink.href,
            imgfront: tshirt.imgfront,
            imgback: tshirt.imgback,
            imageUrlfront: frontImageUrl,
            imageUrlback: "",
            color: "black", // Ejemplo de color, asegúrate de tener la propiedad correcta aquí
            isEmpty: frontObjects.length === 0 && backObjects.length === 0, // Indica si el lienzo está vacío
        };

        const cartDesigns = JSON.parse(
            localStorage.getItem("cartDesigns") || "[]"
        );

        if (saveBothCanvases) {
            cartDesigns.push(frontDesignData);
        } else {
            cartDesigns.push({
                ...frontDesignData,
                objects: [], // Limpiar los objetos del frente si no se guarda el frente
            });
        }

        localStorage.setItem("cartDesigns", JSON.stringify(cartDesigns));
        console.log(localStorage.getItem("cartDesigns"));

        alert(
            "Diseño guardado en el carrito de compras, ingrese y realice el pedido"
        );
    } catch (error) {
        console.log("error en agregar en el carrito de compras:", error);
    } finally {
      window.location.reload();
      setLoadingCarsFront(false);
    }
};

const handleAddBackToCart = async () => {
  setLoadingCarsBack(true);
    try {
        if (!frontCanvasRef.current || !backCanvasRef.current) {
            console.log("Los canvases no están inicializados");
            return;
        }

        const frontLink = document.createElement("a");
        frontLink.download = "design_front.png";
        frontLink.href = frontCanvasRef.current.toDataURL({ format: "png" });

        const backLink = document.createElement("a");
        backLink.download = "design_back.png";
        backLink.href = backCanvasRef.current.toDataURL({ format: "png" });

        const formData = new FormData();
        formData.append(
            "image",
            dataURLtoFile(frontLink.href, "design_front.png")
        );
        formData.append("image", dataURLtoFile(backLink.href, "design_back.png"));

        const response = await fetch("https://dtf-production.up.railway.app/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        const frontImageUrl = data.urls ? data.urls[0] : null;
        const backImageUrl = data.urls ? data.urls[1] : null;

        const frontObjects =
            frontCanvasRef.current instanceof fabric.Canvas
                ? frontCanvasRef.current.getObjects().map((obj) => obj.toObject())
                : [];
        const backObjects =
            backCanvasRef.current instanceof fabric.Canvas
                ? backCanvasRef.current.getObjects().map((obj) => obj.toObject())
                : [];

        const frontDesignData = {
            backgroundImage: back,
            objects: frontObjects,
            objectsBack: backObjects,
            image: frontLink.href,
            imgfront: tshirt.imgfront,
            imgback: tshirt.imgback,
            imageUrlfront: "",
            imageUrlback: backImageUrl,
            color: "black", // Ejemplo de color, asegúrate de tener la propiedad correcta aquí
            isEmpty: frontObjects.length === 0 && backObjects.length === 0, // Indica si el lienzo está vacío
        };

        const cartDesigns = JSON.parse(
            localStorage.getItem("cartDesigns") || "[]"
        );

        if (saveBothCanvases) {
            cartDesigns.push(frontDesignData);
        } else {
            cartDesigns.push({
                ...frontDesignData,
                objects: [], // Limpiar los objetos del frente si no se guarda el frente
            });
        }

        localStorage.setItem("cartDesigns", JSON.stringify(cartDesigns));
        console.log(localStorage.getItem("cartDesigns"));

        alert(
            "Diseño guardado en el carrito de compras, ingrese y realice el pedido"
        );
    } catch (error) {
        console.log("error en agregar en el carrito de compras:", error);
    } finally {
      window.location.reload();
      setLoadingCarsBack(false);
    }
};





  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(",");
    if (arr.length < 2) {
      throw new Error("Invalid data URL format");
    }
    var mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
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
          
          <div >
            <div>
              <label htmlFor="">Agregar texto camiseta trasera: </label>
              <select
                className={styles.select}
                onChange={(e) => addTextBack(e.target.value)}
              >
                {fontList.map((font, index) => (
                  <option onClick={toggleDrawer(false)}>{font}</option>
                ))}
              </select>
            </div>
            <div>
              Color: <input type="color" onChange={handleTextColorChangeBack} />
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
              {images.map((data, index) => (
                <IconButton
                  aria-label="delete"
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: data.color,
                    ":hover": { backgroundColor: data.color },
                  }}
                  onClick={() => handleBack(data)}
                ></IconButton>
              ))}
            </div>
          </div>
        </Stack>
      </div>
    </Box>
  );
  return (
    <div className={styles.canvas_container}>
      <div className={styles.imageContainer}>
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
                <div>Agregarndo</div>
              </>
            ) : (
              <>
                <div>+</div>
                <div>Agregar camiseta completa</div>
              </>
            )}
          </Button>
        </div>
      <div>
          <Button
            onClick={handleAddFrontToCart }
            variant="contained"
            sx={{
              height: 100,
              width: 300,
              background: "#fff",
              color: "#000",
              ":hover": { background: "#fff", color: "#000" },
            }}
          >
            {loadingCarsFront ? (
              <>
                <CircularProgress
                  color="primary"
                  sx={{ color: "#000", fontSize: 5 }}
                />
                <div>+</div>
                <div>Agregando</div>
              </>
            ) : (
              <>
                <div>+</div>
                <div>Agregar camiseta delantera</div>
              </>
            )}
          </Button>
        </div>
        <div>
          <Button
            onClick={handleAddBackToCart }
            variant="contained"
            sx={{
              height: 100,
              width: 300,
              background: "#fff",
              color: "#000",
              ":hover": { background: "#fff", color: "#000" },
            }}
          >
            {loadingCarsBack ? (
              <>
                <CircularProgress
                  color="primary"
                  sx={{ color: "#000", fontSize: 5 }}
                />
                <div>+</div>
                <div>Agregando</div>
              </>
            ) : (
              <>
                <div>+</div>
                <div>Agregar camiseta trasera</div>
              </>
            )}
          </Button>
        </div>

      </div>
      
      <Stack direction="row" className={styles.container_all_btn}>
        <div className={styles.text_select}>
          <div>
            <label htmlFor="">Texto camiseta delantera: </label>
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

        <div className={styles.text_select}>
            <div>
              <label htmlFor="">Texto camiseta trasera: </label>
              <select
                className={styles.select}
                onChange={(e) => addTextBack(e.target.value)}
              >
                {fontList.map((font, index) => (
                  <option onClick={toggleDrawer(false)}>{font}</option>
                ))}
              </select>
            </div>
            <div>
              Color: <input type="color" onChange={handleTextColorChangeBack} />
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
            <div>Imagen camiseta delantera</div>

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

        <label htmlFor="image-upload-back" style={{ display: "inline-block" }}>
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

            <div>Imagen camiseta trasera</div>

          </Button>
          <input
            id="image-upload-back"
            type="file"
            accept="image/*"
            onChange={handleImageUploadBack}
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
            className={styles.btn_option}
          >
            <div>
              <AutorenewIcon />
            </div>
            <div>Rehacer</div>
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
          <canvas ref={frontCanvasRef} className={styles.canvas_img} />

          <canvas ref={backCanvasRef} className={styles.canvas_img} />
        </div>
      </div>
      <div className={styles.color}>
        {images.map((data, index) => (
          <IconButton
            aria-label="delete"
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: data.color,
              ":hover": { backgroundColor: data.color },
            }}
            onClick={() => handleBack(data)}
          ></IconButton>
        ))}
      </div>
    </div>
  );
};
export default DesignMan;
