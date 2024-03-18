
import React from 'react'
import '../css/footer.css'


const Footer = () => {

  return (
       
         
            <div className='sb_footer section_padding'>
              <div className='sb_footer-links'>
                <div className='sb_footer-links_div'>
                  <h4>titulo 1</h4>
                  <a href='/'>
                    <p>Subtitulo1</p>
                  </a>
                  <a href='/'>
                    <p>Subtitulo2</p>
                  </a>
                  
                </div>
              
             
                <div className='sb_footer-links_div'>
                <h4>titulo 3</h4>
                <a href='/'>
                  <p>Subtitulo1</p>
                </a>
              </div>
               <div className='sb_footer-links_div'>
                <h4>titulo 4</h4>
                <a href='/'>
                  <p>Subtitulo1</p>
                </a>
                <a href='/'>
                  <p>Subtitulo2</p>
                </a>
               
              </div>
              <div className='sb_footer-links_div'>
                <h4>titulo 5</h4>
                <div className='socialmedia'>
                  <p><img src="assets/instagram.png" alt="" /></p>
                   <p><img src="./assets/linkedin.png" alt="" /></p>
                    <p><img src="./assets/twitter.png" alt="" /></p>
                     

                </div>

              </div>
              <hr></hr>

                <div className='sb_footer-below'>
                  <div className='sb_footer-copyright'>
                    <p>
                     @{new Date().getFullYear()}. All right reserved

                    </p>
                  </div>
                  <div className='sb_footer-below-links'>
                      <a href="/"><div><p>Terminos y condiciones</p></div></a>
                      <a href="/"><div><p>Privacidad</p></div></a>
                      <a href="/"><div><p>Security</p></div></a>
                      <a href="/"><div><p>Cookies</p></div></a>
                  </div>
                </div>

            </div>
          </div>
          
       

    
  )
}

export default Footer