import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

interface OrderItemAttributes {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
    created_at?: Date;
    modified_at?: Date;
}

export interface OrderItemInput extends Optional<OrderItemAttributes, 'id'> { }

export interface OrderItemOutput extends Required<OrderItemAttributes> { }

class OrderItem extends Model<OrderItemAttributes, OrderItemInput> implements OrderItemAttributes {
    public id!: string;
    public order_id!: string;
    public product_id!: string;
    public quantity!: number;

    // timestamps!
    public readonly created_at!: Date;
    public readonly modified_at!: Date;

    // Define your associations
    static associate(models: any) {
        OrderItem.belongsTo(models.Order, {
            foreignKey: 'order_id',
            onDelete: 'CASCADE',
        });
    }
}

OrderItem.init({
    id: {
        type: DataTypes.UUID, // Changed to UUID
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4, // Use UUIDV4 to generate UUIDs
    },
    order_id: {
        type: DataTypes.UUID, // Changed to UUID
        allowNull: false,
        references: {
            model: 'order2', // Assuming the referenced table is named 'orders'
            key: 'id',
        },
    },
    product_id: {
        type: DataTypes.STRING, // Changed to UUID
        allowNull: false,
        // references: {
        //     model: 'products', // Assuming the referenced table is named 'products'
        //     key: 'id',
        // },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'order_item',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'modified_at',
    sequelize: sequelize,
});

export default OrderItem;
