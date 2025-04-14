import heroImg from '../../assets/hero.png';

const Hero = () => {
    return (
        <div className='flex flex-col md:flex-row justify-center items-center gap-5 py-20 w-full px-5 md:px-10'>
            <div className='w-full md:w-[40%]'>
                <img src={heroImg} alt="Hero" className='w-full rounded-[30px]' />
            </div>

            <div className='w-full md:w-[40%] flex flex-col justify-start gap-5 text-center md:text-left'>
                <h1 className='font-[900] text-3xl md:text-4xl lg:text-5xl'>Plan Your Perfect Trip, Effortlessly!</h1>
                <p className='text-sm md:text-base'>
                    TripWise is a smart trip-planning platform that helps users discover the best places to visit, book hotels within their budget, and visualize their itinerary on an interactive map. With AI-powered recommendations and real-time navigation, planning a perfect trip has never been easier!
                </p>
                <div className='flex justify-center md:justify-start'>
                    <a href="/plan-trip" className='p-3 bg-[#fbc531] rounded-[10px] font-[500] cursor-pointer w-[40%] md:w-[30%] lg:w-[20%] text-center'>
                        Try Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Hero;