target "caddy-base" {
  dockerfile = "docker/caddy-base/Dockerfile"
  contexts = {
    src = "docker/caddy-base"
  }
}
