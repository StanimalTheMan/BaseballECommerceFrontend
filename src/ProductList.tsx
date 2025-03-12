import { useEffect, useState } from "react";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9; // Show 9 products per page

    useEffect(() => {
        async function fetchProducts() {
            const response = await fetch("https://localhost:7068/api/categories/C3F6B090-24DE-4F25-9895-1234567A2BC5/products");
            const data = await response.json();
            console.log(data);
            data.sort((a, b) => {
                const numA = parseInt(a.name.match(/\d+/)[0], 10); // Extracts the number from the name
                const numB = parseInt(b.name.match(/\d+/)[0], 10); // Extracts the number from the name
                return numA - numB; // Sort numerically
            });
            setProducts(data);
        }

        fetchProducts();
    }, []);

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <ul className="grid grid-cols-3 gap-4 p-4">
                {currentProducts.map((product) => (
                    <li key={product.id} className="flex flex-col items-center p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            width={150}
                            height={150}
                            className="mb-2 rounded-full"
                        />
                        <span className="text-lg font-semibold text-center">{product.name}</span>
                    </li>
                ))}
            </ul>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className="mx-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    );
};

export default ProductList;
