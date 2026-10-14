target "caddy-base" {
  dockerfile = "common/docker/caddy-base/Dockerfile"
  contexts = {
    src = "common/docker/caddy-base"
  }
}
