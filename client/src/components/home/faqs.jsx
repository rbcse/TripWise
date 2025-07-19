import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

const Faqs = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = [
        {
            question: 'What is TripWise?',
            answer: 'TripWise is a smart trip-planning platform that helps users discover top attractions, book budget-friendly hotels, and visualize their itinerary on an interactive map.',
        },
        {
            question: 'How does TripWise suggest places to visit?',
            answer: 'TripWise uses AI-powered recommendations and integrates with travel APIs to suggest popular destinations, hotels, and activities based on your interests and budget.',
        },
        {
            question: 'Can I customize my itinerary?',
            answer: 'Yes! You can add, remove, or reorder places in your trip plan and adjust your preferences to create a personalized itinerary.',
        },
        {
            question: 'Does TripWise provide real-time navigation?',
            answer: 'Yes, TripWise integrates with Google Maps to provide real-time navigation, estimated travel times, and optimized routes for your trip.',
        },
        {
            question: 'Is TripWise free to use?',
            answer: 'TripWise offers free access to trip planning features. However, premium features like AI-based recommendations and exclusive deals may require a subscription.',
        },
        {
            question: 'How can I book hotels through TripWise?',
            answer: 'TripWise provides hotel listings with pricing and ratings. You can book hotels directly through our platform via partnered booking services.',
        },
    ];

    return (
        <div className='flex justify-center items-center w-full flex-col mb-7 px-5 md:px-10'>
            <h1 className='text-2xl md:text-3xl font-bold mb-5 text-center'>Frequently Asked Questions</h1>

            <div className='flex flex-col w-full md:w-[75%] lg:w-[60%]'>
                {faqs.map((faq, index) => {
                    const isOpen = openFaq === index;
                    return (
                        <div
                            key={index}
                            className={`mb-3 p-4 rounded-lg shadow-md transition-all duration-300 ${
                                isOpen ? 'bg-[#fbc531] text-black' : 'bg-white text-gray-800'
                            }`}
                        >
                            <button
                                className='w-full flex justify-between items-center text-left text-[16px] md:text-[18px] font-semibold'
                                onClick={() => toggleFaq(index)}
                            >
                                <span className='flex-1'>{faq.question}</span>
                                <FontAwesomeIcon
                                    icon={isOpen ? faMinus : faPlus}
                                    className="text-gray-600 cursor-pointer"
                                />
                            </button>
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className='mt-2 text-sm md:text-base'
                                    >
                                        {faq.answer}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Faqs;