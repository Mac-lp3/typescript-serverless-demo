
## TODO

* create/deploy lambda
* lambda layers (node_modules)
* lambda layers (shared)
    * import pattern
    * path mapping pattern
    * deployment prep
    * TF
* VPC and subnets for EC2
* TF watch file for changes

### extended todos

* terraform encryption at rest (s3) 

## TypeScript

Classes need to be initialized
* just need to export the function to be called.
    * Can that be class.handler.bind() ?
    * SHOULD it be class.handler.bind() ?

### No

* Lots of additional overhead?
* Another way to accomplish the YES without classes?

### Yes

* only need to bother with connection stuff once
* new methods just need to inherit & implement
    * wasnt that always the case though? you just dont get to tool tip...