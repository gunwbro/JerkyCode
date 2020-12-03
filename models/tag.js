module.exports = (sequelize, DataTypes) => (
    sequelize.define('tag', {
        title: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
        charset: 'utf8',                //  데이터베이스 문자열을
        collate: 'utf8_general_ci',     //  UTF8로 설정
    })
);