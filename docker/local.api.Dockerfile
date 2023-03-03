FROM node:18

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

RUN mkdir /home/nodejs/app

WORKDIR /home/nodejs/app

# Install dependencies based on the preferred package manager
COPY ./app/server/package.json ./app/server/yarn.lock* ./app/server/package-lock.json* ./app/server/pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

COPY ./app/server/src ./src
COPY ./app/server/.env .
COPY ./app/server/nodemon.json .

EXPOSE 3001

CMD npm run dev
