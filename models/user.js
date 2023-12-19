const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Sequelize.Model{
    static initiate(sequelize){
        User.init({
            email:{
                type:Sequelize.STRING(40),
                allowNull:true,
                unique:true,
            },
            nick:{
                type:Sequelize.STRING(15),
                allowNull:false,
            },
            password:{
                type:Sequelize.STRING(100),
                allowNull:true,
            },
        },{
            sequelize,
            timestamps:true,
            underscored:false,
            modelName:'User',
            tableName:'users',
            paranoid:true,
            charset:'utf8',
            collate:'utf8_general_ci',
        });

        // User.beforeCreate(async (user) => {
        //     const hashedPassword = await bcrypt.hash(user.password, 12);
        //     user.password = hashedPassword;
        // });
    }
};

module.exports = User;