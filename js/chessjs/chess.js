var YU = YAHOO.util;
var YL = YAHOO.lang;

var globalRun = 0;
var x=new NM114CHESS();
function NM114CHESS(){
    if(globalRun == 0){globalRun++;return new construct();}
    function construct(){

        this.init = function(){
        	var model = new Model();
      
            var view = new ChessView(model, new ChessController(model));
            view.show();
        };
    };
}

//******************************************************************************
function Model() {
	
	//this.chessTypeId= '{"w_hoo":1,"w_hasag":2,"w_mori":3,"w_teme":4,"w_bers":5,"w_han":6,"b_hoo":7,"b_hasag":8,"b_mori":9,"b_teme":10,"b_bers":11,"b_han":12}';
	
	this._chessStandardManual= '{"c0":2,"c7":2,"c1":3,"c6":3,"c2":4,"c5":4,"c3":5,"c4":6,"c8":1,"c9":1,"c10":1,"c11":1,"c12":1,"c13":1,"c14":1,"c15":1,"c48":7,"c49":7,"c50":7,"c51":7,"c52":7,"c53":7,"c54":7,"c55":7,"c56":8,"c63":8,"c57":9,"c62":9,"c58":10,"c61":10,"c59":11,"c60":12}';
	//[[58,40],[45,-4],[10,-100]] ; move from 58 to 40,add chess 4 to 45,remove chess from 10
    this._cellName = 'c';
    this._cellInBoxName = 'cb';
    this._chessName = 'ch';
    this._chessInBoxName = 'chb';
    this._numName = "num";
    this._numsBoardName = "nums";
    this._numInBoxName = "numib";
    
    this._bodyContainerName = "bodyContainer";
    this._buttonsName = "buttons";
    this._standardName = "standard";
    this._clearName = "clear";
    this._chessBoxName = "chessBox";
    this._chessBoardName = "chessBoard";
    
    this._chessSelectedName = "selectedChess"; //Don't begin with "cell name" or "chess name"
    this._eventChessInBoardSelectedName = "chessInBoardSelected";
    this._eventChessInBoxSelectedName = "chessInBoxSelected";
    this._eventRepaintName = "repaint";
    
    this._black_color = "#83726a";
    this._white_color = "#e3cdaa";
    this._over_color =  "#f36363";
    this._click_color = "#63ad9a";
    
    this._rcNum = 8; //row & col num
    this._chessTypeTotal = 12;
    this._cellsTotal = 64;
    this._dropChessSymbol = -100;
    
    this._manual = "{}";

    this.setManual = function(manual){
	var m = this._chessStandardManual;
	if(manual){
	    m = manual;
	}
	this._manual = m;

    };
}

//******************************************************************************
function CustomEvents(model,name) {
	this.model = model;
	this.eventName = name;
	this.eventObject = new YU.CustomEvent(name,this,true);
    
    this.subscribe = function(handler){
    	this.eventObject.subscribe(handler);
    };

    this.fire = function(args){
    	this.eventObject.fire(args);
    };
}

//******************************************************************************
function ChessView(model, controller, elements) {
	this._model = model;
    this._controller = controller;
 
    var _this = this;

    //fire when chess in chessboard selected.
    this._controller.eventChessInBoardSelected.subscribe(function (type, args) {
    	_this._controller.chessBox.unselected();
    });
    
    //fire when chess in chessbox selected.
    this._controller.eventChessInBoxSelected.subscribe(function (type, args) {
    	_this._controller.chessBoard.unselected();
    });
    
    //
    this._controller.eventRepaint.subscribe(function (type, args) {
        _this.rebuild();
    });
        
    this.show = function(){//alert("chessView show!");
    	_this.rebuild();
        //_this._model.eventChessMoved.subscribe(function () {
        //    _this.rebuild();
        //});
    };
    
    this.rebuild = function(){
    	//alert("view rebuild!");
	_this._controller.buttons.show();
    	_this._controller.chessBoard.show();
    	_this._controller.chessBox.show();
    };
}

