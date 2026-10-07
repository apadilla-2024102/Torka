import { obtener } from './cliente.js'
import { MOCK_DISTRIBUIDORES } from './mockData.js'

export const getDistribuidores = () => obtener('/distribuidores', MOCK_DISTRIBUIDORES)
