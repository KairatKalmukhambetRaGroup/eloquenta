import axios from 'axios';
import { signIn } from 'next-auth/react';

const GoogleButton = ({text}: any) => {
    const handleGoogleLogin = async (e: any) => {
        e.preventDefault();
        // const data = await signIn('google');
        // console.log(data)
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
        console.log(data);
    };

    return (
        <button type='button' onClick={handleGoogleLogin}>
            <i></i> {text}
        </button>
    );
};

export default GoogleButton;