//******************************************************************************
function ChessController(model) {
    this._model = model;
	
    this.bodyContainer = new BodyContainer(this);
    this.buttons = new Buttons(this);
    this.chessBoard = new ChessBoard(this);
    this.chessBox = new ChessBox(this);
	
    this.eventChessInBoardSelected= new CustomEvents(this,this._model._eventChessInBoardSelectedName);
    this.eventChessInBoxSelected  = new CustomEvents(this,this._model._eventChessInBoxSelectedName);
    this.eventRepaint             = new CustomEvents(this,this._model._eventRepaintName);
     
	this.getObjectOfElement = function(El){ //El = html element
		
	};

	this.showChessSelected = function(){
		this.bodyContainer.addMouseEvent();
	};
	
	this.hideChessSelected = function(){
		this.bodyContainer.removeMouseEvent();
	};

	this.originalBackgroundColor = "";
	this.setMouseOverBackgroundColor = function(matchedEl,change){
		var c = 'transparent';
		if(change){
			this.originalBackgroundColor = YU.Dom.getStyle(matchedEl, 'background-color');
			c = this._model._over_color;
		}else{
			c = this.originalBackgroundColor;
		}
		YU.Dom.setStyle(matchedEl, 'background-color', c);
	};
	
	this.chessInBoardSelected = function(){
		var selected = -1;
		if(this.chessBoard.chessInBoardSelected._id != null){
				selected = this.chessBoard.chessInBoardSelected._id;
		}
		return selected;
	};
	
	this.chessInBoxSelected = function(){
		var selected = -1;
		if(this.chessBox.chessInBoxSelected._chessID != null){
				selected = this.chessBox.chessInBoxSelected._chessID;
		}
		return selected;
	};
	
	this.ifChessSelected = function(){
		var selected = false;
		if((this.chessInBoardSelected() != -1) || (this.chessInBoxSelected() != -1)){
			selected = true;
		}
		return selected;
	};
		
	this.chessUnselected = function(){
		this.chessBox.unselected();
		this.chessBoard.unselected();
		
		this.eventRepaint.fire();
	};

	this.bodyOnMouseOver = function(e){
		var id = this.chessInBoardSelected();
		if(id != -1){
			if(this.chessBoard._mouseOut == true){
				this.chessBoard.getCell(id).setDefaultStyle();
			}
		}
	};
		
	this.bodyOnMouseMove = function(e){
		this.chessBoard.chessInBoardSelected.setXY(e);
		this.chessBox.chessInBoxSelected.setXY(e);
	};

    this.sameWithStandardManual = function(){
	var same = true;
	var CeCh = YL.JSON.parse(this._model._manual);
	try {
	    var MChId,BChId;
	    for(var i=0;i<this._model._cellsTotal;i++){
		MChId = CeCh[this._model._cellName + i];
		//alert(this._model._cellName + i);
		BChId = this.chessBoard.cells[i].getChess().getChessId();
		if(BChId != MChId){
		    same = false;
		    break;//  this.chesses[i].setChessTypeId(CeCh[ceId]);
		}
	    };
	}catch (e) {}
	
	return same;
    };

    this.setManual = function(manual){
	this._model.setManual(manual);
	this.chessBoard.setInit();
	this.chessBox.unselected();
	
	this.eventRepaint.fire();
    };

    this.actClear = function(){
	this._model.setManual("{}");
	this.chessBoard.setInit();
	this.chessBox.unselected();
	
	this.eventRepaint.fire();
    };
		

		this.displaySelectedCell = function(mouseOut){
			if(mouseOut == true){
				this.chessBoard.getCell(this.chessBoard.chessInBoardSelected._id).setInitStyle();
			}
		};
		
}

