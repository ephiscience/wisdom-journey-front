variable "CI" {
    default = ""
}

variable "GITHUB_REF_TYPE" {
    default = ""
}

variable "GITHUB_EVENT_NAME" {
    default = ""
}

variable "GITHUB_REF_NAME" {
    default = ""
}

function "is_branch" {
    params = []
    result = GITHUB_REF_TYPE == "branch"
}

function "is_main" {
    params = []
    result = GITHUB_REF_TYPE == "branch" && GITHUB_REF_NAME == "main"
}

function "is_ci" {
    params = []
    result = CI == "true"
}

function "is_local" {
    params = []
    result = CI == ""
}

function is_pr {
    params = []
    result = GITHUB_EVENT_NAME == "pull_request"
}

function pr_number {
    params = []
    result = replace(GITHUB_REF_NAME, "/merge", "")
}

function buildcache {
    params = [ base_image ]
    result = "${base_image}_buildcache"
}

# ------ IMAGE NAME CONFIG ------
function main_branch_image_name {
    params = [ base_image ]
    result = "${base_image}:latest"
}

function pr_image_name {
    params = [ base_image ]
    result = "${base_image}:pr-${pr_number()}"
}

# ------ CACHE FROM CONFIG ------
function main_branch_cache_from {
    params = [ base_image ]
    result = is_main() ? "type=registry,ref=${main_branch_image_name(buildcache(base_image))}" : ""
}

function pr_cache_from {
    params = [ base_image ]
    result = is_pr() ? "type=registry,ref=${pr_image_name(buildcache(base_image))}" : ""
}

# ------ CACHE TO CONFIG ------
function main_branch_cache_to {
    params = [ base_image ]
    result = is_main() && is_ci() ? "type=registry,ref=${main_branch_image_name(buildcache(base_image))}" : ""
}

function pr_cache_to {
    params = [ base_image ]
    result = is_pr() && is_ci() ? "type=registry,ref=${pr_image_name(buildcache(base_image))}" : ""
}

# ------ TAG CONFIG ------
function local_tag {
    params = [ base_image ]
    result = is_local() ? "${base_image}:local" : ""
}

function pr_tag {
    params = [ base_image ]
    result = is_pr() ? pr_image_name(base_image) : ""
}

function main_branch_tag {
    params = [ base_image ]
    result = is_main() ? main_branch_image_name(base_image) : ""
}

# ------ OUTPUTS CONFIG ------
function ci_main_branch_output {
    params = [ base_image ]
    result = is_main() && is_ci() ? "type=image,push=true,ref=${base_image}:latest" : ""
}

function ci_pr_output {
    params = [ base_image ]
    result = is_pr() && is_ci() ? "type=image,push=true,ref=${pr_image_name(base_image)}" : ""
}
