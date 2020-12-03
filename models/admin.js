module.exports = (sequelize, DataTypes) => (
    sequelize.define('admin', {
        name: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    }, {
        timestamps: true,
        paranoid: true,
        charset: 'utf8',                //  데이터베이스 문자열을
        collate: 'utf8_general_ci',     //  UTF8로 설정
    })
);