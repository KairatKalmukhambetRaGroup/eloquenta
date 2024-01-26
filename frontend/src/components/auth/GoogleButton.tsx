import axios from 'axios';

const GoogleButton = ({text}: any) => {
    const handleGoogleLogin = async (e: any) => {
        e.preventDefault();
        // const data = await signIn('google');
        // console.log(data)
        try {
            const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/oauth2/login/google`, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            console.log(data);
            
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <button type='button' onClick={handleGoogleLogin}>
            <i></i> {text}
        </button>
    );
};

export default GoogleButton;
