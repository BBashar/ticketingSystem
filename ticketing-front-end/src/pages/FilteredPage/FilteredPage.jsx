import React from "react";
import './FilteredPage.css'
import Navbar from "../../components/navbar";
import FilterNavbar from "../../components/filterNavbar/filterNavbar";
import Footer from "../../components/footer/footer";



const FilteredPage = () => {

    return (
        <div className="filteredcontainer">
            <Navbar />
            <FilterNavbar />
            <div className="tickets">
                <div className="cards">
                    {ticketData.map((ticket, index) => (
                        <Card
                            key={index}
                            ticketNumber={ticket.ticketNumber}
                            description={ticket.shortDescription}
                            ticketId={ticket.ticketId} />
                    ))}
                </div>
            </div>
            <Footer />


        </div>

    );

}

export default FilteredPage;