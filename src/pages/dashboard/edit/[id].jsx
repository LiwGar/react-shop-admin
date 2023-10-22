import React, {useEffect, useState} from "react";
import { useRouter } from 'next/router';
import FormProduct from "@components/FormProduct";
import axios from "axios";
import endPoints from "@services/api";
import Alert from "@common/Alert";
import useAlert from "@hooks/useAlert";


export default function Edit () {

    const router = useRouter();

    const [product, setProduct] = useState({});

    // const [notFound, setNotFound] = useState(false);

    const [open, setOpen] = useState(false);
    
    const { alert, setAlert, toggleAlert } = useAlert();


    useEffect(() => {

        const { id } = router.query;

        if (!router.isReady) return;

        async function getProduct() {

            try {

                const response = await axios.get(endPoints.products.getProduct(id));
        
                if (response) {
                    setProduct(response.data);
                }
            }
            catch (error) {
                console.log(error);
                setNotFound(true);
            }
        }

        getProduct().catch((error) => router.push('/notFound')); 

    }, [router?.isReady]);

    return (
    <>   
      	<Alert alert={alert} handleClose={toggleAlert}/>
		<FormProduct setOpen={setOpen} setAlert={setAlert} product={product}/>
    </>  
    )
    
}



// return notFound ? 
// <div 
//     className="mx-4 mb-4 text-2xl font-bold leading-7 text-gray-700 sm:truncate sm:text-3xl sm:tracking-tight">
//     Product Not Found
// </div> : <FormProduct product = {product}/>