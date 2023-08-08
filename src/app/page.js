import Image from 'next/image'
const slug = process.env.NEXT_PUBLIC_SLUG

export async function generateMetadata() {
    const umkm = await fetch(`https://opensheet.elk.sh/1qni0IjhGNKLtkZYGpoFGWRQG3Jy_Dp7x3DZMBpIXFXk/data`)
        .then((res) => res.json())
        .then((res) => {
            return res.find(item => item.slug === slug)
        })
    return {
      title: umkm.nama,
    }
  }

export default async function Home() {

    // const [produk, setProduk] = useState([])
    // const [umkm, setUmkm] = useState({})
    // const [loading, setLoading] = useState(true)
    // const [loading1, setLoading1] = useState(true)
    // const [loading2, setLoading2] = useState(true)
    
    const umkm = await fetch(`https://opensheet.elk.sh/1qni0IjhGNKLtkZYGpoFGWRQG3Jy_Dp7x3DZMBpIXFXk/data`)
        .then((res) => res.json())
        .then((res) => {
            console.log(slug)
            res = res.find(item => item.slug === slug)
            res.gambar = res.gambar2.split(',')
            return res
        })

    const produk = await fetch(`https://opensheet.elk.sh/1qni0IjhGNKLtkZYGpoFGWRQG3Jy_Dp7x3DZMBpIXFXk/${slug}-produk`)
        .then((res) => res.json())
        .then((res) => {
            return res
        })

    return (
        <div className="body-wrap boxed-container">
            <header className="site-header">
                <div className="container">
                    <div className="site-header-inner">
                        <div className="brand header-brand">
                            <h1 className="m-0">
                                <a href="#">
                                    <img className="header-logo-image asset-light" src="/images/logo-light.svg" alt="Logo" />
                                    <img className="header-logo-image asset-dark" src="/images/logo-dark.svg" alt="Logo" />
                                </a>
                            </h1>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <section className="hero">
                    <div className="container">
                        <div className="hero-inner">
                            <div className="hero-copy">
                                <h1 className="hero-title mt-0">{umkm.nama}</h1>
                                <p className="hero-paragraph">{umkm.text1}</p>
                                {umkm.wa &&
                                    <div className="hero-cta">
                                        <a className="button button-primary" href={`https://wa.me/${umkm.wa.replace('+', '')}?text=Halo%2C%20saya%20ingin%20memesan%20produk%20Anda%20%0A%0A%5BDetail%20pesanan%5D%0ANama%20pemesan%20%3A%0AAlamat%20%3A%0ANo%20HP%20%3A%0ANama%20produk%20%3A%0AJumlah%20produk%20%3A%0APesan%20tanggal%20%3A%0AMetode%20%28diambil%20ditempat%20atau%20diantar%29%20%3A%0APembayaran%20menggunakan%20%3A%20cash%2Ftransfer%20%0A%0ANote%3A%20informasi%20selanjutnya%20dapat%20ditanyakan%20dan%20akan%20dijawab%20langsung%20oleh%20admin`}>Beli sekarang</a>
                                    </div>
                                }
                            </div>
                            <div className="hero-media">
                                <div className="header-illustration">
                                    <img className="header-illustration-image asset-light" src="/images/header-illustration-light.svg" alt="Header illustration" />
                                    <img className="header-illustration-image asset-dark" src="/images/header-illustration-dark.svg" alt="Header illustration" />
                                </div>
                                <div className="hero-media-illustration">
                                    <img className="hero-media-illustration-image asset-light" src="/images/hero-media-illustration-light.svg" alt="Hero media illustration" />
                                    <img className="hero-media-illustration-image asset-dark" src="/images/hero-media-illustration-dark.svg" alt="Hero media illustration" />
                                </div>
                                <div className="hero-media-container">
                                    <Image className="hero-media-image asset-light" width="350" height="350" src={'/' + umkm.gambar1} alt="Hero media" />
                                    <Image className="hero-media-image asset-dark" width="350" height="350" src={'/' + umkm.gambar1} alt="Hero media" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="features section">
                    <div className="container">
                        <div className="features-inner section-inner has-bottom-divider">
                            <div className="features-header text-center">
                                <div className="container-sm">
                                    <h2 className="section-title mt-0">Produk</h2>
                                    <p className="section-paragraph">{umkm.text2}</p>
                                    {umkm.gambar.map(gambar =>
                                        <div className="features-image fade" key={gambar}>
                                            <img className="features-illustration asset-dark" src="/images/features-illustration-dark.svg" alt="Feature illustration" />
                                            <img className="features-box asset-dark" src={'/' + gambar} alt="Feature box" />
                                            <img className="features-illustration asset-dark" src="/images/features-illustration-top-dark.svg" alt="Feature illustration top" />
                                            <img className="features-illustration asset-light" src="/images/features-illustration-light.svg" alt="Feature illustration" />
                                            <img className="features-box asset-light" src={'/' + gambar} alt="Feature box" />
                                            <img className="features-illustration asset-light" src="/images/features-illustration-top-light.svg" alt="Feature illustration top" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="features-wrap">
                                {produk.map((produk, index) =>
                                <div className="feature is-revealing" key={index}>
                                    <div className="feature-inner">
                                        <div className="feature-content">
                                            <h3 className="feature-title mt-0">{produk.nama}</h3>
                                            <p className="text-sm mb-0">{produk.deskripsi}</p>
                                            <p className="text-sm mb-0" style={{color: 'green'}}>{new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(produk.harga)}</p>
                                        </div>
                                    </div>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="cta section">
                    <div className="container-sm">
                        <div className="cta-inner section-inner">
                            <div className="cta-header text-center">
                                <h2 className="section-title mt-0">{umkm.last}</h2>
                                <p className="section-paragraph">{umkm.textlast}</p>
                                {umkm.wa &&
                                    <div className="cta-cta">
                                        <a className="button button-primary" href={`https://wa.me/${umkm.wa.replace('+', '')}?text=Halo%2C%20saya%20ingin%20memesan%20produk%20Anda%20%0A%0A%5BDetail%20pesanan%5D%0ANama%20pemesan%20%3A%0AAlamat%20%3A%0ANo%20HP%20%3A%0ANama%20produk%20%3A%0AJumlah%20produk%20%3A%0APesan%20tanggal%20%3A%0AMetode%20%28diambil%20ditempat%20atau%20diantar%29%20%3A%0APembayaran%20menggunakan%20%3A%20cash%2Ftransfer%20%0A%0ANote%3A%20informasi%20selanjutnya%20dapat%20ditanyakan%20dan%20akan%20dijawab%20langsung%20oleh%20admin`}>Beli sekarang</a>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="site-footer has-top-divider">
                <div className="container">
                    <div className="site-footer-inner">
                        <div className="brand footer-brand">
                            <a href="#">
                                <img className="asset-light" src="/images/logo-light.svg" alt="Logo" />
                                <img className="asset-dark" src="/images/logo-dark.svg" alt="Logo" />
                            </a>
                        </div>
                        <ul className="footer-social-links list-reset">
                            {umkm.fb && <li>
                                <a href="#">
                                    <span className="screen-reader-text">Facebook</span>
                                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M6.023 16L6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023z"
                                            fill="#FFF" />
                                    </svg>
                                </a>
                            </li>}
                            {umkm.ig && <li>
                                <a href="#">
                                    <span className="screen-reader-text">Instagram</span>
                                    <svg width="24" height="24" viewBox='3 3 24 24' fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 5H9.5C7.29086 5 5.5 6.79086 5.5 9V15C5.5 17.2091 7.29086 19 9.5 19H15.5C17.7091 19 19.5 17.2091 19.5 15V9C19.5 6.79086 17.7091 5 15.5 5Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 15C10.8431 15 9.5 13.6569 9.5 12C9.5 10.3431 10.8431 9 12.5 9C14.1569 9 15.5 10.3431 15.5 12C15.5 12.7956 15.1839 13.5587 14.6213 14.1213C14.0587 14.6839 13.2956 15 12.5 15Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <rect x="16" y="1" width="2" height="2" rx="1" transform="rotate(-90 15.5 9)" fill="#ffffff" />
                                        <rect x="16" y="-1.5" width="1" height="1" rx="0.5" transform="rotate(-90 16 8.5)" stroke="#ffffff" stroke-linecap="round" />
                                    </svg>
                                </a>
                            </li>}
                        </ul>
                        <div className="footer-copyright">&copy; {new Date().getFullYear()} {umkm.nama}, all rights reserved</div>
                    </div>
                </div>
            </footer>
            <script src="/js/page.js"></script>
        </div>
    )
}