# CriptografiaSeguridadInformatica
TP Final
Sobre la ruta del proyecto (pueden hacerlo desde la terminal de Visual Code)

1.Instalación de next (deberia instalarse la versión que usa el proyecto)
```
npm install next
```
2.Modulo pg (para Postgresql que tienen que tener instalado)
```
npm install pg
```
3.Prisma (ORM)
npm i prisma -D
4. Migracion prisma (Para que les cree las tablas y sus campos automatico en la base de datos)
En el archivo .env tienen la cadena de conexión a la base de datos con postgressql (en usuario ponen su usuario de postgress y contraseña la contrasela, el resto se mantiene igual)
```
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/hospitales"
```
```
npx prisma migrate dev --name NombreMigracion
```
5. Prisma studio (pueden ignorarlo)
npx prisma studio
7. docker (tiene docker integrado el proyecto pero en lo personal no lo uso, si les sirve manden nomas)
```
docker-compose up -d
```
8. Iconos React
```
npm i react-icons
```
9. Axios
```
npm i axios
```
10. Cookie
```
npm i cookie
```
11. JWT
```
npm i jsonwebtoken
```
12. Formato de fechas para tipo Date
```
npm install date-fns
```
13. Toast
```
npm install react-toastify
```
14. PDF
```
npm install jspdf
```
15. autotable
```
npm install jspdf jspdf-autotable
```
16. react-spinners
```
npm install react-spinners
```
17. Correr y levantarlo
```
npm run dev
```
Cuando ponen ese comando les deberia aparecer algo así
![image](https://github.com/Guido-Panaccio/CriptografiaSeguridadInformatica/assets/66895464/9d61cdec-60ee-4be3-a281-cfc67ac0884b)
Si hacen ctrl click al [http://localhost:3000](http://localhost:3000) les abre el navegador con el proyecto
