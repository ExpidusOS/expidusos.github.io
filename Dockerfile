FROM cirrusci/flutter:latest AS builder

WORKDIR /build
COPY pubspec.yaml ./
COPY lib ./lib
COPY test ./test
COPY web ./web
RUN flutter build web --release

FROM alpine:latest
COPY --from=builder /build/build/web /app
RUN apk --no-cache add ca-certificates lighttpd

EXPOSE 80
RUN lighttpd -tt -f /lighttpd.conf
ENTRYPOINT ["lighttpd", "-D", "-f", "/lighttpd.conf"]
