const express = require('express');
const bodyParser = require('body-parser') //giúp xử lý dữ liệu từ phương thức POST
const app = express(); //Express để tạo các route và xử lý yêu cầu
const port =5000;

var jsonParser = bodyParser.json(); //xử lý dữ liệu JSON từ phương thức POST
app.use(bodyParser.urlencoded()); // xử lý dữ liệu từ phương thức POST với application/x-www-form-urlencoded format.

// app.set('view engine', 'ejs');//gọi view engine là ejs
// app.set('views', './views');



// app.get("/",(req,res)=>{
//   res.render(`home.ejs`);
// });

app.get("/",(req,res)=>{
    res.send(`<strong>Đây là trang home</strong>`);
});

//res.send: Được sử dụng để gửi dữ liệu text hoặc HTML đến trình duyệt
//res.redirect: Được sử dụng để chuyển hướng người dùng từ một URL đến một URL khác
 
//Bài 1
//Nguyên nhân: Do không viết route cho server 
//Giải pháp: Thêm các phương thức như app.get() và app.post()
app.get("/product",(req,res)=>{
    res.send(`<strong>Đây là trang Product</strong>`);
});
app.get("/add-product",(req,res)=>{
    res.send(`<strong>Đây là trang add product</strong>
    <form action="product" method="POST" enctype="application/x-www-form-urlencoded"> 
    <input type="text" placeholder="ProductName" name="ProductName">
    <button type="submit">Add product</button>
</form>
`);
});
//Bài 2
//Nguyên nhân: Không có POST 
//Giải pháp: Thêm app.post() vào 
app.post('/product', jsonParser, function (req, res) {
  const ProductName =  req.body.ProductName;
    // console.log(req.body.ProductName);
    // productList.unshift(req.body.ProductName);
    res.redirect("/product");
    // res.send(req.body)
  })

//Bài 3 
const inventors = [
    { id: 1, first: "Albert", last: "Einstein", year: 1879, passed: 1955 },
    { id: 2, first: "Isaac", last: "Newton", year: 1643, passed: 1727 },
    { id: 3, first: "Galileo", last: "Galilei", year: 1564, passed: 1642 },
    { id: 4, first: "Marie", last: "Curie", year: 1867, passed: 1934 },
    { id: 5, first: "Johannes", last: "Kepler", year: 1571, passed: 1630 },
    { id: 6, first: "Nicolaus", last: "Copernicus", year: 1473, passed: 1543 },
  ];
  
  app.get("/inventors", (req, res) => {
    let list = "<h2>Danh sách nhà khoa học<ul>";
    inventors.forEach((e) => {
      list += `<li>
              <a style="text-decoration:none;color:green;" href="/inventor/${e.id}">${e.last}</a>
          </li>`;
    });
    list += "</ul></h2>";
    res.send(list);
  });
  
  app.get("/inventor/:id", (req, res) => {
    let id = req.params.id;
    let inventor = inventors.find((e) => e.id == id);
  
    if (!inventor) {
      return res.status(404).send("Nhà khoa học không tồn tại");
    }
  
    let info = `<h2>Thông tin chi tiết của nhà khoa học</h2>
      <h3 style= "color:green;">Full Name: ${inventor.first} ${inventor.last}</h3>
      <h3>Year: ${inventor.year} </h3>
      <h3>Passed: ${inventor.passed} </h3>
    `;
    res.send(info);
  });

 //Bài 4 

