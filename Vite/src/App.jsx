import React, { useState } from 'react'
import './App.css'
import Foot from './Pages/footer'

function App() {

  return (
    <div className='Principal'>
     <div className='D1'>
       <img 
         src='public/img/menu-hamburguesa.png' alt="Rayas" className='menu'/>
       <img 
         src='public/img/papel.png' alt="icon" className='Icono'/>  
       <p className='name'>MICROTASKMANAGER</p>
     </div>
     <div className='D2'>
      <section className='part-left'>
        <p className='learn'>Mantente Siempre Organizado</p>
        <button type="button" className='Crear-Usuario'>Crea un usuario</button>
        </section>
       <section className='Carusel'>
           <img src="public/img/carusel.png" alt="carusel" srcset=""  className='img-1'/>
       </section>
    </div>
    </div>
    <Foot />
  )
}

export default App
