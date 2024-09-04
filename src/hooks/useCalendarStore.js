import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';
import { calendarApi } from '../services';
import { convertEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';


export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async( calendarEvent ) => {

        try {
            if( calendarEvent.id ) {
                // Actualizando
                const { data } = await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent)
                console.log({data})

                dispatch( onUpdateEvent({ ...calendarEvent, user }) );
                return
            }
                // Creando
                const { data } = await calendarApi.post('/events', calendarEvent)
                dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) );
        } catch (error) {
            console.log(error)
            Swal.fire('error al guardar', error?.response?.data?.msg, 'error')
        }
    }

    const startDeletingEvent = async() => {
        try {
                // Eliminando
                await calendarApi.delete(`/events/${ activeEvent.id }`)

                dispatch( onDeleteEvent() );
        } catch (error) {
            console.log(error)
            Swal.fire('error al borrar', error?.response?.data?.msg, 'error')
        }        
    }

    const startLoadingEvents = async()=>{
        try {
            const { data } = await calendarApi.get('/events')
            const events = convertEventsToDateEvents(data.events)
            console.log(events)
            dispatch( onLoadEvents( events ) )


        } catch (error) {
            console.log('error al cargar eventos')
        }
    }


    return {
        //* Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        //* Métodos
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,
        startLoadingEvents
    }
}
