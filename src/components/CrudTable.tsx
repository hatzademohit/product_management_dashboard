import { Button, Form, Pagination } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useProduct } from '../context/ProductContext';
import AddEditModal from './AddEditModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import { useState } from 'react';
import AppTooltip from './AppTooltip';
import * as XLSX from "xlsx";

type CrudTableProps = {
    columns: string[];
    data: any[];
}
const CrudTable = ({ columns, data }: CrudTableProps) => {
    const { viewProduct, editProduct, deleteProduct, selectedProduct, setSelectedProduct, addProdcutModal } = useProduct();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const exportExcel = () => {
        // Convert table data to worksheet format
        const worksheetData = data.map(item => {
            const row: any = {};
            columns.forEach(col => {
                row[col] = item[col];
            });
            return row;
        });

        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

        // Download Excel file
        XLSX.writeFile(workbook, "products.xlsx");
    };

    return (
        <div className='w-100'>
            <div className="d-flex justify-content-between align-items-center mb-1">
                <div className="d-flex gap-2 w-100 align-items-center">
                    <Form.Select
                        size="sm"
                        style={{ width: "110px", marginRight: 'auto' }}
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                    >
                        <option value={5}>Show 5</option>
                        <option value={10}>Show 10</option>
                        <option value={15}>Show 15</option>
                        <option value={data?.length}>All</option>
                    </Form.Select>

                    <Button className="btn-sm ml-auto" variant="dark" onClick={() => addProdcutModal()}>Add Product</Button>

                    <Button variant="outline-success" size="sm" onClick={exportExcel}>
                        Export Excel
                    </Button>
                </div>
            </div>

            <div className='crud-table mb-2'>
                <Table striped bordered hover className='mb-0'>
                    <thead>
                        <tr>
                            <th>#</th>
                            {columns && columns?.map((col, index) => (
                                <th key={index}>{col.charAt(0).toUpperCase() + col.slice(1)}</th>
                            ))}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData && paginatedData?.map((row, index) => (
                            <tr key={index}>
                                <td>{row?.id}</td>
                                {columns && columns?.map((col, colIndex) => (
                                    <td key={`row-${row?.id}-col-${colIndex}`}>
                                        {col === 'image' ?
                                            <img src={row[col]} alt={row.title} className="img-fluid product-image" />
                                            :
                                            col === 'description' && row[col].length > 50 ?
                                                <AppTooltip content={row[col]}>
                                                    <span style={{ maxWidth: "250px" }}>
                                                        {row[col].substring(0, 50) + "..."}
                                                    </span>
                                                </AppTooltip>
                                                : row[col]}
                                    </td>
                                ))}
                                <td>
                                    <div className='d-flex gap-2'>
                                        <Button variant="success" size='sm' onClick={() => viewProduct(row)}>View</Button>
                                        <Button variant="primary" size='sm' onClick={() => editProduct(row)}>Edit</Button>
                                        <Button variant="danger" size='sm' onClick={() => { setSelectedProduct(row); setShowDeleteModal(true); }}>Delete</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {data?.length === 0 && (
                            <tr>
                                <td colSpan={columns.length + 2} className="text-center">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <Pagination className="justify-content-end" size="sm">
                {[...Array(totalPages)].map((_, i) => (
                    <Pagination.Item
                        key={i}
                        active={i + 1 === currentPage}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </Pagination.Item>
                ))}
            </Pagination>

            <AddEditModal />
            <DeleteConfirmModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={async () => {
                    if (!selectedProduct) return;
                    await deleteProduct(selectedProduct.id as number);
                    setShowDeleteModal(false);
                }}
                title="Delete Product"
                message={
                    <>
                        Are you sure you want to delete the product <mark>{selectedProduct?.title}</mark>?
                    </>
                }
            />

        </div>
    );
}

export default CrudTable;