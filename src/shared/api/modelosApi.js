import { obtener } from './cliente.js'
import { MOCK_MODELOS } from './mockData.js'

export const getModelos = () => obtener('/modelos', MOCK_MODELOS)

export const getModeloPorId = async (id) => {
  const modelos = await getModelos()
  return modelos.find((m) => m.id === id) ?? null
}
