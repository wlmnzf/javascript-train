function drag(box,id)
{
	var range;
	var target;
	var positionParam={};
	var control=
	{
		empty:function(obj)
		      {
		      	  if(obj==undefined||obj==null||obj=="")
		      	      return true;
		      	  
		      	  return false;  
		      },
		      
		exception:function(tip)
			 {
			 	 console.log("dragErr:"+tip);
				 throw new Error(tip);
			 },
			 
		getPageLocation:function (event)
		    {
		    	var e = this.getEvent(event);
	            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
	            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
	            var x = e.pageX || e.clientX + scrollX;
	            var y = e.pageY || e.clientY + scrollY;
	            return { 'x': x, 'y': y };
		    },	 
			 
	    getTarget:function (id)
	         {
	        	var target=document.getElementById(id);
	        	if(this.empty(target))
	        		throw new Error("无法找到这个id")
	        	return target;
	         },
	         
	    getEvent:function (e)
	        {
	        	return e||window.event;
	        },
	        
	    getCss:function(o,key)
			{
				return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key]; 	
			},
			
		dragStart:function (e)
			{
				//e.dataTransfer.setData("Text",e.target.id);
			    positionParam.Location=control.getPageLocation();
		        //positionParam.Left=control.empty(target.style.left)?0:parseInt(target.style.left.replace("px",""));
		        //positionParam.Top=control.empty(target.style.top)?0:parseInt(target.style.top.replace("px",""));
		        //获取不到class内的属性
		        positionParam.Left=control.getCss(target,"left")=="auto"?0:parseInt(control.getCss(target,"left").replace("px",""));
		        positionParam.Top=control.getCss(target,"top")=="auto"?0:parseInt(control.getCss(target,"top").replace("px",""));
		       
			},
		
		dragOver:function(e)
		   {
		  		e.preventDefault();
		   },
		   
		drop:function(e)
		  {
		  	    e.preventDefault();
//				var data=e.dataTransfer.getData("Text");
//				e.target.appendChild(document.getElementById(data));
				//var data=ev.dataTransfer.getData("Text");
				//var target=document.getElementById(data);
				var pageLocation=control.getPageLocation();
                var tx = pageLocation.x-positionParam.Location.x;
                var ty = pageLocation.y-positionParam.Location.y;
                target.style.left = positionParam.Left+tx +"px";
                target.style.top = positionParam.Top+ty+"px";
		  },
		   
		  init:function()
		  {
		  	  target=this.getTarget(id);
		  	  range=this.getTarget(box);
		  	  target.setAttribute("draggable", "true");
		  	  target.addEventListener("dragstart",this.dragStart);
		  	  target.style.position="absolute";
		  	  range.addEventListener("drop",this.drop);
		  	  range.addEventListener("dragover",this.dragOver);
		  },
		
	}
	
	control.init(box,id);
}
