import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Hidden,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  navButton: {
    marginLeft: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  list: {
    width: 250,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [designs, setDesigns] = React.useState([]);
  const [sizes, setSizes] = React.useState({});
console.log(designs)
  const handleSizeChange = (index, newSize) => {
    const updatedSizes = { ...sizes };
    updatedSizes[index] = newSize;
    setSizes(updatedSizes);
  };
  const handleQuantyChange = (index, newQuanty) => {
    const updatedDesigns = [...designs];
    updatedDesigns[index].quanty = newQuanty;
    setDesigns(updatedDesigns);
  };

  const [state, setState] = React.useState({
    right: false,
  });

  React.useEffect(() => {
    const storedDesign = localStorage.getItem("cartDesigns");
    if (storedDesign) {
      const parsedDesign = JSON.parse(storedDesign);
      setDesigns(parsedDesign);
    }

  }, []);

  React.useEffect(() => {
    const cartDesigns = localStorage.getItem("cartDesigns");
    if (cartDesigns) {
      setDesigns(JSON.parse(cartDesigns));
    }
  }, []);

  const handleRemoveFromCart = (index) => {
    const newDesigns = [...designs];
    newDesigns.splice(index, 1);
    localStorage.setItem("cartDesigns", JSON.stringify(newDesigns));
    setDesigns(newDesigns);
  };

  const toggleDrawerCarrito = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const toggleDrawerCarritoMobile = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(open);
  };
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  const handleSendByWhatsApp = async (imageUrlfront, imageUrlback, cantidad, size) => {
    try {
    
    if (imageUrlfront && imageUrlback === "") {
      
    const totalPrice = (parseFloat(cantidad) * 18.9 || 18.9).toFixed(2);
    
    const message = `
Pedido: ${imageUrlfront}. 
Cantidad: ${cantidad}.
Talla: ${size}.
Precio total: ${totalPrice}€.`;
    const url = `https://api.whatsapp.com/send?phone=+34670862817&text=${encodeURIComponent(
      message
    )}`;
    console.log("URL:", url);
    window.open(url, "_blank");
  } else if (imageUrlback && imageUrlfront === "") {
    const totalPrice = (parseFloat(cantidad) * 18.9 || 18.9).toFixed(2);
    
    const message = `
Pedido: ${imageUrlback}. 
Cantidad: ${cantidad}.
Talla: ${size}.
Precio total: ${totalPrice}€.`;;
const url = `https://api.whatsapp.com/send?phone=+34670862817&text=${encodeURIComponent(
  message
)}`;
    console.log("URL:", url);
    window.open(url, "_blank");
  } else  if (imageUrlfront && imageUrlback ) 
 {
    const totalPrice = (parseFloat(cantidad * 2) * 18.9 || 18.9).toFixed(2);
    
    const message = `
Pedido:${imageUrlfront} + ${imageUrlback} . 
Cantidad: ${cantidad}.
Talla: ${size}.
Precio total: ${totalPrice}€.`;;
const url = `https://api.whatsapp.com/send?phone=+34670862817&text=${encodeURIComponent(
  message
)}`;
    console.log("URL:", url);
    window.open(url, "_blank");
  }

      
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 600 }}
      role="presentation"
    >
      <List sx={{ height: 100 }}>
        {designs.length === 0 ? (
          <>
            <h2
              className={styles.close}
              onClick={toggleDrawerCarritoMobile("right", false)}
            >
              X
            </h2>

            <div className={styles.text_card}>No hay diseños en el carrito</div>
          </>
        ) : (
          <div>
            <h2
              className={styles.close}
              onClick={toggleDrawerCarritoMobile("right", false)}
            >
              X
            </h2>
            <h2 className={styles.text_card}>Diseños en el carrito:</h2>
            {designs.map((design, index) => (
              <>
                <div key={index} className={styles.design_cart}>
                  {design.imageUrlfront ?(

                    <div>
                    <img
                      src={design.imageUrlfront}
                      alt="Diseño en el carrito"
                      className={styles.design_img}
                      />
                  </div>
                    ): null}
                    {design.imageUrlback ? (

                      <div>
                    <img
                      src={design.imageUrlback}
                      alt="Diseño en el carrito"
                      className={styles.design_img}
                      />
                  </div>
                    ): null}
                  <div className={styles.select_input}>
                    <label htmlFor="">Cantidad:</label>{" "}
                    <div>
                      <input
                        className={styles.input_quanty}
                        type="number"
                        value={design.quanty}
                        defaultValue={Math.max(design.quanty || 1, 1)}
                        onChange={(e) => {
                          const newQuanty = parseInt(e.target.value);
                          if (!isNaN(newQuanty) && newQuanty >= 1) {
                            handleQuantyChange(index, newQuanty);
                          }
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Talla:</label>{" "}
                      <select
                        name=""
                        id=""
                        className={styles.select_size}
                        value={sizes[index] || "S"}
                        onChange={(e) =>
                          handleSizeChange(index, e.target.value)
                        }
                      >
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                        <option value="3XL">3XL</option>
                      </select>
                    </div>
                    <div>
                      Precio total:{" "}
                   
                        {design.imageUrlfront && design.imageUrlback ? (parseFloat(design.quanty) * 18.9 * 2 || 18.9 * 2).toFixed(2) : (parseFloat(design.quanty) * 18.9 || 18.9).toFixed(2)}€
                      
                    </div>
                  </div>
                </div>
                <div className={styles.btn_container}>
                  <div>
                    <ListItem
                      className={styles.btn_order}
                      variant="contained"
                      key={index}
                      onClick={() =>
                        handleSendByWhatsApp(
                          design.imageUrlfront,
                          design.imageUrlback,
                          design.quanty || 1,
                         
                          sizes[index] || "S"
                        )
                      }
                    >
                      <ListItemText primary={`Realizar el pedido`} />
                    </ListItem>
                  </div>
                  <div>
                    <ListItem
                      className={styles.btn_delete}
                      key={index}
                      onClick={() => handleRemoveFromCart(index)}
                    >
                      <ListItemText primary={`Eliminar diseño`} />
                    </ListItem>
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
      </List>
    </Box>
  );
  return (
    <div>
      <AppBar
        position="fixed"
        color="primary"
        style={{ backgroundColor: "black" }}
      >
        <Toolbar>
          <div className={styles.img_logo}>
            <Link to="/">
              <img src={require("../../images/logo.jpg")} alt="Logo" />
            </Link>
          </div>
          <Hidden mdUp>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            <SwipeableDrawer
              anchor="right"
              open={openDrawer}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            >
              <div
                className={classes.list}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  <ListItem button key="Home">
                    <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem button key="About">
                    <ListItemText primary="About" />
                  </ListItem>
                  <ListItem button key="Services">
                    <ListItemText primary="Services" />
                  </ListItem>
                  <ListItem button key="Contact">
                    <ListItemText primary="Contact" />
                  </ListItem>
                </List>
              </div>
            </SwipeableDrawer>
            <IconButton onClick={toggleDrawerCarritoMobile("right", true)}>
              <StyledBadge color="secondary">
                <ShoppingCartIcon sx={{ color: "#fff" }} />
              </StyledBadge>
            </IconButton>
            <div>
              <React.Fragment key={"right"}>
                <Drawer
                  anchor={"right"}
                  open={state["right"]}
                  onClose={toggleDrawerCarritoMobile("right", false)}
                >
                  {list("right")}
                </Drawer>
              </React.Fragment>
            </div>
          </Hidden>

          <Hidden smDown >
            <div className={styles.option}>

          <Link to="/"  >
              <Button color="inherit" >Inicio</Button>
            </Link>
            <Link to="/tarifas"  >
              <Button color="inherit" >tarifas</Button>
            </Link>
            <Link to="/impression" target="_blanck" >
              <Button color="inherit" >Dtf textil</Button>
            </Link>
            <Link to="/herramienta-de-diseño" >
              <Button color="inherit" >Crea tu propio producto</Button>
            </Link>

            <Link to="/contactanos" >
              <Button color="inherit" >Contacto</Button>
            </Link>

            <IconButton  onClick={toggleDrawerCarrito("right", true)}>
              <StyledBadge color="secondary">
                <ShoppingCartIcon sx={{ color: "#fff" }} />
              </StyledBadge>
            </IconButton>

              <React.Fragment key={"right"}>
                <Drawer
                  anchor={"right"}
                  open={state["right"]}
                  onClose={toggleDrawerCarrito("right", false)}
                  >
                  {list("right")}
                </Drawer>
              </React.Fragment>
            </div>

          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}
