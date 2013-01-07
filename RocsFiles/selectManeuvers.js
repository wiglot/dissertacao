include ( selectManeuversHelper.js )

function auxiliar(node){
    if (node.status == 0)
      return []
    debug("Processing node: " + node.name)
    var NAs = findNAs(node.name)
    var possibilities = []
    if (NAs.length == 0){
      debug("No NAs after son." + sons[i].name)
      return []
    }else{
      for (var k = 0; k < NAs.length; k++){
	if (canTransfer(node.name, NAs[k].name))
	    possibilities.push([node, NAs[k]])
      }
    }
    debug (possibilities)
    if (possibilities.length == 0){
      debug("No possibilities! " + node.name )
      var sonsPossibilities = []
      for (var r = 0; r < node.adj_data().length; r++){
	debug("Processing Son" + node.adj_data()[r].name )
	var s = auxiliar(node.adj_data()[r])
	
	if (s.length > 0){
	    debug(s)
	    for (var w = 0; w < s.length; ++w)
		sonsPossibilities.push(s[w])
	}
      } 
      if (sonsPossibilities.length > 0){
	debug("Appling best son possibility.")
	var s = applyBest(sonsPossibilities)
	debug (s[0].name)
	return (s + auxiliar(root))
      }
    
    }else{
	if (node == root)
	  applyBest(possibilities)
	return possibilities
    }
}

function mainProcedure(parent){
    var sons = parent.adj_data()
    var allNA = true
    for (var i = 0 ; i < sons.length; ++i)
      if (sons[i].status == 1)
	allNA = false
    if (allNA){
      debug("All NA, stoping!")
      return []
    }
    for (var c = 0; c < sons.length; c++){
	root = sons[c]
	manobras = auxiliar(sons[c])
    }
    
//     debug (manobras.length)
}

var root
nodes = graphs[0].list_nodes()
nodes[0].status = 0;
nodes[1].status = 1;
nodes[2].status = 1;
nodes[5].status = 1;
nodes[4].status = 0;
nodes[3].status = 0;
nodes[6].status = 1;
nodes[7].status = 1;
nodes[8].status = 1;
nodes[9].status = 0;
nodes[10].status = 0;
nodes[11].status = 0;
usedSwt = []
manobras = []
updateStatus()
mainProcedure(nodes[0])
for (var i = 0; i < manobras.length; ++i){
    debug ((i+1) + ": " + manobras[i][0].name + " - " + manobras[i][1].name) 
}