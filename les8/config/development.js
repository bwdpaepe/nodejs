module.exports = {
	log: {
		level: 'silly',
		disabled: false,
	},
	cors: {
		origins: ['http://localhost:3000'],
		maxAge: 3 * 60 * 60,
	},
	database: {
		client: 'mysql2',
		host: 'localhost',
		port: 333,
		name: 'budget',
	},
	pagination: {
		limit: 100,
		offset: 0,
	},
	auth: {
		argon: {
			saltLength: 16, // 16 bytes, 128 bits
			hashLength: 32, // 32 bytes, 256 bits
			timeCost: 6, // 6 iteraties
			memoryCost: 2 ** 17, // 128 MiB (byte = 1024 bits)
		},
		jwt: {
			secret: 'PasswordSentencesAreTheBestSecretEverAndAreVeryHardToHackIfSoThatsToBad',
			expirationInterval: 60 * 60 * 1000,
			issuer: 'budget.schweb.be',
			audience: 'budget.schweb.be'
		}
	}
};