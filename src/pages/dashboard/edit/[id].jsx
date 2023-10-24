import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FormProduct from '@components/FormProduct';
import axios from 'axios';
import endPoints from '@services/api';
import Alert from '@common/Alert';
import useAlert from '@hooks/useAlert';

export default function Edit() {
  const router = useRouter();

  const [product, setProduct] = useState({});

  const [open, setOpen] = useState(false);

  const [error, setError] = useState(false);

  const { alert, setAlert, toggleAlert } = useAlert();

  useEffect(() => {
    const { id } = router.query;

    if (!router.isReady) return;

    async function getProduct() {
      const response = await axios.get(endPoints.products.getProduct(id));
      return response;
    }
    getProduct()
      .then((response) => {
        setError(false);
        setProduct(response.data);
      })
      .catch((error) => {
        setError(true);
        setAlert({
          active: true,
          message: error.message,
          type: 'error',
          autoClose: true,
        });
      });
  }, [router.isReady, router.query, setAlert]);

  if (error) {
    return  <Alert alert={alert} handleClose={toggleAlert} />;
  }
    return (
        <>
            <Alert alert={alert} handleClose={toggleAlert} />
            <FormProduct setOpen={setOpen} setAlert={setAlert} product={product} />
        </>
  );
}


