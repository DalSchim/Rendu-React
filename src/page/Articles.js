import {useGetProductsQuery, useFetchProductsMutation, } from "../API/API"
import {useCart} from "../Providers/CartContext"

import {Link, useParams} from "react-router-dom";
import React from "react";
import Articleid from "../Components/Articlesid";




export default function () {

    let {id} = useParams()
    let {cart, addToCart} = useCart()
    let {data, isFetching} = useGetProductsQuery()


    if (isFetching) {
        return <div>Loading...</div>;
    }
        return data.map((product) => {

            return product.id === id ? <div>

                <Articleid/>


            </div> : <div>

            </div>
        })
}
