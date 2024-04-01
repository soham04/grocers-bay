import { Sequelize } from 'sequelize';
import { glogger } from './winston';

const sequelize = new Sequelize(
    process.env.POSTGRES_DATABASE,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres',
        protocol: 'postgres',

        dialectOptions: {
            ssl: {
                require: false, // Require SSL
                rejectUnauthorized: false, // Disabling SSL verification
            },
        },
    }
);

sequelize.sync().then(() => {
    console.log("DB synced");
    glogger.info("DB synced");
}).catch((error) => {
    console.error("Error syncing DB:", error);
    glogger.error("Error syncing Order DB:", error)
});


export default sequelize;
