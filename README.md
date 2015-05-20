# angular2-example-isomorphic

Isomorphic Angular 2

## Build

```bash
$ npm install
$ tsc -w
$ nodemon
```

## Debug
```bash
$ npm run debug
```

# TypeScript
> To take full advantage of TypeScript with autocomplete you would have to install it globally and use an editor with the correct TypeScript plugins.

## Use latest TypeScript compiler
TypeScript 1.5 beta includes everything you need. Make sure to upgrade, even if you installed TypeScript previously.

    $ npm install -global typescript@^1.5.0-beta

## .d.ts Typings
The typings in `typings/` are partially autogenerated, partially hand
written. All the symbols should be present, but probably have wrong paramaters
and missing members. Modify them as you go.

    $ npm install -global tsd
 > You may need to require `reference path` for your editor to autocomplete correctly
 ```
 /// <reference path="../../typings/tsd.d.ts" />
 /// <reference path="../custom_typings/ng2.d.ts" />
 ```
 Otherwise including them in `tsd.json` is prefered 

## Use a TypeScript-aware editor
We have good experience using these editors:

* [Visual Studio Code](https://code.visualstudio.com/)
* [Webstorm 10](https://www.jetbrains.com/webstorm/download/)
* [Atom](https://atom.io/) with [TypeScript plugin](https://atom.io/packages/atom-typescript)
* [Sublime Text](http://www.sublimetext.com/3) with [Typescript-Sublime-Plugin](https://github.com/Microsoft/Typescript-Sublime-plugin#installation)


## Todo:
* ~~get Compiler working~~
* ~~serialize the component~~
* ~~refactor component serializer~~
* manage app state on the server
* transfer state from stateful elements into shadow dom
* get new router working on the server
* structure app to manage the same state
* have the app work without javascript


one idea
```txt
+--------------------------------+
| Build System                   |
|   \                            |
|     +-----------------------+  |
|     | Environments          |  |
|     |  \ Web                |  |
|     |  \ Server             |  |
|     |  \ Desktop            |  |
|     |        \              |  |
|     |        \ +---------+  |  |
|     |        \ |  IsoApp |  |  |
|     |          +---------+  |  |
|     +-----------------------+  |
|                                |
+--------------------------------+
```
another idea

```txt
          +--------------------+            
          |                    |            
          |    Build System    |            
          |                    |            
          +----------+---------+            
                     |                      
                     |                      
+--------------------v--------------------+ 
|                                         | 
|         JSONG App Dependencies          | 
|                                         | 
+--------------------+--------------------+ 
                     |                      
                     |                      
      +---------Environments--------+       
      |              |              |       
+-----v-----+  +-----v-----+  +-----v-----+ 
|           |  |           |  |           | 
|    Web    |  |  Server   |  |  Desktop  | 
|           |  |           |  |           | 
+-----+-----+  +-----+-----+  +-----+-----+ 
      |              |              |       
      +-----------------------------+       
                     |                      
                     |                      
+--------------------+--------------------+ 
|                                         | 
|                   API                   | 
|                                         | 
+--------------------+--------------------+ 
                     |                      
+--------------------|--------------------+ 
|                    v                    | 
|              Isomorphic App             | 
| +-------------------------------------+ | 
| |                                     | | 
| |       JSONG App Dependencies        | | 
| |                                     | | 
| +------------------v------------------+ | 
|                    |                    | 
|       +----------Layout----------+      | 
|       |            |             |      | 
|       |            |             |      | 
|  +----+------+     |      +------+----+ | 
|  | Component |     |      | Component | | 
|  | Containers|     |      | Containers| | 
|  +----+------+     |      +------+----+ | 
|       |            |             |      | 
|       |      +-----+------+      |      | 
|       |      | Component  |      |      | 
|       |      | Containers |      |      | 
|       |      +-----+------+      |      | 
|       |            |             |      | 
|       |            |             |      | 
|       |            |             |      | 
|       +------------v-------------+      | 
|                    |                    | 
|                    |                    | 
+--------------------v--------------------+ 
                     |                      
     +-------------Client-----------+       
     |               |              |       
+----v-----+   +-----v-----+  +-----v-----+ 
|          |   |           |  |           | 
|   Web    |   |  Server   |  |  Desktop  | 
|          |   |           |  |           | 
+----+-----+   +-----------+  +-----+-----+ 
     |               |              |       
     +---------------+--------------+       
                     |                      
                     |                      
           +---------+----------+
           |                    |
           |        API         |
           |                    |
           +--------------------+
    
```
