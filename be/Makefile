setup: requirements.txt
	pip3 install -r requirements.txt
createvenv:
	virtualenv .venv
.venv/Scripts/activate: requirements.txt
	$(MAKE) createvenv
	./.venv/Scripts/activate
	pip3 install -r requirements.txt
deactivatevenv:
	deactivate
clean:
	rm -rf __pycache__