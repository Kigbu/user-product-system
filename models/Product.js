module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        unitprice:  {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amountsold: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
    });
    return Product;
};