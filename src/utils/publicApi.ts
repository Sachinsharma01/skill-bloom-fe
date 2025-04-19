
import config from "../config";

export default {
    getStats: async () => {
        return fetch(`${config.api.baseURL}/public/statistics`)
    }
}