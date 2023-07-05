import Header from './Components/Header/Header'
import HeroSection from './Components/Hero-Section/HeroSection'
import FreeCourse from './Components/Free-course-section/FreeCourse'
import Courses from './Components/Courses-section/Courses'
import Features from './Components/Feature-section/Features'
import AboutUs from './Components/About-us/AboutUs'
import Footer from './Components/Footer/Footer'

import './root.css'


export default function Root() {
    return (
      <>
       <Header />
       <HeroSection />
       <FreeCourse />
       <Courses />
       <Features />
       <AboutUs />
       <Footer />
     </>
    );
  }