import { Button, Form } from "react-bootstrap";
import { useProduct } from "../context/ProductContext";
import SearchFilter from "./SearchFilter";

const Filter = () => {
    const { products, filteredProducts, setFilteredProducts, searchItems, setSearchItems } = useProduct();
    const uniqueCategories = Array.from(
        new Set(products?.map(product => product.category))
    );
    const getCategoryId = (category: string) =>
        category
            .toLowerCase()
            .replace(/\s+/g, "-")     // spaces → hyphen
            .replace(/[^a-z0-9-]/g, ""); // remove special chars

    return (
        <div className='filter'>
            <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
                <h5 className="m-0">Filter</h5>
                <Button variant="secondary" size="sm" onClick={() => { setFilteredProducts(''); setSearchItems(''); }}>
                    Clear Filter
                </Button>
            </div>
            <SearchFilter
                value={searchItems}
                onChange={setSearchItems}
            />
            <Form.Label className="mb-2">Filter by Categories</Form.Label>
            {uniqueCategories.map(category => (
                <Form.Group className="mb-2" key={category}>
                    <Form.Check
                        type="radio"
                        label={category}
                        id={getCategoryId(category)}
                        name="categories"
                        checked={filteredProducts === category}
                        onChange={() => setFilteredProducts(category)}
                    />
                </Form.Group>
            ))}
        </div>
    )
}

export default Filter;