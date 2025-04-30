
import config from "../config";

export default {
    getStats: async () => {
        return fetch(`${config.api.baseURL}/public/statistics`)
    },
    getCourses: async () => {
        return fetch(`${config.api.baseURL}/public/courses`)
    },
    getFeaturedCourses: async () => {
        return fetch(`${config.api.baseURL}/public/featured_courses`)
    },
    getCategories: async () => {
        return fetch(`${config.api.baseURL}/public/categories`)
    },
    getTestimonials: async () => {
        return fetch(`${config.api.baseURL}/public/testimonials`)
    }
}