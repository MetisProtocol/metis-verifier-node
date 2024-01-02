FROM golang:1.21.5 AS builder
WORKDIR /workdir
COPY . .
RUN go build -ldflags '-w -s' .

FROM gcr.io/distroless/base-debian12
COPY --from=builder /workdir/dtl-expose /usr/local/bin/
EXPOSE 8080
ENTRYPOINT [ "dtl-expose" ]
