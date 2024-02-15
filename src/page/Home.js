import {useGetProductsQuery, useFetchProductsMutation} from "../API/API"
import {useCart} from "../Providers/CartContext"

import {Link, useParams} from "react-router-dom";
import React from "react";
import Header from "../Components/header";
import styles from '../index.css';


export default function () {
    let {ID} = useParams()
    let {cart, addToCart} = useCart()
    let {data, isFetching} = useGetProductsQuery()

    return <div>

        {isFetching ? <h1> loading..... </h1> : <div>
            <Header/>
            <h1 className="text-3xl text-center"> La liste des produits disponible </h1>
            <div className="flex flex-wrap p-16 justify-start gap-24 p-32">
                <ProductList/>
            </div>
        </div>}
    </div>
}

function ProductList() {

    let {data, isFetching} = useGetProductsQuery()
    let {id} = useParams()

    return data.map((product) => {
        return <div className=" w-[350px] h-fit border border-4 rounded">
            <img className="object-cover rounded w-full h-full" src={product.image}/>
            <hr/>
            <div className="flex flex-col items-center">
                <h3>{product.title}</h3>
                <h3 className="font-bold"> prix:{product.price} €</h3>
                <Link className="border border-black rounded p-1" to={`/products/${product.id}`}> Go to article </Link>
            </div>
        </div>


    })


}

function ArticlesList() {

    let {data, isFetching} = useGetProductsQuery()

    return data.map((article) => {
        return <h3>{article.title}</h3>
    })

}

