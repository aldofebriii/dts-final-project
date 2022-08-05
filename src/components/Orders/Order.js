import { useEffect, useState } from "react";
import useFetch from "../../hooks/use-fetch";
import OrderItem from "./OrderItem";

const Orders = ({id, user, items}) => {
    const sendRequest = useFetch()[2];
    const [loadedOrders, setLoadedOrders] = useState([]);

    useEffect(() => {
        sendRequest({uri: 'https://learn-react-movies-905c4-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', method: 'GET'}, (rawData) => {
            const _temp = [];
            for(const orderId in rawData){
                _temp.push(<OrderItem key={orderId} id={orderId} user={rawData[orderId].user} items={rawData[orderId].items}/>)
            };
            setLoadedOrders(_temp);
        });
    },[loadedOrders]);

    let ctx;
    if(loadedOrders.length === 0){
        ctx = <p>No Order Was Made</p>
    } else {
        ctx = loadedOrders;
    };
    return <>
    <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Orders</h2>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {ctx}
            </div>
        </div>
        </div>
    </>
};

export default Orders;