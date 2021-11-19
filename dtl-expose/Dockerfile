FROM golang:1.17-alpine AS builder
WORKDIR /workdir
COPY . .
RUN go build -ldflags '-w -s' .

FROM alpine:3.14
COPY --from=builder /workdir/dtl-expose /usr/bin/
EXPOSE 8080
ENTRYPOINT [ "dtl-expose" ]
