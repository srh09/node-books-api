FROM node:18

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

RUN npm install

# Copy the rest of the application files
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
