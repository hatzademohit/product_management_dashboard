import { z } from "zod";

export const productSchema = z.object({
    id: z.number().optional(),

    title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title cannot exceed 100 characters"),

    price: z.number().positive("Price must be greater than 0"),

    category: z.string().min(1, "Category is required"),

    description: z.string().min(10, "Description must be at least 10 characters"),

    image: z.union([
        z.instanceof(File),
        z.string().min(1, "Image is required"),
    ]),
});

export type ProductFormValues = z.infer<typeof productSchema>;
