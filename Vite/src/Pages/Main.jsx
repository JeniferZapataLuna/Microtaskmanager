import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Inicio_Sesion from "./modals/Inicio_Sesion";

function Body() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const close_ham = () => {
    setMenuOpen(false);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    < >
      <CssBaseline />
      <Box
        sx={{
          display: menuOpen ? "block" : "none",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          zIndex: 2,
        }}
        onClick={close_ham}
      ></Box>
      <Box
        sx={{
          color: "rgb(0, 0, 0)",
          backgroundColor: "#FFFAFA",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          margin: "0.6em"
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            margin: "0em",
          }}
        >
          <IconButton
            sx={{ padding: "0.5em", marginRight: "0.3em", marginLeft: "0.3em", borderRadius: "0.8em" }}
            onClick={toggleMenu}
          >
            <MenuIcon />
          </IconButton>
          <img
            src="./Img/papel.png"
            alt="icon"
            style={{ width: "45px", height: "45px", padding: "0em" }}
          />
          <Typography
            variant="h5"
            sx={{ fontFamily: "Montserrat", fontWeight: "800", fontSize: "1.7em" }}
          >
            MICROTASKMANAGER
          </Typography>
        </Box>

        <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
          <List sx={{margin: "20px"}}>
            <ListItem button onClick={toggleMenu}>
              <ListItemText primary="Inicio" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Sobre nosotros" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Servicios" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Contacto" />
            </ListItem>
          </List>
        </Drawer>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            padding: "0rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
              maxWidth: "50%",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                marginBottom: "20px",
                textAlign: "justify",
                width: "300px",
                fontFamily: "Montserrat",
                fontWeight: "800",
                fontSize: "40px",
              }}
            >
              Mantente Siempre Organizado
            </Typography>
            <Box>
              <Button
                variant="contained"
                sx={{
                  width: "170px",
                  height: "50px",
                  borderRadius: "20px",
                  fontSize: "15px",
                  fontWeight: "600",
                  backgroundColor: "#9ED3DC",
                  "&:hover": {
                    backgroundColor: "#ddd",
                  },
                }}
                onClick={togglePopup}
              >
                Inicia Usuario
              </Button>
              {isPopupOpen && <Inicio_Sesion closePopup={togglePopup} />}
            </Box>
          </Box>

          <Box>
            <img src="/Img/carusel.png" alt="carusel" style={{ width: "600px" }} />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Body;
