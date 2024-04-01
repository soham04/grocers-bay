// import { DataTypes, Model, Optional } from 'sequelize';
// import sequelize from '../config/db';

// interface ProductCategoryAttributes {
//     id: number;
//     name: string;
//     desc: string;
//     created_at?: Date;
// }

// export interface ProductCategoryInput extends Optional<ProductCategoryAttributes, 'id'> { }

// export interface ProductCategoryOutput extends Required<ProductCategoryAttributes> { }

// class ProductCategory extends Model<ProductCategoryAttributes, ProductCategoryInput> implements ProductCategoryAttributes {
//     public id!: number;
//     public name!: string;
//     public desc!: string;

//     // timestamps!
//     public readonly created_at!: Date;
// }

// ProductCategory.init({
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//     },
//     name: {
//         type: DataTypes.STRING(128),
//         allowNull: false,
//     },
//     desc: {
//         type: DataTypes.STRING(512),
//         allowNull: false,
//     },
// }, {
//     tableName: 'product_category',
//     timestamps: true,
//     createdAt: 'created_at',
//     updatedAt: false, // Disable updatedAt for simplicity, adjust if needed
//     deletedAt: false, // Disable deletedAt for simplicity, adjust if needed
//     sequelize: sequelize,
// });


// export default ProductCategory;
