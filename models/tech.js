module.exports = (sequelize, DataTypes) => (
    sequelize.define('post', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
        charset: 'utf8',                //  데이터베이스 문자열을
        collate: 'utf8_general_ci',     //  UTF8로 설정
    })
);