//******************************************************************************
function BodyContainer(controller){
	this._controller = controller;
	this._html = document;
	
	this.bodyOnMouseClick = function(e){
		if(this._controller.chessInBoardSelected() != -1){
			this._controller.chessBoard.dropChess(null,true);
		}
		
		if(this._controller.chessInBoxSelected() != -1){
			this._controller.chessUnselected(e);
		}
	};
	
	this.bodyOnMouseOver = function(e){
		this._controller.bodyOnMouseOver(e);
	};
	
	this.bodyOnMouseMove = function(e){
		this._controller.bodyOnMouseMove(e);
	};
	
	this.addMouseEvent = function(){
		YU.Event.addListener(this._html, "mouseover", this.bodyOnMouseOver,this, true);
		YU.Event.addListener(this._html, "mousemove", this.bodyOnMouseMove,this, true);
		YU.Event.addListener(this._html, "click", this.bodyOnMouseClick,this, true);
	};
	
	this.removeMouseEvent = function(){
		YU.Event.removeListener(this._html);
		
	};
	
	
}

//******************************************************************************
function Buttons(controller){
    this._controller = controller;
    this._html = YU.Dom.get(this._controller._model._buttonsName);

    this.show = function(){
	  
    };

    this.buttonsOnMouseCommon = function(matchedEl, mouseOver){
	if(!this.oriBC){
	    this.oriBC = YU.Dom.getStyle(matchedEl,'background-color');
	}

	var bc = this.oriBC;
	if(mouseOver){
	    bc = "#f00";
	}
	YU.Dom.setStyle(matchedEl,'background-color',bc);

    };
    
    this.buttonsOnMouseOver = function(event, matchedEl, container){
	switch(matchedEl.id){
	case this._controller._model._standardName:
	    //if(!this._controller.sameWithStandardManual()){
		this.buttonsOnMouseCommon(matchedEl, true);
	    //}
	    break;
	case this._controller._model._clearName:
    	    this.buttonsOnMouseCommon(matchedEl, true);
	    break;
	default:
	}

    };

    this.buttonsOnMouseOut = function(event, matchedEl, container){
	this.buttonsOnMouseCommon(matchedEl, false);
    };

    this.buttonsOnMouseClick = function(event, matchedEl, container){
	switch(matchedEl.id){
	case this._controller._model._standardName:
	    //if(!this._controller.sameWithStandardManual()){
		this._controller.setManual();
	    //}
	    break;
	case this._controller._model._clearName:
	    this._controller.actClear();
	    break;
	default:
	}

	YU.Event.stopEvent(event);
    };

    YU.Event.delegate(this._controller._model._buttonsName,'mouseover',this.buttonsOnMouseOver,"div",this, true);
    YU.Event.delegate(this._controller._model._buttonsName,'mouseout',this.buttonsOnMouseOut,"div",this, true);
    YU.Event.delegate(this._controller._model._buttonsName,'click',this.buttonsOnMouseClick,"div",this, true);
}
//******************************************************************************
function ChessBoard(controller){
    this._controller = controller;
    this._html = YU.Dom.get(this._controller._model._chessBoardName);

    this.cells = [];
    this.chesses = [];
	
    this._originSteps = [];
    this._currentSteps = [];
	
    this._stepsExecuted = false;

    this.chessInBoardSelected = new chessInBoardSelected(this._controller);
	
    this._mouseOut = false;
    
    this.show = function(){
	if(!this._stepsExecuted){
		this._stepsExecuted = true;
		this.setCellsChesses();
		this.setManual();
		//this.setCurrentSteps([[5,28],[58,40],[45,-4],[10,-100]]);
	}
	
	YU.Dom.get(this._controller._model._numsBoardName).innerHTML = '',
	this._html.innerHTML = '';
	
	this.showCells();
	this.showChesses();
	this.chessInBoardSelected.show();
	//this.test();
    };

    this.setInit = function(){
	this._stepsExecuted = false;
	this.chessInBoardSelected.unselected();
    };

	this.getCell = function(id){
		return this.cells[id];
	};
	
	this.test = function(){ //just for data test
		alert("cells number : " + this.cells.length);
		for(var i=0;i<this.cells.length;i++){
			alert("cell._id : " + this.cells[i]._id + " ; cell.chess.id : " + this.cells[i].chess._id
					 								+ " ; cell.chess._chessID : " + this.cells[i].chess._chessID);
	}
    };

    this.unselected = function(){
	//alert("chess board unselect!");
	this.chessInBoardSelected.unselected();
    };
	
    this.getChessTotalInBoard = function(chessTypeId){
	var chessesInBoard = 0;
	for(var i=0;i<this.chesses.length;i++){
			if(this.chesses[i]._chessID == chessTypeId){
				++chessesInBoard;
			}
		}
		return chessesInBoard;
	};
	
    this.setCellsChesses = function(){
        for(var i=0;i<this._controller._model._cellsTotal;i++){
        	this.cells[i] = new Cell(this._controller,this._html, i);
            this.chesses[i] = new Chess(this._controller,this.cells[i],i);
        };
    };
    
	this.setManual = function(){
		var CeCh = YL.JSON.parse(this._controller._model._manual);
				
		var ceId;
	    
		try {
			for(var i=0;i<this._controller._model._cellsTotal;i++){
				ceId = this.cells[i].getID();
				if(CeCh[ceId] != undefined){
				    this.chesses[i].setChessTypeId(CeCh[ceId]);
				}
		    };
	    }catch (e) {}
	};
	
	this.setCurrentSteps = function(steps){
		var end = false;
		for(var i=0;i<steps.length;i++){
			if(i == (steps.length - 1)){
				end = true;
			}
			if(steps[i][1] < 0){
				if(steps[i][1] == this._controller._model._dropChessSymbol){
					this.dropChess(steps[i][0],end);
				}else{
					this.addChess([steps[i][0],steps[i][1]],end);
				}
			}else{
				this.addStep([steps[i][0],steps[i][1]],end);
			}
	    };
	};
		
	this.addStep = function(step,fireE){ //[c0,c9]; fireE = false or true
		this._currentSteps.push(step);

		var tch0 = this.cells[step[0]].chess;
		var tch1 = this.cells[step[1]].chess;

		tch1.setChessTypeId(tch0._chessID);
		tch0.disable();
    	
		this.chessInBoardSelected.unselected();
		
		if(fireE == true){
			this._controller.eventRepaint.fire();
		};
	};
	
	this.addChess = function(cellchess,fireE){
		if(cellchess[1] == null){
			cellchess[1] = -this._controller.chessBox.chessInBoxSelected._chessID;
		}
		
		this._currentSteps.push(cellchess);
		
		var tch = this.cells[cellchess[0]].chess;
		if(tch._chessID == null){
			tch.setChessTypeId(-cellchess[1]);
			
			if(this.getChessTotalInBoard(-cellchess[1]) == this._controller._model._cellsTotal){
				this._controller.chessBox.unselected();
			}
			
			
			if(fireE == true){
				this._controller.eventRepaint.fire();
			};
    	}
	};
	
	this.dropChess = function(cellid,fireE){
		if(cellid == null){
			cellid = this.chessInBoardSelected._id;
		}
		this._currentSteps.push([cellid,this._controller._model._dropChessSymbol]);
		
		this.cells[cellid].chess.disable();
		
		this.chessInBoardSelected.unselected();
		
		if(fireE == true){
			this._controller.eventRepaint.fire();
		};
	};
	
	this.showCells = function(){
		for(var i=0;i<this.cells.length;i++){
			this.cells[i].setHTML();
		}
	};
	
	this.showChesses = function(){
		for(var i=0;i<this.chesses.length;i++){
			this.chesses[i].setHTML();
		}
	};
	
	this.isChessInBoard = function(el){
		if(el.id.indexOf(this._controller._model._chessName) != -1){
			return true;
		}
		return false;
	};
	
	this.isCellInBoard = function(el){
		if(!this.isChessInBoard(el) && 
		  (el.id.indexOf(this._controller._model._cellName) != -1)){
			return true;
		}

		return false;
	};
	
	this.isSameColorChess = function(chessid1,chessid2){
		var same = false;
		if((this.chesses[chessid1]._chessID > 6)){
			if(this.chesses[chessid2]._chessID > 6){
				same = true;
			}
		}else{
			if((this.chesses[chessid2]._chessID <= 6)){
				same = true;
			}
		}
		return same;
	};
	
    this.boxOnMouseCommon = function(event, matchedEl, MouseOver){
    	if(this.isChessInBoard(matchedEl)){
    		var id =  matchedEl.id.substring(this._controller._model._chessName.length);
    		if(this._controller.chessInBoxSelected() == -1){
    			if((this.chessInBoardSelected._id == -1) ||
    				((this.chessInBoardSelected._id != -1) &&
    				  !this.isSameColorChess(this.chessInBoardSelected._id,id))){
    				this._controller.setMouseOverBackgroundColor(matchedEl,MouseOver);
    			}
    		}
    	}
    	if(this.isCellInBoard(matchedEl) &&
    	   this._controller.ifChessSelected()){
  			this._controller.setMouseOverBackgroundColor(matchedEl,MouseOver);
    	}
    	
    	YU.Event.stopEvent(event);
	};
	
    this.boardOnMouseOver = function(event, matchedEl, container){
    	if((this.chessInBoardSelected._id != -1) && 
    	   (this._mouseOut == true)){
    		this._controller.displaySelectedCell(true);
    	}
    	
    	this._mouseOut = false;
    	this.boxOnMouseCommon(event, matchedEl, true);
	};
    
	this.boardOnMouseOut = function(event, matchedEl, container){
		this._mouseOut = true;
		this.boxOnMouseCommon(event, matchedEl, false);
	};

	this.boardOnMouseClick = function(event, matchedEl, container){
		if(this.isChessInBoard(matchedEl)){
			var id =  matchedEl.id.substring(this._controller._model._chessName.length);
			
    		if(this._controller.chessInBoxSelected() != -1){
    			this.addChess([id,null],true);
    		}else{
    			if(this.chessInBoardSelected._id == -1){
    				this.chessInBoardSelected.setId(event,id);
    			}else{
    				if(this.isSameColorChess(this.chessInBoardSelected._id,id)){
    					this._controller.chessUnselected();
    				}else{
    					this.addStep([this.chessInBoardSelected._id,id],true);
    				}
    				
    			}
    		}
		}
		
    	if(this.isCellInBoard(matchedEl)){
    		var id =  matchedEl.id.substring(this._controller._model._cellName.length);
    		
    		if(this._controller.chessInBoxSelected() != -1){
    			this._controller.chessBox.chessInBoxSelected.selectMeEvent = event;
    			this.addChess([id,null],true);
    		}else{
    			if(this.chessInBoardSelected._id != -1){
        			if(this.chessInBoardSelected._id ==  id){ //select same cell with previous selected chess
        				this._controller.chessUnselected();
        			}else{
        				this.addStep([this.chessInBoardSelected._id,id],true);
        			}
        		}
    		}
    	}
		
		YU.Event.stopEvent(event);
	};
	
    YU.Event.delegate(this._controller._model._chessBoardName,'mouseover',this.boardOnMouseOver,"div",this, true);
    YU.Event.delegate(this._controller._model._chessBoardName,'mouseout',this.boardOnMouseOut,"div",this, true);
    YU.Event.delegate(this._controller._model._chessBoardName,'click',this.boardOnMouseClick,"div",this, true);

}