app.get("/add-inventors", (req, res) => {
    const form = `<div class="container">
      <h1>Thêm Nhà Khoa Học</h1>
      <form action="/add-inventors" method="POST">
  
        <div class="mb-3">
          <label for="firstName" class="form-label">First Name</label>
          <input type="text" class="form-control" id="firstName" name="first" placeholder="Input first name" required>
        </div>
  
        <div class="mb-3">
          <label for="lastName" class="form-label">Last Name</label>
          <input type="text" class="form-control" id="lastName" name="last" placeholder="Input last name" required>
        </div>
        <div class="mb-3">
        <label for="year" class="form-label">Year</label>
        <input type="number" class="form-control" id="year" name="year" placeholder="Year" required>
      </div>

      <div class="mb-3">
        <label for="passed" class="form-label">Passed</label>
        <input type="number" class="form-control" id="passed" name="passed" placeholder="Passed" required>
      </div>

      <button type="submit" class="btn btn-primary">Add Inventor</button>
    </form>
  </div>`;
  res.send(form);
});

app.post('/add-inventors', (req, res) => {
    let inventor = new Object();
    inventor.id = inventors.length + 1;
    inventor.first = req.body.first;
    inventor.last = req.body.last;
    inventor.year = req.body.year;
    inventor.passed = req.body.passed;
    inventors.push(inventor);

    res.redirect('/inventors'); //chuyển trang 
})

//Bài thêm
const sanpham = [
    { id: 1, name: "Áo Thun Nữ", price: 150000, describe: "Cotton", detail: "Chất liệu cotton, vải mền mịn, thoáng mát" },
    { id: 2, name: "Áo Thun Nam", price: 150000, describe: "Kakki", detail: "Chất liệu dày dặn, thoáng mát, giá cả hợp lý" },
    { id: 3, name: "Áo Sơ Mi", price: 245000, describe: "Nhung Tăm", detail: "Lên form chuẩn đẹp tự nhiên" },
]

app.get("/sanpham", (req, res) => {
    let list = "<h2>Danh sách sản phẩm<ul>";
    sanpham.forEach((e) => {
        list += `<li>
            <a style="text-decoration:none;color:pink;" href="/sanpham/${e.id}">${e.name}</a>
        </li>`;
    });
    list += "</ul></h2>";
    res.send(list);
});

app.get("/sanpham/:id", (req, res) => {
    let id = req.params.id;
    let product = sanpham.find((e) => e.id == id);

    if (!product) {
        return res.status(404).send("Sản phẩm không tồn tại");
    }

    let commentForm = `
    <h2>Bình luận và đánh giá</h2>
    <form action="/sanpham/${id}/comment" method="post">
        <label for="comment">Bình luận:</label>
        <textarea id="comment" name="comment" required></textarea><br>
        <label for="rating">Đánh giá:</label>
        <input type="number" id="rating" name="rating" required><br>
        <input type="submit" value="Gửi đánh giá">
    </form>
`;
    let test = `<h2>Thông tin chi tiết của sản phẩm</h2>
      <h3 style= "color:pink;"> Name: ${product.name}</h3>
      <h3>Price: ${product.price} </h3>
      <h3>Describe: ${product.describe} </h3>
      <h3>Detail: ${product.detail} </h3>
    `;
    let bldgia = "";
    if (product.comments && product.comments.length > 0) {
        bldgia = "<h3>Bình luận và đánh giá:</h3><ul>";
        product.comments.forEach((comment) => {
            bldgia += `<li>${comment.comment} - Đánh giá: ${comment.rating}/5</li>`;
        });
        bldgia += "</ul>";
    }

    res.send(test + commentForm + bldgia);
});
//nhận dữ liệu từ form để thêm bình luận và đánh giá.
app.post("/sanpham/:id/comment", (req, res) => {
    let id = req.params.id;
    let product = sanpham.find((e) => e.id == id);

    if (!product) {
        return res.status(404).send("Sản phẩm không tồn tại");
    }

    // Lấy dữ liệu từ form
    const { comment, rating } = req.body;

    // Lưu bình luận và đánh giá
    if (!product.comments) {
        product.comments = [];
    }
    product.comments.push({ comment, rating });

    res.redirect("/sanpham");//Thành công sẽ chuyển trang về /sanpham
});
//Chạy listen ở cuối
app.listen(port, () => {
    console.log(`Example app listening ${port}`);
});
