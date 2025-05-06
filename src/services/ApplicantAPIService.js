

// import axios from 'axios';



    
//     // export const apiUrl = 'http://localhost:8081';

//     export const apiUrl="http://192.168.1.22:8081";


//     // export const apiUrl = 'https://kqryamxpv3.ap-south-1.awsapprunner.com';

//     // export const apiUrl = 'https://g23jza8mtp.ap-south-1.awsapprunner.com';


// const ApplicantAPIService = {
// }
// export default ApplicantAPIService;







// Log the API URL once when the module loads

export const apiUrl = process.env.REACT_APP_API_URL;

const ApplicantAPIService = {
  // Define your API methods here, for example:
  // login: (data) => axios.post(`${apiUrl}/applicant/applicantLogin`, data)
};

export default ApplicantAPIService;

