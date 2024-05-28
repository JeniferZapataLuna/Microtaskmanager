import { useState } from 'react';
import './css/Main.css'
import Inicio_Sesion from './Inicio_Sesion';

const Body = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };


    const hover = (element) => {
        element.addEventListener("mouseover", () => {
            element.style.backgroundColor = "lightblue";
        });

        element.addEventListener("mouseout", () => {
            element.style.backgroundColor = "";
        });
    }

    const addhover = () => {
        const botones = document.getElementsByClassName("hover");
        Array.from(botones).map(boton => {
            hover(boton); // Llamar a la función addHoverEffect y pasar cada elemento como argumento
        });
    };

    const close_ham = () => {
        setMenuOpen(false)
    }

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };
    return (
       <>
        <section className={`hamburguesa-bg ${menuOpen? 'active' : 'unactive'}`} onClick={close_ham}></section>
        <div className='Principal' onLoad={addhover}>
            <div className='D1'>

                <section className="menu_ham menu">
                <img src='./Img/menu.png' alt="Menu hamburguesa" onClick={toggleMenu} className='img hover hamburguesa-toggle'/>
                </section>
                
                
                <img src='./Img/papel.png' alt="icon" className='Icono'/>
                <p className='name'>MICROTASKMANAGER</p>
            
            </div>
            
            <ul className={`hamburguesa-contents ${menuOpen? 'active' : 'unactive'}`}>
                <li><img src='./Img/menu.png' alt="Menu hamburguesa" onClick={toggleMenu} className='img hover hamburguesa-toggle'/></li>
                <li><a href="#" className='hover'>Inicio</a></li>
                <li><a href="#" className='hover'>Sobre nosotros</a></li>
                <li><a href="#" className='hover'>Servicios</a></li>
                <li><a href="#" className='hover'>Contacto</a></li>
            </ul>




            <div className='D2'>
            
                <section className='part-left'>
                    <p className='learn'>Mantente Siempre Organizado</p>
                    <div className="App">
                      <button type="button" className='Crear-Usuario boton hover-effect' onClick={togglePopup}>Inicia Usuario</button>
                      {isPopupOpen && <Inicio_Sesion closePopup={togglePopup} />}
                    </div>
                </section>
            
            <section className='Carusel'>
            <img src="/Img/carusel.png" alt="carusel"  className='img-1'/>
            </section>
            </div>
        </div>
      </>
    )
  }
  



  export default Body
