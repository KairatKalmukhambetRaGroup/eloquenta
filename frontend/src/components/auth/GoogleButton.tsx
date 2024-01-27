import axios from 'axios';

const GoogleButton = ({text}: any) => {
    const handleGoogleLogin = async (e: any) => {
        e.preventDefault();
        // const data = await signIn('google');
        // console.log(data)
        try {
            window.location.href = 'http://localhost:8080/oauth2/authorization/google';
            // const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            // const data = await axios.get(
            //     `https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=http://localhost:8080/login/oauth2/code/google&client_id=130791195831-hd8336bqc9n6p7k8e3hhjioh8pt5546o.apps.googleusercontent.com`,
            //     {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            // console.log(data);
            
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
