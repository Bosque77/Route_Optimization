import React, { useState, useEffect } from 'react'
import { Landfill, Address } from '../types'
import { actionCreators } from '../state'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import geocode from '../services/geocode'
import { LatLng } from '../types'



const LandfillForm = ({ landfill, setEditState }: { landfill: Landfill, setEditState: React.Dispatch<React.SetStateAction<boolean>> }) => {

    console.log('inside the landfill form')
    console.log(landfill)

    if (!landfill) {
        return <div></div>
    }

    useEffect(() => {

        // M.AutoInit()
        console.log('inside useEffect')
        const modal_1 = document.querySelector('#modal1')
        if(modal_1){
            const instance = M.Modal.init(modal_1,{onCloseEnd : () => setEditState(false)})
            instance.open()
        }
        const geo_modal = document.querySelector('#geoModal')
        if(geo_modal){
            M.Modal.init(geo_modal)
        }


    }, [])

    const [name, setName] = useState(landfill.name)
    const [street, setStreet] = useState(landfill.street)
    const [city, setCity] = useState(landfill.city)
    const [state, setState] = useState(landfill.state)
    const [zipcode, setZipcode] = useState(landfill.zipcode.toString())
    const [latitude, setLatitude] = useState(landfill.latitude.toString())
    const [longitude, setLongitude] = useState(landfill.longitude.toString())
    const [active, setStatus] = useState(landfill.active)
    const [lat_lng, setCoord] = useState<LatLng>({ lat: 0.0, lng: 0.0 })
    // let lat_lng = {lat:0.0, lng: 0.0}

    const dispatch = useDispatch()
    const { updateLandfill } = bindActionCreators(actionCreators, dispatch)

    const geoLocate = async () => {
        console.log('inside geoLocate')
        const address: Address = {
            street,
            city,
            state,
            'zipcode': parseInt(zipcode)
        }
        const response = await geocode.get(address)
        console.log(response)
        if(response.status==='ERROR'){
            M.toast({html: `${response.message}`})
        }
        const lat_lng = response.data as LatLng
        setCoord(lat_lng)
        const modal_elem = document.getElementById('geoModal')
        if (modal_elem) {
            const instance = M.Modal.getInstance(modal_elem)
            instance.open()
        }
    }



    const submit = () => {
        console.log('inside on submit')
        const id = landfill.id
        const new_landfill: Landfill = { id, name, street, city, state, 'zipcode': parseInt(zipcode), 'latitude': parseFloat(latitude), 'longitude': parseFloat(longitude), active }
        updateLandfill(new_landfill)
        setEditState(false)
    }

    const assignLatLng = () => {
        setLatitude(lat_lng.lat.toFixed(3))
        setLongitude(lat_lng.lng.toFixed(3))
        const modal_elem = document.getElementById('geoModal')
        if (modal_elem) {
            const instance = M.Modal.getInstance(modal_elem)
            instance.close()
        }

    }

    return (
        <div className="row">
            <div id="modal1" className="modal">
                <div className="modal-content">
                    <h4>Landfill</h4>
                    <form className="col s12" onSubmit={submit}>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="name" type="text" className="validate" value={name} onChange={({ target }) => setName(target.value)} />
                                <label htmlFor="name" className="active">Name</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="street" type="text" className="validate" value={street} onChange={({ target }) => setStreet(target.value)} />
                                <label htmlFor="street" className="active">Street</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="city" type="text" className="validate" value={city} onChange={({ target }) => setCity(target.value)} />
                                <label htmlFor="city" className="active">City</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="state" type="text" className="validate" value={state} onChange={({ target }) => setState(target.value)} />
                                <label htmlFor="state" className="active">State</label>
                            </div>

                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="zipcode" type="number" className="validate" value={zipcode} onChange={({ target }) => setZipcode(target.value)} />
                                <label htmlFor="zipcode" className="active">Zipcode</label>
                            </div>
                            <div className="input-field col s3">
                                <input id="latitude" type="text" className="validate" value={latitude} onChange={({ target }) => setLatitude(target.value)} />
                                <label htmlFor="latitude" className="active">Latitude</label>
                            </div>
                            <div className="input-field col s3">
                                <input id="longitude" type="text" className="validate" value={longitude} onChange={({ target }) => setLongitude(target.value)} />
                                <label htmlFor="longitude" className="active">Longitude</label>
                            </div>
                        </div>
                        <div className="row right-align">
                            <a className="btn-flat offset-s6" onClick={geoLocate}>Geolocate</a>
                        </div>
                        <div className="row left-align" >
                            {(active) ? <a className="red btn-small" onClick={() => setStatus(!active)}>Deactivate</a> : <a className="green lighten-1 btn-small" onClick={() => setStatus(!active)}>Activate</a>}

                        </div>
                        <div className="row right-align">
                            <button className="modal-close waves-effect waves-teal btn-flat" type="submit">Submit</button>
                        </div>
                    </form>
                    <div id="geoModal" className="modal">
                        <div className="modal-content">
                            <h6>Geolocation</h6>
                            <div >Latitude: {lat_lng.lat.toFixed(3)} </div>
                            <div>Longitude: {lat_lng.lng.toFixed(3)}</div>
                            <br />
                            <div className="right row">
                                <div className="col s5=4">
                                    Asign Lat Lng Values
                                </div>
                                <div className="col s2">
                                    <button className="btn" onClick={assignLatLng}>Submit</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default LandfillForm
