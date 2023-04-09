import Alert from "../../components/Alert";
import SideNav from "../../components/SideNav/SideNav";
import GoogleMapWithMarkers from "../../components/GoogleMapWithMarkers";
import RegionSelector from "../../components/RegionSelector";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import { initializeOrders } from "../../state/action-creators";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../../state";
import { bindActionCreators } from "redux";

const RoutePage = () => {
  const markers = [
    { lat: 40.7128, lng: -74.006 },
    { lat: 40.73061, lng: -73.935242 },
    { lat: 40.706086, lng: -74.009051 },
  ];

  const dispatch = useDispatch();
  const region = useSelector((state: State) => state.setRegion);
  const orders = useSelector((state: State) => state.orders);
  const [selectedDate, handleDateChange] = useState(new Date());
  const { initializeOrders } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (region) {
      initializeOrders(region, selectedDate.toDateString());
    }
  }, [region, selectedDate]);

  return (

    <div className="flex min-h-screen bg-slate-100 overflow-y-auto">
      <Alert />
      <div className="w-64 bg-slate-50">
        <SideNav />
      </div>
      <div className="mx-auto flex flex-col w-2/3">
        <div className="flex flex-row justify-end">
          <RegionSelector />
        </div>

        <div
          className="mx-auto mt-8"
          style={{ height: "500px", width: "100%" }}
        >
          <GoogleMapWithMarkers
            centerLatitude={40.7128}
            centerLongitude={-74.006}
            markers={markers}
          />

        </div>
        <div className="my-6 text-left">
            <label className="ml-2">Select Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date) => handleDateChange(date)}
              className="border-2 rounded w-48 p-2"
              popperPlacement="bottom-start"
            />
            <div className="mt-8">
            <Dropdown orders={orders} selected_date={selectedDate}/>
            </div>
 
          </div>
      </div>
    </div>
  );
};

export default RoutePage;
