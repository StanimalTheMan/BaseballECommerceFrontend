import { useEffect, useState } from "react";

const ProductList = () => {
    const [products, setProducts] = useState([]);
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

    return (
        <ul>
            {products.map(product => {
                return <><li>{product.name}</li><img src={product.imageUrl} width={50} height={50} /></>
                
            })}
        </ul>
    )
}

export default ProductList;