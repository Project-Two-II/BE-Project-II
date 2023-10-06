import UserProfile from '../Components/UserProfile/userProfile'
import Header from '../Components/header'
import Footer from '../Components/Footer/Footer'
import CourseList from '../Components/CourseList.jsx';
import { useSelector} from 'react-redux'


function Teacher() {
    const token = useSelector((state) =>  state.token);
    const role = useSelector((state) => state.role)
    console.log(role)
    return (
        <>
            <Header />
            <CourseList token={token}/>
            <Footer />
        </>
    )
}
export default Teacher