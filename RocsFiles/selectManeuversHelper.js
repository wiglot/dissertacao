function updateStatus(){
    nodes = graphs[0].list_nodes()
    for (var c = 0 ; c < nodes.length; c++){
	if (nodes[c].status == 1)
	  nodes[c].color = "blue"
	else
	  nodes[c].color = "red"
    }
    
}

function applyBest(manobras){
    if (manobras.length == 0)
      return
    pair = []
    v = 0
    for (var i = 0; i < manobras.length; ++i){
	if (v < load (manobras[i][0].name) && manobras[i][0].status == 1){
	    v = load (manobras[i][0].name)
	    pair = manobras[i]
	}
    }
    if (pair.length > 0){
      transfer(pair[0].name, pair[1].name)
      debug ("Transfer: "+ pair[0].name +" - "+ pair[1].name)
    }
    return [pair]
    
    
    
}

function load(nodeName){
  nodes = graphs[0].list_nodes()
  value = 0;
  for (var i =0; i < nodes.length; ++i){
      if (nodes[i].name == nodeName){
	  value = 0;
	  list = [nodes[i]]
	  while (list.length >0){
	    node = list.pop()
	    p = node.output_pointers()
	    for (var k = 0; k < p.length; k++){
	      value += eval(p[k].value)
	      if (p[k].end().status == 1)
		list.push (p[k].end())
	    }
	  }
	  debug (value)
      }
  }
  return eval(value)
  
}

function canTransfer(from, to){
    if (from == to)
      return false;
    for (var i = 0; i < usedSwt.length; ++i)
      if (to == usedSwt[i] || from == usedSwt[i])
	return false
    nodes = graphs[0].list_nodes()
    if (load(from) > 100)
      return false
    return true
}
function transfer(from, to){
    if (from == to)
      return;
    nodes = graphs[0].list_nodes()
    for (var c = 0 ; c < nodes.length; c++){
	if (nodes[c].name == from)
	  if (nodes[c].status == 1)
	    nodes[c].status = 0
	if (nodes[c].name == to)
	  if (nodes[c].status == 0)
	    nodes[c].status = 1
    }
    usedSwt.push (from)
    usedSwt.push (to)
    
    updateStatus()
}

function findNAs(nodeName){
    nodes = graphs[0].list_nodes()
    for (var i =0; i < nodes.length; ++i){
	if (nodes[i].name == nodeName){
	    list = [nodes[i]]
	    ret = []
	    while (list.length > 0){
	      node = list.pop()
	      if (node.status == 0)
		ret.push(node)
	      for (var k = 0; k < node.adj_data().length; ++k)
		list.push(node.adj_data()[k])
	    }
	    return ret;
	}
    }
    return []
}