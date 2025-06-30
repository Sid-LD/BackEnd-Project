import multer  from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp") //no error save file in this path
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) //save the file as the same name as uploaded
  }
})

export const upload = multer({ storage: storage })