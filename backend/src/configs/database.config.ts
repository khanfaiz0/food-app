import { connect, ConnectOptions } from "mongoose";
import { env } from "process";

export const dbConnect = () =>{
    
    connect(process.env.MONGO_URI!, {
        useNewUrlParser:true,
        useUnifiedTopology: true
    } as ConnectOptions).then(
        () => console.log("connect successful"),
        (error) => console.log(error)
    )
}