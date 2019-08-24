import axios from 'axios';

const RANDOM_USER_API_SEED = "abc"; // as required by random user api to get the same users by pagination
const USERS_PER_PAGE = 9;
const RANDOM_USER_BASE_API = "https://randomuser.me/api";
const REQUIRED_DATA = "gender,name,email,picture"; // load only required data to save memory


export function getUsersByPage(page) {
    const URL = getUrl(page);
    return axios.get(URL);
}

// url with for query params (seed, results number, page number and included fields)
function getUrl(page) {
    return `${RANDOM_USER_BASE_API}/?seed=${RANDOM_USER_API_SEED}&results=${USERS_PER_PAGE}&page=${page}&inc=${REQUIRED_DATA}`;
}
