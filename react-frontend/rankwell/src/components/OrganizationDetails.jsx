import React, {useState, useEffect} from "react";
import {
    ArrowLeft,
    Building2,
    Mail,
    Phone,
    MapPin,
    Award
} from "lucide-react";

/**
 * Pretty banner style with fallback when no banner
 */
const Banner = ({src}) => (src ? (
    <div className="w-full h-52 md:h-72 bg-gray-100 rounded-t-lg overflow-hidden flex items-center justify-center">
        <img src={src}
            alt="Organization Banner"
            className="object-cover w-full h-full"/>
    </div>
) : (
    <div className="w-full h-52 md:h-72 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 rounded-t-lg flex flex-col items-center justify-center relative overflow-hidden">
        <span className="text-5xl md:text-7xl font-bold text-orange-200 opacity-40 absolute inset-0 pointer-events-none select-none">
            Rankwell
        </span>
        <span className="text-lg font-medium text-orange-500 opacity-90 relative z-10">
            Your journey begins here
        </span>
    </div>
));

// Default data in case API fails
const DEFAULT_ORG = {
    id: "default-1",
    orgLogo: "",
    orgBrandMedia: "",
    orgName: "Rankwell",
    orgEmail: "info@rankwell.in",
    orgPhone: "+91 12345 67890",
    orgAddress: "123, EdTech Street, Innovation City, India",
    orgAbout: "Rankwell is a career boost platform for developers, nurturing the leaders and innovators of tomorrow. We offer a dynamic learning environment that fosters intellectual curiosity, creativity, and critical thinking.",
    createdAt: new Date().toISOString()
};

const OrganizationDetails = ({onBack}) => {
    const [org, setOrg] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch data on mount
    useEffect(() => {
        const fetchOrg = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://localhost:8080/organization/details");
                if (! res.ok) 
                    throw new Error("Network response was not ok");
                

                const data = await res.json();
                // Use fetched data if present and valid
                if (data && (data.orgName || data.org_name || data.orgEmail || data.org_email)) {
                    setOrg(data);
                } else {
                    setOrg(DEFAULT_ORG); // fallback to default
                }
            } catch (err) {
                setOrg(DEFAULT_ORG); // fallback to default on API error
            }
            setLoading(false);
        };
        fetchOrg();
    }, []);

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto flex flex-col items-center justify-center h-72">
                <span className="text-orange-500 text-lg font-semibold">Loading organization details...</span>
            </div>
        );
    }
    if (!org) {
        return (
            <div className="max-w-3xl mx-auto flex flex-col items-center justify-center h-72">
                <span className="text-red-500 text-lg font-semibold">Failed to load organization details.</span>
            </div>
        );
    }

    // Our API uses snake_case, handle both for future-proofing
    const {
        id,
        orgLogo,
        orgBrandMedia,
        orgName,
        orgEmail,
        orgPhone,
        orgAddress,
        orgAbout,
        createdAt
    } = org;

    return (
        <div className="max-w-full">
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {/* Banner image */}
                <Banner src={orgBrandMedia}/> {/* Logo, name, about */}
                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 px-6 pt-6 pb-2 bg-white relative z-10">
                    <div className="flex-shrink-0">
                        {
                        orgLogo ? (
                            <div className="w-24 h-24 rounded-full bg-white shadow border-2 border-orange-100 flex items-center justify-center overflow-hidden">
                                <img src={orgLogo}
                                    alt={orgName}
                                    className="object-contain w-full h-full"/>
                            </div>
                        ) : (
                            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center border-2 border-orange-200">
                                <Building2 className="w-12 h-12 text-orange-400"/>
                            </div>
                        )
                    } </div>
                    <div className="flex-1">
                        <h1 className="text-3xl font-extrabold text-gray-800 mb-1">
                            {orgName}</h1>
                        {/* Optionally add tagline in future */}
                        <p className="text-gray-600 mt-2">
                            {orgAbout}</p>
                    </div>
                </div>

                {/* Contact Info section */}
                <div className="bg-orange-50 border-y mt-4 py-5 px-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {
                    orgEmail && (
                        <div className="flex items-center text-gray-800">
                            <Mail className="w-5 h-5 mr-2 text-orange-500"/>
                            <span>{orgEmail}</span>
                        </div>
                    )
                }
                    {
                    orgPhone && (
                        <div className="flex items-center text-gray-800">
                            <Phone className="w-5 h-5 mr-2 text-orange-500"/>
                            <span>{orgPhone}</span>
                        </div>
                    )
                }
                    {
                    orgAddress && (
                        <div className="flex items-center text-gray-800 col-span-2">
                            <MapPin className="w-5 h-5 mr-2 text-orange-500"/>
                            <span>{orgAddress}</span>
                        </div>
                    )
                } </div>

                {/* Values / highlight area - using About for now */}
                <div className="px-6 py-6">
                    <div className="flex items-center mb-4">
                        <Award className="w-5 h-5 text-orange-500 mr-2"/>
                        <span className="text-lg font-semibold text-gray-800">Why Rankwell?</span>
                    </div>
                    <ul className="list-disc ml-8 text-gray-700 space-y-1">
                        <li>
                            <span>
                                Inspiring educational environment for certification & career boost.
                            </span>
                        </li>
                        <li>
                            <span>
                                Focus on innovation and leadership for tomorrow’s professionals.
                            </span>
                        </li>
                        <li>
                            <span>
                                "{
                                orgAbout && orgAbout.length > 100 ? orgAbout.substring(0, 100) + "..." : orgAbout
                            }"
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Metadata */}
                {/* <div className="px-6 py-4 bg-gray-100 border-t rounded-b-lg flex items-center justify-between text-xs text-gray-500">
                    <div> {
                        createdAt && (
                            <div>
                                Created on:{" "}
                                <span className="font-semibold">
                                    {
                                    new Date(createdAt).toLocaleString()
                                } </span>
                            </div>
                        )
                    } </div>
                    <div>
                        Organization ID:
                        <span className="font-semibold">
                            {id}</span>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default OrganizationDetails;
