function getEl(id) {
    return document.getElementById(id);
}

// Khởi tạo đối tượng danh sách nhân viên
var dsnv = new DanhSachNhanVien();
var validator = new Validator();


var hienThiDSNV = function(arr) {
    var content = '';
    arr.map(function(nv, index) {
        content += `
            <tr>
                <td>${nv.taiKhoanNV}</td>
                <td>${nv.tenNV}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong}</td>
                <td>${nv.xepLoai}</td>
                <td>
                <button class="btn btn-info mb-2" id='btnSua' onclick = "xemNhanVien('${nv.taiKhoanNV}')">Sửa</button>
                <button class="btn btn-danger" id="btnXoa" onclick = "_xoaNhanVien('${nv.taiKhoanNV}')">Xóa</button>
                </td>
            </tr>
        `
    });
    getEl('tableDanhSach').innerHTML = content;
}

getLocalStorage();

getEl('btnThem').addEventListener('click', function() {
    xoaForm();
    getEl('tknv').disabled = false;
    getEl('header-title').innerHTML = 'Thêm nhân viên';
    getEl('btnCapNhat').style.display = 'none';
    getEl('btnThemNV').style.display = 'block';
})

function setLocalStorage() {
    localStorage.setItem('DSNV', JSON.stringify(dsnv.arr));
}

function getLocalStorage() {
    if (localStorage.getItem('DSNV')) {
        dsnv.arr = JSON.parse(localStorage.getItem('DSNV'));
        hienThiDSNV(dsnv.arr);
    };
}

// Xóa form
var xoaForm = function() {
    var elements = document.getElementsByClassName("input-sm");
    for (let element of elements) {
        element.value = '';
    }
    var elementsClass = document.getElementsByClassName("sp-thongbao");
    for (let elementclass of elementsClass) {
        elementclass.innerHTML = '';
    }
    getEl('chucvu').selectedIndex = 0;
}

// Xóa Nhân Viên
function _xoaNhanVien(taiKhoanNV) {
    dsnv.xoaNhanVien(taiKhoanNV);
    hienThiDSNV(dsnv.arr);
    setLocalStorage();
}

// Thêm nhân viên
getEl('btnThemNV').addEventListener('click', function() {

    var tkNV = getEl('tknv').value;
    var tenNV = getEl('name').value;
    var email = getEl('email').value;
    var matKhau = getEl('password').value;
    var ngayLam = getEl('datepicker').value;
    var luongCB = Number(getEl('luongCB').value);
    var chucVu = getEl('chucvu').value;
    var gioLam = Number(getEl('gioLam').value);
    // Kiểm tra validation
    var isVali = true;

    isVali &= validator.kiemTraRong(tkNV, 'tbTKNV', '(*)Tài khoản không được rỗng') && validator.kiemTraDoDai(tkNV.length, 'tbTKNV', 4, 6, '(*)Tài khoản tối đa 4 đến 6 ký tự');
    isVali &= validator.kiemTraRong(tenNV, 'tbTen', '(*)Tên không được để trống') && validator.kiemTraChu(tenNV, 'tbTen', '(*)Tên nhân viên phải là chữ');
    isVali &= validator.kiemTraRong(email, 'tbEmail', '(*)Email không được rỗng') && validator.kiemTraEmail(email, 'tbEmail', '(*)Email không hợp lệ');
    isVali &= validator.kiemTraRong(matKhau, 'tbMatKhau', '(*)Mật khẩu không được rỗng') && validator.kiemTraMK(matKhau, 'tbMatKhau', '(*)Mật khẩu phải có độ dài từ 6 đến 10 ký tự (ít nhất 1 số, 1 ký tự in hoa, 1 ký tự đặc biệt)')
    isVali &= validator.kiemTraRong(ngayLam, 'tbNgay', '(*)Ngày không được để trống');
    isVali &= validator.kiemTraRong(luongCB, 'tbLuongCB', '(*)Lương không được để trống') && validator.kiemTraDoDai(luongCB, 'tbLuongCB', 1000000, 20000000, '(*) Lương từ 1000000 đến 20000000');
    isVali &= validator.validSeclector('chucvu', 'tbChucVu', '(*)Chưa chọn chức vụ')
    isVali &= validator.kiemTraRong(gioLam, 'tbGiolam', '(*)Giờ làm không được để trống') && validator.kiemTraDoDai(gioLam, 'tbGiolam', 80, 200, '(*)Giờ làm trong tháng phải từ 80 đến 200 giờ');

    if (!isVali) return;

    // Khởi tạo nhân viên
    var nv = new NhanVien(tkNV, tenNV, email, matKhau, ngayLam, luongCB, chucVu, gioLam);
    nv.tinhLuong();
    nv.xepLoai();
    console.log(nv);
    for (var i = 0; i < dsnv.arr.length; i++) {
        if (dsnv.arr[i].taiKhoanNV === tkNV) {
            alert('Số Tài khoảng đã bị trùng, vui lòng nhập lại!!!');
            return;
        }
    }
    dsnv.themNhanVien(nv);
    hienThiDSNV(dsnv.arr);
    xoaForm();
    setLocalStorage();
    getEl('btnDong').click();
})

