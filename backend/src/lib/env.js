import "dotenv/config"

export const ENV = {

    PORT : process.env.PORT,
    MONGO_URL : process.env.MONGO_URL,
    JWT_SECRATE : process.env.JWT_SECRATE,
    NODE_ENV : process.env.NODE_ENV,
    
    RESEND_API_KEY : process.env.RESEND_API_KEY,
    EMAIL_FROM : process.env.EMAIL_FROM,
    EMAIL_FROM_NAME : process.env.EMAIL_FROM_NAME,
    
    CLOUDINARY_NAME :process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY : process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET : process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_API_ENVIRONMENT_VARIABLE : process.env.CLOUDINARY_API_ENVIRONMENT_VARIABLE,

    ARCJET_KEY : process.env.ARCJET_KEY,
    ARCJET_ENV : process.env.ARCJET_ENV,

};


