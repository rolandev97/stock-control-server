import {DataSource} from "typeorm";

const dataSource = new DataSource({
    trace: false,
    type: "mysql",
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'stock_control_db',
    entities: ["dist/**/*.entity.js"],
    migrations: ["dist/db/migrations/*.js"],
    synchronize: false,
    logging: true,
});

export default dataSource;