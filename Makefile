TESTS = test/*.js
REPORTER = spec
TIMEOUT = 1000

test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(TESTS)

.PHONY: test
