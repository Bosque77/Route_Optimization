/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { useSelector } from 'react-redux'
import LandfillList from '../../components/LandfillTable'
import {State } from '../../state'
import GoogleMap from '../../../archive/GoogleMap'

// import './LandfillPage.css'

const LandfillPage = () => {

    const landfills = useSelector((state: State) => state.landfills)

    return (

        <div>
            <GoogleMap landfills={landfills} />
            <LandfillList />
        </div>

    )
}


export default LandfillPage