// DocumentFragment

/**
 * 文档片段
 *      
 *      特点:
 * 
 *             1. 没有父节点, 可以插入任意数量的子节点
 * 
 *             2. 不属于当前文档, 操作 DocumentFragment 要比直接操作DOM树快的多
 * 
 *      注意: 
 *              DocumentFragment 节点不能被插入到当前文档, 
 *              当作为 appendChild()、insertBefore()、replaceChild()等方法的参数时, 
 *              是将它的所有节点插入当前文档，而不是它自身. 
 * 
 *              重要的一点：一旦 DocumentFragment节点被添加进当前文档，它自身就变成了一个空节点
 * 
 *              对于 IE浏览器 下并不明显，反而成为多此一举
 * 
 */

 function initLIEle(parentEleId,num = 10000) {
    var parentEle = document.getElementById(parentEleId);
    if(!parentEle) {
        throw new TypeError("please check arguments");
    }
    var docFrag = document.createDocumentFragment();
    var li;
    for(var i = 0; i < num; i++) {
        li = document.createElement("li");
        li.textContent = i;
        docFrag.appendChild(li);
    }
    parentEle.appendChild(docFrag);
}

/**
 * document 常用属性
 * 
 *  document.documentElement
 * 
 *  document.body
 * 
 *  document.title
 * 
 *  document.domain
 * 
 *  document.URL
 * 
 *  document.referrer
 * 
 *  document.baseURI
 * 
 *  document.charset
 *
 * 
 * document 常用方法
 * 
 *  document.getElementById
 * 
 *  document.getElementsByTagName(*) // 获取当前文档中所有节点, HTMLCollection
 * 
 *  document.getElementsByClassName
 * 
 *  document.getElementsByName
 * 
 *  document.querySelector
 * 
 *  document.querySelectorAll 
 * 
 *  注： selector类方法在元素上调用时，指定的选择器仍然在整个文档中进行匹配，
 *       然后过滤出结果集，以便它只包含指定元素的后代元素
 * 
 *  
 */



/**
 * 
 *  关于 动态集合
 *          
 *      节点的变化会实时反映在集合中
 *          
 *      HTMLCollection, NamedNodeMap, Node.childNodes
 *          
 *      静态集合
 * 
 *      NodeList 中除了Node.childNodes 返回的是一个动态集合, 其余都是静态集合
 * 
 * 
 *      
 *关于 Element 节点的常用属性和方法
 * 
 *      Element.childNodes: 返回一个NodeList
 *  
 *      Element.children: 返回一个HTMLCollection
 * 
 *      Element.childElementCount(为了IE8兼容性可以直接调用 Element.length)         
 *      
 *      Element.firstChild: 返回第一个节点
 * 
 *      Element.lastChild: 返回最后一个节点
 * 
 *      Element.firstElementChild: 返回第一个元素节点(IE8不支持)
 * 
 *      Element.lastElementChild: 返回最后一个元素节点(IE8不支持)
 * 
 *      Element.nextSibling: 后一个节点
 * 
 *      Element.previousSibling: 前一个节点
 *  
 *      Element.nextElementSibling: 后一个元素节点
 * 
 *      Element.previousElementSibling
 *          
 *      Element.hasChildNode(): 是否有子节点
 * 
 *      Element.isSameNode() 与 Element.isEqualNode(): 前者判断是否指向同一个节点; 后者判断两个节点是否为相同的类型
 * 
 *      Element.innerHHTML: 会根据指定的值创建新的DOM树，然后用这个DOM树完全替换调用元素原先的所有子节点
 * 
 *      
 *          
 *       
 *      
 *      对象节点对于HTML标签元素说来，是元素DOM化的结果。与此相对应，对象属性也是元素特性的DOM化结果
 * 
 * 
 */








