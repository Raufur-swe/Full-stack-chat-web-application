import "dotenv/config"

export const ENV = {

    PORT : process.env.PORT,
    MONGO_URL : process.env.MONGO_URL,
    JWT_SECRAET : process.env.JWT_SECRAET,
    NODE_ENV : process.env.NODE_ENV,
    RESEND_API_KEY : process.env.RESEND_API_KEY,
    EMAIL_FROM : process.env.EMAIL_FROM,
    EMAIL_FROM_NAME : process.env.EMAIL_FROM_NAME,

};


/*
PORT = 8000
NODE_ENV = devlopment
MONGO_URL = mongodb+srv://raufur271_db_user:piaHXhkacugwFexq@cluster0.p8ruaks.mongodb.net/chat-app_db?appName=Cluster0
JWT_SECRATE = Token
RESEND_API_KEY = re_fj4Uu7Kx_LkVRPJF4PCHqxqXqwEXW2PA3
EMAIL_FROM ="onboarding@resend.dev"
EMAIL_FROM_NAME ="Raufur"



*/