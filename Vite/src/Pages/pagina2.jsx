import React from 'react';
import { useState } from 'react';
import './Pagina2.css'

const pagina2 = () => {

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
                    <img src='/public/img/menu.png' alt="Menu hamburguesa" onClick={toggleMenu} className='img hover hamburguesa-toggle'/>
                    </section>
                    
                    
                    <img src='/public/img/papel.png' alt="icon" className='Icono'/>
                    <p className='name'>MICROTASKMANAGER</p>

                    <img src="/public/img/Perfil.png" alt="icon"  className='Perfil'/>
                
                </div>
                <button type="button" className='agregar hover-effect'>+</button>
                <div className='Agregar'>
                    
                    <section className='Notas'>

                    </section>
                </div>
                
                <ul className={`hamburguesa-contents ${menuOpen? 'active' : 'unactive'}`}>
                    <li><img src='/public/img/menu.png' alt="Menu hamburguesa" onClick={toggleMenu} className='img hover hamburguesa-toggle'/></li>
                    <li><a href="#" className='hover'>Inicio</a></li>
                    <li><a href="#" className='hover'>Sobre nosotros</a></li>
                    <li><a href="#" className='hover'>Servicios</a></li>
                    <li><a href="#" className='hover'>Contacto</a></li>
                </ul>
            </div>
     </>
  );
};

export default pagina2;