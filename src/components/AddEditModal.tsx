import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useProduct } from '../context/ProductContext';
import RHFInput from './RFHInput';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Col, Form, Image, Row } from 'react-bootstrap';
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../schema/product.schema";

interface ProductFormValues {
    id?: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: File | string;
}

const AddEditModal = () => {
    const { selectedProduct, showModal, setShowModal, updateProduct, modalHeading, addProduct } = useProduct();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        mode: "onChange",
    });

    useEffect(() => {
        reset({
            id: selectedProduct?.id,
            title: selectedProduct?.title || "",
            price: selectedProduct?.price,
            category: selectedProduct?.category || "",
            description: selectedProduct?.description || "",
            image: selectedProduct?.image || "",
        });
    }, [selectedProduct, register]);

    const onSubmit = (data: ProductFormValues) => {
        { modalHeading === "Add Product" ? addProduct(data) : updateProduct(data) }
    };

    return (
        <>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg" className='add-edit-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>{modalHeading}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Row className='gy-2'>
                                {/* Title */}
                                <Col md={6}>
                                    <RHFInput<ProductFormValues>
                                        name="title"
                                        label="Title"
                                        register={register}
                                        error={errors.title}
                                        helperText="Example: iPhone 13"
                                        requiredMark
                                        disabled={modalHeading === "View Product"}
                                        isInvalid={!!errors.title}
                                    />
                                </Col>
                                {/* Price */}
                                <Col md={6}>
                                    <RHFInput<ProductFormValues>
                                        name="price"
                                        type="number"
                                        label="Price"
                                        register={register}
                                        error={errors.price}
                                        helperText="Price in INR"
                                        requiredMark
                                        registerOptions={{ valueAsNumber: true }}
                                        disabled={modalHeading === "View Product"}
                                        isInvalid={!!errors.price}
                                    />

                                </Col>
                                {/* Category */}
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>
                                            Category <span className="text-danger">*</span>
                                        </Form.Label>

                                        <Form.Select
                                            size="sm"
                                            disabled={modalHeading === "View Product"}
                                            isInvalid={!!errors.category}
                                            {...register("category")}
                                        >
                                            <option value="">Select category</option>
                                            <option value="electronics">Electronics</option>
                                            <option value="men's clothing">Men's Clothing</option>
                                            <option value="women's clothing">Women's Clothing</option>
                                            <option value="jewelery">Jewelery</option>
                                        </Form.Select>

                                        <Form.Control.Feedback type="invalid">
                                            {errors.category?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                {/* Description */}
                                <Col md={6}>
                                    <Form.Label htmlFor='product-description' className='m-0'>
                                        Product Description<span aria-hidden="true" className="text-danger"> {" "}  * </span>
                                    </Form.Label>
                                    <Form.Control
                                        size='sm'
                                        as="textarea"
                                        id='product-description'
                                        {...register("description")}
                                        isInvalid={!!errors.description}
                                        placeholder="Example: The iPhone 13 features a sleek design, powerful A15 Bionic chip, and an advanced dual-camera system for stunning photos and videos."
                                        rows={3}
                                        disabled={modalHeading === "View Product"}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description?.message}
                                    </Form.Control.Feedback>
                                </Col>
                                {/* Image URL */}
                                {modalHeading === "Add Product" ? (
                                    <Col md={12}>
                                        <Form.Control
                                            type="file"
                                            size="sm"
                                            accept="image/*"
                                            isInvalid={!!errors.image}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setValue("image", file, { shouldValidate: true });
                                                }
                                            }}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.image?.message as string}
                                        </Form.Control.Feedback>

                                    </Col>
                                ) :
                                    <Col md={12}>
                                        <Form.Label htmlFor='product-image' className='m-0'>Product Image</Form.Label>
                                        <Image id='product-image' className='form-control img-fluid' src={selectedProduct?.image as string} alt={selectedProduct?.title} thumbnail />
                                    </Col>
                                }
                            </Row>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                        {modalHeading !== "View Product" &&
                            <Button variant="primary" type='submit'>
                                Save Changes
                            </Button>
                        }
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default AddEditModal;