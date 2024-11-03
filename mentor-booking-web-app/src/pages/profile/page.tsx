import { useAuth } from '../../auth/AuthContext'
import UserProfileCard from '../../components/Profile/MentorProfileCard'

const ProfilePage = () => {

    const { userInfo } = useAuth();

    const checkProfile = () => {
        switch (userInfo?.role) {
            case "Mentor": {
                return (<UserProfileCard />)
            }
            case "Student": {
                return (<h1>Not emplement</h1>)
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
