import jwt from "jsonwebtoken"

//genrating token
export const genarateToken = (userID, res) => {
    const token = jwt.sign({ userID }, process.env.JWT_SECRATE, {
        expiresIn: "7D" // token will expair in 7 days
    });

    //genarating coockie
    res.cookie("jwt", token, {
        maxAge: 7 * 20 * 60 * 1000,  //miliseconds

        httpOnly: true,// prevent xss attacks : cross sign scripting
        sameSite: "strict", //csrf attaks
        secure: process.env.NODE_ENV === "development" ? false : true,
        //devlopment= http://localhost
        //production = https://subdomain.com
    })
    return token;
}