//******************************************************************************
function Cell(controller,container, tid){
    this._controller = controller;
    this._id = tid;
    this.x = (tid%this._controller._model._rcNum);
    this.y = (tid - this.x)/this._controller._model._rcNum;
    this.chess = null; //fixed
    this._backColor = null;
    
    this.html = null;
    
    this.getID = function(){
        return (this._controller._model._cellName+this._id);
    };
    
    this.setHTML = function(){
       
        var ids = this.getID();

        if(this.x == 0){
            this.setNums(this.y);
        }
        try {
            this.html = container.appendChild(document.createElement('<div id="' + ids + '"></div>'));
        }catch (e) {
            this.html = container.appendChild(document.createElement("div"));
            this.html.setAttribute("id", ids);
        }

        this.setInitStyle();
    };
    
    this.setDefaultStyle = function(){
    	YU.Dom.setStyle(this.html,'background-color',this._backColor);
    };
    
    this.setInitStyle = function(){
        var c = this._controller._model._white_color;
        if((this.x + this.y)%2 == 1){
            c = this._controller._model._black_color;
        }
        this._backColor = c;
        
    	if(this._controller.chessInBoardSelected() == this._id){
    		c = this._controller._model._click_color;
    	}
        YU.Dom.setStyle(this.html,'background-color',c);
    };
    
    this.setNums = function(y){ //y = y coordinate
        var container = YU.Dom.get(this._controller._model._numsBoardName);
        var num = null;
        try {
            num = container.appendChild(document.createElement('<div class="num"></div>'));
        }catch (e) {
            num = container.appendChild(document.createElement("div"));
            num.setAttribute("class","num");
        }
        num.innerHTML=(this._controller._model._rcNum - y);
    };
    
    this.setChess = function(chess){ //chess objects
        this.chess = chess;
    };

    this.getChess = function(){
	return this.chess;
    };
}

