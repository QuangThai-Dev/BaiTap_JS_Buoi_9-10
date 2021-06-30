function NhanVien(taiKhoanNV, tenNV, email, matKhau, ngayLam, luongCB, chucVu, gioLam) {

    this.taiKhoanNV = taiKhoanNV;
    this.tenNV = tenNV;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luongCB = luongCB;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
}

NhanVien.prototype.tinhLuong = function() {
    if (this.chucVu === 'Sếp') {
        this.tongLuong = this.luongCB * 3;
    } else if (this.chucVu === 'Trưởng phòng') {
        this.tongLuong = this.luongCB * 2;
    } else if (this.chucVu === 'Nhân viên') {
        this.tongLuong = this.luongCB;
    }
}

NhanVien.prototype.xepLoai = function() {
    if (this.gioLam >= 192) {
        this.xepLoai = 'Nhân viên xuất sắc';
    } else if (this.gioLam >= 176 && this.gioLam < 192) {
        this.xepLoai = 'Nhân viên giỏi';
    } else if (this.gioLam >= 160 && this.gioLam < 176) {
        this.xepLoai = 'Nhân viên khá'
    } else {
        this.xepLoai = 'Nhân viên trung bình';
    }
}