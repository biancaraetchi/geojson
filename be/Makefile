setup: requirements.txt
	pip3 install -r requirements.txt
help:
	django-admin
startproject:
	django-admin startproject geojson
createvenv:
	virtualenv .venv
.venv/Scripts/activate: requirements.txt
	$(MAKE) createvenv
	./.venv/Scripts/pip3 install -r requirements.txt
deactivatevenv:
	deactivate
clean:
	rm -rf __pycache__