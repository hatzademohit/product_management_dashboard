import { CrudTable, Filter } from "../components";
import { useProduct } from "../context/ProductContext";

const Dashboard = () => {
    const { products, filteredProducts, searchItems } = useProduct();

    const filteredData = filteredProducts ? products.filter(p => p.category === filteredProducts) : products;
    const searchedData = searchItems ? filteredData.filter(p => p.title.toLowerCase().includes(searchItems.toLowerCase())) : filteredData;

    return (
        <div className='dashboard d-flex gap-4 p-2'>
            <Filter />
            <CrudTable columns={['title', 'price', 'description', 'category', 'image']} data={searchedData} />
        </div>
    )
}

export default Dashboard