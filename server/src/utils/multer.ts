// Modules
import multer from "multer";
import path from "path";

// Configuration
const Multer = multer({
	storage: multer.diskStorage({}),
	fileFilter: (req, file, cb: Function) => {
		let ext = path.extname(file.originalname);
		if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
			cb(new Error("File type is not supported"), false);
			return;
		}
		cb(null, true);
	},
});

// Exports
export default Multer;
