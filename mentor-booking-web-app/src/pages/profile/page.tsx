import { useAuth } from '../../auth/AuthContext'
import MentorProfileCard from '../../components/Profile/MentorProfileCard'
import StudentProfileCard from '../../components/Profile/StudentProfileCard';

const ProfilePage = () => {

    const { userInfo } = useAuth();

    const checkProfile = () => {
        switch (userInfo?.role) {
            case "Mentor": {
                return (<MentorProfileCard />)
            }
            case "Student": {
                return (<StudentProfileCard />)
            }
        }
    }

    return (
        <div className='container'>
            {checkProfile()}
        </div>
    )
}

export default ProfilePage
