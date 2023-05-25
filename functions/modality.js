const modalidad = [
    {
        "id_interno":"963046",
       "id": 0,
       "value": "(Seleccionar)",
       "order": 0,
       "key": "indicar"
    },
    {
        "id_interno":"385132",
       "id": 1,
       "value": "Presencial",
       "order": 1,
       "key": "trabajo-solo-presencial"
    },
    {
        "id_interno":"100822",
       "id": 2,
       "value": "Solo teletrabajo",
       "order": 2,
       "key": "solo-teletrabajo"
    },
    {
        "id_interno":"905272",
       "id": 3,
       "value": "Híbrido",
       "order": 3,
       "key": "teletrabajo-posible"
    },
    {
        "id_interno":"298452",
       "id": 4,
       "value": "Sin especificar",
       "order": 4,
       "key": "no-se-sabe-no-esta-decidido"
    }
 ]


 export const getModalidad = (id) => {
    return modalidad.find((item) => item.id_interno === id)
 }


 export const getModalidadId = (id) => {
    return modalidad.find((item) => item.id === id).id_interno
 }