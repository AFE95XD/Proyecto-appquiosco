## Para instalar prisma en el proyecto se hizo asi:

#### Intalar la depencia de desarrollo

```bash
npm i -D prisma
```

#### Intalar la depencia de que se requiere en produccion

```bash
npm i @prisma/client
```

#### Iniciar prisma

```bash
npx prisma init
```

Crea en el directorio raiz las variables de entorno (.env) donde especificamos la configuracion de la base de datos, y va a crear el directorio `prisma/schema.prisma` donde se establece los modelos de la base de datos.

#### Migraciones

```bash
npx prisma migrate dev
```

Se especifica un nombre a la migracion y se le asigana un nombre donde describa lo que hemos echo, si se agregan mas modelos al archivo `schema.prisma` se hace otra migracion igual.

#### Resetear la base de datos

```bash
npx prisma migrate reset
```

#### Visualizar la base de datos

Se puede ver la base de datos de forma grafica en el navegador con el siguiente comando

```bash
npx prisma studio
```

#### Agregamos la dependencia ts/node

```bash
npm i ts/node
```

Despues gregamos el script de prisma al archivo `package.json`

```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

esto es para poblar la base de datos y lo ejecutamos de la siguiente manera:

```bash
npx prisma db seed
```

> **NOTA:** El archivo `seed` es el que va a poblar la base de datos esta en la carpeta `prisma` en la raiz.

## Consepto de Higher Loading

Carga de datos masivos por cosulta en este caso por archivo
