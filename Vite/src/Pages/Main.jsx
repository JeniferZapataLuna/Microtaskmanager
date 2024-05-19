import { useState } from 'react';
import './Main.css'

function Body() {

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


    return (
       <>
        <section className={`hamburguesa-bg ${menuOpen? 'active' : 'unactive'}`} onClick={close_ham}></section>
        <div className='Principal' onLoad={addhover}>
            <div className='D1'>

                <section className="menu_ham menu">
                <img src='/public/img/menu-hamburguesa.png' alt="Menu hamburguesa" onClick={toggleMenu} className='img hover hamburguesa-toggle'/>
                </section>
                
                
                <img src='/public/img/papel.png' alt="icon" className='Icono'/>
                <p className='name'>MICROTASKMANAGER</p>
            
            </div>
            
            <ul className={`hamburguesa-contents ${menuOpen? 'active' : 'unactive'}`}>
                <li><img src='/public/img/menu-hamburguesa.png' alt="Menu hamburguesa" onClick={toggleMenu} className='img hover hamburguesa-toggle'/></li>
                <li><a href="#" className='hover'>Inicio</a></li>
                <li><a href="#" className='hover'>Sobre nosotros</a></li>
                <li><a href="#" className='hover'>Servicios</a></li>
                <li><a href="#" className='hover'>Contacto</a></li>
            </ul>




            <div className='D2'>
            
                <section className='part-left'>
                    <p className='learn'>Mantente Siempre Organizado</p>
                    <button type="button" className='Crear-Usuario boton hover'>Crea un usuario</button>
                </section>
            
            <section className='Carusel'>
            <img src="/public/img/carusel.png" alt="carusel"  className='img-1'/>
            </section>
            </div>
        </div>
      </>
    )
  }
  
  export default Body
