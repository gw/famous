# Grant Wu's submission the Docker coding challenge (Famo.us Hub Team)

## Usage
My Elastic IP address is: 54.153.64.158 <br>
POST (/write)
```shell
curl -H "Content-Type: application/json" -d '{"text":"inTextdatabase11","blah":"junk"}' http://<elasticIP>:5000
```
GET (/read)
```shell
curl http://<elasticIP>:8000
```

## Installation
Install Docker
Clone both non-master branches down into separate repos
```shell
git clone -b <branch_name> --single-branch <github_url>
```
Docker build from within each repo
```shell
docker build -t <container name> .
```
Run mongo image 
```shell
docker run -d --name mongo dockerfile/mongodb
```
Run both of my images, forwarding their ports and linking them to the mongo container:
```shell
docker run -i -t --rm -p 5000:5000 --name nodewrite --link mongo:db nodewrite
docker run -i -t --rm -p 8000:8000 --name flaskread --link mongo:db flaskread
```

## Implementation
This system is comprised of one EC2 instance housing three Docker containers, one each for the flaskread, nodewrite, and
mongo images. The read and write servers share the Mongo database. Mongo
is pretty out of place here for a simple queue implementation but I just wanted to see how it worked 
in Docker. I'd ideally have the Mongo (or Redis, or RabbitMQ, etc.) 
container write to a volume that lives on the host itself, so we could drop in a new DB
container and still keep our data but I didn't
get to that. This implementation at least allows for the read and write
containers to be completely stateless, and the data still persists through
container restarts.

DBs like Mongo are obviously made with the assumption that they'll have a fair
bit of memory and computing power dedicated to them; since my Mongo container
happens to have 2 other roommates, we should probably limit its memory usage with the '-m' 
flag when running it via Docker--I didn't get to testing that.

Mongo is "write-greedy" so if the DB is empty and a read AND a write request
somehow reach it at the same time then the write will take priority, meaning
we'll have data to return to the read request. If the DB is already populated then
there isn't really a race condition because it's a queue; either way you are given the oldest result. None of this takes into
account latency introduced by other parts of the system, i.e. nginx or the
read/write containers.

## Challenges
Docker itself isn't very complicated but it's a new kind of workflow that takes
some getting used to. Editing remotely on your server is never fun but my laptop runs
OSX, so the only way to go right now is running Docker in a local VM. Eww. As I become 
more familiar with Docker I'm sure I'll run into use cases that
aren't so trivial; container roll-backs, zero-downtime deploys, plugging
security holes, etc. but so far it's just been awesome. 

## Edge Cases
I handle formatting oddities on /write inputs but I don't really handle the DB
operations in a robust way. I think things would only really get weird if traffic
increased beyond a certain point and diskspace/RAM started to become scarce.
