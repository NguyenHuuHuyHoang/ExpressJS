var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync'); //Thường sử dụng ASync vì sẽ ảnh hưởng tới hiệu năng, blocking && non-blocking
var adapter = new FileSync('db.json'); //Lưu dữ liệu trong file db.json trong cùng thư mục

db = low(adapter); //Tạo một object mới có tên là db để truy xuất dữ liệu.

db.defaults({ users: [],
sessions:[] }) //Setting file mặc định trong trường hợp chưa có file nào.
    .write();

module.exports = db;