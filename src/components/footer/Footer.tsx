export default function Footer(){
    const currentYear = new Date().getFullYear();
    return <footer className="font-medium text-center p-3 bg-primary text-white text-sm">&copy; {currentYear} Desa Karangbendo. All rights reserved.</footer>
}