//******************************************************************************
function Chess(controller,cell,id){ //model, cell object, chess type ID, id of chess
	this._controller = controller;
    this.cell = cell; //fixed
    this._id = id;    //fixed
    cell.setChess(this);
    this._enable = false;
    
    this._chessID = null;//chessTypeID;
    
    this.html = null;
    
    this.getName = function(){
        return (this._controller._model._chessName+this._chessID);
    };
    
    this.getID = function(){
        return (this._controller._model._chessName+this._id);
    };

    this.getChessId = function(){
	return this._chessID;
    };
    
    this.disable = function(){
    	this._chessID = null;
    	this.html = null;
    	this._enable = false;
    };
    
    this.setChessTypeId = function(chessTypeID){
    	if(chessTypeID != null){
    		this._chessID = chessTypeID;
        	this._enable = true;
    	}else{
    		alert("Can't set 'null' value to 'Chess._chessID'!");
    	}
    };
    
    this.setHTML = function(){
    	if((this._enable == true) && (this._controller.chessInBoardSelected() != this._id)){
	    	var container = YU.Dom.get(this.cell.html);
	    	container.innerHTML = '';
	    	
	    	try {
	            this.html = container.appendChild(document.createElement('<div id="' + this.getID() + '" class="' + this.getName() + '"></div>'));
	        }
	        catch (e) {
	            this.html = container.appendChild(document.createElement("div"));
	            this.html.setAttribute("id", this.getID());
	            this.html.setAttribute("class", this.getName());
	        }
    	}
    };
}

