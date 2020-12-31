
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