
import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

import { tiposdeEstudio } from "/src/services/tiposdeestudio.service";

import MdlMensaje from "../modales/mdlMensaje";
import MDLEstaSeguro from "../modales/mdlEstaSeguro";


const mdlsubirarchivo = ({ onClose, fila }) => {

    // Reemplaza la línea vieja por esta:
       


   

    const [tiposEstudio, setTiposEstudio] = useState([]);
    const [idTipoEstudio, setIdTipoEstudio] = useState('');

           const [modalTitulo, setModalTitulo] = useState("");
           const [modalCuerpo, setModalCuerpo] = useState("");
    
    // Ahora solamente manejamos UN archivo
    const [archivo, setArchivo] = useState(null);

    const [showMDLEstaSeguro, setShowMDLEstaSeguro] = useState(false);

    const [observaciones, setObservaciones] = useState('');
    const [subiendo, setSubiendo] = useState(false);

    // Modal de mensajes
    const [mdlMensaje, setMdlMensaje] = useState('');
    const [mdlModalMostrarMensaje, setMdlModalMostrarMensaje] = useState(false);

    // URL para la vista previa
    const [previewUrl, setPreviewUrl] = useState(null);


    // =========================================================
    // ID DEL PACIENTE
    // =========================================================

    const idpaciente = fila?.IDPaciente || fila?.IDPaciente || fila?.ID;


    // =========================================================
    // MODAL MENSAJE
    // =========================================================

    const openMdlMensaje = () => {
        setMdlModalMostrarMensaje(true);
    };


    const closeMdlMensaje = () => {
        setMdlModalMostrarMensaje(false);
    };


    
  const openMdlEstaSeguro = () => {

       // -----------------------------------------
        // VALIDAR TIPO DE ESTUDIO
        // -----------------------------------------

        if (!idTipoEstudio) {

            setMdlMensaje("Por favor, selecciona el tipo de estudio.");
            openMdlMensaje();

            return;
        }


        // -----------------------------------------
        // VALIDAR ARCHIVO
        // -----------------------------------------

        if (!archivo) {

            setMdlMensaje("Por favor, selecciona una imagen o video.");
            openMdlMensaje();

            return;
        }


        // -----------------------------------------
        // VALIDAR PACIENTE
        // -----------------------------------------

        if (!idpaciente || Number(idpaciente) < 1) {

            setMdlMensaje("Error: No se detectó el ID del paciente.");
            openMdlMensaje();

            return;
        }
       


    setModalTitulo("REGISTRAR IMAGENES - RADIOGRAFIAS")
    setModalCuerpo("¿Está seguro de registrar la imágen/radiografía?")

    setShowMDLEstaSeguro(true);
  };

  const closeMdlEstaSeguro = () => {
    setShowMDLEstaSeguro(false);

  };


    // =========================================================
    // 3. DROPZONE
    // =========================================================

    const onDrop = useCallback((acceptedFiles) => {

        if (acceptedFiles.length === 0) {
            return;
        }


        // Como solamente permitimos UN archivo,
        // tomamos el primero.
        const nuevoArchivo = acceptedFiles[0];

        setArchivo(nuevoArchivo);

    }, []);


    const {
        getRootProps,
        getInputProps,
        isDragActive
    } = useDropzone({

        onDrop,

        accept: {
            'image/*': [
                '.jpeg',
                '.jpg',
                '.png',
                '.gif',
                '.webp'
            ],

            'video/*': [
                '.mp4',
                '.mov',
                '.avi',
                '.mkv',
                '.webm'
            ]
        },

        multiple: false,

        maxFiles: 1

    });


    // =========================================================
    // 4. ELIMINAR ARCHIVO
    // =========================================================

    const eliminarArchivo = () => {

        setArchivo(null);

    };


    // =========================================================
    // 5. GUARDAR ARCHIVO
    // =========================================================
  const mdlSiNo = async (respuesta) => {
         
          if (respuesta) {
            
                handleGuardar()
                
          } else {
            
          }
        }

        
    const handleGuardar = async () => {
     
      

        setSubiendo(true);


        try {
          

            const formData = new FormData();


            // -----------------------------------------
            // DATOS
            // -----------------------------------------

            formData.append(
                'idTipoEstudio',
                idTipoEstudio
            );


            formData.append(
                'notasclinicas',
                observaciones
            );


            // -----------------------------------------
            // ARCHIVO
            // -----------------------------------------
            // Mantenemos el nombre "archivos"
            // para no romper el backend existente.

            formData.append(
                'archivos',
                archivo
            );

            formData.append('idpaciente', fila.IDPaciente);
            formData.append('idturno', fila.idTurno);
            formData.append('idprofesional', fila.idprofesional);
           
          




const respuesta = await tiposdeEstudio.postSubirArchivo(formData);




            setMdlMensaje("¡Se registro el archivo correctamente!");
            openMdlMensaje()

            // Esperamos un momento antes de cerrar
            setTimeout(() => {

                onClose();

            }, 3000);


        } catch (error) {

            const mensajeError =
                error?.response?.data?.message ||
                "Hubo un error al subir el archivo al servidor." + error;
            setMdlMensaje(mensajeError);
            openMdlMensaje();


        } finally {

            setSubiendo(false);

        }

    };


    // =========================================================
    // 1. CARGAR TIPOS DE ESTUDIO
    // =========================================================

    useEffect(() => {

        const obtenerTiposEstudio = async () => {

            try {

                const response = await tiposdeEstudio.getTiposdeEstudio();

                setTiposEstudio(response);

            } catch (error) {
                mdlMensaje("No se pudieron cargar los tipos de estudio.", error);
                openMdlMensaje();
            }
        };
        obtenerTiposEstudio();
    }, []);


    // =========================================================
    // 2. CREAR URL DE PREVISUALIZACIÓN
    // =========================================================

    useEffect(() => {

        if (!archivo) {

            setPreviewUrl(null);

            return;
        }


        const url = URL.createObjectURL(archivo);

        setPreviewUrl(url);


        // Liberar URL cuando cambia el archivo
        return () => {
            URL.revokeObjectURL(url);
        };

    }, [archivo]);

    // =========================================================
    // 6. RENDER
    // =========================================================

    return (

        <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{
                backgroundColor: 'rgba(0,0,0,0.5)'
            }}
        >

            <div className="modal-dialog modal-dialog-centered modal-lg">

                <div className="modal-content">


                    {/* ================================================= */}
                    {/* HEADER */}
                    {/* ================================================= */}

                    <div className="modal-header">

                        <h5 className="modal-title">
                            Subir imagen o video
                        </h5>


                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            disabled={subiendo}
                        >
                        </button>

                    </div>


                    {/* ================================================= */}
                    {/* BODY */}
                    {/* ================================================= */}

                    <div className="modal-body">

                        <div className="row">


                            {/* ================================================= */}
                            {/* COLUMNA IZQUIERDA */}
                            {/* ================================================= */}

                            <div
                                className={
                                    archivo
                                        ? "col-md-5"
                                        : "col-md-12"
                                }
                            >


                                {/* ========================================= */}
                                {/* TIPO DE ESTUDIO */}
                                {/* ========================================= */}

                                <div className="mb-3">

                                    <label className="form-label fw-bold">

                                        Tipo de Estudio o Documento:

                                    </label>


                                    <select
                                        className="form-select"
                                        value={idTipoEstudio}
                                        onChange={(e) =>
                                            setIdTipoEstudio(
                                                e.target.value
                                            )
                                        }
                                        disabled={subiendo}
                                    >

                                        <option value="">
                                            -- Selecciona una opción --
                                        </option>


                                        {tiposEstudio.map((tipo) => (

                                            <option
                                                key={tipo.id}
                                                value={tipo.id}
                                            >

                                                {tipo.descripcion}

                                            </option>

                                        ))}

                                    </select>

                                </div>


                                {/* ========================================= */}
                                {/* DROPZONE */}
                                {/* ========================================= */}

                                <div
                                    {...getRootProps()}
                                    className={`p-4 text-center border border-2 border-dashed rounded mb-3 ${
                                        isDragActive
                                            ? 'bg-light border-primary'
                                            : 'border-secondary'
                                    }`}
                                    style={{
                                        cursor: subiendo
                                            ? 'not-allowed'
                                            : 'pointer',
                                        backgroundColor: '#f8f9fa'
                                    }}
                                >

                                    <input
                                        {...getInputProps()}
                                        disabled={subiendo}
                                    />


                                    <i className="fa-solid fa-cloud-arrow-up fa-2x mb-2 text-secondary"></i>


                                    {isDragActive ? (

                                        <p className="mb-0 text-primary">

                                            ¡Suelte la imagen o video aquí!

                                        </p>

                                    ) : (

                                        <>

                                            <p className="mb-1 text-muted">

                                                Arrastre una imagen o video aquí

                                            </p>

                                            <small className="text-secondary">

                                                o haga clic para seleccionarlo

                                            </small>

                                            <br />

                                            <small className="text-secondary">

                                                JPG, PNG, WEBP, MP4, MOV, AVI, MKV, WEBM

                                            </small>

                                        </>

                                    )}

                                </div>


                                {/* ========================================= */}
                                {/* ARCHIVO SELECCIONADO */}
                                {/* ========================================= */}

                                {archivo && (

                                    <div className="border rounded p-2 bg-light">

                                        <div className="d-flex justify-content-between align-items-center">

                                            <div className="text-truncate me-2">

                                                {archivo.type.startsWith('video/')
                                                    ? '🎥'
                                                    : '🖼️'
                                                }

                                                {' '}

                                                <strong>
                                                    {archivo.name}
                                                </strong>

                                            </div>


                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={eliminarArchivo}
                                                disabled={subiendo}
                                            >

                                                <i className="fa-solid fa-trash"></i>

                                            </button>

                                        </div>

                                    </div>

                                )}


                            

                            </div>


                            {/* ================================================= */}
                            {/* COLUMNA DERECHA - PREVISUALIZACIÓN */}
                            {/* ================================================= */}

                            {archivo && (

                                <div className="col-md-7 border-start">

                                    <label className="form-label fw-bold mb-2">

                                        Vista previa:

                                    </label>


                                    <div
                                        className="border rounded bg-dark d-flex align-items-center justify-content-center p-2"
                                        style={{
                                            height: '380px',
                                            overflow: 'hidden'
                                        }}
                                    >


                                        {/* ================================= */}
                                        {/* IMAGEN */}
                                        {/* ================================= */}

                                        {archivo.type.startsWith('image/') && (

                                            <img
                                                src={previewUrl}
                                                alt="Vista previa"
                                                className="img-fluid"
                                                style={{
                                                    maxHeight: '100%',
                                                    maxWidth: '100%',
                                                    objectFit: 'contain'
                                                }}
                                            />

                                        )}


                                        {/* ================================= */}
                                        {/* VIDEO */}
                                        {/* ================================= */}

                                        {archivo.type.startsWith('video/') && (

                                            <video
                                                src={previewUrl}
                                                controls
                                                className="w-100 h-100"
                                                style={{
                                                    objectFit: 'contain'
                                                }}
                                            />

                                        )}

                                    </div>

                                </div>

                            )}

                        </div>

                                {/* ========================================= */}
                                {/* OBSERVACIONES */}
                                {/* ========================================= */}

                                <div className="mb-3 mt-3">

                                    <label className="form-label fw-bold">

                                        Observaciones:

                                    </label>


                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        placeholder="Observaciones sobre el estudio..."
                                        value={observaciones}
                                       onChange={(e) => {
                                            setObservaciones(
                                                String(e.target.value ?? '').toUpperCase()
                                            );
                                        }}
                                         
                                       
                                       // disabled={subiendo}
                                    />

                                </div>

                    </div>


                    {/* ================================================= */}
                    {/* FOOTER */}
                    {/* ================================================= */}

                    <div className="modal-footer">

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                            disabled={subiendo}
                        >

                            Cancelar

                        </button>


                        <button
                            type="button"
                            className="btn btn-success"
                             onClick={openMdlEstaSeguro}
                            disabled={
                                subiendo ||
                                !archivo ||
                                !idTipoEstudio
                            }
                        >

                            {subiendo ? (

                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                    ></span>

                                    Subiendo...
                                </>

                            ) : (

                                <>
                                    <i className="fa-solid fa-cloud-arrow-up me-2"></i>

                                    Subir archivo
                                </>

                            )}

                        </button>

                    </div>


                </div>

            </div>


            {/* ========================================================= */}
            {/* MODAL MENSAJE */}
            {/* ========================================================= */}

            {showMDLEstaSeguro && (
                    <MDLEstaSeguro
                    show={openMdlEstaSeguro}
                    handleClose={closeMdlEstaSeguro}
                    mensajetitulo={modalTitulo}
                    mensajecuerpo={modalCuerpo}
                    enviaralpadre={mdlSiNo}
                    />
            )}

            {mdlModalMostrarMensaje && (

                <MdlMensaje
                    show={openMdlMensaje}
                    handleClose={closeMdlMensaje}
                    modalMessage={mdlMensaje}
                />

            )}

        </div>

    );

};


export default mdlsubirarchivo;
