import axios from 'axios';
const instance = axios.create({
    baseURL:"https://react-new-burger-58bad.firebaseio.com/"
});
export default instance;