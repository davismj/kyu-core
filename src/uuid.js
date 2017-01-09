const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
export default function uuid() {
	var id = '';
	var count = 6;
	while (count--) {
		id += chars[Math.floor(Math.random() * 100 % 62)];
	}
	return id;
}