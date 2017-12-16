var bcrypt = require('bcryptjs');
var cryptojs = require('crypto-js');

module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define('User', {
		name: {
			type: DataTypes.STRING,
		},
		username: {
			type: DataTypes.STRING,
			unique: true
		},
		googleID: {
			type: DataTypes.STRING
		},
		facebookID: {
			type: DataTypes.STRING
		},
		token: {
			type: DataTypes.STRING
		},
		uuid: {
			type: DataTypes.UUID,
    		defaultValue: DataTypes.UUIDV1,
		},
		salt: {
			type: DataTypes.STRING
		},
		password_hash: {
			type: DataTypes.STRING
		},
		createdOn: {
			type: DataTypes.STRING
		},
		password: {
			type: DataTypes.VIRTUAL,
			// allowNull: false,
			validate: {
				len: [7, 100]
			},
			set: function (value) { 
				var salt = bcrypt.genSaltSync(10);
				var hashedPassword = bcrypt.hashSync(value, salt);

				this.setDataValue('password', value);
				this.setDataValue('salt', salt);
				this.setDataValue('password_hash', hashedPassword);
			}
		}
	}, {
		classMethods: {
      		associate: function(models) {
       		 // associations can be defined here
      		},
		},
		instanceMethods: {
		}
	});
	return User;
};