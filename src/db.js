require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST,DB_NAME } = process.env;

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
      database: DB_NAME,
      dialect: "postgres",
      host: DB_HOST,
      port: 5432,
      username: DB_USER,
      password: DB_PASSWORD,
      pool: {
        max: 3,
        min: 1,
        idle: 10000,
      },
      dialectOptions: {
        ssl: {
          require: true,
          // Ref.: https://github.com/brianc/node-postgres/issues/2009
          rejectUnauthorized: false,
        },
        keepAlive: true,
      },
      ssl: true,
    })
    : new Sequelize(
      `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
      { logging: false, native: false }
    );
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const {
  Users,
  Posts,
  Categories,
  Review,
  Orders,
  Favorites,
  Payments,
  Question,
  Conversation,
  Message,
} = sequelize.models;

// Aca vendrian las relaciones

Users.hasMany(Posts, { foreignKey: "user_id" }); // un usuario tiene muchos posts
Posts.belongsTo(Users, { foreignKey: "user_id" }); // un post pertenece a un unico usuario (quien CREA el post)

Categories.hasMany(Posts, { foreignKey: "category_id" }); // una categoria esta en muchas publicaciones
Posts.belongsTo(Categories, { foreignKey: "category_id" }); // una publicacion puede tener una unica categoria

Users.hasMany(Review);
Review.belongsTo(Users); //relacion review n*m
Posts.hasMany(Review);
Review.belongsTo(Posts);

Users.hasMany(Orders); //relacion user con orders
Orders.belongsTo(Users);

Posts.hasMany(Orders); //relacion post con orders
Orders.belongsTo(Posts);

Payments.hasMany(Orders); //relacion payments con orders
Orders.belongsTo(Payments);

Users.hasMany(Favorites);
Favorites.belongsTo(Users); //relacion favoritos n*m
Posts.hasMany(Favorites);
Favorites.belongsTo(Posts);

Users.hasMany(Question);
Question.belongsTo(Users);
Posts.hasMany(Question);
Question.belongsTo(Posts);

Conversation.hasMany(Message, { foreignKey: "conversation_id" });
Message.belongsTo(Conversation, { foreignKey: "conversation_id" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
