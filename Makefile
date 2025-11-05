default: help

.PHONY: tag build prebuild

## Help
help:
	@printf "Available targets:\n\n"
	@awk '/^[a-zA-Z\-\_0-9%:\\]+/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
		helpCommand = $$1; \
		helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
	gsub("\\\\", "", helpCommand); \
	gsub(":+$$", "", helpCommand); \
		printf "  \x1b[32;01m%-35s\x1b[0m %s\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST) | sort -u
	@printf "\n"

_tag:
	git tag ${TAG}
	@echo created ${TAG}

## Run git tag picking the version from package.json
tag:
	make _tag TAG="$$(node -e 'console.log(require("./package").version)')"

## Push tags to the remote repository
posttag:
	git push && git push --tags

## Delete a git tag. make tag/delete TAG=8.0.0
tag/delete:
	git tag -d ${TAG}
	git push --delete origin ${TAG}