module.exports = (sequelize, DataTypes) => (
    sequelize.define('project', {
        title: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING(40),
            allowNull: true,
        },
        skills: {
            type: DataTypes.STRING(40),
            allowNull: true,
        },
        part: {
            type: DataTypes.STRING(40),
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING(140),
            allowNull: true,
        },
        img: {
            type: DataTypes.STRING(200),
            allowNull: true
        }
    }, {
        timestamps: true,
        paranoid: true,
    })
);