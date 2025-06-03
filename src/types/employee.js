/**
 * @typedef {Object} Address
 * @property {string} street
 * @property {string} city
 * @property {string} state
 * @property {string} postalCode
 * @property {string} country
 */

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} name
 * @property {"active" | "completed" | "pending"} status
 * @property {number} progress
 * @property {string} deadline
 */

/**
 * @typedef {Object} Feedback
 * @property {string} id
 * @property {string} from
 * @property {number} rating
 * @property {string} comment
 * @property {string} date
 */

/**
 * @typedef {Object} PerformanceRecord
 * @property {string} id
 * @property {string} quarter
 * @property {number} year
 * @property {number} rating
 * @property {string[]} goals
 * @property {string[]} achievements
 */

/**
 * @typedef {Object} Employee
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {number} age
 * @property {string} phone
 * @property {string} position
 * @property {string} department
 * @property {number} performanceRating
 * @property {Address} address
 * @property {string} image
 * @property {string} bio
 * @property {string} joinDate
 * @property {number} salary
 * @property {Project[]} projects
 * @property {Feedback[]} feedback
 * @property {PerformanceRecord[]} performanceHistory
 */
