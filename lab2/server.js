const express = require("express");
const app = express();
const port = 3000;
var multer = require("multer");

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

//Trang home 
app.get("/", (req, res) => {
  var today = new Date();
  var currentDay = today.getDay();
  var day = "";
  switch (currentDay) {
    case 0:
      day = "Chủ Nhật";
      break;
    case 1:
      day = "Thứ hai";
      break;
    case 2:
      day = "Thứ ba";
      break;
    case 3:
      day = "Thứ tư";
      break;
    case 4:
      day = "Thứ năm";
      break;
    case 5:
      day = "Thứ sáu";
      break;
    case 6:
      day = "Thứ bảy";
      break;
    default:
      console.log(`Error! Invalid Day Number ${currentDay}`);
      break;
  }
  res.render("home", { kindOfDay: day });
});

/** Products nằm ở đây */
var listProduct = [
  {
    id: 1,
    title: "TramTran Academy",
    price: 3000,
    description:
      "Váy cưới mang lại màu sắc sang trọng và quý phái!",
    imageURL: "hinh1.webp",
  },
  {
    id: 2,
    title: "QuyenNguyen Bridal",
    price: 3000,
    description:
      "Váy cưới mang lại màu sắc sang trọng và quý phái!",
    imageURL: "hinh2.webp",
  },
  {
    id: 3,
    title: "TuArt Wedding",
    price: 3000,
    description:
      "Váy cưới mang lại màu sắc sang trọng và quý phái!",
    imageURL: "hinh2.2.jpg",
  },
  {
    id: 4,
    title: "LingDang Widding Ring",
    price: 3000,
    description:
      "Váy cưới mang lại màu sắc sang trọng và quý phái!",
    imageURL: "hinh3.jpg",
  },
];

app.get("/product", (req, res) => {
  res.render("./page/product", { products: listProduct });
});

app.get("/add", (req, res) => {
  res.render("./page/add-product");
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });
app.post("/add", upload.single("image"), (req, res) => {
  // Lấy dữ liệu từ form  
  const file = req.file;
  let title = req.body.productName;
  let price = req.body.price;
  let description = req.body.description;
  let nameImage = file.filename;
  // Thêm vào mảng json 1 sản phẩm mới
  listProduct.push({
    id: listProduct.length + 1,
    title: title,
    price: price,
    description: description,
    imageURL: nameImage,
  });

  res.redirect("/product"); // Chuyển hướng đến trang sản phẩm dùng lệnh này
});

// Listen ở cuối mới chạy được
app.listen(port, () => {
  console.log(`Ứng dụng đang chạy với port: ${port}`);
});
