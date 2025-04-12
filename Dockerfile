FROM library/node:23-alpine as builder

WORKDIR /usr/app

# ---- Install dependencies directly to WORKDIR ---- #
COPY ./package.json /usr/app/
RUN npm install
# ----

FROM library/node:23-alpine

WORKDIR /usr/app

# ---- Copy node_modules ---- #
COPY --from=builder /usr/app/node_modules /usr/app/node_modules
# ----

# ---- Copy the app ---- #
COPY . /usr/app/
# ---- 

# ---- Clean image ----#
RUN rm -rf /tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp
# ----