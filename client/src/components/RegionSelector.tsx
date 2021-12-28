import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import { actionCreators, State } from '../state'

const TopSpacing = styled.div`
  margin-top: 2em;
`

const RegionSelector = () => {

    console.log('inside Region Selector Component')

    const dispatch = useDispatch()
    const { initializeRegions, setRegion } = bindActionCreators(actionCreators, dispatch)

    const user_token = useSelector((state: State) => state.userToken)
    const regions = useSelector((state: State) => state.regions)
    const set_region = useSelector((state: State) => state.setRegion)


    useEffect(() => {
        // M.AutoInit()
        const elems = document.querySelectorAll('.dropdown-trigger')
        M.Dropdown.init(elems, { constrainWidth: false })

        const add_region_modal = document.querySelector('#addRegionModal')
        if (add_region_modal) {
            M.Modal.init(add_region_modal)
        }

        if (user_token) {
            if (!regions) {
                initializeRegions(user_token.token)
            } else {
                setRegion(regions[0])
            }

        }

    }, [regions])


    const insertRegionTabs = () => {
        return (
            regions?.map(region =>
                <li key={region.id}><a href="#!" onClick={() => setRegion(region)}>{region.name}</a></li>
            )

        )
    }

    const createRegion = () => {
        console.log('inside createRegion')
    }

    const openAddRegionModal = () => {
        const modal_elem = document.getElementById('addRegionModal')
        if (modal_elem) {
            const instance = M.Modal.getInstance(modal_elem)
            instance.open()
        }
    }


    return (
        <div>
            <TopSpacing >
                <div className="row right-align">
                    <div className="col offset l10 right-align">
                        <a className='dropdown-trigger btn' href='#' data-target='dropdown1'>{set_region?.name}</a>
                    </div>
                    <div className="col right-align">
                        <button className='btn-floating' onClick={openAddRegionModal}><i className="material-icons">add</i></button>
                    </div>
                    <div className="col right-align">
                        <button className='btn-floating black' ><i className="material-icons">delete</i></button>
                    </div>

                </div>
            </TopSpacing>

            <ul id='dropdown1' className='dropdown-content'>
                {insertRegionTabs()}
            </ul>

            <div id="addRegionModal" className="modal">
                <div className="modal-content">
                    <h6>Insert Region</h6>
                    <br />
                    <div className="right row">
                        <div className="col s2">
                            <button className="btn" onClick={createRegion}>Submit</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}


export default RegionSelector

