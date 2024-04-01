import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
// import bcrypt from 'bcrypt';

interface CustomerAttributes {
    id: string;
    email: string;
    phoneNumber: string;
    lastSignInTime: Date;
    created_at?: Date;
    updated_at?: Date;
    firstName: string;
    lastName: string;
    password: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    pincode: string;
    verify: boolean; // New column to indicate if the customer is verified
    OTP: string; // New column to store OTP
}

export interface CustomerInput extends Optional<CustomerAttributes, 'id'> { }

export interface CustomerOutput extends Required<CustomerAttributes> { }

export class Customer extends Model<CustomerAttributes, CustomerInput> implements CustomerAttributes {
    public id!: string;
    public email!: string;
    public phoneNumber!: string;
    public lastSignInTime!: Date;
    public firstName!: string;
    public lastName!: string;
    public password!: string;
    public addressLine1!: string;
    public addressLine2?: string;
    public city!: string;
    public pincode!: string;
    public verify!: boolean;
    public OTP!: string;

    // timestamps!
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
    checkPassword: (password: string) => Promise<boolean>;
}

Customer.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4, // Use UUIDV4 to generate UUIDs

    },
    email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    phoneNumber: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    lastSignInTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    addressLine1: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    addressLine2: {
        type: DataTypes.STRING(),
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    pincode: {
        type: DataTypes.STRING(6), // Assuming pincode is a string of 6 digits
        allowNull: false,
    },
    verify: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false // Default value for the verify column
    },
    OTP: {
        type: DataTypes.STRING(5), // Assuming OTP is a string of 5 characters
        allowNull: true // Adjust as per your requirements
    }
}, {
    tableName: 'customer2',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    sequelize: sequelize
});

// Customer.prototype.checkPassword = async function (password: string) {
//     return bcrypt.compare(password, this.password);
// }

// export default Customer;
