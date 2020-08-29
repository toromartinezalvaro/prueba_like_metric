const apartment = (sequelize, DataType) => {
  const Apartment = sequelize.define(
    "apartment",
    {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      apartment_name: {
        type: DataType.STRING,
        allowNull: false,
      },
      mt2: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      price_mt2: {
        type: DataType.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Apartment;
};

module.exports = apartment;
