import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "../../slices/productSlices";
import { setProductFiltered } from "../../slices/productSlices";
import ProductCard from "../../components/ProductCard";
import LoadingSpinner from "../../components/LoadingSpinner";

const Products = () => {
    const dispatch = useDispatch();
    const productListing = useSelector((state) => state.productReducer)
    const {products, unfilteredProducts, status} = productListing;
    const [searchTitle, setSearchTitle] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSort, setSelectedSort] = useState('');
    const sortOptions = ['Title', 'Price', 'Rating'];

    /**
     * Handle the Search Filtering
     */
    const handleSearchProduct = () => {
        const productFiltered =  unfilteredProducts
            .filter((product) => !selectedCategory || product.category === selectedCategory)
            .filter((product) => {
                return product.title.toLowerCase().includes(searchTitle.toLowerCase());
            })

        const sortedProducts = [...productFiltered]
        if (selectedSort === "Title") {
            sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        } else if (selectedSort === "Price") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (selectedSort === "Rating") {
            sortedProducts.sort((a, b) => a.rating.rate - b.rating.rate);
        }
        
        dispatch(setProductFiltered([...sortedProducts]))
    }

    /**
     * Fetch the list of products when the component loaded
     */
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProductList());
        }
    }, [status]);
    
    const categories = [...new Set(unfilteredProducts.map((product) => product.category))];
  
    return (
        <div>
            <div className="product-filter-container mb-5">
                <div className="product-wrapper">
                    <input 
                        type="text" 
                        placeholder="Search Product Here" 
                        className="input input-bordered w-full max-w-xs mr-3" 
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                    />

                    <select 
                        className="select select-bordered w-full max-w-xs"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                        <option value="">All Categories</option>
                        {
                            categories?.map((category, i) => (
                                <option key={i} value={category}>{category}</option>
                            ))
                        }
                    </select>

                    <select 
                        className="select select-bordered w-50 max-w-xs ml-2"
                        value={selectedSort}
                        onChange={(e) => setSelectedSort(e.target.value)}
                        >
                            
                            <option value="">Sort by</option>
                        {
                            sortOptions?.map((option, i) => (
                                <option key={i} value={option}>{option}</option>
                            ))
                        }
                    </select>

                    <button className="btn btn-accent ml-2" onClick={handleSearchProduct}>Search Product</button>
                </div>
            </div>
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

export default Products;