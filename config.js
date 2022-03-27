require('dotenv').config();

module.exports = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	PORT: process.env.PORT || 3000,
	DB_HOST: process.env.DB_HOST,
	DB_USER: process.env.DB_USER,
	DB_PASS: process.env.DB_PASS,
	DB_PORT: process.env.DB_PORT,
	DB_NAME: process.env.DB_NAME,
	DATABASE_URL: process.env.DATABASE_URL,
	API_KEY: process.env.API_KEY,
	JWT_SECRET: process.env.JWT_SECRET,
	EMAIL_SENDER: process.env.EMAIL_SENDER,
	EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
	FRONTEND_URL: process.env.FRONTEND_URL,
}
