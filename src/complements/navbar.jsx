import '../navbar.css'
import profileImage from '../E12E30C5-4374-4D56-929D-B3596B361323_1_105_c.jpeg'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <>
            <nav>
                <div className="navbar">
                    <div className="logo">
                    <h2>Yapılacaklar</h2>
                    </div>
                <div className="search">
                    <input type="search" name="search" id="search" placeholder='search' />
                    <button className='search-button'>
                        <i className='bi bi-search'></i>
                    </button>
                </div>
                <div className="tabs">
                    <ul>
                        <li><Link to="/">Anasayfa</Link></li>
                        <li><Link to="/todos">Yapılacaklar</Link></li>
                        <li>Yapılanlar</li>
                        <li>İstatistikler</li>
                    </ul>
                </div>
                <div className="profile">
                    <h3>Muhammet Kondu</h3>
                    <img src={profileImage} alt="Profil Resmi" />
                </div>
                </div>
             </nav>
        </>
    )
}