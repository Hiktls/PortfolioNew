import docker

client = docker.from_env()

cont = client.containers.run("awew",detach=True)

cont.logs().decode("utf-8")