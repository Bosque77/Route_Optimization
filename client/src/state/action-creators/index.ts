import { ActionType } from '../action-types'
import { Action } from '../actions'
import landfillService from '../../services/landfills'
import loginService from '../../services/login'
import regionService from '../../services/regions'
import driverService from '../../services/driver'
import { Dispatch } from 'redux'
import { Driver, Landfill, LoginInfo, NewLandfill, NewRegion, Region, UserToken } from '../../types'




export const initializeRegions = () => {
    return async (dispatch: Dispatch<Action>) => {
        const regions = await regionService.getAll()
        dispatch({
            type: ActionType.INIT_REGIONS,
            data: regions
        })
    }
}



export const setRegion = (region: Region) => {
    return {
        type: ActionType.SET_REGION,
        data: region
    }
}


export const initializeLandfills = (region:Region) => {
    return async (dispatch: Dispatch<Action>) => {
        const landfills = await landfillService.getByRegion(region)
        dispatch({
            type: ActionType.INIT_LANDFILLS,
            data: landfills
        })
    }
}


export const initializeDrivers = (region:Region) => {
    return async (dispatch: Dispatch<Action>) => {
        const drivers = await driverService.getAll()
        // const drivers = await driverService.getByRegion(region)
        dispatch({
            type: ActionType.INIT_DRIVERS,
            data: drivers
        })
    }
}


export const createLandfill = (landfill: NewLandfill) => {
    return async (dispatch: Dispatch<Action>) => {
        const new_landfill = await landfillService.createNew(landfill)
        console.log('about to dispatch the new landfill')
        console.log(new_landfill)
        dispatch({
            type: ActionType.ADD_LANDFILL,
            data: new_landfill,
        })
    }
}

export const createRegion = (region:NewRegion) => {
    return async (dispatch: Dispatch<Action>) => {
        const new_region = await regionService.createNew(region)
        dispatch({
            type: ActionType.ADD_REGION,
            data: new_region,
        })
    }
}

export const updateLandfill = (updated_landfill: Landfill) => {

    return async (dispatch: Dispatch<Action>) => {
        const landfill = await landfillService.put(updated_landfill)
        dispatch({
            type: ActionType.UPDATE_LANDFILL,
            data: landfill
        })
    }
}


export const updateDriver = (updated_driver: Driver) => {

    return async (dispatch: Dispatch<Action>) => {
        const driver = await driverService.put(updated_driver)
        dispatch({
            type: ActionType.UPDATE_DRIVER,
            data: driver
        })
    }
}

export const deleteLandfill = (landfill: Landfill) => {
    return async (dispatch: Dispatch<Action>) => {
        await landfillService.deleteLandfill(landfill)  
        dispatch({
            type: ActionType.DELETE_LANDFILL,
            data: landfill
        })
    }
}

export const deleteDriver = (driver: Driver) => {
    return async (dispatch: Dispatch<Action>) => {
        await driverService.deleteDriver(driver)  
        dispatch({
            type: ActionType.DELETE_DRIVER,
            data: driver
        })
    }
}


export const deleteRegion = (region:Region) => {
    return async (dispatch: Dispatch<Action>) => {
        await regionService.remove(region)  
        dispatch({
            type: ActionType.DELETE_REGION,
            data: region
        })
    }
}

export const loginUser = (login_info: LoginInfo) => {
    return async (dispatch: Dispatch<Action>) => {
        const user_data: UserToken = await loginService.login(login_info)
        window.localStorage.setItem('user_token', JSON.stringify(user_data))
        dispatch({
            type: ActionType.SET_USER_TOKEN,
            data: user_data
        })
    }
}


export const setUserToken = (user_token: UserToken | null) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SET_USER_TOKEN,
            data: user_token
        })
    }
}