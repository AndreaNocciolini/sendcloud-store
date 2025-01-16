# How to Use

From the project directory, run:

- `docker build .`  
  _This will create the image. Use it only the first time or if you delete the image._

- `docker run -p 8080:8080 <image_id>`  
  _This will create and start a container from the image._

For a more intuitive approach, use commands like these:

- `docker build --tag sendcloud_store:1.0 .`  
  _This creates an image with a specific name and version tag._

- `docker run -p 8080:8080 sendcloud_store:1.0`  
  _This starts a container using the named and versioned image._

[...]