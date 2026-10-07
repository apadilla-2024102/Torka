import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../../shared/components/layout/Layout.jsx'
import InicioPage, { inicioLoader } from '../../features/inicio/pages/InicioPage.jsx'
import NoEncontradoPage from '../../features/errores/pages/NoEncontradoPage.jsx'

/**
 * Rutas del sitio. Cada página carga sus datos en su `loader` antes de
 * mostrarse: así la página llega completa y la transición de vista puede
 * mover la moto de la tarjeta a la ficha sin pantallas de "cargando".
 *
 * La portada va en el paquete principal; el resto de páginas se
 * descargan solo cuando el visitante navega a ellas (`lazy`).
 *
 * El errorElement va en la ruta sin ruta (pathless) para que un error o
 * un modelo inexistente se muestren DENTRO del layout, con navegación.
 */

/** Convierte un módulo de página (componente por defecto + loader opcional) en ruta perezosa. */
const pagina = (importar, nombreLoader) => async () => {
  const modulo = await importar()
  return { Component: modulo.default, loader: nombreLoader ? modulo[nombreLoader] : undefined }
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        errorElement: <NoEncontradoPage />,
        children: [
          { index: true, element: <InicioPage />, loader: inicioLoader },
          { path: 'modelos', lazy: pagina(() => import('../../features/modelos/pages/ModelosPage.jsx'), 'modelosLoader') },
          {
            path: 'modelos/:id',
            lazy: pagina(() => import('../../features/modelos/pages/ModeloDetallePage.jsx'), 'modeloDetalleLoader'),
          },
          { path: 'comparar', lazy: pagina(() => import('../../features/comparar/pages/CompararPage.jsx'), 'compararLoader') },
          { path: 'ahorro', lazy: pagina(() => import('../../features/ahorro/pages/AhorroPage.jsx')) },
          {
            path: 'distribuidores',
            lazy: pagina(() => import('../../features/distribuidores/pages/DistribuidoresPage.jsx'), 'distribuidoresLoader'),
          },
          { path: 'cotizar', lazy: pagina(() => import('../../features/cotizar/pages/CotizarPage.jsx'), 'cotizarLoader') },
          { path: 'preguntas', lazy: pagina(() => import('../../features/preguntas/pages/PreguntasPage.jsx'), 'preguntasLoader') },
          { path: '*', element: <NoEncontradoPage /> },
        ],
      },
    ],
  },
])

export const AppRouter = () => <RouterProvider router={router} />
