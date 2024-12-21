import React, { useState } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [isActivated, setIsActivated] = useState("Home");
    const [formData, setFormData] = useState({
        fullName: '',
        mailAddress: '',
        phoneNumber: '',
        date: '',
        service: 'Haircut',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const headerItems = ["Home", "Services", "Contact US"];

    const validateForm = () => {
        const newErrors = {};
        const mailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneNumberFormat = /^(06|07)\d{8}$/;

        if (formData.mailAddress === "" || !mailFormat.test(formData.mailAddress)) {
            newErrors.mailAddress = "Invalid mail address";
        }

        if (formData.phoneNumber === "" || !phoneNumberFormat.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Invalid phone number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post('https://barbershopback.onrender.com/api/send-email', formData.slice(0,-1));
                if (response.status === 200) {
                    alert("Reservation successful!!");
                    setFormData({
                        fullName: '',
                        mailAddress: '',
                        phoneNumber: '',
                        date: '',
                        service: 'Haircut',
                    });
                }
            } catch (error) {
                console.error('Erreur lors de l\'envoi de la demande:', error);
                alert('Erreur lors de l\'envoi de la demande.');
            }
        }
    };

    const handleComment = async(e) =>{
        e.preventDefault();
        if (formData.message !== "" || formData.message !== " "){
            try{
                const response = await axios.post('https://barbershopback.onrender.com/api/send-comment', formData.fullName, formData.mailAddress, formData.message);
                if(response.status == 200){
                    alert("Comment sent successfully!!");
                    setFormData({
                        fullName: '',
                        mailAddress: '',
                        message: ''
                    });
                }
            }catch(error){
                console.error(error);
                alert('Error while sending the comment');
            }
        }
    }
    return (
        <div className="bg-gray-50 text-gray-900">
            <header className="bg-gradient-to-r from-orange-950 via-black to-orange-950 text-white py-6 shadow-xl">
                <nav className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-extrabold tracking-wide">Barber<span className='text-orange-500'>Shop</span></h1>
                    <div className="flex space-x-4">
                        {headerItems.map((item) => (
                            <button
                                key={item}
                                onClick={() => setIsActivated(item)}
                                className={`px-5 py-2 border-2 rounded-lg text-lg font-medium transition-all duration-300 ${isActivated === item ? "bg-white text-black border-white shadow-lg" : "border-white hover:bg-gray-700 hover:border-white"}`}
                            >
                                <a href={`#${item}`}>{item}</a>
                            </button>
                        ))}
                    </div>
                </nav>
            </header>

            <section className="bg-white text-black py-16">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 px-4">
                    <div className="flex flex-col justify-center space-y-6">
                        <h1 className="text-4xl font-bold leading-tight text-center lg:text-left">Relax, Look great, Feel confident</h1>
                        <h3 className="text-lg text-center lg:text-left max-w-lg mx-auto lg:mx-0">The art of the cut, the excellence of service; delivering a unique style and an unforgettable experience.</h3>
                    </div>
                    <div className="bg-black p-8 rounded-3xl shadow-2xl">
                        <h3 className=" text-white text-2xl font-semibold mb-6 text-center">Make an appointment</h3>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <input type="text" required placeholder="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-4 rounded-xl bg-white text-black placeholder-gray-600 focus:ring-2 focus:ring-orange-400 transition duration-300" />
                            <input type="email" required placeholder="Email Address" name="mailAddress" value={formData.mailAddress} onChange={handleChange} className="w-full p-4 rounded-xl bg-white text-black placeholder-gray-600 focus:ring-2 focus:ring-orange-400 transition duration-300" />
                            {errors.mailAddress && <p className="text-red-500 text-sm">{errors.mailAddress}</p>}
                            <input type="tel" required placeholder="Phone Number" name='phoneNumber' value={formData.phoneNumber} onChange={handleChange} className="w-full p-4 rounded-xl bg-white text-black placeholder-gray-600 focus:ring-2 focus:ring-orange-400 transition duration-300" />
                            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                            <input type="date" required placeholder="Date" name="date" value={formData.date} onChange={handleChange} className="w-full p-4 rounded-xl bg-white text-black placeholder-gray-600 focus:ring-2 focus:ring-orange-400 transition duration-300" />
                            <select name="service" value={formData.service} onChange={handleChange} className="w-full p-4 font-bold rounded-xl focus:ring-2 focus:ring-orange-400 transition duration-300">
                                <option value="Haircut">Haircut</option>
                                <option value="Shaves">Shaves</option>
                                <option value="Beard Grooming">Beard Grooming</option>
                            </select>
                            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 font-bold">
                                Submit Request
                            </button>
                        </form>
                    </div>
                </div>
            </section>


            <section id ='Services' className="bg-gradient-to-r from-orange-950 via-black to-orange-950 text-black py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-semibold mb-8 text-white">Our Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="bg-white p-8 rounded-xl shadow-lg">
                        <h3 className="text-2xl font-bold mb-4">Haircuts</h3>
                        <p className="text-lg mb-6">Precision haircuts tailored to your style, whether it’s a classic look or something fresh and modern.</p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-lg">
                        <h3 className="text-2xl font-bold mb-4">Shaves</h3>
                        <p className="text-lg mb-6">Experience the ultimate relaxation with our traditional hot towel shave, leaving your skin smooth and refreshed.</p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-lg">
                        <h3 className="text-2xl font-bold mb-4">Beard Grooming</h3>
                        <p className="text-lg mb-6">Professional beard trimming and grooming to keep your beard sharp and well-defined.</p>
                    </div>
                    </div>
                </div>
            </section>
            <section id='Contact US' className="bg-white text-black py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl text-black font-bold mb-8">Contact Us</h2>
                    <p className="text-lg mb-12">Have questions or want to book an appointment? We’re here to help. Reach out to us using the form below or the contact information provided.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-black p-8 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
                            <form className="space-y-6">
                                <input type="text" placeholder="Full Name" className="w-full p-4 rounded-xl bg-white text-black placeholder-gray-600 focus:ring-2 focus:ring-orange-400 transition duration-30"/>
                                <input type="email" placeholder="Email" className="w-full p-4 rounded-xl bg-white text-black placeholder-gray-600 focus:ring-2 focus:ring-orange-400 transition duration-30"/>
                                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows="5" className="w-full p-4 rounded-xl bg-white text-black placeholder-gray-600 focus:ring-2 focus:ring-orange-400 transition duration-30"></textarea>
                                <button className="bg-orange-500 hover:bg-orange-600 text-white font-blod px-6 py-3 rounded-xl transition-all duration-300 w-full font-bold" onClick={handleComment}>Send Message</button>
                            </form>
                        </div>
                        <div className="flex flex-col justify-center space-y-6">
                            <div className="flex items-center space-x-4">
                                <p className="text-lg font-bold">Address: </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className="text-lg font-bold">Phone Number: </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className="text-lg font-bold">Address: </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className="text-lg font-bold">Mon - Sat: 9:00 AM - 7:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer className='bg-black text-white flex justify-center items-center py-6'>© 2024 Blade & Style. All rights reserved.</footer>
        </div>
    );
};

export default HomePage;
