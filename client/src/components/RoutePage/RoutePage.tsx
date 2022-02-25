/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import VehicleList from '../VehicleList'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from '../../state'

import GoogleMap from '../GoogleMap'

import RouteItemSummaryList from '../RouteItemSummaryList'
import styled from 'styled-components'

import { Order } from '../../types'

import RouteLists from '../RouteLists'

const Spacing = styled.div`
  margin-top: 2em;
`


const RoutePage = () => {

    const dispatch = useDispatch()
    const { initializeOrders, initializeLandfills, initializeDepots, initializeVehicles } = bindActionCreators(actionCreators, dispatch)
    const region = useSelector((state: State) => state.setRegion)
    const [date, setDate] = useState<Date>(new Date())
    const [assignedOrders, setAssignedOrders] = useState<Order[]>([])



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




    const orders = useSelector((state: State) => state.orders)
    const landfills = useSelector((state: State) => state.landfills)
    const depots = useSelector((state: State) => state.depots)



    const onDateChange = async (date: Date) => {
        console.log('on date change')
        const date_string = date.toDateString()

        console.log(date_string)
        if (region) {
            await initializeOrders(region, date_string)
        }

        setDate(date)

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
                    <RouteLists orders={orders} depots={depots} landfills={landfills} date={date} assignedOrders={assignedOrders} setAssignedOrders={setAssignedOrders} />
                </div>
            </div>

        </div>

    )
}



export default RoutePage