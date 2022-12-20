import { useState, useEffect, useCallback, useMemo } from "react";
import { Product, FetchProductListResult, FetchProductResult } from '../helper/types';
import { defaultProduct } from '../helper/defaultTypesValues'
import axios from "axios";


export function useFetchProductList(nrOfProducts: number): FetchProductListResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  let [reqNr, setReqNr] = useState(0);

  const __fetchProducts = useCallback(async () => {
    if (totalProducts != 0 && productList.length >= totalProducts) {   // stop requests if all products are already requested
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(`https://dummyjson.com/products?limit=10&skip=${nrOfProducts}`);
      if (reqNr < 1) {
        setTotalProducts(res.data.total);
      }
      setProductList(prev => [...prev, ...res.data.products]);

      setLoading(false);
      setReqNr(reqNr++);
    } catch (err) {
      setError(true);
      console.error(err);
    }
  }, [nrOfProducts]);

  useEffect(() => {
    __fetchProducts();
  }, [nrOfProducts]);

  return { loading, error, productList };
}

export function useFetchProduct(productId: number): FetchProductResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState<Product>(defaultProduct);

  useMemo(async () => {
    try {
      setLoading(true);

      const res = await axios.get(`https://dummyjson.com/products/${productId}`);

      setProduct(res.data);
      setLoading(false);
    } catch (err) {
      setError(true);
      console.error(err);
    }
  }, []);     // only one request when the component mounts

  return { loading, error, product };
}
