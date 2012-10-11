TESTS = test/*.js
REPORTER = spec
TIMEOUT = 10000

test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(TESTS)

.PHONY: test
