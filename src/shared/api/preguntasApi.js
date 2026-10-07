import { obtener } from './cliente.js'
import { MOCK_PREGUNTAS } from './mockData.js'

export const getPreguntas = () => obtener('/preguntas', MOCK_PREGUNTAS)
