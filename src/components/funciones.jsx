import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


export function show_alerta(mensaje, icono, foco){
    const onfocus(foco);
    const mysSwal = withReactContent(Swal);
    mysSwal.fire({
        title:mensaje;
        icono:icono

    });


    function onfocus(foco){

          if (foco !== ''){
                document.getElementById(foco).focus();

          }

    }

}
