import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export interface Product {
    id?: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: File | string;
}

type productContextType = {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    error: string | null;
    viewProduct: (row: Product) => Promise<void>;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    selectedProduct: Product | null;
    setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
    editProduct: (row: Product) => Promise<void>;
    updateProduct: (data: Product) => Promise<void>;
    deleteProduct: (id: number) => Promise<void>;
    filteredProducts?: string;
    setFilteredProducts: React.Dispatch<React.SetStateAction<string>>;
    searchItems: string;
    setSearchItems: React.Dispatch<React.SetStateAction<string>>;
    modalHeading?: string;
    addProdcutModal: () => void;
    addProduct: (product: Product) => Promise<void>;
}

const ProductContext = createContext<productContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [filteredProducts, setFilteredProducts] = useState<string>('');
    const [searchItems, setSearchItems] = useState<string>('');
    const [modalHeading, setModalHeading] = useState<string>("");

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
            .then(res => setProducts(res.data))
            .catch(err => {
                setError(err.message || "Failed to fetch products");
            });
    }, []);

    const viewProduct = async (row: Product) => {
        setSelectedProduct(row);
        setModalHeading("View Product");
        setShowModal(true);
    }

    const editProduct = async (row: Product) => {
        setSelectedProduct(row);
        setModalHeading("Edit Product");
        setShowModal(true);
    };

    const updateProduct = async (updatedProduct: Product) => {
        try {
            const res = await axios.put(
                `https://fakestoreapi.com/products/${updatedProduct.id}`,
                updatedProduct
            );

            setProducts(prev =>
                prev.map(p => (p.id === updatedProduct.id ? res.data : p))
            );

            setShowModal(false);
        } catch (err: any) {
            setError(err.message || "Failed to update product");
        }
    };

    const deleteProduct = async (id: number) => {
        try {
            await axios.delete(`https://fakestoreapi.com/products/${id}`);
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (err: any) {
            setError(err.message || "Failed to delete product");
        }
    };

    const addProdcutModal = () => {
        setSelectedProduct(null);
        setModalHeading("Add Product");
        setShowModal(true);
    }

    const addProduct = async (product: Product) => {
        try {
            const res = await axios.post("https://fakestoreapi.com/products", product);
            setProducts(prev => [...prev, res.data]);
            setShowModal(false);
            setSelectedProduct(null);
        } catch (error: any) {
            setError(error.message || "Failed to add product");
        }
    };

    return (
        <ProductContext.Provider value={{ products, setProducts, error, viewProduct, showModal, setShowModal, selectedProduct, setSelectedProduct, editProduct, updateProduct, deleteProduct, filteredProducts, setFilteredProducts, searchItems, setSearchItems, modalHeading, addProdcutModal, addProduct }}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProduct = (): productContextType => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProduct must be used within a ProductProvider');
    }
    return context;
}   