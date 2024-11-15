import React from "react";
import './Home.css'
import Navbar from './../../components/navbar'
import homeBanner from '../../assets/images/homeBanner.png'
import axios from 'axios';
import { useEffect, useState } from "react";
import Card from "../../components/card/card";
import Footer from "../../components/footer/footer";

const Home = () => {
    const [homeTickets, setHomeTickets] = useState([]);
    useEffect(() => {
        const fetchUserTickets = async () => {

            try {
                const response = await axios.get('http://localhost:3000/api/homeTickets');
                if (response.data) {
                    setHomeTickets(response.data);
                }
            } catch (err) {
                console.error("Eroare la preluarea datelor utilizatorului", err);
            }
        };
        fetchUserTickets();
    }, []);
    const mapStatus = (status) => {
        switch (parseInt(status)) {
            case 1:
                return 'Nou';
            case 2:
                return 'În progres';
            case 3:
                return 'Închis';
            default:
                return '';
        }
    };
    return (
        <div className="containerHome" >
            <Navbar />
            <img src={homeBanner} alt="" />
            <div className="last-tickets">
                <h1>Ultimele Tichete</h1>
                <div className="cards">
                    {homeTickets.map((ticket, index) => (
                        <Card
                            key={index}
                            ticketNumber={ticket.ticketNumber}
                            description={ticket.shortDescription}
                            progress={mapStatus(ticket.progress)}
                            ticketId={ticket.ticketId} />
                    ))}
                </div>
            </div>




            {/* ******************************harded coded:/// **********************************************************/}
            <div className="aboutProject" id="aboutProject">
                <div className="aboutCard">
                    <h1>Comunicare</h1>
                    <div className="aboutDescription">
                        <p>Astfel de platforme oferă cetățenilor un canal direct de comunicare cu autoritățile locale sau naționale,
                            făcându-le problemele și ideile mai ușor de adresat.
                        </p>
                    </div>


                </div>
                <div className="aboutCard">
                    <h1>Transparență </h1>
                    <div className="aboutDescription">
                        <p> Cetățenii pot vedea cum sunt tratate problemele și care sunt prioritățile,
                            ceea ce poate duce la o mai mare responsabilizare a autorităților.</p>
                    </div>

                </div>
                <div className="aboutCard">
                    <h1>Participare </h1>
                    <div className="aboutDescription">
                        <p>Oferind o metodă ușoară pentru a raporta probleme sau a propune idei,
                            cetățenii sunt încurajați să participe activ la procesele decizionale și la îmbunătățirea comunității lor.</p>
                    </div>

                </div>


            </div>
            {/* ******************************END : harded coded:/// **********************************************************/}

            <Footer />

        </div>

    );

}

export default Home;