// console.log(dsnv);
// console.log(nv);
// console.log(dsnv.arr[0].taiKhoanNV);

// Xem nhân viên
function xemNhanVien(taiKhoanNV) {
    getEl('btnThem').click();
    getEl('btnThemNV').style.display = 'none';
    getEl('btnCapNhat').style.display = 'block';
    getEl('header-title').innerHTML = 'Cập nhật nhân viên';
    getEl('tknv').disabled = true;
    for (var i = 0; i < dsnv.arr.length; i++) {
        if (dsnv.arr[i].taiKhoanNV === taiKhoanNV) {
            getEl('tknv').value = taiKhoanNV;
            getEl('name').value = dsnv.arr[i].tenNV;
            getEl('email').value = dsnv.arr[i].email;
            getEl('password').value = dsnv.arr[i].matKhau;
            getEl('datepicker').value = dsnv.arr[i].ngayLam;
            getEl('luongCB').value = dsnv.arr[i].luongCB;
            getEl('chucvu').value = dsnv.arr[i].chucVu;
            getEl('gioLam').value = dsnv.arr[i].gioLam;
        }
    }

}

// Cập nhật nhân viên
getEl('btnCapNhat').addEventListener('click', function() {

    var tkNV = getEl('tknv').value;
    var tenNV = getEl('name').value;
    var email = getEl('email').value;
    var matKhau = getEl('password').value;
    var ngayLam = getEl('datepicker').value;
    var luongCB = getEl('luongCB').value;
    var chucVu = getEl('chucvu').value;
    var gioLam = getEl('gioLam').value;

    // Kiểm tra validation
    var isVali = true;

    isVali &= validator.kiemTraRong(tkNV, 'tbTKNV', '(*)Tài khoản không được rỗng') && validator.kiemTraDoDai(tkNV.length, 'tbTKNV', 4, 6, '(*)Tài khoản tối đa 4 đến 6 ký tự');
    isVali &= validator.kiemTraRong(tenNV, 'tbTen', '(*)Tên không được để trống') && validator.kiemTraChu(tenNV, 'tbTen', '(*)Tên nhân viên phải là chữ');
    isVali &= validator.kiemTraRong(email, 'tbEmail', '(*)Email không được rỗng') && validator.kiemTraEmail(email, 'tbEmail', '(*)Email không hợp lệ');
    isVali &= validator.kiemTraRong(matKhau, 'tbMatKhau', '(*)Mật khẩu không được rỗng') && validator.kiemTraMK(matKhau, 'tbMatKhau', '(*)Mật khẩu phải có độ dài từ 6 đến 10 ký tự (ít nhất 1 số, 1 ký tự in hoa, 1 ký tự đặc biệt)')
    isVali &= validator.kiemTraRong(ngayLam, 'tbNgay', '(*)Ngày không được để trống');
    isVali &= validator.kiemTraRong(luongCB, 'tbLuongCB', '(*)Lương không được để trống') && validator.kiemTraDoDai(luongCB, 'tbLuongCB', 1000000, 20000000, '(*) Lương từ 1000000 đến 20000000');
    isVali &= validator.validSeclector('chucvu', 'tbChucVu', '(*)Chưa chọn chức vụ')
    isVali &= validator.kiemTraRong(gioLam, 'tbGiolam', '(*)Giờ làm không được để trống') && validator.kiemTraDoDai(gioLam, 'tbGiolam', 80, 200, '(*)Giờ làm trong tháng phải từ 80 đến 200 giờ');

    if (!isVali) return;

    var nv = new NhanVien(tkNV, tenNV, email, matKhau, ngayLam, luongCB, chucVu, gioLam);
    nv.tinhLuong();
    nv.xepLoai();
    console.log(nv);

    dsnv.capNhatNhanVien(nv);
    hienThiDSNV(dsnv.arr);

    // xoaForm();
    setLocalStorage();
    getEl('btnDong').click();
})

// Tìm kiếm nhân viên
getEl('searchName').addEventListener('keyup', function() {
    var chuoiTK = getEl('searchName').value;
    var arrTK = dsnv.timNhanVien(dsnv.arr, chuoiTK)
    hienThiDSNV(arrTK);
})