export default function Footer(){
    return(
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-body-secondary">&copy; 2024 Webbb3, Inc</p>
        <ul className="nav col-md-4 justify-content-end">
        <li className="nav-items"><a href="/" className="nav-item px-2 text-body-secondary text-decoration-none">Home</a></li>
        <li className="nav-items"><a href="/about" className="nav-item px-2 text-body-secondary text-decoration-none">Quem somos</a></li>
        </ul>
      </footer>
    )
}