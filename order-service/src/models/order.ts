import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

interface OrderAttributes {
    id: string;
    user_id: string;
    subtotal: number;
    taxPercent: number;
    tax: number;
    total: number;
    payment_done: boolean;
    payment_id: string;
    delivered: boolean;
    created_at?: Date;
    modified_at?: Date;
}

export interface OrderInput extends Optional<OrderAttributes, 'id'> { }

export interface OrderOutput extends Required<OrderAttributes> { }

class Order extends Model<OrderAttributes, OrderInput> implements OrderAttributes {
    public id!: string;
    public user_id!: string;
    public subtotal!: number;
    public taxPercent!: number;
    public tax!: number; 
    public total!: number;
    public payment_done!: boolean;
    public payment_id!: string;
    public delivered!: boolean;

    // timestamps!
    public readonly created_at!: Date;
    public readonly modified_at!: Date;
}

Order.init({
    id: {
        type: DataTypes.UUID, // Changed to UUID
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4, // Use UUIDV4 to generate UUIDs
    },
    user_id: {
        type: DataTypes.UUID, // Changed to UUID
        allowNull: false,
        references: {
            model: 'customer2', // Assuming the referenced table is named 'user'
            key: 'id',
        },
    },
    subtotal: {
        type: DataTypes.DECIMAL, // Adjusted to DECIMAL for monetary values
        allowNull: false,
    },
    taxPercent: {
        type: DataTypes.DECIMAL, // Adjusted to DECIMAL for monetary values
        allowNull: false,
    },
    tax: {
        type: DataTypes.DECIMAL, // Adjusted to DECIMAL for monetary values
        allowNull: false,
    },
    total: {
        type: DataTypes.DECIMAL, // Adjusted to DECIMAL for monetary values
        allowNull: false,
    },
    payment_done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    payment_id: {
        type: DataTypes.STRING, // Changed to STRING
        allowNull: true,
        defaultValue:null,
    },
    delivered: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    tableName: 'order2',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'modified_at',
    sequelize: sequelize,
});

export default Order;
