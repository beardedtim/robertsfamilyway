# The Stage for Building Deps
FROM node:14 AS BUILD
# Copy EVERYTHING
COPY . .
# Install ALL deps
RUN yarn
# Build system
RUN yarn build

# Final Image
FROM node:14
# Copy over the built files
COPY --from=BUILD ./build ./build
# Copy over our package details
COPY package.json yarn.lock ./

# Copy over the needed knexfile
COPY knexfile.prod.js ./build/knexfile.js

# Copy over our migrations and sees manually
# since these are JS files and not TS files
COPY infrastructure/db/migrations ./build/infrastructure/db
#COPY infrastructure/db/seeds ./build/infrastructure/db

# Copy over our EJS files
COPY client/views ./build/client/views

# install only production deps
RUN yarn --production

# Expose the port
EXPOSE 5000

CMD ["yarn", "start"]
