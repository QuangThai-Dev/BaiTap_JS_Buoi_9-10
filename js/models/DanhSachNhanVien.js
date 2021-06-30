function DanhSachNhanVien() {
    this.arr = [];
}

DanhSachNhanVien.prototype.themNhanVien = function(nhanVien) {
    this.arr.push(nhanVien);
}

DanhSachNhanVien.prototype.timViTri = function(taiKhoanNV) {
    var viTri = this.arr.findIndex(function(item) {
        return taiKhoanNV === item.taiKhoanNV;
    })
    return viTri;
}

DanhSachNhanVien.prototype.xoaNhanVien = function(taiKhoanNV) {
    var viTriXoa = this.timViTri(taiKhoanNV);
    if (viTriXoa !== -1) {
        this.arr.splice(viTriXoa, 1)
    }
}

DanhSachNhanVien.prototype.capNhatNhanVien = function(nhanVien) {
    var viTriCapNhat = this.timViTri(nhanVien.taiKhoanNV)
    this.arr[viTriCapNhat] = nhanVien;

}

DanhSachNhanVien.prototype.timNhanVien = function(dsnv, chuoiTK) {
    return dsnv.filter(function(nv) {
        return nv.xepLoai.toLowerCase().indexOf(chuoiTK.toLowerCase()) !== -1;
    })
}