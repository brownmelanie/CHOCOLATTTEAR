import React from 'react';
import Navbar from '../components/navbar';
import FloatingButton from '../components/foatingButton';

const Merch = () => {
    const products = [
        {
            id: 1,
            image: "https://www.homiescrew.com/cdn/shop/files/1_1.png?v=1724210485&width=1100",
            title: "HOMIES X CHOCÖLATTE TEAR",
            price: "$30.00 USD",
            description: "An exclusive piece that captures the expression of a vandal creating art with their VHS.",
            features: [
                "100% high quality heavy weight cotton",
                "Screen printing artwork",
                "Homies woven label at interior neck"
            ],
            shopUrl: "https://www.homiescrew.com/products/homies-cizalla-t-shirt-x-ou"
        },
        {
            id: 2,
            image: "https://www.homiescrew.com/cdn/shop/files/PUAS1.png?v=1718149578&width=1100",
            title: "HOMIES X CHOCÖLATE TEAR",
            price: "$30.00 USD",
            description: "Puas is an exclusive piece that shows us that fences and obstacles are not enough when it's our turn to create art.",
            features: [
                "100% high quality heavy weight cotton",
                "Screen printing artwork",
                "Homies woven label at interior neck"
            ],
            shopUrl: "https://www.homiescrew.com/products/homies-puas-t-shirt-x-ou"
        }
    ];

    return (
        <>
            <Navbar />
            <div className="w-full px-10 md:px-6 py-8">
                <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
                    {products.map((product) => (
                        <div 
                            key={product.id} 
                            className="flex-1 overflow-hidden m-[50px]"
                        >
                            <div className="flex justify-center overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-3/4 h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                            
                            <div className="p-6 font-montserrat">
                                <h3 className="text-xl font-bold mb-2">
                                    {product.title}
                                </h3>
                                <p className="text-lg font-semibold text-gray-700 mb-4">
                                    {product.price}
                                </p>
                                
                                <p className="text-gray-600 mb-4">
                                    {product.description}
                                </p>
                                
                                <div className="space-y-2 mb-6">
                                    {product.features.map((feature, index) => (
                                        <p key={index} className="text-sm text-gray-500">
                                            • {feature}
                                        </p>
                                    ))}
                                </div>
                                
                                <button 
                                    onClick={() => window.location.href = product.shopUrl}
                                    className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                                >
                                    GO TO SHOP
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <FloatingButton/>
        </>
    );
};

export default Merch;