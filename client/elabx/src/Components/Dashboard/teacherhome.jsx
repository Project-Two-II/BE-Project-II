import TotalCard from './TotalCard';
import CourseCard from './CourseCard';

import './teacherhome.css'

import courseImg2 from '../../media/lab2.png';
import courseImg3 from '../../media/LAB3.png';
import courseImg4 from '../../media/lab4.png';
import courseImg5 from '../../media/lab5.png';
import courseImg6 from '../../media/lab6.png';
import courseImg7 from '../../media/lab7.png';
import courseImg8 from '../../media/lab8.png';
import courseImg9 from '../../media/lab9.png';

const TeacherHome = () => {
  return(
    <>
     <div className="total-card-container">
          <TotalCard title="Total Subjects" count={10} type={"subject"} />
          <TotalCard title="Total Students" count={100} type ={"student"} />
     </div>
    </>
  )
}

export default TeacherHome;