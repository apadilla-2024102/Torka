import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { DEPARTAMENTOS_GT } from '../../../shared/api/mockData.js'
import { enlaceWhatsApp } from '../../../shared/config/negocio.js'
import Boton from '../../../shared/components/ui/Boton.jsx'
import Campo, { claseControl } from './Campo.jsx'
import { armarMensaje, INTERESES, validarCotizacion } from '../lib/validarCotizacion.js'

/**
 * Formulario de cotización. No necesita servidor: al enviarlo abre
 * WhatsApp con el mensaje ya escrito hacia el número de ventas
 * (src/shared/config/negocio.js). El vendedor recibe la solicitud
 * completa y el cliente no tiene que redactar nada.
 */
export default function FormCotizacion({ modelos, modeloInicial, colorInicial }) {
  const [datos, setDatos] = useState({
    modelo: modeloInicial ?? '',
    color: colorInicial ?? '',
    nombre: '',
    telefono: '',
    departamento: '',
    interes: 'contado',
    comentario: '',
  })
  const [errores, setErrores] = useState({})
  const [enlaceEnviado, setEnlaceEnviado] = useState(null)
  const [intento, setIntento] = useState(0)
  const formulario = useRef(null)

  const modelo = modelos.find((m) => m.id === datos.modelo)
  const color = modelo?.colores.find((c) => c.id === datos.color) ?? modelo?.colores[0]

  const actualizar = (campo) => (e) => {
    const valor = e.target.value
    setDatos((d) => ({ ...d, [campo]: valor, ...(campo === 'modelo' ? { color: '' } : {}) }))
    if (errores[campo]) setErrores((err) => ({ ...err, [campo]: undefined }))
  }

  const enviar = (e) => {
    e.preventDefault()
    const encontrados = validarCotizacion(datos)
    setErrores(encontrados)

    const primero = Object.keys(encontrados)[0]
    if (primero) {
      setIntento((n) => n + 1)
      // Lleva el foco al primer campo con error: el usuario sabe dónde corregir.
      formulario.current?.querySelector(`#${primero}`)?.focus()
      return
    }

    const enlace = enlaceWhatsApp(armarMensaje(datos, modelo, color))
    window.open(enlace, '_blank', 'noopener,noreferrer')
    setEnlaceEnviado(enlace)
  }

  const describir = (id, ayuda) =>
    [ayuda && `${id}-ayuda`, errores[id] && `${id}-error`].filter(Boolean).join(' ') || undefined

  if (enlaceEnviado) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: '100% 100%' }}
        className="rounded-[2px] bg-papel text-asfalto p-8 sm:p-10"
        role="status"
      >
        <PalomitaAnimada />
        <h2 className="tipo-ruta mt-5 text-3xl">Abrimos WhatsApp con tu solicitud</h2>
        <p className="mt-3 max-w-lg text-grafito">
          Solo falta que envíes el mensaje. Un asesor te responde con el precio y el distribuidor más cercano.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Boton href={enlaceEnviado} target="_blank" rel="noopener noreferrer">
            Abrir WhatsApp otra vez
          </Boton>
          <Boton variante="secundario" sobreOscuro={false} onClick={() => setEnlaceEnviado(null)}>
            Editar la solicitud
          </Boton>
        </div>
      </motion.div>
    )
  }

  return (
    <form ref={formulario} onSubmit={enviar} noValidate className="space-y-7 rounded-[2px] bg-papel text-asfalto p-6 sm:p-10">
      <div className="grid gap-7 sm:grid-cols-2">
        <Campo id="modelo" etiqueta="Modelo" error={errores.modelo} intento={intento}>
          <select
            id="modelo"
            name="modelo"
            value={datos.modelo}
            onChange={actualizar('modelo')}
            aria-invalid={Boolean(errores.modelo)}
            aria-describedby={describir('modelo')}
            className={claseControl(errores.modelo)}
          >
            <option value="">Elige un modelo</option>
            {modelos.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nombre} ({m.perfilLabel})
              </option>
            ))}
          </select>
        </Campo>

        <Campo id="color" etiqueta="Color">
          <select
            id="color"
            name="color"
            value={color?.id ?? ''}
            onChange={actualizar('color')}
            disabled={!modelo}
            className={claseControl(false)}
          >
            {!modelo && <option value="">Primero elige el modelo</option>}
            {modelo?.colores.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </Campo>

        <Campo id="nombre" etiqueta="Nombre" error={errores.nombre} intento={intento}>
          <input
            id="nombre"
            name="nombre"
            type="text"
            autoComplete="name"
            value={datos.nombre}
            onChange={actualizar('nombre')}
            aria-invalid={Boolean(errores.nombre)}
            aria-describedby={describir('nombre')}
            className={claseControl(errores.nombre)}
          />
        </Campo>

        <Campo id="telefono" etiqueta="Teléfono" ayuda="8 dígitos. Te contactamos por WhatsApp." error={errores.telefono} intento={intento}>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            value={datos.telefono}
            onChange={actualizar('telefono')}
            aria-invalid={Boolean(errores.telefono)}
            aria-describedby={describir('telefono', true)}
            className={`cifras ${claseControl(errores.telefono)}`}
          />
        </Campo>

        <Campo id="departamento" etiqueta="Departamento" error={errores.departamento} intento={intento}>
          <select
            id="departamento"
            name="departamento"
            autoComplete="address-level1"
            value={datos.departamento}
            onChange={actualizar('departamento')}
            aria-invalid={Boolean(errores.departamento)}
            aria-describedby={describir('departamento')}
            className={claseControl(errores.departamento)}
          >
            <option value="">Elige tu departamento</option>
            {DEPARTAMENTOS_GT.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </Campo>
      </div>

      <fieldset>
        <legend className="font-medium">Qué te interesa</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {INTERESES.map((i) => (
            <label key={i.id} className="cursor-pointer">
              <input
                type="radio"
                name="interes"
                value={i.id}
                checked={datos.interes === i.id}
                onChange={actualizar('interes')}
                className="peer sr-only"
              />
              <span className="flex min-h-12 items-center justify-center rounded-[2px] border border-asfalto/25 px-4 text-center font-medium transition-colors duration-150 peer-checked:border-asfalto peer-checked:bg-asfalto peer-checked:text-papel peer-focus-visible:ring-2 peer-focus-visible:ring-lima-hondo">
                {i.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <Campo id="comentario" etiqueta="Comentario (opcional)" ayuda="Por ejemplo: cuántos kilómetros haces al día o si buscas para reparto.">
        <textarea
          id="comentario"
          name="comentario"
          autoComplete="off"
          rows={3}
          value={datos.comentario}
          onChange={actualizar('comentario')}
          aria-describedby="comentario-ayuda"
          className={`${claseControl(false)} py-3`}
        />
      </Campo>

      <div className="flex flex-col gap-4 border-t border-concreto pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-sm text-grafito">
          Al enviar se abre WhatsApp con tu mensaje listo. Tus datos solo se usan para responder esta cotización.
        </p>
        <Boton type="submit" className="shrink-0">
          Enviar por WhatsApp
        </Boton>
      </div>
    </form>
  )
}

/** Círculo y palomita que se trazan solos: confirma que la solicitud quedó lista. */
function PalomitaAnimada() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12 text-lima-hondo" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <motion.circle
        cx="24"
        cy="24"
        r="21"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="M15 25 L21.5 31.5 L33 18"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      />
    </svg>
  )
}
