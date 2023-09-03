export const sessions = {
	list: {}, //список хэшей
	create(user) {
		const hash = Math.random().toFixed(50);

		this.list[hash] = user;

		return hash;
	},
	remove(hash) {
		delete this.list[hash];
	},
};
