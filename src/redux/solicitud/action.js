import axios from 'axios'
import { environments } from '../../environments/environments'

export const SolicitudesActions = {
  GET_SOLICITUDES_REQUEST: 'GET_SOLICITUD_REQUEST',
  GET_SOLICITUDES_SUCCESS: 'GET_SOLICITUD_SUCCESS',
  GET_SOLICITUDES_FAILURE: 'GET_SOLICITUD_FAILURE',
}

export const getdataRequest = () => ({
  type: SolicitudesActions.GET_SOLICITUDES_REQUEST,
})

export const getdataSuccess = (data) => ({
  type: SolicitudesActions.GET_SOLICITUDES_SUCCESS,
  payload: data,
})

export const getdataFailure = () => ({
  type: SolicitudesActions.GET_SOLICITUDES_FAILURE,
})
export const fetchSolicitudes =
  ({ userlogin }) =>
  (dispatch) => {
    dispatch(getdataRequest())
    console.log(userlogin)
    return axios
      .post(`${environments.baseURL}`, userlogin)
      .then((res) => {
        alert('Logged In Successful')
        localStorage.setItem('tvappletoken', JSON.stringify(res.data.token))
        dispatch(getdataRequest(res.data.token))
        // if (res.data.error == false) {
        //     onClose()
        // }
      })
      .catch((err) => {
        alert('Wrong Appli Id or Password')
        dispatch(getdataFailure())
      })
  }

