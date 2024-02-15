import {useGetProductsQuery, useFetchProductsQuery, usePostCommentMutation} from "../API/API"
import {useParams} from "react-router-dom";
import {useCart} from "../Providers/CartContext";
import React, {useState} from "react";
import Header from "./header";

export default function () {
    let {id} = useParams()
    let {cart, addToCart} = useCart()
    let {data, isFetching} = useGetProductsQuery()

    return data.map((product) => {
        return product.id === id ? <div>
                <Header/>
                <div className="border border-gray-800">
                    <h3 className="text-3xl text-center"
                    >{product.title}</h3>
                    <img
                        className="object-cover rounded h-96 w-96 m-auto"
                        src={product.image}
                        alt={product.title}
                    />
                    <h3 className="font-bold">Prix:{product.price} €</h3>
                    <h3> quantiter : {product.quantity}</h3>
                    <button
                        className="border-2 rounded border-blue-400 m-1 p-3"
                        onClick={() => addToCart(product)}>Add to Cart
                    </button>
                </div>
                <div>
                    <Postcome/>
                    <Commentair/>
                </div>


            </div>
            : <div></div>
    })
}

function Postcome() {
    let {id} = useParams();
    let [username, setUsername] = useState("");
    let [comment, setComment] = useState("");
    let [postComment, {isLoading}] = usePostCommentMutation();
    let [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username && comment) {
            try {
                await postComment({id, username, comment});
                setUsername("");
                setComment("");
                setErrorMessage(""); // Clear any previous error message
            } catch (error) {
                console.error("Failed to post comment: ", error);
            }
        } else {
            setErrorMessage("Both username and comment are required.");
        }
    };

    return (
        <div className="mt-48">
            <h3 className="text-3xl text-center">Post a Comment</h3>
            <form onSubmit={handleSubmit}>
                <input
                    className="border-2 rounded border-blue-400 m-1 p-3"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username..."
                />
                <input
                    className="border-2 rounded border-blue-400 m-1 p-3"
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                />
                <button type="submit" disabled={isLoading}
                        className="border-2 rounded border-blue-400 m-1 p-3"
                >
                    {isLoading ? "Posting..." : "Post Comment"}
                </button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}


function Commentair() {

    let {id} = useParams()
    let {data, isFetching} = useFetchProductsQuery(id)
    if (isFetching) {
        return <div>Loading...</div>;
    }
    return data.map((comments) => {

        return comments.product_id === id ?
            <div className="border-4 rounded border-blue-400 m-1 p-3 ">
                <h3 className="text-gray-500">{comments.username}</h3>
                <hr/>
                <h3>{comments.comment}</h3>
            </div>
            :
            <div>

            </div>

    })

}
