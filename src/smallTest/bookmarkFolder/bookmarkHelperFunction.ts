export interface BookmarkTreeInterface {
    root: any
    buildBookmarkTree(bookmarkArray:any):void
}



export function transverseLinkList(){

}

export class BookmarkTree implements BookmarkTreeInterface {
    root: any

    constructor(){
        this.root = buildBookmarkItem("0")
    }

    reorderNode(node:any){
        let counter = 1
        let currentNode = node.childrenArray.head

        while(currentNode){
            if (currentNode.index == -1 || currentNode.index == Infinity) {
                currentNode = currentNode.next
                continue
            }

            
        }


    }

    addBookmarkItem(item: any){
        console.log("============ add new Item ===============")
        console.log("new item's index", item.index)

        let indexArray = item.index.split(".").map((p:string)=>parseInt(p))
        let lastIndex = indexArray.pop()

        let currentNode = this.findNode(indexArray)
        console.log(currentNode, indexArray)
        currentNode = currentNode.childrenArray.head

        while (currentNode){
            console.log(33, currentNode.index)
            if (currentNode.index == Infinity ) {
                currentNode = currentNode.next
                continue
            }



            if ( lastIndex > getLastIndexOfBookmark(currentNode.index) &&  lastIndex < getLastIndexOfBookmark(currentNode.next.index) ){
                let nextNode = currentNode.next
                currentNode.next = item
                item.previous = currentNode
                nextNode.previous = item
                item.next = nextNode
                break
            }
            currentNode = currentNode.next
        }
    }

    findNode(indexArray: number[], node = this.root):any{
        console.log(4848484, node, indexArray)
        if (indexArray.length > 0){
            let index = <number> indexArray.shift()

            let currentNode = node.childrenArray.head

            while (currentNode){
                if (currentNode.index == -1 || currentNode.index == Infinity) {
                    currentNode = currentNode.next
                    continue
                }

                let lastIndexOfCurrentNodeArray = currentNode.index.split(".")
                let lastIndexOfCurrentNode = lastIndexOfCurrentNodeArray[lastIndexOfCurrentNodeArray.length-1]
                // console.log(index, lastIndexOfCurrentNode)
                if ( index == lastIndexOfCurrentNode){
                    return this.findNode(indexArray, currentNode)
                }

                currentNode = currentNode.next
            }

        } else {
            return node
        }
    }

    buildBookmarkTree(bookmarkArray: any){
        bookmarkArray.forEach((p:any)=>{
            this.addBookmarkItem(p)
        })
    }
}

export function getLastIndexOfBookmark(indexString:string | number){
    if (typeof indexString == "string"){
      let indexrArray = indexString.split(".")
      let lastIndexOfArray = indexrArray.length -1
      return parseInt(indexrArray[lastIndexOfArray])
    } else {
      return indexString
    }
}


export function linkListNode(index:number){
    let node = {next: <any> null, previous: <any> null, index: index}
    return node
}

export function buildBookmarkItem(data:any){
  let bookmarkItem = {
      "index": data,
      "name": "bookmark" + data,
      "_identity": "",
      "parent": null,
      "head": { previous: null, next: null },
      "childrenArray": {
          head: <any> linkListNode(-1),
          tail: <any> linkListNode(Infinity)
      }
  }

  bookmarkItem.childrenArray.head.next = bookmarkItem.childrenArray.tail
  bookmarkItem.childrenArray.tail.previous = bookmarkItem.childrenArray.head

  return bookmarkItem
}
