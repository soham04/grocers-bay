import { Schema, Document, model } from 'mongoose';

interface Image {
    id: string;
    url: string;
    zoomable: boolean;
}

interface ChildNutrient {
    name: string;
    amount: string;
    dvp: string | null;
    childNutrients: ChildNutrient[] | null;
}

interface MainNutrient {
    name: string;
    amount: string;
    dvp: string | null;
    childNutrients: ChildNutrient[] | null;
}

interface NutritionalInfo {
    calorieInfo: {
        name: string;
        mainNutrient: MainNutrient;
        childNutrients: ChildNutrient[] | null;
    };
    keyNutrients: {
        name: string;
        values: {
            name: string | null;
            mainNutrient: MainNutrient;
            childNutrients: ChildNutrient[] | null;
        }[];
    };
}

interface ProductAttributes {
    itemId: string;
    title: string;
    price: number;
    link: string;
    short_description: string;
    long_description: string;
    nutritional_info: NutritionalInfo;
    directions: string;
    images: Image[];
    created_at?: Date;
    modified_at?: Date;
    deleted_at?: Date;
}

export interface ProductDocument extends ProductAttributes, Document { }

const imageSchema = new Schema<Image>({
    id: { type: String, required: true },
    url: { type: String, required: true },
    zoomable: { type: Boolean, required: true }
});

const productSchema = new Schema<ProductDocument>({
    itemId: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    link: { type: String, required: true },
    short_description: { type: String, required: true },
    long_description: { type: String, required: true },
    nutritional_info: {
        type: {
            calorieInfo: {
                type: {
                    name: String,
                    mainNutrient: {
                        type: {
                            name: String,
                            amount: String,
                            dvp: String,
                            childNutrients: [Object]
                        }
                    },
                    childNutrients: [Object]
                }
            },
            keyNutrients: {
                type: {
                    name: String,
                    values: [
                        {
                            type: {
                                name: String,
                                mainNutrient: {
                                    type: {
                                        name: String,
                                        amount: String,
                                        dvp: String,
                                        childNutrients: [Object]
                                    }
                                },
                                childNutrients: [Object]
                            }
                        }
                    ]
                }
            }
        },
        required: true
    },
    directions: { type: String, required: true },
    images: { type: [imageSchema], required: true },
    created_at: { type: Date, default: Date.now },
    modified_at: { type: Date },
    deleted_at: { type: Date }
});

const Product = model<ProductDocument>('product-details', productSchema);

export default Product;
