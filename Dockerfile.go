FROM golang:1.20-alpine3.17 AS build

# RUN apk add --no-cache git
# RUN git config --global url."https://".insteadOf git://

# ARG GIT_USERNAME
# ARG GIT_TOKEN

# Set git credentials in git configuration
# RUN git config --global url."https://$GIT_USERNAME:$GIT_TOKEN@recko.site".insteadOf "https://recko.site"



COPY apps/draw-go/draw-api /go/src/
# COPY apps/draw-go/draw-api/go.mod apps/draw-go/draw-api/go.sum apps/draw-go/draw-api/*.go /go/src/
WORKDIR "/go/src/"
RUN go env -w GO111MODULE=on \
  && go env -w GOPROXY=https://goproxy.cn,direct \
  # && go env -w GOPROXY=https://goproxy.io,direct \
  && go env -w GOOS=linux \
  && go env -w GOARCH=amd64 \
  && go env -w GOPRIVATE=draw
RUN go mod tidy
RUN go build -o draw


# FROM alpine:3.17 AS runtime
RUN mkdir "/app"
# COPY --from=build /go/src/draw /app/draw
# RUN chmod +x /app/draw
RUN chmod +x ./draw
RUN mkdir -p /app/tmp/log
VOLUME ["/app/tmp/log"]
EXPOSE 18005

# WORKDIR /app
ENTRYPOINT ["sh", "-c", "./draw >> /app/tmp/log/draw.log 2>&1"]

# glpat-aeA-14U-vX5FMgvUjxsy