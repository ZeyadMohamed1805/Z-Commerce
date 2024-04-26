// Modules & Variables
import bcrypt from "bcryptjs";

// Compare The Passwords
const comparePassword = (bodyPassword: string, userPassword: string) => {
	const isMatching = bcrypt.compare(bodyPassword, userPassword);
	return isMatching;
};

// Exports
export default comparePassword;
