import React, { useState } from "react";
import BookTicketBox from "../components/BookTicketBox";
import SearchedFlightCards from "../components/Card/SearchedFlightCards";
import { toast } from "react-toastify";
import { BACKENDURL } from "../Config/Config";
import { Link, useLocation } from "react-router-dom";

const TicketSearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [formData, setFormData] = useState({
    from: searchParams.get("from") || "",
    to: searchParams.get("to") || "",
    departDate: searchParams.get("departDate") || "",
    flightType: "Economy",
  });

  const [searchedFlights, setSearchedFlights] = useState([]);
  const [searchStatus, setSearchStatus] = useState("");

  const handleFormDataChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFlightSearch = async (e) => {
    e.preventDefault();

    if (!formData.from.trim() && !formData.to.trim() && !formData.departDate.trim()) {
      setSearchStatus("Enter at least 'From', 'To', or 'Date' to search flights");
      return;
    }

    try {
      const response = await fetch(BACKENDURL + "/api/v1/flights/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === false || data.length === 0) {
        toast.error(data.message || "No flights found");
        setSearchedFlights([]);
        setSearchStatus("No flights found for the entered details");
      } else {
        setSearchedFlights(data);
        setSearchStatus(
          <>
            <b>{data.length}</b> flights found{" "}
            {formData.from && <>from <b>{formData.from}</b>{" "}</>}
            {formData.to && <>to <b>{formData.to}</b>{" "}</>}
            {formData.departDate && <>on <b>{formData.departDate}</b></>}
          </>
        );
      }
    } catch (error) {
      console.error("Error fetching flights:", error);
      toast.error("Error searching flights");
    }
  };

  return (
    <div className="px-[30px] md:px-[30px] max-w-[1400px] mx-auto">
      <BookTicketBox
        formData={formData}
        handleFormDataChange={handleFormDataChange}
        handleFlightSearch={handleFlightSearch}
      />

      <div className="py-5 text-center text-gray-700">{searchStatus}</div>

      {searchedFlights.length > 0 && (
        <div className="flex justify-center items-center gap-5 flex-wrap w-full">
          {searchedFlights.map((flight, index) => (
            <Link to={`/book/${flight._id}`} key={index} className="lg:w-full w-fit">
              <SearchedFlightCards flight={flight} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketSearchPage;
