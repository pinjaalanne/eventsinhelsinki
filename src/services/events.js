import axios from "axios";

const eventsAPI = "https://api.hel.fi/linkedevents/v1/event/?days=30";

const getAll = async () => {
    const response = await axios.get(eventsAPI);
    return response.data;
};

export default { getAll };