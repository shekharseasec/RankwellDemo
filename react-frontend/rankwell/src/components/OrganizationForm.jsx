import React, {useState} from 'react';
import axios from 'axios';

/**
 * Example menu items (hardcoded for a real navbar look)
 */
import {Home, Info, Image} from 'lucide-react';

const NAV_MENU = [
    {
        label: 'Home',
        icon: <Home className="w-5 h-5 text-white"/>
    }, {
        label: 'About',
        icon: <Info className="w-5 h-5 text-white"/>
    }, {
        label: 'Gallery',
        icon: <Image className="w-5 h-5 text-white"/>
    }
];

const OrganizationForm = () => {
    const [formData, setFormData] = useState({
        orgName: '',
        orgEmail: '',
        orgPhone: '',
        orgAddress: '',
        orgLogo: null,
        orgBrandMedia: null,
        orgAbout: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // To preview selected image files
    const [logoPreview, setLogoPreview] = useState(null);
    const [brandMediaPreview, setBrandMediaPreview] = useState(null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const {name, files} = e.target;
        const file = files[0];
        setFormData((prev) => ({
            ...prev,
            [name]: file
        }));
        // Preview for images
        if (name === 'orgLogo' && file) {
            setLogoPreview(URL.createObjectURL(file));
        }
        if (name === 'orgBrandMedia' && file) {
            setBrandMediaPreview(URL.createObjectURL(file));
        }
    };

    const triggerLogoInput = () => {
        document.getElementById("orgLogoInput").click();
    };

    const triggerBannerInput = () => {
        document.getElementById("orgBannerInput").click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const submitData = new FormData();
        submitData.append('orgName', formData.orgName);
        submitData.append('orgEmail', formData.orgEmail);
        submitData.append('orgPhone', formData.orgPhone);
        submitData.append('orgAddress', formData.orgAddress);
        submitData.append('orgAbout', formData.orgAbout);

        if (formData.orgLogo) {
            submitData.append('orgLogo', formData.orgLogo);
        }
        if (formData.orgBrandMedia) {
            submitData.append('orgBrandMedia', formData.orgBrandMedia);
        }

        try {
            await axios.post('http://localhost:8080/organization/saveOrUpdateOrg', submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccess('Organization data submitted successfully!');
            setError('');
        } catch (err) {
            setError('Failed to submit organization data.');
            setSuccess('');
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col w-full min-h-screen bg-white">
            {/* Navbar with hardcoded menu items */}
            <nav className="relative flex items-center justify-between px-8 py-3 bg-orange-500 shadow">
                <div className="flex items-center space-x-6">
                    {/* Logo - Floating above the banner image */}
                    <div className="">
                        <div className="relative group w-16 h-16">
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg overflow-hidden border-2 border-orange-300">
                                {
                                logoPreview ? (
                                    <img src={logoPreview}
                                        alt="Logo preview"
                                        className="object-contain w-full h-full"/>
                                ) : (
                                    <span className="text-orange-400 text-xs text-center font-semibold">Logo</span>
                                )
                            } </div>
                            {/* Upload/Change icon, styled and floating over the logo */}
                            <button type="button" className="absolute top-0 -right-3 bg-orange-500 rounded-full border-2 border-orange-300 shadow-lg p-2 hover:bg-orange-50 transition group"
                                onClick={triggerLogoInput}
                                tabIndex={-1}
                                // Prevent stealing input focus
                            >
                                {/* Orange "upload/change" SVG */}
                                <svg className="w-3 h-3 bg-orange-500 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"/>
                                    <path d="M7 10l5-5 5 5"/>
                                    <path d="M12 4.5V16"/>
                                </svg>
                            </button>
                            <input id="orgLogoInput" className="hidden" type="file" name="orgLogo" accept="image/*"
                                onChange={handleFileChange}/>
                        </div>
                    </div>

                    <ul className="flex items-center space-x-4">
                        {
                        NAV_MENU.map((item, idx) => (
                            <li key={
                                item.label
                            }>
                                <a href="#"
                                    className={
                                        `flex items-center space-x-1 px-3 py-1 rounded transition 
                                    hover:bg-orange-600 text-white font-medium text-sm ${
                                            idx === 0 ? "bg-orange-600" : ""
                                        }`
                                }>
                                    {
                                    item.icon
                                }
                                    <span>{
                                        item.label
                                    }</span>
                                </a>
                            </li>
                        ))
                    } </ul>
                </div>
                <button type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className={
                        `py-2 px-6 rounded-md flex items-center justify-center font-bold
                        shadow-lg bg-white text-orange-600 border-2 border-orange-300
                        hover:bg-orange-50 hover:text-orange-700
                        transition-colors ${
                            loading ? "opacity-60 cursor-not-allowed" : ""
                        }`
                }>
                    {
                    loading ? "Submitting..." : "Submit"
                } </button>
            </nav>

            {/* Main form section */}
            <form onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="flex flex-col flex-1">

                {/* Banner / Brand Media - full width, whitesmoke, centered  */}
                <div className="relative w-full mt-6">
                    <div className="w-full bg-[#f5f5f5] rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center min-h-[230px] border border-orange-200 mx-auto"
                        style={
                            {minHeight: "270px"}
                    }>
                        <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
                            onClick={triggerBannerInput}
                            htmlFor="orgBannerInput">
                            {
                            brandMediaPreview ? (
                                <img src={brandMediaPreview}
                                    alt="Brand media preview"
                                    className="w-full h-[270px] object-cover"/>
                            ) : (
                                <div className="flex flex-col items-center justify-center w-full h-[270px]">
                                    {/* Large orange SVG */}
                                    <svg className="w-24 h-24 mb-4 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 64 64">
                                        <rect x="8" y="16" width="48" height="32" rx="4" stroke="currentColor" strokeWidth="4" fill="none"/>
                                        <path d="M20 32l8 8 16-16" stroke="currentColor" strokeWidth="4" fill="none"/>
                                    </svg>
                                    <span className="text-orange-600 text-lg font-semibold mt-2">
                                        Click or Drag to Upload Banner
                                    </span>
                                </div>
                            )
                        }
                            <input id="orgBannerInput" type="file" name="orgBrandMedia" accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"/>
                        </label>
                    </div>

                </div>

                {/* About section */}
                <div className="mx-auto m-20 flex flex-col items-center w-full max-w-xl">
                    <label className="block mb-2 text-lg font-semibold text-orange-700 text-center">
                        Organization About
                    </label>
                    <textarea className="w-full h-32 p-4 border-2 border-orange-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-600 shadow-sm resize-none" name="orgAbout" placeholder="Describe your organization..."
                        value={
                            formData.orgAbout
                        }
                        onChange={handleChange}
                        required/>
                </div>

                {/* Form and Footer Section */}
                <div className="mt-auto py-10 w-full bg-black border-t-2 border-orange-100">
                    <div className="flex flex-col items-center justify-center gap-6 max-w-lg mx-auto">
                        <div className="w-full flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-orange-200 mb-1">Organization Name</label>
                                <input className="w-full px-4 py-2 border-2 border-orange-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white text-gray-800" type="text" name="orgName"
                                    value={
                                        formData.orgName
                                    }
                                    onChange={handleChange}
                                    required
                                    placeholder="Organization Name"/>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-orange-200 mb-1">Email</label>
                                <input className="w-full px-4 py-2 border-2 border-orange-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white text-gray-800" type="email" name="orgEmail"
                                    value={
                                        formData.orgEmail
                                    }
                                    onChange={handleChange}
                                    required
                                    placeholder="Email"/>
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-orange-200 mb-1">Phone Number</label>
                                <input className="w-full px-4 py-2 border-2 border-orange-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white text-gray-800" type="text" name="orgPhone"
                                    value={
                                        formData.orgPhone
                                    }
                                    onChange={handleChange}
                                    required
                                    placeholder="Phone Number"/>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-orange-200 mb-1">Address</label>
                                <input className="w-full px-4 py-2 border-2 border-orange-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white text-gray-800" type="text" name="orgAddress"
                                    value={
                                        formData.orgAddress
                                    }
                                    onChange={handleChange}
                                    required
                                    placeholder="Address"/>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Success, Error, Loading messages */}
                <div className="absolute top-24 left-0 right-0 z-50 pointer-events-none">
                    {
                    loading && <div className="mx-auto mb-4 p-3 max-w-xs rounded bg-blue-100 text-blue-600 text-center shadow">Loading...</div>
                }
                    {
                    error && <div className="mx-auto mb-4 p-3 max-w-xs rounded bg-red-100 text-red-600 text-center shadow">
                        {error} </div>
                }
                    {
                    success && <div className="mx-auto mb-4 p-3 max-w-xs rounded bg-green-100 text-green-600 text-center shadow">
                        {success} </div>
                } </div>
                {/* Hide submit button here as it's in the navbar */}
                <button type="submit" className="hidden"></button>
            </form>
        </div>
    );
};

export default OrganizationForm;
