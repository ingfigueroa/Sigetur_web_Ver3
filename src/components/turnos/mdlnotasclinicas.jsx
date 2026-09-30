
import React, { useState } from 'react';

import MdlMensaje from "../modales/mdlMensaje";
import MDLEstaSeguro from "../modales/mdlEstaSeguro";

import { turnosService } from "../../services/turnos.service"

import {formatearFechaLargaConelAnio} from "../utils/fecha"

const mdlNotasClinicas = ({ onClose, fila }) => {



    const [notasClinicas, setNotasClinicas] = useState('');

    const [guardando, setGuardando] = useState(false);

    // Modal de confirmación
    const [showMDLEstaSeguro, setShowMDLEstaSeguro] = useState(false);
    const [modalTitulo, setModalTitulo] = useState('');
    const [modalCuerpo, setModalCuerpo] = useState('');

    // Modal de mensajes
    const [mdlMensaje, setMdlMensaje] = useState('');
    const [mdlModalMostrarMensaje, setMdlModalMostrarMensaje] = useState(false);


    // =========================================================
    // DATOS DEL TURNO
    // =========================================================

    const nombreProfesional = fila?.apenomprof ? fila.apenomprof : '';

   const nombrePaciente = fila?.apenompaciente ? fila.apenompaciente : '';


    const fechaTurno = formatearFechaLargaConelAnio(fila?.fecha) || '';

    const horaTurno = fila?.hora || '';


    // =========================================================
    // MODAL MENSAJE
    // =========================================================

    const openMdlMensaje = () => {
        setMdlModalMostrarMensaje(true);
    };


    const closeMdlMensaje = () => {
        setMdlModalMostrarMensaje(false);
    };


    // =========================================================
    // MODAL ESTA SEGURO
    // =========================================================

    const openMdlEstaSeguro = () => {

        if (!notasClinicas.trim()) {

            setMdlMensaje(
                "Por favor, ingrese la nota clínica."
            );

            openMdlMensaje();

            return;
        }

        setModalTitulo("REGISTRAR NOTA CLÍNICA");

        setModalCuerpo(
            "¿Está seguro de registrar la nota clínica?"
        );

        setShowMDLEstaSeguro(true);
    };


    const closeMdlEstaSeguro = () => {
        setShowMDLEstaSeguro(false);
    };


    // =========================================================
    // RESPUESTA MODAL SI / NO
    // =========================================================

    const mdlSiNo = async (respuesta) => {

        if (respuesta) {

            await handleGuardar();

        } else {

            setShowMDLEstaSeguro(false);

        }
    };


    // =========================================================
    // GUARDAR
    // =========================================================

    const handleGuardar = async () => {

        setGuardando(true);

        try {

            // -------------------------------------------------
            // ACA VA EL LLAMADO AL SERVICE
            // -------------------------------------------------

        
            const datos = {
                idpaciente: fila.IDPaciente,
                idturno: fila.idTurno,
                idprofesional: fila.idprofesional,
                notasclinicas: notasClinicas
            };
           

            const respuesta = await turnosService.postTurnoNotasClinicas(datos);          
            
            setShowMDLEstaSeguro(false);

            setMdlMensaje(
                "¡Se registró la nota clínica correctamente!"
            );

            openMdlMensaje();


            setTimeout(() => {

                onClose();

            }, 3000);


        } catch (error) {

            const mensajeError =
                error?.response?.data?.message ||
                "Hubo un error al guardar la nota clínica.";

            setMdlMensaje(mensajeError);

            openMdlMensaje();

        } finally {

            setGuardando(false);

        }

    };


    // =========================================================
    // RENDER
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

                    <div className="modal-header"
                     style={{
           color:"white",
            backgroundColor: "#198754",
            
          }}
                    >

                        <h5 className="modal-title">
                            REGISTRAR NOTAS CLINICAS
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            disabled={guardando}
                        >
                        </button>

                    </div>


                    {/* ================================================= */}
                    {/* BODY */}
                    {/* ================================================= */}

<div className="modal-body">

    {/* ========================================= */}
    {/* PRIMERA FILA: FECHA DEL TURNO */}
    {/* ========================================= */}

    <div className="row mb-3">

         <div className="col-md-6">

            <label className="form-label fw-bold">
                Fecha del turno:
            </label>

            <input
                type="text"
                className="form-control"
                value={fechaTurno}
                readOnly
            />

        </div>

         <div className="col-md-6">

            <label className="form-label fw-bold">
               Hora del turno:
            </label>

            <input
                type="text"
                className="form-control"
                value={horaTurno}
                readOnly
            />

        </div>

    </div>


    {/* ========================================= */}
    {/* SEGUNDA FILA: PROFESIONAL Y PACIENTE */}
    {/* ========================================= */}

    <div className="row mb-3">

        {/* PROFESIONAL */}

        <div className="col-md-6">

            <label className="form-label fw-bold">
                Profesional:
            </label>

            <input
                type="text"
                className="form-control"
                value={nombreProfesional}
                readOnly
            />

        </div>


        {/* PACIENTE */}

        <div className="col-md-6">

            <label className="form-label fw-bold">
                Paciente:
            </label>

            <input
                type="text"
                className="form-control"
                value={nombrePaciente}
                readOnly
            />

        </div>

    </div>


    {/* ========================================= */}
    {/* TERCERA FILA: NOTA CLÍNICA */}
    {/* ========================================= */}

    <div className="row mb-3">

        <div className="col-12">

            <label className="form-label fw-bold">
                Nota clínica:
            </label>

            <textarea
                className="form-control"
                rows="7"
                placeholder="Ingrese la nota clínica..."
                value={notasClinicas}
                onChange={(e) => {
                    setNotasClinicas(
                        String(
                            e.target.value ?? ''
                        ).toUpperCase()
                    );
                }}
                disabled={guardando}
            />

        </div>

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
                            disabled={guardando}
                        >
                            Cancelar
                        </button>


                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={openMdlEstaSeguro}
                            disabled={
                                guardando ||
                                !notasClinicas.trim()
                            }
                        >

                            {guardando ? (

                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                    >
                                    </span>

                                    Guardando...
                                </>

                            ) : (

                                <>
                                    <i className="fa-solid fa-floppy-disk me-2"></i>

                                    Guardar nota
                                </>

                            )}

                        </button>

                    </div>


                </div>

            </div>


            {/* ========================================================= */}
            {/* MODAL ESTA SEGURO */}
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


            {/* ========================================================= */}
            {/* MODAL MENSAJE */}
            {/* ========================================================= */}

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


export default mdlNotasClinicas;
