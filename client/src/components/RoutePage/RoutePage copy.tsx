/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { Component, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import VehicleList from '../VehicleList'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from '../../state'
import { initializeDepots, initializeLandfills, initializeOrders, initializeVehicles } from '../../state/action-creators'
import GoogleMap from '../GoogleMap'
import VehicleList from '../VehicleList'
import RouteItemSummaryList from '../RouteItemSummaryList'
import styled from 'styled-components'
import RouteList from '../RouteList'
import AddRouteItem from '../AddRouteItem'
import { Order } from '../../types'
import ReactDOM from 'react-dom'

const Spacing = styled.div`
  margin-top: 2em;
`


const RoutePage = () => {

    const dispatch = useDispatch()
    const { initializeOrders, initializeLandfills, initializeDepots, initializeVehicles } = bindActionCreators(actionCreators, dispatch)
    const region = useSelector((state: State) => state.setRegion)
    const [date, setDate] = useState<Date>(new Date())
    const [assignedOrders, setAssignedOrders] = useState<Order[]>([])
    const [route_list_ids, setRouteListIds] = useState(['original-route-list'])


    useEffect(() => {
        console.log('inside useEffect')
        const elems = document.querySelectorAll('.datepicker')
        // const date = new Date()
        M.Datepicker.init(elems, { defaultDate: date, setDefaultDate: true, onSelect: (date) => onDateChange(date) })
        if (region) {

            initializeOrders(region, date.toDateString())
            initializeDepots(region)
            initializeLandfills(region)
            initializeVehicles(region)
        }

    }, [region])


    useEffect(() => {

        route_list_ids.forEach((id) => {
            const element = document.getElementById(id)
            if (element) {
                ReactDOM.render(<div className="row">
                    <div className="col l10">
                        <RouteList orders={orders} depots={depots} landfills={landfills} date={date} assignedOrders={assignedOrders} setAssignedOrders={setAssignedOrders} />
                    </div>
                    <div className="col l2">
                        <button className="btn black" onClick={() => deleteRouteList(id)}><i className="large material-icons">delete</i></button>
                    </div>
                </div>, element)
            }
        })




    })

    const orders = useSelector((state: State) => state.orders)
    const landfills = useSelector((state: State) => state.landfills)
    const depots = useSelector((state: State) => state.depots)
    // const vehicles = useSelector((state: State) => state.vehicles)






    const computeRoutes = () => {
        console.log('inside compute routes')
    }

    const onDateChange = async (date: Date) => {
        console.log('on date change')
        const date_string = date.toDateString()

        console.log(date_string)
        if (region) {
            await initializeOrders(region, date_string)
        }

        setDate(date)

    }

    const addRouteList = () => {
        console.log('inside add route list')
        const element = document.getElementById('route-list')
        // element?.append()
        const id = Math.random().toString() //or some such identifier 
        const d = document.createElement('div')
        d.id = id
        element?.appendChild(d)
        ReactDOM.render(<div className="row">
            <div className="col l10">
                <RouteList orders={orders} depots={depots} landfills={landfills} date={date} assignedOrders={assignedOrders} setAssignedOrders={setAssignedOrders} />
            </div>
            <div className="col l2">
                <button className="btn black" onClick={() => deleteRouteList(id)}><i className="large material-icons">delete</i></button>
            </div>
        </div>, document.getElementById(id))

        const updated_route_list_ids = [...route_list_ids]
        updated_route_list_ids.push(id)
        setRouteListIds(updated_route_list_ids)
    }

    const deleteRouteList = (html_id: string) => {
        console.log('inside delete route list')
        console.log(html_id)
        const element = document.getElementById(html_id)
        if (element) {
            ReactDOM.unmountComponentAtNode(element)
            const new_route_list_ids = route_list_ids.filter( id => id != html_id)
            setRouteListIds(new_route_list_ids)
        }

    }






    return (

        <div>
            <GoogleMap />
            <Spacing />
            <div className="row">
                <div className="col l3">
                    <input type="text" className="datepicker" placeholder='Select Date' />
                </div>
            </div>
            <div className='row'>
                <div className='col l4'>
                    <RouteItemSummaryList orders={orders} depots={depots} landfills={landfills} date={date} assignedOrders={assignedOrders} />
                </div>
                <div className='col l8 left-align' id='route-list'>
                    <button className='btn grey darken-3' onClick={() => addRouteList()} >Add Route</button>

                    <div className="row" id='original-route-list'>
                        <div className="col l10">
                            <RouteList orders={orders} depots={depots} landfills={landfills} date={date} assignedOrders={assignedOrders} setAssignedOrders={setAssignedOrders} />
                        </div>
                        <div className="col l2">
                            <button className="btn black" onClick={() => deleteRouteList('original-route-list')}><i className="large material-icons">delete</i></button>
                        </div>
                    </div>


                </div>
            </div>

        </div>

    )
}



export default RoutePage