//******************************************************************************
function ChessBox(controller){
	this._controller = controller;
	this.html = YU.Dom.get(this._controller._model._chessBoxName);
	
	this.chessInBoxSelected = new chessInBoxSelected(this._controller);
	
	this.chesses = [];
	
	this.show = function(){
	    this.setCells();
	    this.chessInBoxSelected.show();
	};

	this.unselected = function(){
		//alert("chess board unselect!");
		this.chessInBoxSelected.unselected();
	};
	
	this.getChessName = function(type_id){
	    return (this._controller._model._chessName+type_id);
	};
	    
    this.getChessID = function(id){
    	return (this._controller._model._chessInBoxName+id);
    };
	
    this.getCellID = function(id){
    	return (this._controller._model._cellInBoxName+id);
    };
    
    this.isChessOrNumInBox = function(matchedEl){
    	if((matchedEl.id.search(this._controller._model._chessInBoxName) != -1) ||
    	   (matchedEl.id.search(this._controller._model._numInBoxName) != -1)){
    		return true;
    	}else{
    		return false;
    	}
    };
	    
    this.setCells = function(){
    	this.html.innerHTML = '';
    	
	    var container = YU.Dom.get(this.html);
	    	
	    var cell;
	    for(var i=0;i<(this._controller._model._chessTypeTotal/2);i++){
	    	try {
	    		cell = container.appendChild(document.createElement('<div id="' + this.getCellID(i+1) + '"></div>'));
		    }
		    catch (e) {
		      	cell = container.appendChild(document.createElement("div"));
		       	cell.setAttribute("id", this.getCellID(i+1));
		    }
		    
		    this.setCellStyle(cell,i+1);
		    
		    this.setChess(i+1,cell);
		        
		    try {
		    	cell = container.appendChild(document.createElement('<div id="' + this.getCellID(i+7) + '"></div>'));
		    }
		    catch (e) {
		      	cell = container.appendChild(document.createElement("div"));
		       	cell.setAttribute("id", this.getCellID(i+7));
		    }
		    
		    this.setCellStyle(cell,i+7);
		    
		    this.setChess(i+7,cell);
	    }
    };
    
    this.setCellStyle = function(cell,chessTypeId){
    	if(chessTypeId == this.chessInBoxSelected._chessID){
    		YU.Dom.setStyle(cell,'background-color',this._controller._model._click_color);
    	}
    };
    
    this.setChess = function(id,cell){
    	if(cell.innerHTML == ''){
	    	var container = cell;
	    	
	    	var chess;
    		try {
    			chess = container.appendChild(document.createElement('<div id="' + this.getChessID(id) + '" class="' + this.getChessName(id) + '"></div>'));
	        }
	        catch (e) {
	        	chess = container.appendChild(document.createElement("div"));
	        	chess.setAttribute("id", this.getChessID(id));
	        	chess.setAttribute("class", this.getChessName(id));
	        }
    	}
    	this.setChessNum(id,cell);
    };
    
    this.setChessNum = function(id,cell){
    	var container = cell;
    	
        var num = null;
        try {
            num = container.appendChild(document.createElement('<div id="' + this.model._numInBoxName + id + '" class="' + this.model._numInBoxName + '"></div>'));
        }
        catch (e) {
            num = container.appendChild(document.createElement("div"));
            num.setAttribute("id",this._controller._model._numInBoxName + id);
            num.setAttribute("class",this._controller._model._numInBoxName);
        }
        
        var n = this._controller._model._cellsTotal - this._controller.chessBoard.getChessTotalInBoard(id);
        if(n == 0){
        	YU.Dom.setStyle(num,"color","#900");
        }
        num.innerHTML = n;
    };
    
    this.boxOnMouseCommon = function(event, matchedEl, MouseOver){
		if(this._controller.chessInBoardSelected() != -1){
			return;
		}
		
    	if(this.isChessOrNumInBox(matchedEl)){
    		var parentDom = YU.Dom.getAncestorBy(matchedEl);
    		this._controller.setMouseOverBackgroundColor(parentDom,MouseOver);
    	}
    	
    	YU.Event.stopEvent(event);
	};
    
    this.boxOnMouseOver = function(event, matchedEl, container){
    	var chessTypeId = YU.Dom.getAncestorBy(matchedEl).id.substring(this._controller._model._cellInBoxName.length);
    	if(this._controller.chessBoard.getChessTotalInBoard(chessTypeId) < this._controller._model._cellsTotal){
    		this.boxOnMouseCommon(event, matchedEl, true);
    	}
	};
    
	this.boxOnMouseOut = function(event, matchedEl, container){
		this.boxOnMouseCommon(event, matchedEl, false);
	};

	this.boxOnMouseClick = function(event, matchedEl, container){
		if(this._controller.chessInBoardSelected() != -1){
			//this._controller.chessBoard.dropChess(null,true);
			return;
		}
		
		if(this.isChessOrNumInBox(matchedEl)){
			var chessTypeId = YU.Dom.getAncestorBy(matchedEl).id.substring(this._controller._model._cellInBoxName.length);
			if((chessTypeId != this.chessInBoxSelected._chessID) &&
			   (this._controller.chessBoard.getChessTotalInBoard(chessTypeId) < this._controller._model._cellsTotal)){
				this.chessInBoxSelected.setChessTypeId(event,chessTypeId);
			}else{
				this._controller.chessUnselected();
			}
		}
		YU.Event.stopEvent(event);
	};
	
    YU.Event.delegate(this._controller._model._chessBoxName,'mouseover',this.boxOnMouseOver,"div",this, true);
    YU.Event.delegate(this._controller._model._chessBoxName,'mouseout',this.boxOnMouseOut,"div",this, true);
    YU.Event.delegate(this._controller._model._chessBoxName,'click',this.boxOnMouseClick,"div",this, true);
}

