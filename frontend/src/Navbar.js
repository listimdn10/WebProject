const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>Flight Booking</h1>
            <div className="links">
                <div className="center">
                    <a href="/">Home</a>
                    <div className="dropdown">
                        <a href="/huong_dan">Hướng dẫn</a> 
                        <div class="dropdown-content">
                            <a href="">Hướng dẫn đặt vé online</a>
                            <a href="">Làm thủ tục tại sân bay</a>
                            <a href= "">Làm thủ tục trực tuyến </a>
                        </div>
                    </div>
                    <a href="/ke_hoach">Lên kế hoạch</a>
                    
                </div>
                <div className="dangky_dangnhap">
                    <a href="/dang_ky">Đăng ký |</a>
                    <a href="/dang_nhap">Đăng nhập</a>
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;