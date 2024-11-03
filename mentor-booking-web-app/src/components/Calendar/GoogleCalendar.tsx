import { useAuth } from '../../auth/AuthContext';
import { GOOGLE_CALENDAR_FRAME_URL } from '../../utils/apiUrl/baseUrl'

const GoogleCalendar = () => {
    const { userInfo } = useAuth();

    return (
        <div style={{ width: '100%', height: '100vh', padding: '20px', boxSizing: 'border-box' }}>
            <iframe
                src={GOOGLE_CALENDAR_FRAME_URL(userInfo?.name)}
                style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
            >
            </iframe>
        </div>
    )
}

export default GoogleCalendar
