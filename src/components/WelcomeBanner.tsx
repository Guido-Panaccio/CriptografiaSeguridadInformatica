import { cookies } from "next/headers"
import jwt, {JwtPayload} from 'jsonwebtoken'

const WelcomeBanner = () => {
    const cookieStore = cookies()
    const token = cookieStore.get("OutSiteJWT")

    let nombreUsuario = "Usuario";
    if (token) {
        try{
            const decodedToken = jwt.verify(token.value, 'secret') as JwtPayload
            nombreUsuario = decodedToken.usuario
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
        }
    }

    return (
        <div className="py-2 border-s-zinc-200 w-full z-10 top-0">
            <div className="container flex items-center justify-between">
                {`Bienvenido, ${nombreUsuario}`}
            </div>
        </div>
    );
};

export default WelcomeBanner;
