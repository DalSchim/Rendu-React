import React from 'react';
import {IoHome} from "react-icons/io5";
import {useCart} from '../Providers/CartContext';
import {Link} from 'react-router-dom'; // Importez le composant Link

function Header() {
    const {cart} = useCart();
    const total = cart.reduce((total, product) => total + Number(product.price), 0);

    const productCounts = cart.reduce((counts, product) => {
        counts[product.title] = (counts[product.title] || 0) + 1;
        return counts;
    }, {});

    return (
        <header className="flex flex-col items-end">
            <div className="flex w-full h-12 items-center justify-between p-3 bg-gray-800 text-white">
                <Link to="/"><IoHome/></Link> {/* Ajoutez le lien vers la page d'accueil */}
            </div>
            <div className=" text-white flex p-2 border border-black rounded bg-gray-800 w-60 absolute">
                <div>
                    {Object.entries(productCounts).map(([title, count], index) => (
                        <div key={index}>
                            <div className="flex gap-2">
                                <h2 className="">{title} (x{count})</h2>
                                <p className="font-bold">{cart.find(product => product.title === title).price} €</p>
                            </div>
                            <hr className="w-full"/>
                        </div>
                    ))}
                    <h2 className="font-bold">Total: {total.toFixed(2)} €</h2>
                </div>
            </div>
        </header>
    );
}

export default Header;