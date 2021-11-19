package main

import (
	"context"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	dtlEndpoint := os.Getenv("DTL_ENDPOINT")
	if dtlEndpoint == "" {
		dtlEndpoint = "http://dtl-mainnet:7878"
	}

	dtl, err := url.Parse(dtlEndpoint)
	if nil != err {
		log.Fatalln("incorrect DLT endpoint", dtlEndpoint)
	}

	handler := http.NewServeMux()
	handler.HandleFunc("/verifier/get/", func(w http.ResponseWriter, req *http.Request) {
		if req.Method != http.MethodGet {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		proxy := httputil.ReverseProxy{
			Director: func(request *http.Request) {
				request.URL.Scheme = dtl.Scheme
				request.URL.Host = dtl.Host
				request.URL.Path = req.URL.Path
			},
		}
		proxy.ServeHTTP(w, req)
	})

	const port = ":8080"
	server := http.Server{Addr: port, Handler: handler}
	go func() {
		stopSig := make(chan os.Signal, 1)
		signal.Notify(stopSig, syscall.SIGINT, syscall.SIGTERM)
		<-stopSig
		log.Println("graceful stopping")
		_ = server.Shutdown(context.Background())
	}()

	log.Println("listen and serving", port)
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalln("server start failed", err)
	}
}
