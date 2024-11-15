import React from "react";
import './footer.css';

const Footer = () => {
    const year = new Date().getFullYear(); // Obține anul curent

    return (
        <footer className="footerContainer">
            <div className="footerSections">
                <div className="footerSection">
                    <h3>Despre</h3>
                    <p>Informații despre companie, istorie și valori.</p>
                </div>
                <div className="footerSection">
                    <h3>Contact</h3>
                    <p>Detalii de contact și formular pentru mesaje.</p>
                </div>
                <div className="footerSection">
                    <h3>Servicii</h3>
                    <p>Explorare servicii și oferte speciale.</p>
                </div>
                <div className="footerSection">
                    <h3>Ajutor</h3>
                    <p>FAQ, ghiduri de utilizare și suport.</p>
                </div>
            </div>
            <div className="footerCopyright">
                <p>&copy; {year} Bashar. Toate drepturile rezervate.</p>
            </div>
        </footer>
    );
}

export default Footer;
