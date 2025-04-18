import io from "socket.io-client"
import { BASE_URL } from "./constants"





export const createSocketConnection = () => {
    if (location.hostname === "Localhost") {
    return io(BASE_URL) ;
    } else {
    return io("/", { path: "/api/socket.io" });
    }
}