import { useEffect, useState } from "react";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        async function fetchProducts() {
            const response = await fetch("https://localhost:7068/api/categories/C3F6B090-24DE-4F25-9895-1234567A2BC5/products");
            const data = await response.json();
            console.log(data);
            setProducts(data);
        }

        fetchProducts();
    }, []);

    return (
        <ul>
            {products.map(product => {
                return <li>{product.name}</li>
            })}
        </ul>
    )
}

export default ProductList;