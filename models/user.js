/* User mongoose model */
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const RegionSchema = require('./region.js')
const ProgramSchema = require('./program.js')
const GradeSchema = require('./grade.js')

const UserSchema = new mongoose.Schema({
	admin: {
        type: Boolean,
        required: true
	},
    username: {
        type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
    },
	name: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
    },
	password: {
		type: String,
		required: true,
		minlength: 4
    },
    regions: [RegionSchema],
    programs: [ProgramSchema],
	grades: [GradeSchema],
	schools: [{ name: {//list of universities the user has selected
		type: String,
		minlength: 1,
		trim: true
	}
	}]
})

// This function will run immediately prior to saving the document in the database
// Source: Week 10 lecture
UserSchema.pre('save', function(next) {
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

// A static method on the document model.
// Allows us to find a User document by comparing the hashed password to a given one, for example when logging in.
// Source: Week 10 lecture
// Used for logging a user in.
UserSchema.statics.findByUsernamePassword = function(username, password) {
	const User = this // binds this to the User model

	// First find the user by their username
	return User.findOne({ username: username }).then((user) => {
		if (!user) {
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	})
}

module.exports = User = mongoose.model('User', UserSchema)