//******************************************************************************
function chessSelected(){
    this._html = null;
    this._chessID = null;

    this.selectMeEvent = null;
        
    this.show = function(args){
    	this.setHTML();
    };
        
    this.setHTML = function(){
    	var th = YU.Dom.get(this._controller._model._chessSelectedName);
    	if(th == null){
        	var container = YU.Dom.get(this._controller.chessBoard._html);
        	
	        try {
	        	this._html = container.appendChild(document.createElement('<div id="' + this._controller._model._chessSelectedName + '"></div>'));
	        }catch (e) {
	          	this._html = container.appendChild(document.createElement("div"));
	        	this._html.setAttribute("id", this._controller._model._chessSelectedName);
	        }
    	}else{
    		this._html = th;
    	}
    	
        var clas = "";
    	if(this._chessID != null){
    		clas = this._controller._model._chessName + this._chessID;
    		YU.Dom.setAttribute(this._html,"class",clas);
    		YU.Dom.setStyle(this._html,"display","");
    		this.setXY(this.selectMeEvent);
    		this._controller.showChessSelected();
    	}else{
    		if(!this._controller.ifChessSelected()){
    			YU.Dom.setStyle(this._html,"display","none");
           		this._controller.hideChessSelected();
    		}
   			
    	}
    };
    
    this.setXY = function(e){
    	try{
    		var X = YU.Event.getPageX(e); 
        	var Y = YU.Event.getPageY(e);

        	var H = "" + YU.Dom.getStyle(this._html,'width');
        	H = H.replace('px','');
        	YU.Dom.setXY(this._html,[X-(++H+1),Y-(++H+1)]);
    	}catch(e){}
    	
    };
}

//******************************************************************************
function chessInBoardSelected(controller){
	chessSelected.call(this);

	this._controller = controller;
	
	this._id = -1;
		
    this.setId = function(event,id){
    	this.selectMeEvent = event;
    	this._id = id;
    	this._chessID = this._controller.chessBoard.chesses[id]._chessID;
    	this._controller.eventChessInBoardSelected.fire();
    	this._controller.eventRepaint.fire();
    };
    
    this.unselected = function(){
    	this.selectMeEvent = null;
    	this._id = -1;
    	this._chessID = null;
    };
}

//******************************************************************************
function chessInBoxSelected(controller){
	chessSelected.call(this);

	this._controller = controller;
	
    this.setChessTypeId = function(event,chessTypeId){
    	this.selectMeEvent = event;
    	this._chessID = chessTypeId;
    	this._controller.eventChessInBoxSelected.fire();
    	this._controller.eventRepaint.fire();
    };
    
    this.unselected = function(){
    	this.selectMeEvent = null;
    	this._chessID = null;
    };
}