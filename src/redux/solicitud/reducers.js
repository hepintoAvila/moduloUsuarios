import { SolicitudesActions } from './action'

const init = {
  loading: false,
  solicitudes: [],
  error: false,
}

export const Solicitud = (store = init, { type, payload }) => {
  switch (type) {
    case SolicitudesActions.GET_SOLICITUDES_REQUEST: {
      return {
        ...store,
        loading: true,
        error: false,
      }
    }
    case SolicitudesActions.GET_SOLICITUDES_SUCCESS: {
      return {
        ...store,
        loading: false,
        fruits: payload,
      }
    }
    case SolicitudesActions.GET_SOLICITUDES_FAILURE: {
      return {
        ...store,
        loading: false,
        error: true,
      }
    }

    default:
      return store
  }
}
export default Solicitud;