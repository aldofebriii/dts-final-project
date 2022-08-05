import { useState, useCallback } from "react";

const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(null);
    const sendRequest = useCallback(async ({uri, method="GET", headers={'Content-type': 'application/json'}, body=null}, dataFn=()=>{}) => {
        setErr(null);
        setIsLoading(true);
        try {
            const response = await fetch(uri, {
                method: method,
                headers: headers,
                body: body
            });
            if(!response.ok){
                throw new Error("Failed on Fetching Data..");
            };
    
            const rawData= await response.json();
            dataFn(rawData);
        } catch(err){
            setErr(err.message);
        };
        setIsLoading(false);
    }, []);

    return [err, isLoading, sendRequest];
};

export default useFetch;