import _ from "lodash";
import { useState } from "react";
import ProductViewModal from "./ProductViewModal";
import EnquiryForm from "./EnquiryForm";

const ProductCard = ({product}) => {
    const [isView, setIsView] = useState(false);
    const [isEnquiry, setIsEnquiry] = useState(false);

    return (
        <div>
            <section className="p-5 py-10 bg-purple-50 text-center transform duration-500 hover:-translate-y-2 cursor-pointer">
                <img src={product.image} alt="" />
                <div className="space-x-1 flex justify-center mt-10">
                    {
                        _.range(1, parseInt(product.rating.rate)).map((i) => (
                            <svg key={i} className="w-4 h-4 mx-px fill-current text-orange-600" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 14 14">
                                <path
                                    d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z">
                                </path>
                            </svg>
                        ))
                    }
                </div>
                <h1 className="text-3xl my-5">
                    <a onClick={(e) => setIsView(true)}>{product.title}</a>
                </h1>
                <p className="mb-5">
                    {
                        product.description.length > 18 ? product.description.substring(0, 100) + '...' : product.description
                    }
                </p>
                <h2 className="font-semibold mb-5">${product.price}</h2>
                <button 
                    onClick={(e) => setIsEnquiry(true)}
                    className="p-2 ml-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600">Enquiry</button>
            </section>

            <ProductViewModal isOpen={isView} onClose={() => setIsView(false)} product={product}/>
            <EnquiryForm isOpen={isEnquiry} onClose={() => setIsEnquiry(false)} product={product}/>
        </div>
    );
}

export default ProductCard;

