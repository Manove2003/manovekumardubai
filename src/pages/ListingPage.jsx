import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useMansions } from "../context/MansionContext";
import {
  ArrowUp,
  X,
  Menu,
  MapPin,
  Home,
  Bed,
  Bath,
  Square,
  Tag,
  Info,
  Check,
} from "lucide-react";
import {
  FaSearch,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaPhoneAlt,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsFlag } from "react-icons/bs";
import axios from "axios";
import logo from "../assests/TMM-LANDING PAGE1.gif";
import sharelogo from "../assests/Share Icon_1.svg";
import sharelogoHover from "../assests/Share Icon White.svg";
import newImage1 from "../assests/image 5.png";
import newImage2 from "../assests/BrandedResi-P.jpg";
import newImage3 from "../assests/Mansions.jpg";
import MansionCard from "../components/Card";
import Footer from "../components/Footer";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link } from "react-router-dom";

const ListingPage = () => {
  const [phonenumber, setphonenumber] = useState("");
  const handleChangenumber = (value) => {
    setphonenumber(value);
  };

  const [visibleCount, setVisibleCount] = useState(6);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 6);
  };
  const { reference } = useParams();
  const { mansions, loading, error } = useMansions();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedMansion, setSelectedMansion] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const searchTimeoutRef = useRef(null);
  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // Disable body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = "auto"; // Restore scrolling
    }
  }, [isOpen]);

  const images = [newImage1, newImage2, newImage3];
  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://backend-5kh4.onrender.com"
      : "http://localhost:5001";
  const FALLBACK_IMAGE = "/images/fallback.jpg";

  // Scroll-to-top and outside click handling
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Search with debounce
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!searchQuery.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      setSearchError(null);
      return;
    }

    setSearchLoading(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/search`, {
          params: { query: searchQuery },
          timeout: 10000,
        });
        setSearchResults(Array.isArray(response.data) ? response.data : []);
        setHasSearched(true);
        setSearchError(null);
      } catch (err) {
        console.error("Search error:", err);
        setSearchError("Search failed. Please try again.");
        setSearchResults([]);
        setHasSearched(true);
      } finally {
        setSearchLoading(false);
      }
    }, 500);

    return () => clearTimeout(searchTimeoutRef.current);
  }, [searchQuery]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00603A]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-3xl mx-auto text-center">
        <div className="bg-red-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-red-700">
            Error loading property
          </h2>
          <p className="text-red-600 mt-2">
            {error.message || "Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  const property = mansions?.find((m) => m.reference === reference) || {
    propertytype: "Mansion",
    title: "Exquisite villa in Palm Jumeirah with private pool",
    subtitle:
      "Presidential penthouse in luxury branded residence on Palm Jumeirah",
    status: "For Sale",
    tag: "Exclusive",
    price: "95,000,000",
    reference: "44421",
    propertyaddress: "Palm Jumeirah",
    community: "Dubai",
    subcommunity: "Signature Villas",
    country: "UAE",
    bedrooms: 6,
    bathrooms: 8,
    size: 9729,
    builtuparea: 9729,
    furnishingtype: "Furnished",
    projectstatus: "Ready",
    unitno: "Villa 22",
    agentname: "Stephan Hirzel",
    designation: "Associate Director",
    callno: "+971501234567",
    whatsaapno: "+971501234567",
    contactNo: "+971501234567",
    whatsappNo: "+971501234567",
    email: "stephan@luxuryproperty.com",
    description:
      "It is hard to imagine a luxury property more impressive than this extraordinary five-bedroom Presidential penthouse apartment in the Armani Beach Residences, Palm Jumeirah...",
    amenities:
      "Central A/C & heating, Balcony, Equipped kitchen, Built-in wardrobes, Private pool, Maids room, Security, Gym, Concierge service, Beach access, Private garden, Smart home system",
    images: [newImage1, newImage2, newImage3],
    image: newImage1,
    video: "https://www.youtube.com/embed/example",
    videoLink: "https://www.youtube.com/embed/example",
    agentimage: newImage1,
    agentImage: newImage1,
    category: "Luxury Villa",
  };

  // Dynamic similar listings
  const similarListings = mansions
    .filter(
      (m) =>
        m.propertytype === property.propertytype &&
        m.reference !== property.reference
    )
    .slice(0, 3);

  const amenitiesList = property.amenities
    ? property.amenities.split(",").map((item) => item.trim())
    : [];
  const amenitiesColumns = [];
  const columnsCount = 3;
  const itemsPerColumn = Math.ceil(amenitiesList.length / columnsCount);
  for (let i = 0; i < columnsCount; i++) {
    amenitiesColumns.push(
      amenitiesList.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn)
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        const result = await response.json();
        alert(result.error || "Something went wrong.");
      }
    } catch (error) {
      alert("Failed to submit inquiry. Please try again.");
    }
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleShareClick = (mansion) => {
    setSelectedMansion(mansion);
    setShareModalOpen(true);
  };

  const getShareUrl = () => {
    return `${window.location.origin}/mansion/${property.reference}`;
  };

  const encodeShareText = () => {
    return encodeURIComponent(
      `Check out this ${property.propertytype}: ${property.title} - AED ${
        property.price || "N/A"
      } in ${property.community || property.category || "N/A"}, ${
        property.country || "N/A"
      }`
    );
  };

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        getShareUrl()
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareToInstagram = () => {
    navigator.clipboard.writeText(getShareUrl());
    alert("Instagram sharing not supported. Link copied to clipboard!");
  };

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        getShareUrl()
      )}&title=${encodeShareText()}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        getShareUrl()
      )}&text=${encodeShareText()}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareToWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeShareText()}%20${encodeURIComponent(
        getShareUrl()
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const isCollectible = property.propertytype === "Luxury Collectibles";

  // Determine the location text for Luxury Collectibles
  let locationText = "";
  if (isCollectible) {
    const community = property.community || property.location || "N/A";
    const country = property.country || "N/A";
    locationText =
      community !== "N/A" || country !== "N/A"
        ? `${community}, ${country}`
        : "Location unavailable";
  } else {
    locationText = `${property.community || "N/A"}, ${
      property.propertyaddress || "N/A"
    }, ${property.subcommunity || "N/A"}`;
  }

  // Fallback for Luxury Collectibles if location is unavailable
  const fallbackText =
    isCollectible && locationText === "Location unavailable"
      ? property.category ||
        property.description?.substring(0, 50) ||
        "Luxury Item"
      : null;

  return (
    <>
      <div className="flex flex-col items-center px-4 md:px-10 lg:px-20 py-12  font-inter">
        {/* Header with Logo and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 relative">
          <Link to="/">
            <img
              src={logo}
              className="w-[250px] md:w-[400px] cursor-pointer"
              alt="logo"
            />
          </Link>
          <div className="flex gap-2 w-full md:w-auto items-center ">
            <div className="flex items-center w-full md:w-[300px] border border-[#000000] overflow-hidden shadow-sm">
              <input
                type="text"
                placeholder="Country, Area, District..."
                className="w-full px-4 py-2 text-[#000000] text-sm bg-[#f5f5f5] focus:outline-none"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                aria-label="Search properties"
              />
            </div>
            <button
              type="button"
              onClick={() => setSearchQuery(searchQuery)}
              className="bg-[#00603A] px-4 py-[10px] flex items-center justify-center border border-[#00603A] text-white hover:text-[#00603A] hover:bg-transparent transition"
            >
              <FaSearch className="font-thin hover:text-[#00603A]" />
            </button>

            <button className="p-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <X className="w-6 h-6 text-[#000000]" />
              ) : (
                <Menu className="w-6 h-6 text-[#000000]" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Menu Popup */}
        {menuOpen && (
          <div ref={menuRef} className="mt-2 w-full">
            <div className="bg-white shadow-md p-4 z-50 absolute w-full right-0 px-12 md:px-20">
              {[
                { name: "Home", href: "/" },
                { name: "Mansions", href: "/mansions" },
                { name: "Penthouses", href: "/penthouses" },
                { name: "Developments", href: "/newdevelopment" },
                { name: "Magazine", href: "/magazine" },
                { name: "Luxe Collectibles", href: "/listedcollectibles" },
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block font-inter py-2 text-gray-800 hover:text-[#00603A] text-lg"
                >
                  {link.name}
                </a>
              ))}
              <p className="flex justify-start border-t border-[#000000] space-x-0 mt-3 pt-4 capitalize">
                Follow The Mansion Market
              </p>
              <div className="flex justify-start mt-4 py-4 space-x-6 mb-2">
                <a
                  href="https://www.facebook.com/themansionmarketcom"
                  className="text-[#00603A] hover:text-gray-400 text-2xl"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://x.com/the_mansion_m"
                  className="text-[#00603A] hover:text-gray-400 text-2xl"
                >
                  <FaXTwitter />
                </a>
                <a
                  href="https://www.instagram.com/themansionmarketcom"
                  className="text-[#00603A] hover:text-gray-400 text-2xl"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.linkedin.com/company/the-mansion-market"
                  className="text-[#00603A] hover:text-gray-400 text-2xl"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://www.youtube.com/@TheMansionMarket"
                  className="text-[#00603A] hover:text-gray-400 text-2xl"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {hasSearched && searchQuery.trim() && (
          <div className="w-full mx-auto mt-8">
            <h2 className="text-2xl text-[#00603A] mb-6 font-inter text-center">
              {searchLoading ? "Searching..." : `Results for "${searchQuery}"`}
            </h2>
            {searchLoading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00603A] mx-auto"></div>
                <p className="text-gray-600 mt-4">Searching properties...</p>
              </div>
            ) : searchError ? (
              <div className="text-center">
                <p className="text-red-600 mb-4">{searchError}</p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  No properties found matching "{searchQuery}"
                </p>
                <p className="text-gray-500">
                  Try different keywords like location, community, or property
                  type
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.slice(0, 6).map((mansion) => (
                  <MansionCard
                    key={mansion.reference}
                    mansion={mansion}
                    searchQuery={searchQuery}
                    onShare={() => handleShareClick(mansion)}
                  />
                ))}
                {searchResults.length > 6 && (
                  <p className="text-gray-600 text-center w-full">
                    Showing 6 of {searchResults.length} results. Refine your
                    search for more specific results.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Property Title and Summary */}
        <div className="flex flex-col md:space-x-6 mt-4 py-6 md:mt-6 space-x-2 md:space-y-0 text-center">
          <h3 className="text-3xl pt-6 font-playfair text-[#000000] text-center mb-8 bg-white">
            {property.title || "Untitled Property"}
          </h3>
          <p className="text-base text-center font-inter">
            {isCollectible
              ? `${property.category || "Luxury Item"} | ${
                  property.propertytype
                }`
              : `${property.propertytype} | ${property.bedrooms || 0} beds | ${
                  property.bathrooms || 0
                } baths | ${property.size || 0} sq. ft. | ${
                  property.builtuparea || 0
                } sq. ft. plot`}
          </p>
        </div>

        {/* Hero Image with ImageGallery */}
        <div className="relative w-full h-[280px] md:h-screen">
          <img
            src={property.images?.[0] || FALLBACK_IMAGE}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <button
            onClick={() => setIsOpen(true)}
            className="absolute  bottom-8 right-16 bg-white bg-opacity-75 hover:text-white text-black px-8 py-2 border border-[#00603A] hover:bg-[#00603A] transition-all duration-300"
          >
            Show All Photos
          </button>
        </div>

        {/* Main Content */}
        <div className="w-full mx-auto py-8 lg:flex lg:justify-between border-b border-black">
          {/* Left Section */}
          <div className="w-full lg:w-7/12">
            {isCollectible ? (
              <div className="bg-white mb-6">
                <h1 className="text-3xl font-playfair text-[#00603A]">
                  {property.title || "Untitled Collectible"}
                </h1>
                <p className="text-sm font-inter mt-4 text-gray-600">
                  {fallbackText || locationText}
                </p>
                <p className="text-3xl font-inter text-[#00603A] mt-4">
                  AED {property.price || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mt-2 font-inter">
                  PROPERTY REF: {property.reference || "N/A"}
                </p>
                <p className="text-base text-gray-700 mt-4 leading-7 font-inter w-full">
                  {showFullDescription
                    ? property.description
                    : `${
                        property.description?.substring(0, 300) ||
                        "No description available"
                      }...`}
                </p>
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="mt-6 font-inter px-8 md:px-20 py-3 text-black border border-[#00603A] hover:bg-[#00603A] hover:text-white transition-all duration-300"
                >
                  {showFullDescription ? "Show less" : "Show full description"}
                </button>
                {/* Collectible Details in place of Features & Amenities */}
                <div className="border-t border-b border-[#00603A] mt-8 pb-8 py-6">
                  <h1 className="text-3xl font-playfair text-[#00603A]">
                    Collectible Details
                  </h1>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 font-inter">
                      <strong>Category:</strong>{" "}
                      {property.category || "Luxury Item"}
                    </p>
                    {property.subtitle && (
                      <p className="text-sm text-gray-600 font-inter mt-2">
                        <strong>Subtitle:</strong> {property.subtitle}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 font-inter mt-2">
                      <strong>Status:</strong> {property.status || "For Sale"}
                    </p>
                  </div>
                </div>
                {property.videoLink && (
                  <div className="mt-8">
                    <h2 className="text-2xl font-playfair text-[#00603A] mb-4">
                      Video
                    </h2>
                    <iframe
                      className="w-full h-64 border-0 rounded-none"
                      src={property.videoLink}
                      allowFullScreen
                      title="Property Video"
                    ></iframe>
                  </div>
                )}
              </div>
            ) : (
              <>
                <h1 className="text-3xl -mt-4 font-playfair text-[#00603A]">
                  {property.subtitle || "Untitled Property"}
                </h1>
                <p className="text-sm font-inter mt-4 text-gray-600">
                  {locationText}
                </p>
                <p className="text-3xl font-inter text-[#00603A] mt-4">
                  AED {property.price || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mt-2 font-inter">
                  PROPERTY REF: {property.reference || "N/A"}
                </p>
                <p className="text-base text-gray-700 mt-4 leading-7 font-inter w-full md:w-10/12">
                  {showFullDescription
                    ? property.description
                    : `${
                        property.description?.substring(0, 300) ||
                        "No description available"
                      }...`}
                </p>
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="mt-6 font-inter px-8 md:px-20 py-3 text-black border border-[#00603A] hover:bg-[#00603A] hover:text-white transition-all duration-300"
                >
                  {showFullDescription ? "Show less" : "Show full description"}
                </button>

                {/* Features & Amenities */}
                <div className="border-t border-b border-[#00603A] mt-8 pb-8 py-6">
                  <h1 className="text-3xl font-playfair text-[#00603A]">
                    Features & Amenities
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {amenitiesColumns.map((column, colIndex) => (
                      <ul key={colIndex} className="space-y-2 font-inter">
                        {column.map((amenity, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="h-4 w-4 text-[#00603A] mr-1 flex-shrink-0" />

                            <span>{amenity}</span>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                </div>

                {/* Location Map */}
                <div className="text-start mt-4">
                  <h2 className="text-3xl mb-8 font-playfair text-[#00603A]">
                    Location Map
                  </h2>
                  <div className="w-full relative">
                    <iframe
                      className="w-full h-64 border-0 rounded-none"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.496236789558!2d55.270782315318835!3d25.2048499838886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4347f51ff62d%3A0x9e2df8d4d7e8f12a!2sDubai!5e0!3m2!1sen!2sae!4v1631234567890!5m2!1sen!2sae"
                      allowFullScreen
                      loading="lazy"
                      title="map"
                    ></iframe>
                  </div>
                </div>
              </>
            )}

            {/* Share Listing Button */}
            <div className="text-center mt-8">
              <button
                onClick={() => handleShareClick(property)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-full py-2 flex items-center justify-center gap-2 font-inter px-0 md:px-20 text-black border border-[#00603A] hover:bg-[#00603A] hover:text-white transition-all duration-300"
              >
                <span>Share Listing</span>
                <img
                  src={isHovered ? sharelogoHover : sharelogo}
                  className="w-4"
                  alt="Share"
                />
              </button>
            </div>
          </div>

          {/* Right Section (Agent Form) */}
          <div className="lg:w-5/12 ml-0 md:ml-12 lg:mt-0">
            <div className="sticky top-20">
              {isSubmitted ? (
                <div className="border border-[#00603A] p-6 mt-8 md:-mt-4 z-0 sticky top-20 bg-[#f5f5f5] text-center text-[#00603A] font-semibold">
                  Your inquiry was submitted successfully!
                </div>
              ) : (
                <form className="mt-6" onSubmit={handleSubmit}>
                  <div className="border border-[#00603A] p-6 mt-4 md:-mt-8 z-0 sticky top-20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-inter font-semibold text-gray-800">
                          {property.agentname ||
                            property.agentName ||
                            "Agent Name"}
                        </h3>
                        <p className="text-sm text-gray-500 font-inter sevi">
                          {property.designation || "Designation"}
                        </p>
                      </div>
                      {property.agentimage || property.agentImage ? (
                        <img
                          src={property.agentimage || property.agentImage}
                          alt={property.agentname || property.agentName}
                          className="w-20 h-20 rounded-full object-cover mr-4"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-[#00603A] flex items-center justify-center mr-4">
                          <span className="text-white font-bold text-xl">
                            {(property.agentname || property.agentName || "")
                              .charAt(0)
                              .toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 mt-4 border-b pb-4">
                      <a
                        href={`https://wa.me/${
                          property.whatsaapno ||
                          property.whatsappNo ||
                          "+971501234567"
                        }`}
                        className="text-[#00603A] font-inter flex items-center space-x-1"
                      >
                        <FaWhatsapp />
                        <span>WhatsApp</span>
                      </a>
                      <span className="text-[#f5f5f5]">|</span>
                      <a
                        href={`tel:${
                          property.callno || property.callNo || "+971501234567"
                        }`}
                        className="text-[#00603A] font-inter flex items-center space-x-1"
                      >
                        <FaPhoneAlt />
                        <span>Call</span>
                      </a>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First name *"
                        required
                        className="border p-2 w-full border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#00603A]"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last name *"
                        required
                        className="border p-2 w-full border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#00603A]"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email *"
                      required
                      className="border p-2 w-full mt-4 border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#00603A]"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <div className="flex items-center mt-4">
                      <PhoneInput
                        country={"us"}
                        containerStyle={{ width: "100%" }}
                        inputStyle={{
                          width: "100%",
                          height: "50px",
                          borderRadius: "0",
                        }}
                        className="border-none border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#00603A]"
                        placeholder="Phone number"
                        aria-label="Phone number"
                        value={phonenumber}
                        onChange={handleChangenumber}
                        inputProps={{
                          required: true,
                        }}
                      />
                    </div>
                    <textarea
                      name="message"
                      placeholder="I'd like to have more information about this property..."
                      required
                      className="border p-2 w-full mt-4 border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#00603A]"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full mt-6 px-6 py-2 flex items-center justify-center gap-2 font-inter text-white bg-[#00603A] border border-[#00603A] hover:bg-white hover:text-[#000000] transition-all duration-300"
                    >
                      Submit enquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Similar Listings */}
        <div className="w-full mx-auto mt-8">
          <h2 className="text-3xl text-center mb-12 mt-8 font-playfair text-[#00603A]">
            Similar {isCollectible ? "Collectibles" : "Properties"} Listing
          </h2>
          {similarListings.length === 0 ? (
            <p className="text-gray-600 text-center w-full text-lg">
              No similar {isCollectible ? "collectibles" : "properties"} found.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {similarListings.slice(0, visibleCount).map((mansion) => (
                  <MansionCard
                    key={mansion.reference}
                    mansion={mansion}
                    searchQuery={searchQuery}
                  />
                ))}
              </div>
              {visibleCount < similarListings.length && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleViewMore}
                    className="px-3 py-2 border border-[#00603A] rounded-none text-[#00603A] bg-white hover:bg-[#00603A] hover:text-white transition text-sm font-medium"
                  >
                    View More
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Share Modal */}
        {shareModalOpen && selectedMansion && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-white shadow-lg max-w-md w-full">
              <div className="relative">
                <button
                  onClick={() => setShareModalOpen(false)}
                  className="absolute -top-8 right-2 p-1"
                >
                  <X size={22} />
                </button>
                <div className="relative w-full h-64">
                  <img
                    src={
                      selectedMansion.images?.[0] ||
                      selectedMansion.image ||
                      FALLBACK_IMAGE
                    }
                    alt={selectedMansion.title}
                    className="w-full h-full object-cover mt-8"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/55 to-transparent"></div>
                  <div className="absolute top-4 left-4 text-white">
                    <h2 className="text-2xl text-left font-playfair">
                      {selectedMansion.title}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="p-5 text-left">
                <h3 className="text-lg font-semibold">Share</h3>
                <p className="text-gray-600 mt-2">
                  {selectedMansion.subtitle || selectedMansion.subTitle}
                </p>
                <div className="flex justify-left space-x-4 mt-4">
                  <button
                    onClick={shareToFacebook}
                    className="p-2 bg-gray-200 rounded-full hover:bg-[#00603A] hover:text-white transition-colors"
                  >
                    <FaFacebook size={20} />
                  </button>
                  <button
                    onClick={shareToInstagram}
                    className="p-2 bg-gray-200 rounded-full hover:bg-[#00603A] hover:text-white transition-colors"
                  >
                    <FaInstagram size={20} />
                  </button>
                  <button
                    onClick={shareToLinkedIn}
                    className="p-2 bg-gray-200 rounded-full hover:bg-[#00603A] hover:text-white transition-colors"
                  >
                    <FaLinkedin size={20} />
                  </button>
                  <button
                    onClick={shareToTwitter}
                    className="p-2 bg-gray-200 rounded-full hover:bg-[#00603A] hover:text-white transition-colors"
                  >
                    <FaXTwitter size={20} />
                  </button>
                  <button
                    onClick={shareToWhatsApp}
                    className="p-2 bg-gray-200 rounded-full hover:bg-[#00603A] hover:text-white transition-colors"
                  >
                    <FaWhatsapp size={20} />
                  </button>
                </div>
              </div>
              <div className="bg-[#00603A] h-4"></div>
            </div>
          </div>
        )}

        {/* Scroll to Top */}
        {showScrollToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-[#00603A] text-white rounded-full shadow-lg hover:bg-[#004d2e] transition-all"
          >
            <ArrowUp size={20} />
          </button>
        )}
        {isOpen && (
          <div className="w-full absolute bottom-4 left-4">
            <div className="fixed inset-0 flex justify-center items-start z-50  bg-white overflow-y-auto">
              {/* Fixed Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="fixed top-4 right-8 text-[#000000] hover:text-[#00603A] px-3 py-1 rounded-md text-xl z-50"
              >
                ✕
              </button>

              {/* Modal Content (Moved Down) */}
              <div className="relative p-5 w-full mt-16 mb-8  ">
                {/* Images and Text Layout */}
                <div className="flex flex-col md:flex-row gap-4 md:h-auto">
                  {/* 🟢 Images Container (First on mobile, second on desktop) */}
                  <div className="flex flex-col w-full md:w-[75%] order-1 md:order-2">
                    {property.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Image ${index + 1}`}
                        className="w-full h-auto mb-4"
                      />
                    ))}
                  </div>

                  {/* 🟢 Text Container (Second on mobile, first on desktop) */}
                  <div className="w-full md:w-[25%] p-4 md:sticky md:top-4 self-start order-2 md:order-1">
                    <div className="flex flex-col  mt-4 py-6 md:mt-6  md:space-y-0">
                      <h3 className="text-3xl font-playfair break-words text-[#000000] mb-8 bg-white">
                        {property.title || "Untitled Property"}
                      </h3>

                      <p className="text-base break-words font-inter pt-8 border-t border-[#00603A]">
                        {property.propertytype || "Property Type"} |{" "}
                        {property.bedrooms || "Bedrooms"} beds |{" "}
                        {property.bathrooms || "Bathrooms"} baths |{" "}
                        {property.area || "Area"} sq. ft. |{" "}
                        {property.plotarea || "Plot Area"} sq. ft. plot
                      </p>
                    </div>

                    <div className="flex gap-2 mt-4 border-b pb-4">
                      <a
                        href={`https://wa.me/${
                          property.whatsaapno ||
                          property.whatsappNo ||
                          "+971501234567"
                        }`}
                        className="text-[#00603A] font-inter flex items-center space-x-1"
                      >
                        <FaWhatsapp />
                        <span>WhatsApp</span>
                      </a>
                      <span className="text-[#f5f5f5]">|</span>
                      <a
                        href={`tel:${
                          property.callno || property.callNo || "+971501234567"
                        }`}
                        className="text-[#00603A] font-inter flex items-center space-x-1"
                      >
                        <FaPhoneAlt />
                        <span>Call</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ListingPage;
