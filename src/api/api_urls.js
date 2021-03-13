const ip = 'http://13.234.114.73'

export const api_urls = {
    createUser: `${ip}/lmsapi/v1/user/createUser`,
    login: `${ip}/lmsapi/v1/user/login`,
    sendEmailForPasswordChange: `${ip}/lmsapi/v1/user/sendEmailForPasswordChange`,
    changePassword: `${ip}/lmsapi/v1/user/changePassword`,
    listOfAllBatches: `${ip}/lmsapi/v1/batch/getAllBatches`,
    getTrainerDetails: `${ip}/lmsapi/v1/user/getTrainer`,
    getInfoOfOneBatch: `${ip}/lmsapi/v1/batch/getBatch/`,
    createNewSession:  `${ip}/lmsapi/v1/session/createSession`,
    getUserDetails: `${ip}/lmsapi/v1/user/getLearnerBatch`,
    deleteSession: `${ip}/lmsapi/v1/session/deleteSession`,
    updateSession: `${ip}/lmsapi/v1/session/updateSession`,
    getSession: `${ip}/lmsapi/v1/session/getSession`,
};