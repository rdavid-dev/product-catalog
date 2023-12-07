import { useEffect, useState } from "react";
import { get } from "../../helpers/axios";
import ProductCard from "../../components/ProductCard";
import LoadingSpinner from "../../components/LoadingSpinner";

const Home = () => {
    const [products, setProducts] = useState({});

    /**
     * Get Top 5 Products
     */
    const getTopRatedProducts = async () => {
        try {
            const response = await get('/products/top-rated')

            setProducts(response)
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * Fetch the list of top rated products when the component loaded
     */
    useEffect(() => {
        getTopRatedProducts()
    }, []);

    return (
        <div>
            <h1>Top 5 Products</h1>
            {
                products?.length > 0
                ?
                    <section className="container mx-auto p-10 md:py-12 px-0 md:p-8 md:px-0">
                        <section
                            className="p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 items-start ">
                            {
                                products
                                .map((product) => (
                                    <ProductCard product={product} key={product.id} />
                                ))
                            }
                        </section>
                    </section>
                :
                   <LoadingSpinner />
            }
        </div>
    );
}

export default Home;